/* ========================================
   WellBeing Hub - Wellness-First JavaScript
   ======================================== */

/* ========================================
   Data: Positivity Prompts
   ======================================== */

const POSITIVITY_PROMPTS = [
    "What's one small thing you're grateful for today?",
    "What did you do recently that made you proud?",
    "How can you practice self-compassion today?",
    "Who in your life inspires you and why?",
    "What's a challenge you overcame recently?",
    "What small act of kindness can you do today?",
    "What makes you feel safe and supported?",
    "How are you taking care of yourself this week?",
    "What brought you joy recently?",
    "What's something you learned about yourself?",
    "How can you be kind to yourself today?",
    "What do you want to feel more of this week?",
    "What's a strength you've shown recently?",
    "Who or what makes you feel less alone?",
    "What does wellness look like to you?"
];

/* ========================================
   Data: Mood Responses
   ======================================== */

const MOOD_RESPONSES = {
    joyful: {
        message: "That's wonderful! 🌟 Keep riding that positive wave. Share what brought you joy!",
        color: "#48bb78"
    },
    calm: {
        message: "Beautiful place to be. 💙 Notice this feeling and come back to it whenever you need.",
        color: "#6aa7a1"
    },
    okay: {
        message: "That's honest. Sometimes okay is exactly where we need to be. 🤝",
        color: "#f4d77e"
    },
    stressed: {
        message: "I see you. Take a breath—you're going to get through this. 💪 Try a mood booster activity below.",
        color: "#ed8936"
    },
    struggling: {
        message: "I'm so glad you're here. You're not alone. 💙 Please talk to someone or check our crisis resources.",
        color: "#f56565"
    }
};

/* ========================================
   Data: Wellness Tips
   ======================================== */

const WELLNESS_TIPS = [
    "Take 5 deep breaths: Breathe in for 4, hold for 4, out for 4. It calms your nervous system.",
    "Move your body: A 10-minute walk can boost your mood and clear your mind.",
    "Drink water: Dehydration affects mood. Stay hydrated to stay resilient.",
    "Practice one small act of kindness: Help someone today—it boosts your happiness too.",
    "Unplug for 15 minutes: Step away from screens and be present.",
    "Stretch gently: Release tension from your shoulders, neck, and back.",
    "Listen to music you love: Music has real power to shift your emotional state.",
    "Write down one thing you did well today: Celebrate small wins.",
    "Connect with someone: A text, call, or chat can remind you that you're supported.",
    "Go outside for 5 minutes: Fresh air and sunlight improve mood.",
    "Practice gratitude: Name three things you're grateful for, even tiny things.",
    "Be kind to yourself: Talk to yourself like you'd talk to a good friend."
];

/* ========================================
   Data: Mood Booster Activities
   ======================================== */

const MOOD_BOOSTERS = [
    { name: "Breathing", emoji: "🌬️", hint: "4-7-8 Breathing: Inhale 4, hold 7, exhale 8. Repeat 4 times." },
    { name: "Stretch", emoji: "🧘", hint: "Stand up and gently stretch your arms, neck, and back for 1 minute." },
    { name: "Dance", emoji: "💃", hint: "Play your favorite song and dance freely for 2 minutes. No judgment!" },
    { name: "Gratitude", emoji: "🙏", hint: "Name 3 things you're grateful for, big or small." },
    { name: "Movement", emoji: "🚶", hint: "Take a 5-minute walk. Feel your feet on the ground." },
    { name: "Water", emoji: "💧", hint: "Drink a glass of water and notice how you feel." }
];

/* ========================================
   Initialization
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initializeUI();
    updateAllStats();
    trackVisit();
    setupEventListeners();
    populateActivities();
    displayNextPrompt(false);
    displayNextTip(false);
    renderEncouragementWall();
    renderGratitudeHistory();
});

/* ========================================
   Theme Management
   ======================================== */

function saveTheme(theme) {
    localStorage.setItem('wellbeing:theme', theme);
    applyTheme(theme);
}

function loadTheme() {
    const theme = localStorage.getItem('wellbeing:theme') || 'light';
    applyTheme(theme);
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', isDark.toString());
        toggle.textContent = isDark ? '☀️' : '🌙';
    }
}

/* ========================================
   Positivity Prompts
   ======================================== */

let currentPromptIndex = 0;

