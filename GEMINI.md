PROJECT WORKING PROMPT (UPDATED)

Tumhe project par kaam apne default tarike se hi karna hai.
Tum apna behaviour, working style, reasoning ya output format change nahi karoge.

────────────────────────────────
TIME & DATE RULE (STRICT)
────────────────────────────────
- Agar current time ya current date chahiye:
  - `time.js` Node.js script ko run karna mandatory hai
  - System time, guess ya assumption allowed nahi hai
  - Jo output `time.js` se milega wahi authoritative time/date hoga
- Report, logs ya descriptions mein use hone wala timestamp
  - Sirf `time.js` ke output par based hoga

────────────────────────────────
GIT COMMIT RULE (MANDATORY)
────────────────────────────────
- Har ek change ke baad git commit compulsory hai
- Koi bhi change (code, config, docs, logic):
  - Commit ke bina next kaam start nahi hoga
- Commit message:
  - Clear, technical aur change-relevant hona chahiye
  - Commit history se change ka purpose samajh aana chahiye

────────────────────────────────
REPORT.MD UPDATE RULE (STRICT)
────────────────────────────────
- Har single change ke baad `report.md` update karna mandatory hai

Har entry mein yeh details compulsory hongi:
- Exact date & time (ISO format preferred)
- Kaun-si file(s) mein change hua
- Lines added / modified / removed
- Change ka reason (kyon)
- Short technical summary (kya aur kaise)

Reference format:
- [2026-02-07 08:14:32 IST]
  - File: src/main.py
  - Lines changed: +24 / -6
  - Change type: Logic optimization
  - Description: Input validation improve ki gayi, edge cases handle kiye gaye

────────────────────────────────
HISTORY & INFERENCE RULE
────────────────────────────────
- Agar exact past detail ya reasoning available nahi ho:
  - Git commit history ke basis par inference allowed hai
  - Sources:
    - Commit messages
    - File diffs
    - Commit timestamps
- Jahan inference/estimate ho:
  - Clearly mention karo:
    - "Inferred from git history"
    - "Estimated based on commit message"

────────────────────────────────
PROJECT UNDERSTANDING RULE
────────────────────────────────
- Kaam shuru karne se pehle:
  - Complete project structure read karo
  - Relevant files samjho
  - Previous commits ka context samjho
- Agar possible ho:
  - Pichhle commits mein jo files change hui hain unko bhi read karo
  - Samjho last change kya tha aur kyon tha

────────────────────────────────
ASSUMPTION & NOISE CONTROL
────────────────────────────────
- Koi bhi assumption bina mention kiye mat karo
- Unnecessary explanation ya extra commentary mat likho
- Sirf technical, traceable aur project-relevant info hi allowed hai

────────────────────────────────
FINAL GOAL
────────────────────────────────
`report.md` ek complete aur reliable change-log banna chahiye
jisse future mein clearly samajh aaye:
- Kab kya change hua
- Kis file mein hua
- Kyon hua
- Project time ke sath kaise evolve hua
Important note:
    * Suno Dhyan se suno Dhyan se time dalne se pahle tumko time pata karna hoga aur time pata karne ke liye tumko time.js ek script hai usko run karna hai jo aaj ka date aaj ka time pura Bata de international standard time mein 
