import json
import csv
import difflib
from collections import defaultdict
from pathlib import Path

def flatten_json(y):
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
    old_data = {}
    search_paths = [
        base_project_folder / 'apps' / 'damap-frontend' / 'src' / 'assets' / 'i18n',
        base_project_folder / 'libs' / 'damap' / 'src' / 'assets' / 'i18n'
    ]

    for search_path in search_paths:
        if not search_path.exists():
            continue

        for json_file in search_path.rglob('en.json'):
            with open(json_file, 'r', encoding='utf-8') as f:
                old_data.update(flatten_json(json.load(f)))

    return old_data

def create_mapping_csv():
    tools_dir = Path(__file__).parent.resolve()
    base_project_folder = tools_dir.parent

    new_json_path = tools_dir / 'new_en.json'
    output_csv_path = tools_dir / 'translation_migration_map.csv'

    old_data = merge_old_translations(base_project_folder)

    if not new_json_path.exists():
        print(f"❌ Error: Could not find {new_json_path}")
        return

    # THE FIX: Load the JSON, then step inside the "en" key before flattening
    with open(new_json_path, 'r', encoding='utf-8') as f:
        raw_new_json = json.load(f)
        if "en" in raw_new_json:
            new_data = flatten_json(raw_new_json["en"])
        else:
            new_data = flatten_json(raw_new_json)

    old_val_to_keys = defaultdict(list)
    for key, val in old_data.items():
        if isinstance(val, str):
            old_val_to_keys[val].append(key)

    new_val_to_keys = defaultdict(list)
    for key, val in new_data.items():
        if isinstance(val, str):
            new_val_to_keys[val].append(key)

    with open(output_csv_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Old Key', 'New Key', 'Value', 'Suggested Key'])

        for old_key, val in old_data.items():
            if not isinstance(val, str):
                continue

            new_key = ""
            suggestion = ""

            if val in new_val_to_keys:
                possible_new_keys = new_val_to_keys[val]

                if old_key in possible_new_keys:
                    new_key = old_key
                # 1-to-1 match
                elif len(old_val_to_keys[val]) == 1 and len(possible_new_keys) == 1:
                    new_key = possible_new_keys[0]
                else:
                    new_key = "COULD_NOT_BE_AUTO_REPLACE"

                    highest_ratio = 0.0
                    for candidate in possible_new_keys:
                        ratio = difflib.SequenceMatcher(None, old_key, candidate).ratio()
                        if ratio > highest_ratio:
                            highest_ratio = ratio
                            suggestion = candidate

            else:
                new_key = "MISSING_IN_NEW_JSON"

            clean_val = val.replace('\n', '\\n').replace('\r', '')
            writer.writerow([old_key, new_key, clean_val, suggestion])

    print(f"\n✅ Mapping complete! Check out {output_csv_path}")

if __name__ == "__main__":
    create_mapping_csv()
