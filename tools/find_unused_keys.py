import csv
from pathlib import Path

def check_key_usage():
    # 1. Set up paths
    tools_dir = Path(__file__).parent.resolve()
    base_project_folder = tools_dir.parent

    csv_path = tools_dir / 'translation_migration_map.csv'
    output_report_path = tools_dir / 'unused_keys_report.txt'

    if not csv_path.exists():
        print(f"❌ Error: Could not find {csv_path}")
        return

    # 2. Load all "Old Keys" from the CSV
    old_keys = set()
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            old_keys.add(row['Old Key'])

    print(f"📥 Loaded {len(old_keys)} unique keys from the CSV to check.")

    # 3. Define search paths and known dynamic prefixes
    search_paths = [
        base_project_folder / 'apps' / 'damap-frontend' / 'src',
        base_project_folder / 'libs' / 'damap' / 'src'
    ]

    # ⚠️ ADD YOUR DYNAMIC PREFIXES HERE ⚠️
    # If a key isn't found, but starts with one of these, it gets moved to the "Safe" list
    dynamic_prefixes = [
        'access.',
        # Add more prefixes here as you spot them!
    ]

    found_keys = set()
    unfound_keys = set(old_keys)

    # 4. Scan the codebase
    print("🔍 Scanning .ts and .html files... This might take a few seconds.")
    for search_path in search_paths:
        if not search_path.exists():
            print(f"⚠️ Warning: Could not find path {search_path}")
            continue

        for ext in ('*.ts', '*.html'):
            for file_path in search_path.rglob(ext):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                        for key in list(unfound_keys):
                            if key in content:
                                found_keys.add(key)
                                unfound_keys.remove(key)
                except Exception as e:
                    pass # Silently skip any weirdly formatted files we can't read

    # 5. Filter out the known dynamic keys
    dynamic_keys_found = set()
    truly_unused_keys = set()

    for key in unfound_keys:
        is_dynamic = False
        for prefix in dynamic_prefixes:
            if key.startswith(prefix):
                dynamic_keys_found.add(key)
                is_dynamic = True
                break

        if not is_dynamic:
            truly_unused_keys.add(key)

    # 6. Write the unused keys to a text file for review
    with open(output_report_path, 'w', encoding='utf-8') as f:
        f.write("=== TRULY UNUSED KEYS ===\n")
        f.write("These were not found in the code and do not match any known dynamic prefixes.\n")
        f.write("You can likely delete these from your migration plan.\n")
        f.write("============================================================\n")
        for k in sorted(truly_unused_keys):
            f.write(f"{k}\n")

        f.write("\n\n=== DYNAMIC KEYS (Manually Verify) ===\n")
        f.write("These were not found as exact strings, but match your dynamic_prefixes.\n")
        f.write("Do not delete these without checking your HTML string concatenations!\n")
        f.write("============================================================\n")
        for k in sorted(dynamic_keys_found):
            f.write(f"{k}\n")

    print(f"\n✅ Scan complete!")
    print(f"🟢 Found in code: {len(found_keys)}")
    print(f"🟡 Dynamic (Ignored): {len(dynamic_keys_found)}")
    print(f"🔴 Truly Not found: {len(truly_unused_keys)}")
    print(f"📄 Generated report at: {output_report_path}")

if __name__ == "__main__":
    check_key_usage()
