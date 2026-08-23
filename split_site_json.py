"""
Splits content/site.json into three independent files:
content/projects.json, content/testimonials.json, content/about.json

Run this ONCE, from inside your project folder, after pulling the latest
changes from GitHub — so it operates on your real, current, live content,
not an old copy.

Usage (from Terminal, inside piyush-portfolio@@):
    python3 split_site_json.py
"""
import json
import os

SRC = "content/site.json"

if not os.path.exists(SRC):
    print(f"ERROR: {SRC} not found. Are you running this from inside piyush-portfolio@@?")
    raise SystemExit(1)

with open(SRC) as f:
    data = json.load(f)

projects = {"projects": data.get("projects", [])}
testimonials = {"testimonials": data.get("testimonials", [])}
about = data.get("about", {})

with open("content/projects.json", "w") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)
    f.write("\n")

with open("content/testimonials.json", "w") as f:
    json.dump(testimonials, f, indent=2, ensure_ascii=False)
    f.write("\n")

with open("content/about.json", "w") as f:
    json.dump(about, f, indent=2, ensure_ascii=False)
    f.write("\n")

print("Done. Created:")
print(f"  content/projects.json      ({len(projects['projects'])} project cards)")
print(f"  content/testimonials.json  ({len(testimonials['testimonials'])} testimonials)")
print(f"  content/about.json")
print()
print("content/site.json is now unused — do NOT delete it yet.")
print("Once you've confirmed the new files work correctly on the live site,")
print("come back and I'll tell you when it's safe to remove it.")