function displayNextPrompt(showToast = true) {
    currentPromptIndex = (currentPromptIndex + 1) % POSITIVITY_PROMPTS.length;
    const promptEl = document.getElementById('dailyPrompt');
    if (promptEl) {
        promptEl.textContent = POSITIVITY_PROMPTS[currentPromptIndex];
        if (showToast) {
            showNotification('✨ New prompt to reflect on!');
        }
    }
}

/* ========================================
   Mood Check-in
   ======================================== */

function getMood() {
    return localStorage.getItem('wellbeing:mood') || null;
}

function saveMood(mood) {
    localStorage.setItem('wellbeing:mood', mood);
    saveMoodData(mood);
    updateAllStats();
    trackAchievement('mood_checked');
}

function saveMoodData(mood) {
    const today = new Date().toISOString().split('T')[0];
    let moodData = JSON.parse(localStorage.getItem('wellbeing:moodData') || '{}');
    moodData[today] = mood;
    localStorage.setItem('wellbeing:moodData', JSON.stringify(moodData));
}

function setupMoodButtons() {
    const moodOptions = document.getElementById('moodOptions');
    if (!moodOptions) return;

    const buttons = moodOptions.querySelectorAll('.mood');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');

            const mood = btn.dataset.mood;
            saveMood(mood);

            const response = MOOD_RESPONSES[mood];
            const responseEl = document.getElementById('moodResponse');
            if (responseEl) {
                responseEl.textContent = response.message;
                responseEl.style.borderColor = response.color;
                showNotification(`Mood saved: ${mood} 💭`);
            }
        });
    });

    // Restore current mood
    const currentMood = getMood();
    if (currentMood) {
        const btn = moodOptions.querySelector(`[data-mood="${currentMood}"]`);
        if (btn) {
            btn.setAttribute('aria-pressed', 'true');
            const response = MOOD_RESPONSES[currentMood];
            const responseEl = document.getElementById('moodResponse');
            if (responseEl) {
                responseEl.textContent = response.message;
            }
        }
    }
}

/* ========================================
   Mood Booster Activities
   ======================================== */

function populateActivities() {
    const grid = document.getElementById('activitiesGrid');
    if (!grid) return;

    grid.innerHTML = MOOD_BOOSTERS.map(activity => `
        <div class="activity-item" data-hint="${activity.hint}">
            <div class="activity-emoji">${activity.emoji}</div>
            <div class="activity-name">${activity.name}</div>
        </div>
    `).join('');

    grid.querySelectorAll('.activity-item').forEach(item => {
        item.addEventListener('click', () => {
            const hint = item.dataset.hint;
            showNotification(`${item.querySelector('.activity-emoji').textContent} ${hint}`);
            trackAchievement('activity_completed');
        });
    });
}

/* ========================================
   Encouragement Wall
   ======================================== */

function getEncouragements() {
    return JSON.parse(localStorage.getItem('wellbeing:encouragements') || '[]');
}

function saveEncouragements(encouragements) {
    localStorage.setItem('wellbeing:encouragements', JSON.stringify(encouragements));
}

function submitEncouragement() {
    const input = document.getElementById('encouragementInput');
    if (!input) return;

    const message = input.value.trim();
    if (!message) {
        showNotification('💭 Please share a message!', { type: 'warning' });
        return;
    }

    const encouragements = getEncouragements();
    encouragements.unshift({
        message: message,
        date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    });

    saveEncouragements(encouragements);
    input.value = '';
    document.getElementById('charCount').textContent = '0';
    renderEncouragementWall();
    showNotification('💌 Your message sent! Thank you for spreading positivity!');
    trackAchievement('encouragement_shared');
}

function renderEncouragementWall() {
    const wall = document.getElementById('encouragementWall');
    if (!wall) return;

    const encouragements = getEncouragements();

    if (encouragements.length === 0) {
        wall.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: var(--spacing-lg);">Be the first to share encouragement! 💌</p>';
        return;
    }

    wall.innerHTML = encouragements.slice(0, 12).map(enc => `
        <div class="encouragement-message">
            <p>${escapeHtml(enc.message)}</p>
            <div class="message-date">${enc.date}</div>
        </div>
    `).join('');
}

function setupEncouragementForm() {
    const input = document.getElementById('encouragementInput');
    const counter = document.getElementById('charCount');
    const btn = document.getElementById('submitEncouragement');

    if (input) {
        input.addEventListener('input', () => {
            counter.textContent = input.value.length;
        });
    }

    if (btn) {
        btn.addEventListener('click', submitEncouragement);
        input.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') submitEncouragement();
        });
    }
}

