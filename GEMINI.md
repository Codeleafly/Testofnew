Tumhe project par kaam apne default tarike se hi karna hai.
Tumhe apna behaviour, working style, reasoning ya output format change nahi karna hai.

IMPORTANT RULES (STRICT):

1. Har ek change ke baad tumhe `report.md` file ko update karna hoga.

2. `report.md` mein har update ke liye yeh details mandatory hongi:
   - Exact date & time (timestamp, preferably ISO format)
   - Kis file mein change hua
   - Kaun-kaun se lines add / modify / remove hui
   - Change ka reason (kyon change kiya gaya)
   - Change ka short technical summary

3. Example format (sirf reference ke liye):
   - [2026-02-07 08:14:32 IST]
     - File: src/main.py
     - Lines changed: +24 / -6
     - Change type: Logic optimization
     - Description: Input validation improve ki gayi, edge cases handle kiye gaye

4. Agar tumhe exact past detail ya reasoning yaad nahi hai:
   - Tum **git commit history** ke basis par inference kar sakte ho
   - Commit messages, file diffs aur timestamps ka use karke update likh sakte ho

5. Tumhe pura project read karna hai:
   - Current project structure
   - Sabhi relevant files
   - Previous commits ka context samajhna hai

6. Agar possible ho to:
   - Pichhle commits mein jo files change hui hain unko bhi read karo
   - Samjho ki last time kya change hua tha aur kyon hua tha

7. Tum koi bhi assumption bina mention kiye mat karo.
   - Agar kisi jagah estimated / inferred data use ho raha hai to clearly likho:
     "Inferred from git history" ya "Estimated based on commit message"

8. Tum koi unnecessary explanation nahi doge.
   - Sirf project-relevant, traceable aur technical information hi likhoge.

FINAL GOAL:
- `report.md` ek complete change-log ban jaye
- Jisse koi bhi future mein dekh kar samajh sake:
  - Kab kya change hua
  - Kis file mein hua
  - Project time ke saath kaise evolve hua
