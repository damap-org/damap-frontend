import csv
from pathlib import Path

def cross_reference_dead_keys():
    tools_dir = Path(__file__).parent.resolve()

    csv_path = tools_dir / 'translation_migration_map.csv'
    dead_keys_path = tools_dir / 'dead_keys.txt'
    output_path = tools_dir / 'dead_keys_status_report.csv'

    if not csv_path.exists() or not dead_keys_path.exists():
        print("❌ Error: Make sure both 'translation_migration_map.csv' and 'dead_keys.txt' are in the tools folder.")
        return

    # 1. Load the master CSV into memory
    mapping_data = {}
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            mapping_data[row['Old Key']] = {
                'Status': row['New Key'], # This holds the new key, or "MISSING_IN_NEW_JSON", etc.
                'Value': row['Value']
            }

    # 2. Read your 109 dead keys
    with open(dead_keys_path, 'r', encoding='utf-8') as f:
        dead_keys = [line.strip() for line in f if line.strip()]

    # 3. Write the cross-reference report
    with open(output_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Dead Old Key', 'Migration Status', 'Actual English Text'])

        for key in dead_keys:
            if key in mapping_data:
                status = mapping_data[key]['Status']
                val = mapping_data[key]['Value']
                writer.writerow([key, status, val])
            else:
                writer.writerow([key, 'NOT_FOUND_IN_OLD_JSON', 'Unknown'])

    print(f"✅ Cross-reference complete! Checked {len(dead_keys)} keys.")
    print(f"📄 Open {output_path} to see the results.")

if __name__ == "__main__":
    cross_reference_dead_keys()
