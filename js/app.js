(function () {
  "use strict";

  const D = window.ASET_DATA;
  const app = document.getElementById("app");
  const toastRegion = document.getElementById("toast-region");

  const saved = readStore();
  const state = {
    mode: "home",
    dietitianTab: "planner",
    patientTab: "meals",
    clientId: saved.clientId || "sarah",
    dark: Boolean(saved.dark),
    water: Number(saved.water || 1750),
    day: 0,
    clinic: 0,
    testimonial: 0,
    goal: "loss",
    recipeFilter: "All",
    completedMeals: saved.completedMeals || [],
    records: saved.records || D.records.slice(),
    appointments: saved.appointments || D.appointments.slice(),
    diary: saved.diary || D.diary.slice()
  };

  function readStore() {
    try { return JSON.parse(localStorage.getItem("aset_state") || "{}"); }
    catch (_) { return {}; }
  }

  function saveStore() {
    try {
      localStorage.setItem("aset_state", JSON.stringify({
        clientId: state.clientId,
        dark: state.dark,
        water: state.water,
        completedMeals: state.completedMeals,
        records: state.records,
        appointments: state.appointments,
        diary: state.diary
      }));
    } catch (_) {}
  }

  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[c]);
  const money = n => Number(n).toLocaleString();
  const currentClient = () => D.clients.find(c => c.id === state.clientId) || D.clients[0];
  const mealTotals = meal => meal.foods.reduce((a, f) => ({cal:a.cal+f[2], p:a.p+f[3], c:a.c+f[4], fat:a.fat+f[5]}), {cal:0,p:0,c:0,fat:0});
  const planTotals = () => D.meals.reduce((a,m) => { const t=mealTotals(m); return {cal:a.cal+t.cal,p:a.p+t.p,c:a.c+t.c,fat:a.fat+t.fat}; }, {cal:0,p:0,c:0,fat:0});

  function toast(message) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    toastRegion.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function brandSvg() {
    return `<svg class="brand-heart" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 26.5c-.4 0-.8-.2-1.1-.5C13.5 24.6 4 15.6 4 10.5 4 6.9 6.9 4 10.5 4c2.5 0 4.7 1.4 5.5 3.5.8-2.1 3-3.5 5.5-3.5 3.6 0 6.5 2.9 6.5 6.5 0 5.1-9.5 14.1-10.9 15.5-.3.3-.7.5-1.1.5zm-5.5-20C7.7 6.5 5.5 8.7 5.5 10.5c0 3.8 7.3 11.2 10.5 13.9 3.2-2.7 10.5-10.1 10.5-13.9 0-2.8-2.2-5-5-5-2.2 0-4.1 1.4-4.8 3.5-.2.5-.6.8-1.2.8s-1-.3-1.2-.8c-.7-2.1-2.6-3.5-4.8-3.5z"/><path d="M16 8.5c-.4 0-.8-.3-.8-.8V4.5c0-.4.3-.8.8-.8s.8.3.8.8v3.2c0 .5-.4.8-.8.8zM11.5 11c-.3 0-.6-.2-.7-.5-1.2-2.3-.8-4.9.9-6.6.3-.3.8-.3 1.1 0s.3.8 0 1.1c-1.3 1.3-1.6 3.3-.7 5.1.2.4 0 .9-.4 1-.1-.1-.1-.1-.2-.1z"/></svg>`;
  }

  function header() {
    const homeClass = state.mode === "home" ? " home-header" : "";
    return `<header class="site-header${homeClass}">
      <div class="container header-inner">
        <button class="menu-button" data-action="open-menu" aria-label="Open menu"><span class="menu-lines"></span></button>
        <button class="brand" data-mode="home" aria-label="ASET home">${brandSvg()}<span class="brand-name">aset</span></button>
        <nav class="main-nav" aria-label="Main navigation">
          <button class="nav-link" data-scroll="check-our-features">Solutions <b>›</b></button>
          <button class="nav-link" data-scroll="brand-carousel">For Organizations <b>›</b></button>
          <button class="nav-link" data-scroll="check-our-features">For People</button>
          <button class="nav-link" data-mode="dietitian">For Dietitians</button>
        </nav>
        <div class="header-actions">
          <button class="icon-button theme-pill" data-action="toggle-theme" aria-label="Toggle colour theme">${state.dark ? "☀" : "◔"}</button>
          <button class="btn btn-sm" data-action="open-auth">Sign In</button>
        </div>
      </div>
    </header>`;
  }

  function floatingAssistant() {
    return `<button class="ai-fab" data-action="coming-soon">✦ &nbsp; ASET AI Assistant</button>`;
  }

  function render() {
    document.body.classList.toggle("dark", state.dark);
    app.innerHTML = header() + (state.mode === "home" ? homePage() : state.mode === "dietitian" ? dietitianPage() : patientPage()) + floatingAssistant();
    document.body.classList.remove("no-scroll");
    syncHeader();
  }

  function syncHeader() {
    const el = document.querySelector(".site-header");
    if (el) el.classList.toggle("scrolled", state.mode !== "home" || window.scrollY > 20);
  }

  window.addEventListener("scroll", syncHeader, { passive: true });

  function homePage() {
    return `<main class="home-page">
      <section class="hero" id="home">
        <div class="hero-media"><img class="hero-bg" src="assets/images/hero-kitchen.jpg" alt="A nutrition solution within everyone's reach"><div class="hero-shade"></div></div>
        <div class="container hero-content"><div class="hero-copy"><div><span class="hero-title-box">A nutrition solution</span></div><h1>within everyone's reach</h1></div></div>
        <div class="brand-shell">
          <svg class="brand-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0,32 C340,64 720,12 1100,38 C1280,50 1380,24 1440,28 L1440,60 L0,60 Z"/></svg>
          <section class="brand-strip" id="brand-carousel"><div class="container brand-row"><h2>The choice of companies and<span>institutions worldwide</span></h2><div class="logo-window"><div class="logo-track">${brandLogos(true)}${brandLogos(false)}</div></div></div></section>
        </div>
      </section>
      ${showcaseSection()}
      ${featuresSection()}
      ${clinicsSection()}
      ${testimonialsSection()}
      ${footer()}
    </main>`;
  }

  function brandLogos(second) {
    const prefix = second ? "" : "";
    return `<span class="brand-logo edenred"><i>e</i>Edenred</span><span class="brand-logo walgreens">W</span><span class="brand-logo danone">DANONE</span><span class="brand-logo nestle">Nestlé <small>HEALTH</small></span><span class="brand-logo randstad">⌁ randstad</span><span class="brand-logo sodexo">sodexo<sup>*</sup></span>`;
  }

  function showcaseSection() {
    return `<section class="showcase" id="features-showcase"><div class="showcase-glow"></div><div class="container showcase-inner"><div class="showcase-head"><div><span>Interactive Mobile Suite</span><h2>Tailored nutrition solutions</h2></div><div class="showcase-arrows"><button data-action="showcase-prev" aria-label="Previous slide">‹</button><button data-action="showcase-next" aria-label="Next slide">›</button></div></div><div class="showcase-track" id="showcase-track">
      ${planPhone()}${cameraPhone()}${summaryPhone()}${waterPhone()}${milestonePhone()}
    </div></div></section>`;
  }

  function phoneShell(content, extra) {
    return `<article class="showcase-phone ${extra || ""}"><div class="phone-notch"></div>${content}<div class="phone-homebar"></div></article>`;
  }

  function planPhone() {
    return phoneShell(`<div class="plan-screen"><div class="plan-ring"><span>75%</span></div><h3>Creating your plan ...</h3><ul><li>Calculating your answers</li><li>Calculating your calorie goal</li><li>Calculating your progress</li><li class="pending">... finishing touches</li></ul></div>`, "plan-phone");
  }

  function cameraPhone() {
    return phoneShell(`<div class="camera-top"><span>←</span><strong>aset</strong><span>?</span></div><div class="camera-view"><img src="assets/images/camera-croissant.jpg" alt="Cappuccino and fresh croissant"><div class="scan-frame"></div></div><p class="camera-help">Make sure your meal is well lit and fully within the frame.</p><button class="camera-shutter" data-action="coming-soon" aria-label="Scan meal">▣</button>`, "camera-phone");
  }

  function summaryPhone() {
    return phoneShell(`<div class="status-row"><span>◆ 2000</span><span>🔥 135</span><span>▢</span></div><h3 class="screen-title">Today</h3><small>Week 175</small><div class="screen-label"><strong>Summary</strong><span>Details</span></div><div class="summary-card"><div><strong>1,020</strong><small>Eaten</small></div><div class="remain-ring"><strong>868</strong><small>Remaining</small></div><div><strong>142</strong><small>Burned</small></div><div class="phone-macros"><span>Carbs<i><b style="width:47%"></b></i><small>97 / 207 g</small></span><span>Protein<i><b style="width:40%"></b></i><small>46 / 115 g</small></span><span>Fat<i><b style="width:82%"></b></i><small>50 / 61 g</small></span></div></div><div class="screen-label"><strong>Nutrition</strong><span>More</span></div><div class="breakfast-row"><i>☕</i><div><strong>Breakfast</strong><small>466 / 566 Cal</small><em>AI &nbsp; Fried eggs with mix...</em></div><b>+</b></div>`, "summary-phone");
  }

  function waterPhone() {
    return phoneShell(`<h3 class="screen-title">Water Tracker</h3><div class="water-copy"><strong>Water</strong><small>Goal: 74 fl oz</small><b>72 fl oz</b></div><div class="glass-grid">${Array.from({length:7},(_,i)=>`<button data-water-glass="${i}" class="${i===6?"checked":""}">${i===6?"✓":""}</button>`).join("")}<button data-water-glass="7" class="empty">+</button></div><p class="water-food">+ Water from food: 0.0 fl oz</p><div class="screen-label"><strong>Activities</strong><span>More</span></div><div class="steps-row"><i>👟</i><div><strong>Steps</strong><small>Automatic Tracking</small></div><button data-action="open-auth">Connect</button></div><button class="manual-link" data-action="open-auth">Track steps manually</button>`, "water-phone");
  }

  function milestonePhone() {
    return phoneShell(`<div class="flame-mark">3</div><h3 class="milestone-title">3 Day Milestone</h3><div class="milestone-days"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div><div class="streak-line"><i></i><b>★</b></div><p class="milestone-copy">Amazing! Now, let's go for the next milestone.</p>`, "milestone-phone");
  }

  function featuresSection() {
    return `<section class="home-features" id="check-our-features">
      <div class="container center">
        <span class="section-kicker">✦ &nbsp; Interactive Nutrition Technology</span>
        <h2>Check our features</h2>
        <p>Click any tool below to calculate your biometrics, define metabolic targets, or explore dietitian-crafted recipes.</p>
        <div class="feature-grid">
          ${featureCard("◎", "Goal Engine", "Personalized Wellness Goals", "Calibrate customized metabolic targets for fat loss, hypertrophy, or longevity.", "goals")}
          ${featureCard("⌁", "Clinical Tool", "BMI & Calorie Calculator", "Evidence-based Mifflin-St Jeor TDEE, BMR, and macro split calculator.", "calculator")}
          ${featureCard("♨", "Recipe Database", "Dietitian Recipe Gallery", "Explore nutrient-dense meal templates, allergen filters, and macro-balanced dishes.", "recipes")}
        </div>
        <div id="feature-tool"></div>
      </div>
    </section>`;
  }

  function featureCard(icon, label, title, copy, tool) {
    return `<button class="feature-card" data-feature="${tool}"><span class="feature-icon">${icon}</span><div class="feature-label">${label}</div><h3>${title}</h3><p>${copy}</p><span class="feature-open">Open interactive tool <b>›</b></span></button>`;
  }

  function goalsTool() {
    return `<div class="tool-panel center"><div class="panel-head"><div style="text-align:left"><h3>Personalized Wellness Goals</h3><p class="panel-subtitle">Choose a direction and calculate a realistic weekly target.</p></div><button class="close-button" data-action="close-tool">×</button></div>
      <div class="goal-options">
        <button class="goal-option ${state.goal === "loss" ? "active" : ""}" data-goal="loss"><strong>Fat Loss</strong><br><small>Sustainable calorie deficit</small></button>
        <button class="goal-option ${state.goal === "maintain" ? "active" : ""}" data-goal="maintain"><strong>Maintain</strong><br><small>Energy and longevity</small></button>
        <button class="goal-option ${state.goal === "gain" ? "active" : ""}" data-goal="gain"><strong>Muscle Gain</strong><br><small>Progressive surplus</small></button>
      </div>
      <div class="result-box" style="text-align:left"><small class="muted">RECOMMENDED PROTOCOL</small><div class="result-number">${state.goal === "loss" ? "-0.45 kg" : state.goal === "gain" ? "+0.25 kg" : "Stable"}</div><p>${state.goal === "loss" ? "A moderate 450 kcal daily deficit with 120g+ protein and resistance training." : state.goal === "gain" ? "A controlled 250 kcal surplus with progressive strength training." : "Maintain current energy intake and focus on fibre, sleep and daily movement."}</p></div>
    </div>`;
  }

  function calculatorTool() {
    return `<div class="tool-panel" style="text-align:left"><div class="panel-head"><div><h3>BMI & Daily Calorie Calculator</h3><p class="panel-subtitle">Uses BMI and the Mifflin-St Jeor resting-energy equation.</p></div><button class="close-button" data-action="close-tool">×</button></div>
      <form id="calculator-form"><div class="form-grid">
        <div class="field"><label>Gender</label><select name="gender"><option value="female">Female</option><option value="male">Male</option></select></div>
        <div class="field"><label>Age</label><input name="age" type="number" min="15" max="100" value="31" required></div>
        <div class="field"><label>Height (cm)</label><input name="height" type="number" min="120" max="230" value="168" required></div>
        <div class="field"><label>Weight (kg)</label><input name="weight" type="number" min="35" max="250" step="0.1" value="72.4" required></div>
        <div class="field full"><label>Activity level</label><select name="activity"><option value="1.2">Sedentary</option><option value="1.375">Lightly active</option><option value="1.55" selected>Moderately active</option><option value="1.725">Very active</option></select></div>
      </div><button class="btn" style="margin-top:18px">Calculate results</button></form><div id="calculator-result"></div>
    </div>`;
  }

  function recipesTool() {
    return `<div class="tool-panel" style="text-align:left"><div class="panel-head"><div><h3>Dietitian Recipe Gallery</h3><p class="panel-subtitle">Balanced meal ideas for different goals and preferences.</p></div><button class="close-button" data-action="close-tool">×</button></div>${recipeCards(D.recipes.slice(0,3))}</div>`;
  }

  function recipeCards(recipes) {
    return `<div class="recipe-grid">${recipes.map(r => `<article class="recipe-card"><img src="${r.image}" alt="${esc(r.title)}"><div class="recipe-body"><div class="recipe-meta"><span>${esc(r.category)}</span><span>•</span><span>${esc(r.time)}</span></div><h3>${esc(r.title)}</h3><p class="muted" style="font-size:11px">${r.calories} kcal • ${r.protein}g protein</p><button class="btn btn-sm btn-outline" data-recipe="${r.id}">View recipe</button></div></article>`).join("")}</div>`;
  }

  function clinicsSection() {
    const c = D.clinics[state.clinic];
    return `<section class="home-clinics" id="locations-section"><div class="container center"><span class="section-kicker">⌖ &nbsp; Global Dietetics Network</span><h2>Find an ASET Clinic or Connect via Telehealth</h2><p class="section-copy">Visit one of our state-of-the-art physical facilities or schedule a digital consultation from the comfort of home.</p>
      <div class="clinic-layout" style="text-align:left"><div><input class="search-input" id="clinic-search" placeholder="Search city, clinic name, or address..." aria-label="Search clinics"><div class="clinic-list" style="margin-top:12px">${clinicOptions()}</div></div>
      <article class="clinic-detail"><img src="${c.image}" alt="${esc(c.name)}"><div class="clinic-detail-body"><small class="section-kicker">${esc(c.city)} FACILITY</small><h3>${esc(c.name)}</h3><p class="muted">${esc(c.address)}</p><div class="detail-grid"><div class="detail-item"><small>Operating Hours</small><strong>${esc(c.hours)}</strong></div><div class="detail-item"><small>Clinical Lead</small><strong>${esc(c.lead)}</strong></div><div class="detail-item"><small>Direct Inquiries</small><strong>${esc(c.phone)}</strong></div><div class="detail-item"><small>Available Services</small><strong>Clinical nutrition & metabolic assessment</strong></div></div><button class="btn" data-action="open-auth">Book In-Person or Telehealth Appointment</button></div></article></div>
    </div></section>`;
  }

  function clinicOptions(query) {
    const q = (query || "").toLowerCase();
    return D.clinics.map((c,i) => ({c,i})).filter(x => !q || (x.c.city+x.c.name+x.c.address).toLowerCase().includes(q)).map(({c,i}) => `<button class="clinic-option ${i===state.clinic?"active":""}" data-clinic="${i}"><small>${esc(c.city)}</small><strong>${esc(c.name)}</strong><span>${esc(c.address)}</span></button>`).join("") || `<p class="muted">No clinic matched your search.</p>`;
  }

  function testimonialsSection() {
    const t = D.testimonials[state.testimonial];
    return `<section class="home-testimonials" id="testimonials-section"><div class="container center"><span class="section-kicker">✦ &nbsp; Real Patient Transformations</span><h2>Loved by patients, trusted by registered dietitians.</h2><p class="section-copy">See how individuals achieved sustained health results using ASET’s clinical tools.</p><div class="testimonial-wrap"><article class="testimonial-card"><div class="testimonial-top"><div class="testimonial-person"><img src="${t.image}" alt="${esc(t.name)}"><div><h3>${esc(t.name)}</h3><p>${esc(t.role)}</p><div class="stars">★★★★★</div></div></div><div class="outcome"><small>Verified Outcome</small><strong>${esc(t.result)}</strong></div></div><blockquote>“${esc(t.quote)}”</blockquote><div class="testimonial-foot"><span>✓ &nbsp; Clinical Dietitian Supervisor: <strong>Dr. Elena Rostova, PhD, RD</strong></span><span>${state.testimonial+1} of ${D.testimonials.length} Stories</span></div></article><div class="testimonial-controls"><button data-testimonial="prev" aria-label="Previous testimonial">‹</button><i class="active"></i><i></i><i></i><button data-testimonial="next" aria-label="Next testimonial">›</button></div></div></div></section>`;
  }

  function footer() {
    return `<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><div class="footer-brandline"><i>A</i><strong>aset</strong><span>Nutrition</span></div><p>Precision clinical nutrition, dietetics management, and a complete patient companion ecosystem.</p><b class="footer-cert">✓ &nbsp; HIPAA & GDPR Certified Nutrition Platform</b></div><div><h4>Nutrition Tools</h4><button data-feature-jump="calculator">BMI Calculator</button><button data-feature-jump="calculator">Calorie Calculator</button><button data-feature-jump="goals">Wellness Goals</button><button data-scroll="features-showcase">Meal Scanner</button><button data-feature-jump="recipes">Recipes</button></div><div><h4>Platform Modules</h4><button data-mode="dietitian">Dietitian Clinical Suite <small>PRO</small></button><button data-mode="patient">Patient Companion</button><button data-scroll="locations-section">Clinic Locations</button><button data-scroll="testimonials-section">Patient Stories</button><button data-action="open-auth">Sign Up Free</button></div><div><h4>Global Headquarters</h4><p>Manhattan • San Francisco<br>London • Sydney</p><p>✉ &nbsp; support@aset-nutrition.com</p><p>☎ &nbsp; +1 (800) 555-ASET</p></div></div><div class="footer-bottom"><span>© 2026 ASET Nutrition & Dietetics System. All rights reserved.</span><button data-scroll="home">Back to top ↑</button></div></div></footer>`;
  }

  function dietitianPage() {
    const c = currentClient();
    return `<main class="app-page"><div class="dashboard">${dashboardHead(c, "Dietitian Clinical Suite", `Active Client: ${c.name}`)}
      <nav class="dash-tabs" aria-label="Dietitian modules">
        ${dashTab("planner","Meal Planner & Macros")}${dashTab("anthropometrics","Anthropometrics & BMR")}${dashTab("clients",`Patient Directory (${D.clients.length})`)}${dashTab("appointments",`Consultations (${state.appointments.length})`)}${dashTab("diary",`Food Diary Review (${state.diary.length})`)}
      </nav>${dietitianContent()}</div></main>`;
  }

  function dashboardHead(c, title, subtitle) {
    return `<section class="dash-head"><div class="dash-profile"><button class="icon-button" data-mode="home" title="Back to ASET home">←</button><img src="${c.avatar}" alt="${esc(c.name)}"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div></div><div class="dash-actions"><select class="search-input" id="client-select" aria-label="Select client">${D.clients.map(x=>`<option value="${x.id}" ${x.id===state.clientId?"selected":""}>${esc(x.name)} (${esc(x.goal)})</option>`).join("")}</select><button class="icon-button" data-action="toggle-theme" aria-label="Toggle colour theme">${state.dark?"☀":"◐"}</button></div></section>`;
  }

  function dashTab(id,label) { return `<button class="tab-button ${state.dietitianTab===id?"active":""}" data-dietitian-tab="${id}">${label}</button>`; }
  function patientTab(id,label) { return `<button class="tab-button ${state.patientTab===id?"active":""}" data-patient-tab="${id}">${label}</button>`; }

  function dietitianContent() {
    if (state.dietitianTab === "anthropometrics") return anthropometricsView();
    if (state.dietitianTab === "clients") return clientsView();
    if (state.dietitianTab === "appointments") return appointmentsView();
    if (state.dietitianTab === "diary") return diaryView();
    return mealPlannerView();
  }

  function mealPlannerView() {
    const c = currentClient(), t = planTotals();
    return `<section class="panel"><div class="panel-head"><div><span class="section-kicker">Active Prescription</span><h2 class="panel-title" style="margin-top:12px">Metabolic Recomposition & Lean Tone Plan</h2><p class="panel-subtitle">Client: ${esc(c.name)} (${esc(c.goal)})</p></div><div style="display:flex;flex-wrap:wrap;gap:8px"><button class="btn btn-sm" data-action="coming-soon">✦ AI Plan Generator</button><button class="btn btn-sm btn-outline" data-action="shopping-list">Shopping List</button><button class="btn btn-sm btn-outline" data-action="copy-day">Copy Day</button></div></div>
      <div class="stats-grid"><div class="stat primary"><small>Calories</small><strong>${money(t.cal)} / 1,950 kcal</strong><span style="font-size:10px">Daily target</span></div><div class="stat"><small>Protein</small><strong>${t.p}g</strong><span class="muted" style="font-size:9px">28% of calories</span></div><div class="stat"><small>Carbs</small><strong>${t.c}g</strong><span class="muted" style="font-size:9px">39% of calories</span></div><div class="stat"><small>Fats</small><strong>${t.fat}g</strong><span class="muted" style="font-size:9px">35% of calories</span></div><div class="stat"><small>Fiber</small><strong>42g</strong><span class="muted" style="font-size:9px">Target 30g+</span></div></div>
      ${dayTabs("Day")}
      <div class="meal-list">${D.meals.map((m,i)=>dietitianMeal(m,i)).join("")}</div>
    </section>`;
  }

  function dayTabs(label) {
    return `<div class="day-tabs">${D.week.map((d,i)=>`<button class="day-tab ${state.day===i?"active":""}" data-day="${i}"><strong>${d}</strong>${label} ${String(i+1).padStart(2,"0")}</button>`).join("")}</div>`;
  }

  function dietitianMeal(meal,index) {
    const t=mealTotals(meal);
    return `<article class="meal-card"><header class="meal-head"><div class="meal-name"><span class="meal-letter">${meal.type[0]}</span><div><h4>${esc(meal.type)} <span class="muted">${esc(meal.time)}</span></h4><p>${esc(meal.name)}</p></div></div><div style="display:flex;align-items:center;gap:12px"><button class="btn btn-sm btn-outline" data-action="add-food" data-meal="${index}">Add Food</button><div class="meal-total"><strong>${t.cal}</strong><small>KCAL • P ${t.p}g</small></div></div></header><div class="food-rows">${meal.foods.map((f,i)=>foodRow(f,index,i,true)).join("")}</div><p class="meal-note"><strong>Note:</strong> ${esc(meal.note)}</p></article>`;
  }

  function foodRow(f,mealIndex,foodIndex,editable) {
    return `<div class="food-row"><img src="${f[6]}" alt=""><div><strong>${esc(f[0])}</strong><small>${esc(f[1])}</small></div><span class="food-macros">P ${f[3]}g • C ${f[4]}g • F ${f[5]}g</span><div style="display:flex;align-items:center;gap:7px"><strong>${f[2]} kcal</strong>${editable?`<button class="close-button" style="width:28px;height:28px;font-size:15px" data-remove-food="${mealIndex}:${foodIndex}" aria-label="Remove food">×</button>`:""}</div></div>`;
  }

  function anthropometricsView() {
    const c=currentClient(), latest=state.records[0];
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Anthropometrics & Metabolic Assessment</h2><p class="panel-subtitle">Clinical body-composition history for ${esc(c.name)}.</p></div><button class="btn" data-action="add-record">+ Add Measurement</button></div><div class="stats-grid"><div class="stat primary"><small>Current Weight</small><strong>${latest.weight} kg</strong><span style="font-size:10px">Target ${c.target} kg</span></div><div class="stat"><small>BMI</small><strong>${latest.bmi}</strong><span class="badge">Healthy range</span></div><div class="stat"><small>Body Fat</small><strong>${latest.fat}%</strong></div><div class="stat"><small>Muscle Mass</small><strong>${latest.muscle} kg</strong></div><div class="stat"><small>Estimated BMR</small><strong>1,482</strong><span class="muted" style="font-size:9px">kcal/day</span></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Weight</th><th>BMI</th><th>Body Fat</th><th>Muscle Mass</th><th>Change</th></tr></thead><tbody>${state.records.map((r,i)=>`<tr><td><strong>${esc(r.date)}</strong></td><td>${r.weight} kg</td><td>${r.bmi}</td><td>${r.fat}%</td><td>${r.muscle} kg</td><td class="teal">${i<state.records.length-1?(r.weight-state.records[i+1].weight).toFixed(1)+" kg":"Baseline"}</td></tr>`).join("")}</tbody></table></div>
    </section>`;
  }

  function clientsView() {
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Patient & Client Directory</h2><p class="panel-subtitle">Manage active clients and open their nutrition plans.</p></div><button class="btn" data-action="register-client">+ Register New Patient</button></div><div class="client-grid">${D.clients.map(c=>`<article class="client-card ${c.id===state.clientId?"active":""}"><img src="${c.avatar}" alt="${esc(c.name)}"><div style="flex:1"><h3>${esc(c.name)}</h3><p>${esc(c.goal)} • ${c.age} years • ${c.weight} kg</p><span class="badge">${c.streak} day streak</span></div><button class="btn btn-sm btn-outline" data-client="${c.id}">Open Plan</button></article>`).join("")}</div></section>`;
  }

  function appointmentsView() {
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Consultations & Appointments</h2><p class="panel-subtitle">Schedule and manage upcoming dietitian appointments.</p></div><button class="btn" data-action="book-appointment">+ Book Consultation</button></div>${state.appointments.map((a,i)=>`<article class="appointment-card"><div class="date-box">${esc(a.date.split(" ")[0])}<strong>${esc(a.date.split(" ")[1]?.replace(",","")||"")}</strong></div><div><strong>${esc(a.client)}</strong><p class="muted" style="margin:5px 0;font-size:10px">${esc(a.type)} • ${esc(a.date)} at ${esc(a.time)}</p><span class="badge ${a.status==="Pending"?"pending":""}">${esc(a.status)}</span></div><div style="display:flex;gap:8px"><button class="btn btn-sm btn-outline" data-action="consultation-info">Consultation Details</button>${a.status!=="Completed"?`<button class="btn btn-sm" data-complete-appointment="${i}">Mark Complete</button>`:""}</div></article>`).join("")}</section>`;
  }

  function diaryView() {
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Patient Food Diary & Photo Log Review</h2><p class="panel-subtitle">Review meal confirmations and leave clinical feedback.</p></div></div>${state.diary.map((d,i)=>`<article class="diary-card"><img src="${d.image}" alt="${esc(d.meal)}"><div><span class="badge">${esc(d.meal)} • ${esc(d.time)}</span><h3 style="font-size:13px;margin:9px 0 4px">${esc(d.description)}</h3><p class="muted" style="margin:0;font-size:10px">${esc(d.client)} • ${d.calories} kcal • “${esc(d.note)}”</p></div><div style="display:flex;gap:8px"><button class="btn btn-sm ${d.approved?"":"btn-outline"}" data-approve-diary="${i}">${d.approved?"✓ Dietitian Approved":"Approve & Like"}</button><button class="btn btn-sm btn-outline" data-feedback="${i}">Leave Feedback</button></div></article>`).join("")}</section>`;
  }

  function patientPage() {
    const c=currentClient();
    return `<main class="app-page"><div class="patient-shell"><section class="dash-head"><div class="dash-profile"><button class="icon-button" data-mode="home" title="Back to ASET home">←</button><img src="${c.avatar}" alt="${esc(c.name)}"><div><h2>${esc(c.name)} <span class="badge">Patient Portal</span></h2><p>Goal: ${esc(c.goal)} • ${c.streak} Day Streak 🔥</p></div></div><div class="dash-actions"><div class="patient-tabs">${patientTab("meals","Meals")}${patientTab("water","Water")}${patientTab("recipes","Recipes")}${patientTab("progress","Progress")}</div></div></section><div style="margin-top:18px">${patientContent()}</div></div></main>`;
  }

  function patientContent() {
    if (state.patientTab === "water") return hydrationPanel();
    if (state.patientTab === "recipes") return recipeBookView();
    if (state.patientTab === "progress") return progressView();
    return hydrationPanel() + `<div style="height:18px"></div>` + patientMealsView();
  }

  function hydrationPanel() {
    const pct=Math.min(100,Math.round(state.water/2500*100));
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Daily Hydration Tracker</h2><p class="panel-subtitle">Target: 2,500 ml daily (10 glasses)</p></div><span class="badge">${pct}% achieved</span></div><div class="hydration"><div class="hydration-ring" style="--water:${pct}%" data-label="${state.water} ml&#10;${pct}% achieved"></div><div><h3>Keep your hydration consistent</h3><p class="muted" style="font-size:12px;line-height:1.7">Water supports energy, digestion and training recovery. Small, regular servings are easier to maintain throughout the day.</p><input id="water-range" type="range" min="0" max="4000" step="50" value="${state.water}" style="width:100%;accent-color:var(--teal)"><div class="water-buttons"><button class="btn btn-sm" data-water="250">+250ml Glass</button><button class="btn btn-sm" data-water="500">+500ml Bottle</button><button class="btn btn-sm btn-outline" data-water="-250">−250ml</button></div></div></div></section>`;
  }

  function patientMealsView() {
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Daily Meal Timeline</h2><p class="panel-subtitle">Follow the plan prepared by your dietitian and confirm completed meals.</p></div><button class="btn btn-sm btn-outline" data-action="log-photo">Log Meal Photo</button></div>${dayTabs("Day")}<div class="meal-list">${D.meals.map((m,i)=>patientMeal(m,i)).join("")}</div></section>`;
  }

  function patientMeal(meal,index) {
    const t=mealTotals(meal), done=state.completedMeals.includes(`${state.day}-${index}`);
    return `<article class="meal-card patient-meal"><header class="meal-head"><div class="meal-name"><button class="check-button ${done?"done":""}" data-complete-meal="${index}">${done?"✓":""}</button><div><h4>${esc(meal.type)} <span class="muted">${esc(meal.time)}</span></h4><p>${esc(meal.name)}</p></div></div><div class="meal-total"><strong>${t.cal} kcal</strong><small>P ${t.p}g • C ${t.c}g • F ${t.fat}g</small></div></header><div class="food-rows">${meal.foods.map(f=>`<div class="food-row"><img src="${f[6]}" alt=""><div><strong>${esc(f[0])}</strong><small>${esc(f[1])} • ${f[2]} kcal</small></div><button class="btn btn-sm btn-outline" data-action="swap-food">Swap</button></div>`).join("")}</div><p class="meal-note"><strong>Dietitian Note:</strong> ${esc(meal.note)}</p></article>`;
  }

  function recipeBookView() {
    const cats=["All",...new Set(D.recipes.map(r=>r.category))], recipes=state.recipeFilter==="All"?D.recipes:D.recipes.filter(r=>r.category===state.recipeFilter);
    return `<section class="panel"><div class="panel-head"><div><h2 class="panel-title">Dietitian Recipe Book</h2><p class="panel-subtitle">Nutrient-dense recipes approved for the ASET patient companion.</p></div></div><div class="dash-tabs" style="margin-top:0">${cats.map(c=>`<button class="tab-button ${c===state.recipeFilter?"active":""}" data-recipe-filter="${esc(c)}">${esc(c)}</button>`).join("")}</div>${recipeCards(recipes)}</section>`;
  }

  function progressView() {
    const c=currentClient(), first=state.records[state.records.length-1], latest=state.records[0];
    return `<div class="progress-grid"><section class="panel"><div class="panel-head"><div><h2 class="panel-title">Weight Progress</h2><p class="panel-subtitle">Steady change toward your target.</p></div></div><div class="progress-chart">${state.records.slice().reverse().map(r=>`<div class="progress-bar" style="height:${100+(r.weight-c.target)*7}px"><span>${r.weight}</span><small>${esc(r.date.split(",")[0])}</small></div>`).join("")}</div></section><section class="panel"><h2 class="panel-title">Progress Journal</h2><p class="panel-subtitle">Log a measurement. It stays only in this browser.</p><div class="result-box"><small class="muted">TOTAL CHANGE</small><div class="result-number">${(latest.weight-first.weight).toFixed(1)} kg</div><p>Current ${latest.weight} kg • Target ${c.target} kg</p></div><form id="weight-form" style="margin-top:18px"><div class="field"><label>Today's weight (kg)</label><input name="weight" type="number" step="0.1" min="35" max="250" value="${latest.weight}" required></div><button class="btn btn-block" style="margin-top:12px">Save Weight Entry</button></form></section></div>`;
  }

  function openMenu() {
    openLayer(`<div class="overlay" data-close-layer></div><aside class="drawer"><div class="drawer-head"><div class="brand" style="color:var(--ink)"><span class="brand-mark">♡</span><span class="brand-name">aset</span></div><button class="close-button" data-close-layer>×</button></div><nav class="drawer-nav"><button data-mode="home">Home</button><button data-scroll="features">Nutrition Tools & Features</button><button data-mode="dietitian">Dietitian Clinical Suite</button><button data-mode="patient">Patient Companion</button><button data-scroll="locations">Clinics & Telehealth</button><button data-scroll="stories">Patient Stories</button></nav><div class="drawer-divider"></div><button class="btn btn-block" data-action="open-auth">Sign In or Create Account</button></aside>`);
  }

  function openLayer(html) {
    closeLayer();
    const layer=document.createElement("div"); layer.id="active-layer"; layer.innerHTML=html; document.body.appendChild(layer); document.body.classList.add("no-scroll");
  }
  function closeLayer() { const l=document.getElementById("active-layer"); if(l)l.remove(); document.body.classList.remove("no-scroll"); }

  function openModal(title, body, wide) {
    openLayer(`<div class="modal-wrap" data-close-layer><section class="modal ${wide?"wide":""}" role="dialog" aria-modal="true" aria-label="${esc(title)}" data-modal-stop><div class="modal-head"><div><span class="section-kicker">ASET Nutrition</span><h2 style="margin:10px 0 0">${esc(title)}</h2></div><button class="close-button" data-close-layer>×</button></div>${body}</section></div>`);
  }

  function authModal() {
    openModal("Welcome to ASET", `<p class="muted">Sign in to access your personalized nutrition workspace.</p><div class="goal-options" style="margin:20px 0"><button class="goal-option active" data-auth-role="patient"><strong>Patient</strong><br><small>Open your daily companion</small></button><button class="goal-option" data-auth-role="dietitian"><strong>Dietitian</strong><br><small>Open the clinical suite</small></button></div><form id="auth-form"><div class="form-grid"><div class="field full"><label>Email address</label><input type="email" placeholder="name@example.com" required></div><div class="field full"><label>Password</label><input type="password" placeholder="Password" minlength="4" required></div></div><button class="btn btn-block" style="margin-top:18px">Sign In</button></form>`);
  }

  function comingSoon() {
    openModal("ASET AI Assistant", `<div class="coming-soon"><div class="coming-icon">✦</div><h3>Coming Soon</h3><p class="muted">Personalized nutrition guidance and smart meal support are on the way.</p><button class="btn" data-close-layer>Got it</button></div>`);
  }

  function recipeModal(id) {
    const r=D.recipes.find(x=>x.id===Number(id)); if(!r)return;
    openModal(r.title, `<div style="display:grid;grid-template-columns:minmax(220px,.8fr) 1.2fr;gap:24px"><img src="${r.image}" alt="${esc(r.title)}" style="width:100%;height:260px;object-fit:cover;border-radius:20px"><div><div class="recipe-meta"><span>${esc(r.category)}</span><span>•</span><span>${esc(r.time)}</span><span>•</span><span>${r.calories} kcal</span></div><h3>Ingredients</h3><ul>${r.ingredients.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><h3>Method</h3><ol>${r.steps.map(x=>`<li style="margin-bottom:8px">${esc(x)}</li>`).join("")}</ol><button class="btn" data-action="save-recipe">Save to My Recipes</button></div></div>`, true);
  }

  function shoppingList() {
    const items=D.meals.flatMap(m=>m.foods.map(f=>f[0]));
    openModal("Weekly Shopping List", `<p class="muted">Generated from the active seven-day nutrition plan.</p><div style="columns:2;column-gap:25px">${items.map((x,i)=>`<label style="display:flex;gap:8px;margin:0 0 11px;break-inside:avoid"><input type="checkbox"> <span>${esc(x)}</span></label>`).join("")}</div><div style="display:flex;gap:9px;margin-top:20px"><button class="btn" data-action="copy-shopping">Copy List</button><button class="btn btn-outline" onclick="window.print()">Print</button></div>`);
  }

  function addMeasurementModal() {
    openModal("Add Anthropometric Measurement", `<form id="record-form"><div class="form-grid"><div class="field"><label>Weight (kg)</label><input name="weight" type="number" step="0.1" value="${state.records[0].weight}" required></div><div class="field"><label>Body fat (%)</label><input name="fat" type="number" step="0.1" value="${state.records[0].fat}" required></div><div class="field"><label>Muscle mass (kg)</label><input name="muscle" type="number" step="0.1" value="${state.records[0].muscle}" required></div><div class="field"><label>Measurement date</label><input name="date" type="date" value="2026-08-21" required></div></div><button class="btn btn-block" style="margin-top:18px">Save Measurement</button></form>`);
  }

  function appointmentModal() {
    openModal("Book Consultation", `<form id="appointment-form"><div class="form-grid"><div class="field"><label>Patient</label><select name="client">${D.clients.map(c=>`<option>${esc(c.name)}</option>`).join("")}</select></div><div class="field"><label>Consultation type</label><select name="type"><option>Progress Review</option><option>Meal Plan Review</option><option>Initial Consultation</option></select></div><div class="field"><label>Date</label><input name="date" type="date" value="2026-08-25" required></div><div class="field"><label>Time</label><input name="time" type="time" value="10:00" required></div></div><button class="btn btn-block" style="margin-top:18px">Add Appointment</button></form>`);
  }

  function registerClientModal() {
    openModal("Register New Patient / Client", `<div class="coming-soon"><div class="coming-icon">＋</div><h3>Coming Soon</h3><p class="muted">Secure patient registration will be available in a future release.</p><button class="btn" data-close-layer>Close</button></div>`);
  }

  document.addEventListener("click", function (e) {
    const target=e.target.closest("button,[data-action],[data-mode],[data-scroll],[data-feature],[data-clinic],[data-day],[data-recipe]");
    if(!target)return;
    if(target.hasAttribute("data-modal-stop")) return;
    if(target.matches("[data-close-layer]")) { closeLayer(); return; }
    const mode=target.dataset.mode;
    if(mode) { state.mode=mode; closeLayer(); render(); window.scrollTo(0,0); return; }
    if(target.dataset.scroll) { const id=target.dataset.scroll; if(state.mode!=="home"){state.mode="home";render();} closeLayer(); setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),20); return; }
    if(target.dataset.feature) { showTool(target.dataset.feature); return; }
    if(target.dataset.featureJump) { state.mode="home"; render(); setTimeout(()=>{document.getElementById("check-our-features")?.scrollIntoView(); showTool(target.dataset.featureJump);},20); return; }
    if(target.dataset.goal) { state.goal=target.dataset.goal; showTool("goals"); return; }
    if(target.dataset.clinic!==undefined) { state.clinic=Number(target.dataset.clinic); render(); setTimeout(()=>document.getElementById("locations-section")?.scrollIntoView(),0); return; }
    if(target.dataset.testimonial) { state.testimonial=(state.testimonial+(target.dataset.testimonial==="next"?1:-1)+D.testimonials.length)%D.testimonials.length; render(); setTimeout(()=>document.getElementById("testimonials-section")?.scrollIntoView(),0); return; }
    if(target.dataset.dietitianTab) { state.dietitianTab=target.dataset.dietitianTab; render(); return; }
    if(target.dataset.patientTab) { state.patientTab=target.dataset.patientTab; render(); return; }
    if(target.dataset.day!==undefined) { state.day=Number(target.dataset.day); render(); return; }
    if(target.dataset.client) { state.clientId=target.dataset.client; state.dietitianTab="planner"; saveStore(); render(); return; }
    if(target.dataset.recipe) { recipeModal(target.dataset.recipe); return; }
    if(target.dataset.recipeFilter) { state.recipeFilter=target.dataset.recipeFilter; render(); return; }
    if(target.dataset.water) { state.water=Math.max(0,Math.min(4000,state.water+Number(target.dataset.water))); saveStore(); render(); return; }
    if(target.dataset.waterGlass!==undefined) { target.classList.toggle("checked"); target.textContent=target.classList.contains("checked")?"✓":""; return; }
    if(target.dataset.completeMeal!==undefined) { const key=`${state.day}-${target.dataset.completeMeal}`, i=state.completedMeals.indexOf(key); i<0?state.completedMeals.push(key):state.completedMeals.splice(i,1); saveStore(); render(); return; }
    if(target.dataset.removeFood) { const [mi,fi]=target.dataset.removeFood.split(":").map(Number); D.meals[mi].foods.splice(fi,1); toast("Food removed from the plan."); render(); return; }
    if(target.dataset.completeAppointment!==undefined) { state.appointments[Number(target.dataset.completeAppointment)].status="Completed"; saveStore(); render(); return; }
    if(target.dataset.approveDiary!==undefined) { const i=Number(target.dataset.approveDiary); state.diary[i].approved=!state.diary[i].approved; saveStore(); render(); return; }
    if(target.dataset.feedback!==undefined) { const i=Number(target.dataset.feedback); openModal("Dietitian Clinical Feedback", `<form id="feedback-form" data-index="${i}"><div class="field"><label>Feedback for ${esc(state.diary[i].client)}</label><textarea name="feedback" required placeholder="Write a supportive clinical note..."></textarea></div><button class="btn btn-block" style="margin-top:14px">Save Feedback</button></form>`); return; }
    const action=target.dataset.action;
    if(action==="open-menu") openMenu();
    else if(action==="open-auth") authModal();
    else if(action==="toggle-theme") { state.dark=!state.dark; saveStore(); closeLayer(); render(); }
    else if(action==="coming-soon" || action==="swap-food" || action==="add-food") comingSoon();
    else if(action==="close-tool") document.getElementById("feature-tool").innerHTML="";
    else if(action==="shopping-list") shoppingList();
    else if(action==="copy-day") toast("Monday's plan was copied across the week.");
    else if(action==="add-record") addMeasurementModal();
    else if(action==="book-appointment") appointmentModal();
    else if(action==="register-client") registerClientModal();
    else if(action==="consultation-info") openModal("Consultation Details", `<div class="coming-soon"><div class="coming-icon">▣</div><h3>Appointment Confirmed</h3><p class="muted">The consultation details are available in the appointment schedule.</p><button class="btn" data-close-layer>Close</button></div>`);
    else if(action==="log-photo") openModal("Log Meal Photo", `<div class="coming-soon"><div class="coming-icon">▧</div><h3>Coming Soon</h3><p class="muted">Meal photo logging will be available in a future release.</p><button class="btn" data-close-layer>Close</button></div>`);
    else if(action==="save-recipe") { closeLayer(); toast("Recipe saved."); }
    else if(action==="copy-shopping") copyShoppingList();
    else if(action==="showcase-prev" || action==="showcase-next") { const track=document.getElementById("showcase-track"); if(track) track.scrollBy({left:action==="showcase-prev"?-340:340,behavior:"smooth"}); }
  });

  app.addEventListener("change", function(e){
    if(e.target.id==="client-select") { state.clientId=e.target.value; saveStore(); render(); }
    if(e.target.id==="water-range") { state.water=Number(e.target.value); saveStore(); render(); }
  });

  app.addEventListener("input", function(e){
    if(e.target.id==="clinic-search") { const list=e.target.parentElement.querySelector(".clinic-list"); list.innerHTML=clinicOptions(e.target.value); }
  });

  document.addEventListener("click", function(e){
    if(e.target.matches("[data-close-layer]") && !e.target.closest("[data-modal-stop]")) closeLayer();
  });

  document.addEventListener("submit", function(e){
    e.preventDefault();
    const form=e.target;
    if(form.id==="calculator-form") {
      const fd=new FormData(form), gender=fd.get("gender"), age=+fd.get("age"), h=+fd.get("height"), w=+fd.get("weight"), activity=+fd.get("activity");
      const bmi=w/Math.pow(h/100,2), bmr=10*w+6.25*h-5*age+(gender==="male"?5:-161), tdee=Math.round(bmr*activity);
      document.getElementById("calculator-result").innerHTML=`<div class="result-box"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px"><div><small class="muted">BMI INDEX</small><div class="result-number">${bmi.toFixed(1)}</div><strong>${bmi<18.5?"Underweight":bmi<25?"Healthy range":bmi<30?"Overweight":"High range"}</strong></div><div><small class="muted">BMR AT REST</small><div class="result-number">${Math.round(bmr)}</div><strong>kcal / day</strong></div><div><small class="muted">DAILY ENERGY</small><div class="result-number">${tdee}</div><strong>estimated TDEE</strong></div></div></div>`;
    } else if(form.id==="auth-form") { const role=document.querySelector("[data-auth-role].active")?.dataset.authRole||"patient"; state.mode=role; closeLayer(); render(); window.scrollTo(0,0); }
    else if(form.id==="record-form") { const fd=new FormData(form), weight=+fd.get("weight"), height=currentClient().height/100; state.records.unshift({date:new Date(fd.get("date")+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}),weight,bmi:+(weight/(height*height)).toFixed(1),fat:+fd.get("fat"),muscle:+fd.get("muscle")}); saveStore(); closeLayer(); render(); toast("Measurement saved in this browser."); }
    else if(form.id==="appointment-form") { const fd=new FormData(form), date=new Date(fd.get("date")+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}); state.appointments.unshift({id:Date.now(),client:fd.get("client"),date,time:fd.get("time"),type:fd.get("type"),status:"Confirmed"}); saveStore(); closeLayer(); render(); toast("Appointment added to the schedule."); }
    else if(form.id==="weight-form") { const fd=new FormData(form), weight=+fd.get("weight"), height=currentClient().height/100; state.records.unshift({date:new Date().toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}),weight,bmi:+(weight/(height*height)).toFixed(1),fat:state.records[0].fat,muscle:state.records[0].muscle}); saveStore(); render(); toast("Weight entry saved in this browser."); }
    else if(form.id==="feedback-form") { const i=Number(form.dataset.index), fd=new FormData(form); state.diary[i].feedback=fd.get("feedback"); state.diary[i].approved=true; saveStore(); closeLayer(); render(); toast("Feedback saved in this browser."); }
  });

  document.addEventListener("click", function(e){
    const role=e.target.closest("[data-auth-role]"); if(!role)return; document.querySelectorAll("[data-auth-role]").forEach(x=>x.classList.remove("active")); role.classList.add("active");
  });

  function showTool(name) {
    const holder=document.getElementById("feature-tool"); if(!holder)return;
    holder.innerHTML=name==="goals"?goalsTool():name==="calculator"?calculatorTool():recipesTool();
    holder.scrollIntoView({behavior:"smooth",block:"center"});
  }

  function copyShoppingList() {
    const text=D.meals.flatMap(m=>m.foods.map(f=>`• ${f[0]} — ${f[1]}`)).join("\n");
    if(navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(()=>toast("Shopping list copied."));
    else toast("Shopping list is ready to print.");
  }

  render();
})();
