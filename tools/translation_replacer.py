import csv
from pathlib import Path
import shutil

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
    # Expected: column 1 = old key, column 2 = new key
    replacements = {}
    skipped_rows = []

    with open(csv_path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        header = next(reader, None)

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

    # 5. Sort replacements by descending old key length
    # This avoids shorter keys replacing inside longer ones first.
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

    # 6. Process files
    for file_path in candidate_files:
        try:
            original_content = file_path.read_text(encoding="utf-8")
        except Exception:
            continue

        new_content = original_content
        file_replacements = []

        for old_key, new_key in sorted_replacements:
            count = new_content.count(old_key)
            if count > 0:
                new_content = new_content.replace(old_key, new_key)
                total_replacements += count
                file_replacements.append((old_key, new_key, count))

        if new_content != original_content:
            # Create backup preserving relative structure
            try:
                relative_path = file_path.relative_to(base_project_folder)
            except ValueError:
                relative_path = Path(file_path.name)

            backup_path = backup_root / relative_path
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(file_path, backup_path)

            # Write changed file
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
        f.write(f"Total string replacements: {total_replacements}\n")
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
