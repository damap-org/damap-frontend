import csv
import re
import shutil
from pathlib import Path


def replace_translation_keys():
    # 1. Set up paths
    tools_dir = Path(__file__).parent.resolve()
    base_project_folder = tools_dir.parent

    csv_path = tools_dir / "golden_master.csv"
    output_report_path = tools_dir / "replacement_report.txt"
    backup_root = tools_dir / "translation_key_backups"

    if not csv_path.exists():
        print(f"❌ Error: Could not find {csv_path}")
        return

    # 2. Load mappings from CSV
    replacements = {}
    skipped_rows = []

    with open(csv_path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        next(reader, None)  # skip header

        for row_num, row in enumerate(reader, start=2):
            if len(row) < 2:
                skipped_rows.append((row_num, "Row has fewer than 2 columns"))
                continue

            old_key = row[0].strip()
            new_key = row[1].strip()

            if not old_key or not new_key:
                skipped_rows.append((row_num, "Empty old/new key"))
                continue

            if new_key == "MISSING_IN_NEW_JSON":
                skipped_rows.append((row_num, f"Skipped placeholder mapping: {old_key} -> {new_key}"))
                continue

            if "COULD_NOT_BE_AUTO_REPLACE" in new_key:
                skipped_rows.append((row_num, f"Skipped broken mapping: {old_key} -> {new_key}"))
                continue

            replacements[old_key] = new_key

    if not replacements:
        print("❌ No valid replacements loaded from CSV.")
        return

    print(f"📥 Loaded {len(replacements)} valid replacement mappings from CSV.")

    # 3. Define search paths
    search_paths = [
        base_project_folder / "apps" / "damap-frontend" / "src",
        base_project_folder / "libs" / "damap" / "src",
    ]

    # 4. Gather candidate files
    candidate_files = []
    for search_path in search_paths:
        if not search_path.exists():
            print(f"⚠️ Warning: Could not find path {search_path}")
            continue

        for ext in ("*.ts", "*.html"):
            candidate_files.extend(search_path.rglob(ext))

    if not candidate_files:
        print("❌ No candidate files found.")
        return

    print(f"🔍 Found {len(candidate_files)} candidate files to scan.")

    # 5. Sort by descending key length to avoid shorter partial collisions
    sorted_replacements = sorted(
        replacements.items(),
        key=lambda pair: len(pair[0]),
        reverse=True
    )

    files_changed = 0
    total_replacements = 0
    per_file_report = []
    unchanged_files = 0
    backup_root.mkdir(parents=True, exist_ok=True)

    for file_path in candidate_files:
        try:
            original_content = file_path.read_text(encoding="utf-8")
        except Exception:
            continue

        new_content = original_content
        file_replacements = []

        is_html = file_path.suffix.lower() == ".html"

        for old_key, new_key in sorted_replacements:
            old_escaped = re.escape(old_key)
            replacement_count = 0

            # Case 1: 'old.key' or '   old.key   '
            single_quote_pattern = re.compile(rf"'(\s*){old_escaped}(\s*)'")
            matches = single_quote_pattern.findall(new_content)
            if matches:
                replacement_count += len(matches)
                new_content = single_quote_pattern.sub(f"'{new_key}'", new_content)

            # Case 2: "old.key" or "   old.key   "
            double_quote_pattern = re.compile(rf'"(\s*){old_escaped}(\s*)"')
            matches = double_quote_pattern.findall(new_content)
            if matches:
                replacement_count += len(matches)
                new_content = double_quote_pattern.sub(f'"{new_key}"', new_content)

            # Case 3: HTML tags with translate attribute:
            # <h1 translate> old.key </h1>
            # <div translate ...>
            #    old.key
            # </div>
            #
            # Replaces only if the direct inner text is exactly the key plus whitespace.
            if is_html:
                translate_tag_pattern = re.compile(
                    rf'(<(?P<tag>[a-zA-Z0-9_-]+)\b[^>]*\btranslate\b[^>]*>\s*)'
                    rf'{old_escaped}'
                    rf'(\s*</(?P=tag)>)',
                    re.MULTILINE
                )

                matches = translate_tag_pattern.findall(new_content)
                if matches:
                    replacement_count += len(matches)
                    new_content = translate_tag_pattern.sub(rf"\1{new_key}\3", new_content)

            if replacement_count > 0:
                total_replacements += replacement_count
                file_replacements.append((old_key, new_key, replacement_count))

        if new_content != original_content:
            try:
                relative_path = file_path.relative_to(base_project_folder)
            except ValueError:
                relative_path = Path(file_path.name)

            backup_path = backup_root / relative_path
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(file_path, backup_path)

            file_path.write_text(new_content, encoding="utf-8")

            files_changed += 1
            per_file_report.append((file_path, file_replacements))
        else:
            unchanged_files += 1

    # 7. Write report
    with open(output_report_path, "w", encoding="utf-8") as f:
        f.write("=== TRANSLATION KEY REPLACEMENT REPORT ===\n\n")
        f.write(f"Valid mappings loaded: {len(replacements)}\n")
        f.write(f"Files scanned: {len(candidate_files)}\n")
        f.write(f"Files changed: {files_changed}\n")
        f.write(f"Files unchanged: {unchanged_files}\n")
        f.write(f"Total replacements: {total_replacements}\n")
        f.write(f"Backups written to: {backup_root}\n\n")

        if skipped_rows:
            f.write("=== SKIPPED CSV ROWS ===\n")
            for row_num, reason in skipped_rows:
                f.write(f"Row {row_num}: {reason}\n")
            f.write("\n")

        f.write("=== CHANGED FILES ===\n")
        if not per_file_report:
            f.write("No files changed.\n")
        else:
            for file_path, replacements_in_file in per_file_report:
                f.write(f"\n{file_path}\n")
                f.write("-" * len(str(file_path)) + "\n")
                for old_key, new_key, count in replacements_in_file:
                    f.write(f"{count}x  {old_key}  ->  {new_key}\n")

    print("\n✅ Replacement complete!")
    print(f"🟢 Files changed: {files_changed}")
    print(f"📊 Total replacements: {total_replacements}")
    print(f"🗂️ Backups stored in: {backup_root}")
    print(f"📄 Report written to: {output_report_path}")


if __name__ == "__main__":
    replace_translation_keys()