/* ========================================
   Gratitude Journal
   ======================================== */

function getGratitudeEntries() {
    return JSON.parse(localStorage.getItem('wellbeing:gratitude') || '[]');
}

function saveGratitudeEntries(entries) {
    localStorage.setItem('wellbeing:gratitude', JSON.stringify(entries));
}

function submitGratitude() {
    const input = document.getElementById('gratitudeInput');
    if (!input) return;

    const text = input.value.trim();
    if (!text) {
        showNotification('📔 Please write a reflection!', { type: 'warning' });
        return;
    }

    const entries = getGratitudeEntries();
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    entries.unshift({
        date: today,
        text: text
    });

    saveGratitudeEntries(entries);
    input.value = '';
    document.getElementById('gratCount').textContent = '0';
    renderGratitudeHistory();
    showNotification('💝 Gratitude saved! Remember this moment.');
    trackAchievement('gratitude_written');
}

function renderGratitudeHistory() {
    const list = document.getElementById('gratitudeList');
    if (!list) return;

    const entries = getGratitudeEntries();

    if (entries.length === 0) {
        list.innerHTML = '<p style="color: var(--text-light); font-style: italic;">Start your journey with your first reflection. 💝</p>';
        return;
    }

    list.innerHTML = entries.slice(0, 5).map((entry, idx) => `
        <div class="gratitude-entry">
            <div class="entry-date">${entry.date}</div>
            <div class="entry-text">${escapeHtml(entry.text)}</div>
            <button class="delete-entry" data-index="${idx}">Delete</button>
        </div>
    `).join('');

    list.querySelectorAll('.delete-entry').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            entries.splice(idx, 1);
            saveGratitudeEntries(entries);
            renderGratitudeHistory();
            showNotification('Entry removed.');
        });
    });
}

function setupGratitudeForm() {
    const input = document.getElementById('gratitudeInput');
    const counter = document.getElementById('gratCount');
    const btn = document.getElementById('submitGratitude');

    if (input) {
        input.addEventListener('input', () => {
            counter.textContent = input.value.length;
        });
    }

    if (btn) {
        btn.addEventListener('click', submitGratitude);
        input.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') submitGratitude();
        });
    }
}

/* ========================================
   Wellness Stats
   ======================================== */

function updateAllStats() {
    updateMoodCheckCount();
    updateGratitudeCount();
    updateEncouragementCount();
    updateStreak();
}

function updateMoodCheckCount() {
    const moodData = JSON.parse(localStorage.getItem('wellbeing:moodData') || '{}');
    const count = Object.keys(moodData).length;
    const el = document.getElementById('statMoodChecks');
    if (el) el.textContent = count;
}

function updateGratitudeCount() {
    const entries = getGratitudeEntries();
    const el = document.getElementById('statGratitude');
    if (el) el.textContent = entries.length;
}

function updateEncouragementCount() {
    const encouragements = getEncouragements();
    const el = document.getElementById('statEncouragement');
    if (el) el.textContent = encouragements.length;
}

function updateStreak() {
    const visits = JSON.parse(localStorage.getItem('wellbeing:visits') || '[]');
    let streak = 0;

    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];

        if (visits.includes(dateStr)) {
            streak++;
        } else if (i > 0) {
            break;
        }
    }

    const el = document.getElementById('streakCount');
    if (el) el.textContent = streak;
}

/* ========================================
   Wellness Tips
   ======================================== */

let currentTipIndex = 0;

function displayNextTip(showToast = true) {
    currentTipIndex = (currentTipIndex + 1) % WELLNESS_TIPS.length;
    const tipEl = document.getElementById('wellnessTip');
    if (tipEl) {
        tipEl.textContent = WELLNESS_TIPS[currentTipIndex];
        if (showToast) {
            showNotification('💡 New wellness tip!');
        }
    }
}

/* ========================================
   Visit Tracking
   ======================================== */

function trackVisit() {
    const today = new Date().toISOString().split('T')[0];
    const visits = JSON.parse(localStorage.getItem('wellbeing:visits') || '[]');

    if (!visits.includes(today)) {
        visits.push(today);
        localStorage.setItem('wellbeing:visits', JSON.stringify(visits));
        trackAchievement('visited');
    }

    updateStreak();
}

/* ========================================
   Achievement Tracking
   ======================================== */

