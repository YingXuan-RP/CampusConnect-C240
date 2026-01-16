# 🚀 WellBeing Hub — Quick Start Guide

## ✅ What's Been Created

Your website has been completely redesigned from academic focus to **emotional wellness support**:

- ✅ **index.html** — Main hub with all wellness features
- ✅ **about.html** — Mission, values, and feature explanations
- ✅ **resources.html** — Crisis support and professional resources
- ✅ **css/styles.css** — Calming, cheerful design with dark mode
- ✅ **js/app.js** — All interactive features (mood tracking, journal, encouragement wall, etc.)

---

## 🎯 Key Features Implemented

1. **💬 AI Chatbot** — Flowise integration for 24/7 emotional support
2. **✨ Daily Positivity Prompts** — 15 mindfulness prompts
3. **💭 Mood Tracking** — Check-in with visual responses
4. **📔 Gratitude Journal** — Save reflections, build gratitude habit
5. **🌈 Encouragement Wall** — Anonymous peer support messages
6. **🎮 Mood Booster Activities** — 6 quick relief techniques
7. **💡 Wellness Tips** — 12 rotating self-care tips
8. **🔥 Streak Tracker** — Celebrate daily visits
9. **📊 Wellness Stats** — Track progress visually
10. **🆘 Crisis Support** — Links to 988, crisis text, campus counseling

---

## 🔧 One-Time Setup (Required)

### Step 1: Update Flowise Chatbot ID

Your chatbot won't work until you add your Flowise flow ID.

**In three files** (index.html, about.html, resources.html), find this line:

```javascript
chatflowId: "a7d8418d-c0f1-4750-a927-2e7107d173a3",  // REPLACE THIS
```

**Replace with your actual ID:**
1. Go to https://cloud.flowiseai.com
2. Create or select a chatflow
3. Copy the Chatflow ID
4. Replace the placeholder in all 3 files

### Step 2: Test Everything

Open index.html in your browser and test:
- [ ] Chat button appears in bottom-right
- [ ] Click chat → panel opens
- [ ] Type message → chatbot responds (after you update chatflowId)
- [ ] Click "How are you feeling?" → mood buttons work
- [ ] Write encouragement → message appears on wall
- [ ] Write gratitude → reflection saves
- [ ] Click wellness tips → new tip displays
- [ ] Dark mode toggle works

---

## 💚 What Each Feature Does

### 🌟 Homepage Features

| Feature | What It Does | Why It Matters |
|---------|-------------|----------------|
| **Daily Prompt** | New reflection question each visit | Builds mindfulness habit |
| **Mood Check-in** | 5-button mood selector | Increases emotional awareness |
| **Encouragement Wall** | Post/read anonymous messages | Reduces isolation, builds community |
| **Gratitude Journal** | Save reflections | Trains brain to notice positives |
| **Mood Boosters** | 6 quick coping activities | Immediate stress relief |
| **Wellness Tips** | Random self-care suggestions | Easy-to-remember guidance |
| **Crisis Resources** | Hotline numbers prominently displayed | Clear pathway to professional help |
| **Streak Counter** | Shows consecutive visit days | Motivates consistent self-care |

---

## 🎨 Design Highlights

- **Calming colors:** Warm teal, peach, lavender (reduces anxiety)
- **Dark mode:** Included and toggles smoothly
- **Mobile responsive:** Works on phone, tablet, desktop
- **Accessible:** Keyboard navigation, ARIA labels, high contrast
- **Privacy-first:** All data stored locally (no tracking)
- **No backend needed:** Static HTML/CSS/JS—deploy anywhere

---

## 📱 Mobile Experience

The site looks great on phones with:
- Stacked layout (no side-by-side columns)
- Touch-friendly buttons
- Readable text sizes
- Full-screen chat on mobile

---

## 🔐 Data Storage (How It Works)

All student data stays on **their device** only:

```
Mood checks → stored locally
Gratitude entries → stored locally
Encouragement messages → stored locally
Preferences (dark mode) → stored locally
Visit history → stored locally
```

**Nothing leaves the browser. No server. No tracking. No database.**

---

## 🚀 Deployment Options

Choose one:

### Option 1: GitHub Pages (Free)
1. Push to GitHub
2. Enable GitHub Pages in settings
3. Site goes live at `your-username.github.io/c240-project-website`

### Option 2: Netlify (Free)
1. Connect GitHub repo
2. Deploy automatically on every push
3. Custom domain support

### Option 3: Your School's Server
1. Upload files to school server
2. Share link with students

---

## 📊 How to Monitor Engagement

Check the site's localStorage to see what students are doing:

In browser DevTools (F12) → Application → Local Storage:
- **wellbeing:mood** — Last mood selected
- **wellbeing:moodData** — All mood check-ins
- **wellbeing:gratitude** — All journal entries
- **wellbeing:encouragements** — All wall messages
- **wellbeing:visits** — Dates student visited

---

## 💬 Flowise Chatbot Tips

### Best Practices:
- Train it for **emotional support**, not homework help
- Include empathy and validation in responses
- Suggest coping strategies and crisis resources
- Keep responses concise and warm
- Test thoroughly before students use it

### Example Training:
```
If student says: "I can't handle this"
Bot should say: "I hear you. That sounds overwhelming. 
What's one small thing we can tackle first?"
```

---

## 🎓 What to Tell Students

> "WellBeing Hub is your safe space for emotional support, 24/7. Talk to our AI counselor, see encouragement from peers, track your mood, and practice wellness habits. Everything is anonymous and stays private on your device."

---

## ⚠️ Important Reminders

- **This is not therapy.** It complements professional help.
- **Crisis resources must be accessible.** They're on every page.
- **Students need to know they can talk to counselors.** Encourage campus mental health center referrals.
- **Update your school's crisis phone number.** In resources.html, add campus counseling contact.

---

## 🔍 Customization (Optional)

You can easily customize:

### In `js/app.js`:
- **POSITIVITY_PROMPTS** — Change daily prompts (line 7)
- **MOOD_RESPONSES** — Change mood messages (line 24)
- **MOOD_BOOSTERS** — Change activity suggestions (line 50)
- **WELLNESS_TIPS** — Change tip suggestions (line 36)

### In `resources.html`:
- Add your campus counseling number
- Add campus mental health center link
- Add specific crisis support for your region

### Colors (in `css/styles.css`):
- Change `--primary`, `--secondary`, `--accent` variables
- Update entire theme instantly

---

## 🆘 If Something Breaks

**Chat not working?**
- Check Flowise chatflowId is updated in all 3 HTML files
- Check internet connection
- Test Flowise dashboard: is chatflow active?

**Form not saving?**
- Check browser's localStorage is enabled
- Try clearing cache and reload
- Check browser console (F12) for errors

**Styling looks weird?**
- Clear browser cache
- Check CSS file loaded (check Network tab)
- Try different browser

---

## 📞 Support Resources for You

- **Flowise Docs:** https://docs.flowiseai.com/
- **MDN Web Docs:** For JavaScript questions
- **Chrome DevTools:** Use for debugging (F12)

---

## ✨ You're Ready!

**Checklist before launch:**
- [ ] Flowise chatflowId configured
- [ ] Tested all features in browser
- [ ] Updated campus crisis resources
- [ ] Shared link with students
- [ ] Added to your school's resource list

---

## 💚 Final Thoughts

You're creating a space where students feel less alone and supported. That's powerful. 

The features work together to:
1. **Meet them where they are** (mood tracking, chatbot)
2. **Give them tools** (mood boosters, gratitude, tips)
3. **Build community** (encouragement wall, peer support)
4. **Clear escalation path** (crisis resources always visible)

Your students are lucky to have this. 🌟

---

**Questions?** See WELLNESS_GUIDE.md for detailed feature explanations.
