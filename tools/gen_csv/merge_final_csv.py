import csv
from pathlib import Path

def merge_to_golden_master():
    tools_dir = Path(__file__).parent.resolve()

    # 1. Define your input files
    base_map_path = tools_dir / 'translation_migration_map.csv'
    resolved_dupes_path = tools_dir / 'resolved_duplicates.csv'
    rescued_missing_path = tools_dir / 'rescued_missing.csv'
    dead_keys_path = tools_dir / 'dead_keys.txt'

    # 2. Define the output file
    golden_master_path = tools_dir / 'golden_master.csv'

    # 3. Load the dead keys so we can filter them out
    dead_keys = set()
    if dead_keys_path.exists():
        with open(dead_keys_path, 'r', encoding='utf-8') as f:
            dead_keys = {line.strip() for line in f if line.strip()}
        print(f"💀 Loaded {len(dead_keys)} dead keys to ignore.")
    else:
        print("⚠️ No dead_keys.txt found. Proceeding without filtering unused keys.")

    # Dictionary to hold our final 1-to-1 mappings
    golden_map = {}

    # 4. Helper function to read a CSV and update the map
    def load_mappings(csv_file, source_name):
        if not csv_file.exists():
            print(f"⚠️ Could not find {csv_file.name}. Skipping...")
            return 0

        count = 0
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                old_key = row.get('Old Key', '').strip()
                new_key = row.get('New Key', '').strip()

                # Skip invalid keys, dead keys, or unresolved placeholders
                if not old_key or not new_key:
                    continue
                if old_key in dead_keys:
                    continue

                # Add or overwrite the mapping
                golden_map[old_key] = new_key
                count += 1

        print(f"📥 Loaded {count} valid mappings from {source_name}")
        return count

    # 5. Load the files in order of priority
    # (Later files overwrite earlier ones if there's a conflict)
    print("\n--- Starting Merge ---")
    load_mappings(base_map_path, "Original Auto-Map")
    load_mappings(resolved_dupes_path, "Teammate's Resolved Duplicates")
    load_mappings(rescued_missing_path, "Rescued Missing Keys")

    # 6. Write the final Golden Master CSV
    with open(golden_master_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Old Key', 'New Key']) # Clean, 2-column header

        # Sort alphabetically by Old Key for easy reading
        for old_key in sorted(golden_map.keys()):
            writer.writerow([old_key, golden_map[old_key]])

    print("\n" + "="*40)
    print(f"✅ SUCCESS! Created Golden Master with {len(golden_map)} final keys.")
    print(f"📄 Saved to: {golden_master_path.name}")
    print("="*40)

if __name__ == "__main__":
    merge_to_golden_master()