const ACHIEVEMENTS = {
    mood_checked: 'Check in with your mood',
    gratitude_written: 'Write a gratitude entry',
    encouragement_shared: 'Share encouragement',
    activity_completed: 'Try a mood booster',
    visited: 'Visit the hub'
};

function trackAchievement(type) {
    const achievements = JSON.parse(localStorage.getItem('wellbeing:achievements') || '{}');

    if (!achievements[type]) {
        achievements[type] = true;
        localStorage.setItem('wellbeing:achievements', JSON.stringify(achievements));

        const name = ACHIEVEMENTS[type];
        showNotification(`🎉 Achievement Unlocked: ${name}!`, { duration: 3000 });
    }
}

/* ========================================
   Flowise API Integration
   ======================================== */

// Flowise chatbot API endpoint
const FLOWISE_API_URL = "https://cloud.flowiseai.com/api/v1/prediction/e4723add-ad6f-4995-aca3-bfa8af411463";

/**
 * Query Flowise chatbot API
 * @param {string} question - The user's message
 * @returns {Promise<Object>} - API response with bot answer
 */
async function queryFlowise(question) {
    try {
        const response = await fetch(FLOWISE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Flowise API error:', error);
        return {
            text: "I'm here to support you. If the connection is having trouble, please try again or reach out to campus counseling.",
            error: true
        };
    }
}

/* ========================================
   Chatbot Integration
   ======================================== */

function setupChatbot() {
    const openBtn = document.getElementById('openChatBtn');
    const toggle = document.getElementById('chatToggle');
    const closeBtn = document.getElementById('chatClose');
    const sendBtn = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');
    const panel = document.getElementById('chatPanel');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            if (panel) {
                panel.removeAttribute('hidden');
                toggle.setAttribute('aria-expanded', 'true');
                if (input) input.focus();
            }
        });
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isHidden = panel.hasAttribute('hidden');
            if (isHidden) {
                panel.removeAttribute('hidden');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                panel.setAttribute('hidden', '');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.setAttribute('hidden', '');
            toggle.setAttribute('aria-expanded', 'false');
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    trackAchievement('visited');
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');

    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    input.value = '';

    // Show thinking indicator
    addChatMessage('Thinking...', 'bot');

    try {
        // Query Flowise API
        const result = await queryFlowise(message);

        // Extract bot message from response
        const botMessage = result.text || result.message || result.answer || "I'm here to support you. Please try again.";

        // Remove thinking indicator
        const lastMsg = messages.lastChild;
        if (lastMsg && lastMsg.textContent.includes('Thinking')) {
            lastMsg.remove();
        }

        // Add bot response
        addChatMessage(botMessage, 'bot');

        // Track chatbot usage
        trackAchievement('visited');
    } catch (error) {
        console.error('Chat error:', error);
        const lastMsg = messages.lastChild;
        if (lastMsg) lastMsg.remove();
        addChatMessage("I'm here to support you. Please try again.", 'bot');
    }

    messages.scrollTop = messages.scrollHeight;
}

function addChatMessage(text, sender) {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;

    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    messageEl.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
    messagesEl.appendChild(messageEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

/* ========================================
   Utilities
   ======================================== */

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, options = {}) {
    const type = options.type || 'success';
    const duration = options.duration || 2000;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/* ========================================
   Navigation
   ======================================== */

function setupNavigation() {
    const toggle = document.getElementById('navToggle');
    const nav = document.querySelector('.site-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isActive = nav.classList.contains('active');
            toggle.setAttribute('aria-expanded', isActive.toString());
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/* ========================================
   Event Listeners Setup
   ======================================== */

function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            saveTheme(isDark ? 'light' : 'dark');
        });
    }

    // Prompts and tips
    const nextPromptBtn = document.getElementById('nextPrompt');
    if (nextPromptBtn) {
        nextPromptBtn.addEventListener('click', () => displayNextPrompt(true));
    }

    const nextTipBtn = document.getElementById('nextTip');
    if (nextTipBtn) {
        nextTipBtn.addEventListener('click', () => displayNextTip(true));
    }

    // Forms
    setupMoodButtons();
    setupEncouragementForm();
    setupGratitudeForm();

    // Chatbot
    setupChatbot();

    // Navigation
    setupNavigation();
}

/* ========================================
   Initialize UI
   ======================================== */

function initializeUI() {
    displayNextPrompt(false);
    displayNextTip(false);
}
