# Spring Boot + gRPC demo

This project is a minimal Spring Boot application with a gRPC service.

Quickstart

1. Build:

```powershell
mvn clean package -DskipTests
```

2. Run the app:

```powershell
java -jar target/spring-grpc-demo-0.0.1-SNAPSHOT.jar
```

The gRPC server will listen on port 9090 by default (see `src/main/resources/application.properties`).

The proto file is at `src/main/proto/helloworld.proto`.



---

---

## 🎓 Enhanced Quiz Application (v2.0)

### ⚠️ Getting "Cannot load topic file : TypeError"?
**READ:** `QUICK_START.txt` for immediate fix!

### ✨ NEW FEATURES (v2.0)

✅ **Admin Page** - Configure settings before starting
- 🎨 **6 Beautiful Themes** - Default, Ocean, Sunset, Forest, Candy, Midnight
- 🎯 **2 Question Modes** - Random or Serial (by range: 1-10, 11-20, ..., 91-100)
- 📊 **Topic Selection** - Choose from 5 topics

✅ **Enhanced Quiz Page**
- ⏱️ **Real-time Timer** - See elapsed time (MM:SS format)
- 📝 **Topic Display** - Shows selected topic at top
- 🔤 **Larger Fonts** - 25% increase for better readability
- 📋 **Progress Indicator** - Question X / Total

✅ **Detailed Results**
- 📊 **Score Display** - Shows X/Total with percentage
- ✅ **Answer Review** - Full question-by-question review
  - 🟢 **GREEN** = Correct answers
  - 🔴 **RED** = Wrong answers (with correct answer shown)
- 🎉 **Confetti Animation** - Celebratory effects
- 🔄 **Easy Restart** - Try another quiz immediately

### 🚀 QUICK START

**Option 1: Easiest (Batch File)**
1. Double-click `START_SERVER.bat`
2. `http://localhost:8000` opens automatically

**Option 2: Manual (PowerShell)**
```powershell
cd C:\Users\sudha\IdeaProjects\TestProject
python -m http.server 8000
# then open http://localhost:8000
```

### ⚠️ IMPORTANT RULES

❌ **DO NOT** open quiz.html directly
- File:// protocol is blocked by browser security
- Result: "Cannot load topic file : TypeError"

✅ **ALWAYS** use local server
- Python: `python -m http.server 8000`
- Node.js: `npx http-server -p 8000`
- PHP: `php -S localhost:8000`

### 📁 PROJECT STRUCTURE

```
data/
  ├── chemistry.txt
  ├── science.txt
  ├── astronomy.txt
  ├── mahabharata.txt
  └── social.txt
quiz.html (main app)
quiz.js (logic with all features)
styles.css (6 beautiful themes)
test-fetch.html (diagnostic tool)
QUICK_START.txt (setup guide)
SETUP.md (detailed help)
START_SERVER.bat (auto-start script)
START_SERVER.ps1 (PowerShell version)
```

### 🔧 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| TypeError on load | Read **QUICK_START.txt** |
| Files not loading | Use **test-fetch.html** diagnostic |
| Python not found | See **SETUP.md** for alternatives |
| Need help | Read **ERROR_FIX_SUMMARY.md** |

### 📊 Data File Format

Each quiz data file follows CSV format:
```
sequenceno, question, option_a, option_b, option_c, option_d, correct_answer
```

Example:
```
1, What is 2+2?, 3, 4, 5, 6, b
2, What is the capital of India?, Mumbai, New Delhi, Kolkata, Chennai, b
```

### 🆘 Still Getting Error?

1. ✅ Read `QUICK_START.txt` (3-step fix)
2. ✅ Use diagnostic: `http://localhost:8000/test-fetch.html`
3. ✅ Check browser console (F12)
4. ✅ Verify server running: `Serving HTTP on 0.0.0.0 port 8000`

---

**Version:** 2.0 with Admin Page, Themes, Timers, Answer Review
**Last Updated:** June 12, 2026
**Status:** ✅ All features implemented and error-handled

