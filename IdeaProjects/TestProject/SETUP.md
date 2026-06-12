# Quiz Application - Setup & Troubleshooting Guide

## 🚀 How to Run the Application

### Important: DO NOT Open via File Explorer
If you try to open `quiz.html` directly from Windows Explorer (file:// protocol), it will NOT work due to browser security restrictions.

### ✅ Correct Method - Use a Local Server

#### Option 1: Python (Recommended - Easiest)
Open PowerShell in the project directory and run:

```powershell
python -m http.server 8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

#### Option 2: Node.js
If you have Node.js installed:

```powershell
npx http-server -p 8000
```

#### Option 3: PHP
```powershell
php -S localhost:8000
```

---

## ❌ Common Error: "Cannot Load Topic File : TypeError"

### Root Causes:
1. **Not using a local server** - Opening file:// protocol
2. **Server not running** - Port 8000 not active
3. **Incorrect file paths** - Data files not in data/ folder
4. **Corrupted data files** - CSV format issues

### How to Diagnose:
1. Go to: `http://localhost:8000/test-fetch.html`
2. Click the test buttons to verify files load
3. Check your browser console (F12 → Console tab) for detailed errors

### Solution Steps:

**Step 1:** Close all browser tabs with localhost/quiz.html

**Step 2:** Open PowerShell and navigate to project:
```powershell
cd C:\Users\sudha\IdeaProjects\TestProject
```

**Step 3:** Start the server:
```powershell
python -m http.server 8000
```

You should see:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)
```

**Step 4:** Open browser to:
```
http://localhost:8000
```

**Step 5:** Try the diagnostic tool first:
```
http://localhost:8000/test-fetch.html
```

---

## 📁 Project Structure

```
TestProject/
├── quiz.html          ← Main quiz page
├── quiz.js            ← Quiz logic
├── styles.css         ← Styling
├── test-fetch.html    ← Diagnostic tool (NEW)
├── SETUP.md           ← This file (NEW)
└── data/
    ├── chemistry.txt
    ├── science.txt
    ├── astronomy.txt
    ├── mahabharata.txt
    └── social.txt
```

---

## ✨ Features & Usage

### Admin Page (First Page)
- **Select Theme**: Choose from 6 unique themes
- **Display Mode**: Random or Serial (by range) questions
- **Question Selection**: Pick topic or range

### Quiz Page
- **Timer**: Shows elapsed time
- **Topic Name**: Displays current topic
- **Large Letters**: Increased font sizes
- **Progress**: Question X / Total

### Results Page
- **Score**: Shows X/Total and percentage
- **Answer Review**: 
  - ✅ GREEN = Correct answers
  - ❌ RED = Wrong answers with correct answer shown

---

## 🐛 If You Still Get Errors

### Check Console for Details:
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Look for error messages
4. Share the exact error message

### Common Error Messages:

#### "Failed to load quiz.html"
- Server not running
- Wrong port number
- Firewall blocking

#### "No valid questions found"
- Data file is empty
- CSV format is corrupted
- Column count is wrong

#### "HTTP 404 - Not Found"
- File path is incorrect
- File doesn't exist in data/ folder
- Filename spelling is wrong

---

## 📊 Data File Format

Each data file should have lines in this format:
```
seq, question, option_a, option_b, option_c, option_d, correct_answer
```

Example:
```
1, What is H2O?, Water, Salt, Sugar, Acid, a
2, What gas do plants need?, Oxygen, Nitrogen, Carbon Dioxide, Methane, c
```

The **correct_answer** should be: `a`, `b`, `c`, or `d`

---

## 💡 Pro Tips

1. **Keep server running** - Don't close the PowerShell window
2. **Clear browser cache** - If changes don't show, press Ctrl+Shift+Delete
3. **Mobile viewing** - Use your computer's local IP: `http://192.168.x.x:8000`
4. **Multiple topics** - Add more CSV files to data/ folder with same format

---

## 🆘 Still Need Help?

1. ✅ Check this guide again
2. ✅ Use test-fetch.html diagnostic tool  
3. ✅ Check browser console (F12)
4. ✅ Verify server is running (see in PowerShell)
5. ✅ Verify file paths match exactly

Good luck! 🎓

