import json
import difflib
from pathlib import Path

def flatten_json(y):
    out = {}
    def flatten(x, name=''):
        if type(x) is dict:
            for a in x:
                flatten(x[a], name + a + '.')
        else:
            out[name[:-1]] = x.strip() if isinstance(x, str) else x
    flatten(y)
    return out

def run_fuzzy_search():
    tools_dir = Path(__file__).parent.resolve()
    new_json_path = tools_dir / 'new_en.json'

    if not new_json_path.exists():
        print(f"❌ Error: Could not find {new_json_path}")
        return

    # 1. Load and flatten the new JSON
    print("⏳ Loading new translations...")
    with open(new_json_path, 'r', encoding='utf-8') as f:
        raw_new_json = json.load(f)
        if "en" in raw_new_json:
            new_data = flatten_json(raw_new_json["en"])
        else:
            new_data = flatten_json(raw_new_json)

    print(f"✅ Loaded {len(new_data)} translation keys.")
    print("=" * 50)
    print("🔍 FUZZY TRANSLATION SEARCH")
    print("Type 'quit' or 'q' to exit.")
    print("=" * 50)

    # 2. Interactive Search Loop
    while True:
        query = input("\n📝 Enter text to search for: ").strip()

        if query.lower() in ['q', 'quit', 'exit']:
            print("Goodbye! 👋")
            break

        if not query:
            continue

        # 3. Calculate match ratios
        results = []
        query_lower = query.lower()

        for key, val in new_data.items():
            if not isinstance(val, str):
                continue

            # Compare case-insensitively for better fuzzy matching
            ratio = difflib.SequenceMatcher(None, query_lower, val.lower()).ratio()
            results.append((ratio, key, val))

        # 4. Sort by highest match and grab the top 5
        results.sort(reverse=True, key=lambda x: x[0])
        top_results = results[:5]

        # 5. Display the results nicely
        print("\n🏆 Top 5 Matches:")
        for i, (ratio, key, val) in enumerate(top_results, 1):
            match_pct = int(ratio * 100)

            # Highlight exact matches vs fuzzy matches
            if match_pct == 100:
                print(f"  {i}. [💯 EXACT] {key}")
            elif match_pct > 70:
                print(f"  {i}. [{match_pct}% MATCH] {key}")
            else:
                print(f"  {i}. [{match_pct}% match] {key}")

            print(f"     Text: \"{val}\"")

if __name__ == "__main__":
    run_fuzzy_search()
