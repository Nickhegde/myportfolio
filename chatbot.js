const fab = document.getElementById('nh-chat-fab');
const panel = document.getElementById('nh-chat-panel');
const input = document.getElementById('nh-input');

fab.addEventListener('click', () => {
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) input.focus();
});
document.getElementById('nh-close-btn').addEventListener('click', () => {
  panel.classList.remove('open');
});
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

// ─── Conversation history ─────────────────────────────────
const conversationHistory = [];

// ─── Nikhil's Profile (system prompt) ────────────────────
const SYSTEM_PROMPT = `You are a friendly, concise AI assistant embedded in Nikhil Hegde's portfolio website. 
Answer questions about Nikhil based ONLY on the information below. If something isn't covered, say you don't have that info but suggest the visitor contact Nikhil directly.

Keep answers conversational, warm, and 2-4 sentences max unless a detailed list is clearly needed.
Never make up information. Always stay on-topic about Nikhil.

=== NIKHIL HEGDE — PROFILE ===

PERSONAL
- Full name: Nikhil Hegde
- Location: Dallas, TX (willing to relocate)
- Email: nikhilhegde81@gmail.com
- Phone: 512-992-6442
- LinkedIn: linkedin.com/in/hegde-nikhil
- Visa/Status: On F-1 student visa (OPT eligible upon graduation in May 2026); authorized to work in the US

EDUCATION
- M.S. Computer Software Engineering — University of Texas at Dallas (Aug 2024 – May 2026)
  Courses: Data Structures & Algorithms, Advanced Software Architecture, OOP, Advanced Requirements Engineering, Software Testing & Validation, Web Programming Languages
- B.S. Electronics & Communications — NMAM Institute of Technology (2014–2018)
  Courses: Java Programming, Introduction to C++

OPEN TO ROLES
- Software Engineer, Front-end Developer, Full Stack Developer, Solutions Engineer, Data Engineer

PROFESSIONAL EXPERIENCE (5+ years total)

1. CS Outreach Lead | University of Texas at Dallas (Oct 2024 – Present)
   - Java Spring Boot web app for scheduling, managing mentor-led classes, student registrations & attendance
   - RESTful APIs for new features; Spring Java Mail for automated email reminders
   - Version control, UI enhancements, system stability

2. Senior Solutions Engineer | Whatfix (Mar 2024 – Jul 2024, Bengaluru, India)
   - Implemented Digital Adoption Platform (DAP) for 10+ enterprise clients
   - 60% uplift in product utilization for clients like Berger Levrault and Bbraun
   - Custom JavaScript solutions, event tracking, usability testing
   - Reduced implementation cycles by 35%

3. Solutions Engineer | InMobi (Jan 2022 – Nov 2023, Bengaluru, India)
   - Automated campaign performance dashboards using MERN stack + Azure APIs; 70% reduction in data retrieval time
   - PySpark + Azure Notebooks for data engineering
   - StoreKit ad network integration for iOS (Apple privacy standards)
   - 40% decrease in campaign metrics turnaround time

4. Senior Web Developer | InMobi (Jul 2021 – Jan 2022, Bengaluru, India)
   - 100+ interactive rich media ad units using Celtra, HTML, CSS, JavaScript
   - 20% boost in ad delivery rate through Celtra customizations
   - React-based internal gallery platform for client presentations
   - Mentored junior engineers

5. Software Engineer | Y Media Labs (Aug 2018 – Jul 2021, Bengaluru, India)
   - Led front-end for State Farm's 100forGood website (React JS, Redux): 30% performance gain, 40% accessibility improvement
   - Fixed 20+ high-priority issues in Hill-Rom CMS
   - Built AR-based e-commerce proof of concept (AR.js)
   - Two "YML Quarterly Awards" for leadership and mentoring

SKILLS & TECHNOLOGIES
Languages: JavaScript, TypeScript, Python, Java, HTML5, CSS3
Frameworks/Libraries: React JS, Next.js, Node.js, Redux, Spring Boot, Twig
Data/Cloud: PySpark, Databricks, Azure, MongoDB, MySQL, Docker
Ad Tech Tools: Celtra (rich media ad creation platform), InMobi DSP, StoreKit ad networks
Other: Git, REST APIs, Accessibility (WCAG 2.1), AR.js, Firebase

AD TECH KNOWLEDGE
Nikhil has deep hands-on ad tech experience from 2.5+ years at InMobi:
- DSP (Demand Side Platform): built automated reporting dashboards for InMobi's DSP
- Rich Media Ads: created 100+ interactive ad units using Celtra; understands MRAID, HTML5 ads, creative optimization
- Campaign Analytics: built real-time data pipelines and dashboards for campaign KPIs (CTR, impressions, delivery rate)
- iOS Ad Networks: integrated StoreKit ad network campaigns, Apple SKAdNetwork, privacy-preserving attribution
- Ad Delivery & Performance: deep understanding of ad serving, impression tracking, delivery optimization (boosted delivery rate 20%)
- Programmatic Advertising: familiar with DSP/SSP ecosystem, campaign management, targeting, and reporting

PROJECTS
1. CSMC (csmc.utdallas.edu) — Java, Spring Boot, Twig | Full-stack scheduling app for UTD
2. 100forGood (State Farm) — React JS, Node JS, PWA, Accessibility | Award-winning CSR web app
3. InMobi DSP Dashboard — React, Node, MongoDB, PySpark, Azure APIs | Automated reporting dashboard
4. AR Shopping World (arshoppingworld.netlify.app) — React JS, AR.js, Firebase | AR e-commerce experience
5. React Accessible Calendar (npm) — React, JS, WCAG 2.1 | Open-source accessible calendar component

AVAILABILITY & JOB SEARCH
- Actively looking for full-time roles
- Open to: Software Engineer, Front-end, Full Stack, Solutions Engineer, Data Engineer
- Graduating May 2026, available for full-time immediately after (or potentially sooner with part-time/co-op)
- Willing to relocate
`;

// ─── Send message ─────────────────────────────────────────
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  document.getElementById('nh-suggestions').style.display = 'none';
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  setTyping(true);
  document.getElementById('nh-send-btn').disabled = true;

  try {
    const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        system: SYSTEM_PROMPT,
        messages: conversationHistory
    })
    });

    const data = await response.json();
    const reply = data.reply || "Sorry, I couldn't get a response right now.";

    conversationHistory.push({ role: 'assistant', content: reply });
    setTyping(false);
    appendMessage('bot', reply);
  } catch (err) {
    setTyping(false);
    appendMessage('bot', "Oops, something went wrong. Please try again in a moment!");
    conversationHistory.pop();
  }

  document.getElementById('nh-send-btn').disabled = false;
}

function askSuggestion(btn) {
  input.value = btn.textContent;
  sendMessage();
}

// ─── Helpers ──────────────────────────────────────────────
function appendMessage(role, text) {
  const messages = document.getElementById('nh-messages');
  const div = document.createElement('div');
  div.className = `nh-msg ${role}`;
  div.innerHTML = `
    <div class="nh-msg-icon">${role === 'bot' ? '🤖' : '🧑'}</div>
    <div class="nh-bubble">${escapeHtml(text).replace(/\n/g, '<br>')}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function setTyping(show) {
  const t = document.getElementById('nh-typing');
  t.classList.toggle('visible', show);
  if (show) {
    const messages = document.getElementById('nh-messages');
    messages.scrollTop = messages.scrollHeight;
  }
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}