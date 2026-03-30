import json
import csv

# ---- CONFIG ----
JSON_FILE = "new_en.json"
MAPPING_CSV = "golden_master.csv"
VALUES_CSV = "translation_migration_map.csv"
OUTPUT_FILE = "output.csv"
PATCHED_JSON_FILE = "new_en_patched.json"


# ---- LOAD JSON (ASSUME ALREADY FLAT OR MIXED → WE TREAT AS FLAT) ----
with open(JSON_FILE, "r", encoding="utf-8") as f:
    json_data = json.load(f)

if "en" not in json_data or not isinstance(json_data["en"], dict):
    raise ValueError("Expected structure { 'en': { ... } }")

# Treat keys as flat (no unfolding!)
existing_keys = set(json_data["en"].keys())


# ---- LOAD MAPPING (New -> Old) ----
new_to_old = {}
with open(MAPPING_CSV, "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    next(reader, None)
    for row in reader:
        if len(row) < 2:
            continue
        old_key, new_key = row[0].strip(), row[1].strip()
        if not new_key or new_key == "MISSING_IN_NEW_JSON":
            continue
        new_to_old[new_key] = old_key


# ---- LOAD VALUES (Old -> Value) ----
old_to_value = {}
with open(VALUES_CSV, "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    next(reader, None)
    for row in reader:
        if len(row) < 3:
            continue
        old_key = row[0].strip()
        value = row[2].strip()
        old_to_value[old_key] = value


# ---- FIND MISSING KEYS ----
missing = []

for new_key, old_key in new_to_old.items():
    if new_key not in existing_keys:
        value = old_to_value.get(old_key, "")
        missing.append((new_key, value))


# ---- WRITE CSV OUTPUT ----
with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["new_key", "value"])
    for key, value in missing:
        writer.writerow([key, value])

print(f"Found {len(missing)} missing keys -> {OUTPUT_FILE}")


# ---- PATCH JSON (APPEND AT END) ----
patched_en = dict(json_data["en"])  # preserves order

for new_key, value in missing:
    patched_en[new_key] = value  # appended at end


patched_json = {
    "en": patched_en
}

with open(PATCHED_JSON_FILE, "w", encoding="utf-8") as f:
    json.dump(patched_json, f, ensure_ascii=False, indent=2)

print(f"Patched JSON written to {PATCHED_JSON_FILE}")
