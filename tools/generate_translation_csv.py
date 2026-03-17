import json
import csv
from collections import defaultdict
from pathlib import Path

def flatten_json(y):
    """Flattens a nested JSON dict into dot-separated keys."""
    out = {}
    def flatten(x, name=''):
        if type(x) is dict:
            for a in x:
                flatten(x[a], name + a + '.')
        else:
            out[name[:-1]] = x
    flatten(y)
    return out

def merge_old_translations(base_project_folder):
    """Scans specific directories for en.json and merges them."""
    old_data = {}

    # Define the base paths to search (relative to the base project folder)
    search_paths = [
        base_project_folder / 'apps' / 'damap-frontend' / 'src' / 'assets' / 'i18n',
        base_project_folder / 'libs' / 'damap' / 'src' / 'assets' / 'i18n'
    ]

    for search_path in search_paths:
        if not search_path.exists():
            print(f"⚠️ Warning: Path not found: {search_path}")
            continue

        # Find every en.json in all subdirectories
        for json_file in search_path.rglob('en.json'):
            print(f"📄 Found old translations: {json_file.relative_to(base_project_folder)}")
            with open(json_file, 'r', encoding='utf-8') as f:
                data = flatten_json(json.load(f))
                # Merge into our master dictionary
                old_data.update(data)

    return old_data

def create_mapping_csv():
    # 1. Setup paths
    # __file__ is the script in [base_project_folder]/tools.
    # .parent is the tools folder. .parent.parent is the base project folder.
    tools_dir = Path(__file__).parent.resolve()
    base_project_folder = tools_dir.parent

    new_json_path = tools_dir / 'new_en.json'
    output_csv_path = tools_dir / 'translation_migration_map.csv'

    # 2. Load the data
    old_data = merge_old_translations(base_project_folder)

    if not new_json_path.exists():
        print(f"❌ Error: Could not find the new JSON file at {new_json_path}")
        return

    with open(new_json_path, 'r', encoding='utf-8') as f:
        new_data = flatten_json(json.load(f))

    # 3. Group keys by their exact string values
    old_val_to_keys = defaultdict(list)
    for key, val in old_data.items():
        if isinstance(val, str):
            old_val_to_keys[val].append(key)

    new_val_to_keys = defaultdict(list)
    for key, val in new_data.items():
        if isinstance(val, str):
            new_val_to_keys[val].append(key)

    # 4. Build the mapping and write to CSV
    with open(output_csv_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Old Key', 'New Key', 'Value']) # Header

        for old_key, val in old_data.items():
            if not isinstance(val, str):
                continue

            new_key = ""
            if val in new_val_to_keys:
                # 1-to-1 match
                if len(old_val_to_keys[val]) == 1 and len(new_val_to_keys[val]) == 1:
                    new_key = new_val_to_keys[val][0]
                else:
                    # Ambiguous match
                    new_key = f"COULD_NOT_BE_AUTO_REPLACE_{val}"
            else:
                new_key = "MISSING_IN_NEW_JSON"

            clean_val = val.replace('\n', '\\n').replace('\r', '')
            writer.writerow([old_key, new_key, clean_val])

    print(f"\n✅ Mapping complete! Found {len(old_data)} old keys. Check out {output_csv_path}")

if __name__ == "__main__":
    create_mapping_csv()
