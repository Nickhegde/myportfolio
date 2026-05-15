const fab = document.getElementById('nh-chat-fab');
const panel = document.getElementById('nh-chat-panel');
const input = document.getElementById('nh-input');

function openChat() {
  panel.classList.add('open');
  document.getElementById('nh-chat-label').style.display = 'none';
  input.focus();
}

fab.addEventListener('click', () => {
  document.getElementById('nh-chat-label').style.display = 'none';
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    input.focus();
  } else {
    document.getElementById('nh-chat-label').style.display = 'block';
  }
});
document.getElementById('nh-close-btn').addEventListener('click', () => {
  panel.classList.remove('open');
  document.getElementById('nh-chat-label').style.display = 'block';
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
- GitHub: github.com/nikhilhegde

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

DISTRIBUTED SYSTEMS & CLOUD ARCHITECTURE
Nikhil has hands-on experience designing and operating distributed systems:

InMobi Campaign Reporting Pipeline (Production):
- Built end-to-end distributed data pipeline: Ad Server → Apache Kafka (Azure Event Hubs) → Azure Databricks (PySpark micro-batch streaming, 5-min intervals) → Azure Synapse Analytics + Azure Data Lake Gen2 → Node.js REST API → React Dashboard
- Owned SLA contracts between layers: MMP postbacks ingested within seconds, Spark jobs every 5 mins, dashboard queries under 500ms
- Key trade-off decisions: chose micro-batch over true streaming (cheaper, sufficient for business need); pre-aggregated metrics over raw queries (fast dashboards at cost of ad-hoc flexibility)
- Debugged cross-layer data discrepancies by tracing events from MMP postback through to query result
- Fixed a skewed Spark partition key issue (one advertiser had 10x more events) by repartitioning on composite key — reduced job time from 3+ hours to under 40 minutes

PERFORMANCE & DATABASE OPTIMIZATION
- Diagnosed a slow PostgreSQL report query (6-8 seconds) in CSMC Spring Boot app using EXPLAIN ANALYZE — found sequential scan caused by high NULL density in semester_code column (added late in project, historical rows had NULLs)
- Fix: created a partial index (WHERE semester_code IS NOT NULL) — query switched from sequential scan to index scan, load time dropped to under 400ms
- Correctly ruled out Redis caching as over-engineering for a single-user monthly report

SYSTEM DESIGN KNOWLEDGE
- API design for high-volume uploads: async job queue pattern (POST returns job_id immediately, workers process via Kafka/SQS, GET endpoint for status polling), rate limiting, validation layer, horizontal worker scaling
- Scaling strategies: stateless services, load balancing, Redis caching, queue-based async processing, database partitioning, read replicas, columnar storage for analytics
- 100ms latency systems (real-time bidding): hot path in-memory (Redis ~1ms vs DB 10-50ms), precomputed scores, async logging, timeout budgets per step
- Debugging metric discrepancies: scoping constant vs random offsets, timezone/attribution window checks, deduplication logic, raw log comparison, SQL join analysis

OAUTH2 & API INTEGRATION (Whatfix)
- Implemented OAuth 2.0 with Azure AD for enterprise clients — handled token exchange, scope mismatches, token expiry edge cases (refresh token requested if expiry within 5 mins)
- Built exponential backoff with jitter for SDK retries (1s → 2s → 4s → 8s, up to 5-6 attempts)
- Debugged silent failures from JWT claim renames during phased Azure AD migrations — added defensive validation so future schema changes fail loudly with alerts

SMART AMENITIES ASSISTANCE SYSTEM (Academic Project — UTD SE 6387, May 2026)
- Project Manager and Frontend Lead for a team of 4
- Built an Android app (Kotlin, Jetpack Compose, MVVM, Hilt) for passenger navigation inside DFW Terminal D
- Backend: Python FastAPI deployed on AWS EC2 (Docker), Amazon RDS MySQL 8.0, Dijkstra shortest-path routing via NetworkX on a 14-node Terminal D routing graph
- Features: accessibility-aware routing (wheelchair step-free paths), real-time amenity status, crowd level tracking, dynamic rerouting on amenity closure, offline resilience via Room SQLite cache (15-min)
- Key architectural decision: chose modular monolith over microservices — avoided service discovery overhead on a t2.micro; clean module boundaries maintained testability
- JWT stateless auth (python-jose, HS256) — eliminated DB tokens table and consistency bugs
- Delivered all milestones on schedule across 2 iterations; 100% requirements traceability
- Tech: Kotlin, Jetpack Compose, Python, FastAPI, MySQL, AWS EC2, Docker, NetworkX, JWT

FRONTEND SYSTEM DESIGN & ARCHITECTURE
Nikhil is a strong frontend architect, not just a developer:
- Designed and architected the full Android frontend for Smart Amenities (DFW Terminal D) — MVVM architecture, Hilt dependency injection, Jetpack Compose, offline resilience via Room SQLite cache
- Defined all API contracts (ISmartAmenities, IWayfinderData) before development began, enabling parallel frontend/backend development with zero blocking across both iterations
- Architected React-based internal gallery platform at InMobi for client presentations
- Led front-end architecture for State Farm's 100forGood (React JS, Redux, PWA) — 30% performance gain, 40% accessibility improvement
- Built accessible component systems: react-accessible-calendar (open-source npm package, WCAG 2.1 compliant, keyboard navigation, screen readers, high-contrast themes)
- Understands frontend performance optimization: code splitting, modularization, page load time reduction
- Experience with component-driven architecture, state management (Redux), and progressive web apps
- Mentored junior engineers on front-end best practices at both InMobi and Y Media Labs

When asked about system design, Nikhil can speak to both backend distributed systems AND frontend architecture — he is a full-stack engineer who has designed complete systems end-to-end.

AVAILABILITY & JOB SEARCH
- Actively looking for full-time roles
- Open to: Software Engineer, Front-end, Full Stack, Solutions Engineer, Data Engineer
- Graduated in May 2026, available for full-time immediately from June 2026 (OPT work authorization)
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