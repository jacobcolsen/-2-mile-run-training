/* ==============================================
   2-Mile Trainer — Main Application Script
   Vanilla JS, no frameworks
   ============================================== */

'use strict';

// ============================================================
// STATE
// ============================================================

// Workout data inlined to support file:// and GitHub Pages without a server
const WORKOUT_DATA = {"program":{"name":"8-Week 2-Mile Training Program","weeks":[{"week":1,"phase":1,"days":[{"day":1,"type":"intervals","label":"Intervals","color":"red","icon":"⚡","description":"Track intervals with full recovery","sets":6,"distance":"400m","rest_seconds":90,"estimated_distance_km":4.5,"instructions":["Warm up 10 min easy jog","6 × 400m at hard effort","90 seconds rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":120,"rest_seconds_timer":90,"repeats":6},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo Run","color":"orange","icon":"🔥","description":"Comfortably hard sustained effort","estimated_distance_km":5.5,"instructions":["Warm up 10 min easy","15 minutes at tempo pace (comfortably hard, 7/10 effort)","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":900},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic base building","estimated_distance_km":8,"instructions":["40–50 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":2,"phase":1,"days":[{"day":1,"type":"intervals","label":"Intervals","color":"red","icon":"⚡","description":"Track intervals with full recovery","sets":6,"distance":"400m","rest_seconds":90,"estimated_distance_km":4.5,"instructions":["Warm up 10 min easy jog","6 × 400m at hard effort","90 seconds rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":120,"rest_seconds_timer":90,"repeats":6},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo Run","color":"orange","icon":"🔥","description":"Comfortably hard sustained effort","estimated_distance_km":5.5,"instructions":["Warm up 10 min easy","15 minutes at tempo pace (comfortably hard, 7/10 effort)","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":900},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic base building","estimated_distance_km":8,"instructions":["40–50 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":3,"phase":1,"days":[{"day":1,"type":"intervals","label":"Intervals","color":"red","icon":"⚡","description":"Track intervals — volume increases","sets":8,"distance":"400m","rest_seconds":90,"estimated_distance_km":5.5,"instructions":["Warm up 10 min easy jog","8 × 400m at hard effort (or 5 × 600m)","90 seconds rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":120,"rest_seconds_timer":90,"repeats":8},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo Run","color":"orange","icon":"🔥","description":"Tempo duration increases this week","estimated_distance_km":6.5,"instructions":["Warm up 10 min easy","20 minutes at tempo pace (comfortably hard, 7/10 effort)","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":1200},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic base building","estimated_distance_km":8,"instructions":["40–50 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":4,"phase":1,"days":[{"day":1,"type":"intervals","label":"Intervals","color":"red","icon":"⚡","description":"Track intervals — peak phase 1 volume","sets":8,"distance":"400m","rest_seconds":90,"estimated_distance_km":5.5,"instructions":["Warm up 10 min easy jog","8 × 400m at hard effort (or 5 × 600m)","90 seconds rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":120,"rest_seconds_timer":90,"repeats":8},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo Run","color":"orange","icon":"🔥","description":"Comfortably hard sustained effort","estimated_distance_km":6.5,"instructions":["Warm up 10 min easy","20 minutes at tempo pace (comfortably hard, 7/10 effort)","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":1200},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic base building","estimated_distance_km":8,"instructions":["40–50 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":5,"phase":2,"days":[{"day":1,"type":"intervals","label":"Race Pace Intervals","color":"red","icon":"⚡","description":"Longer intervals at race pace","sets":4,"distance":"800m","rest_seconds":120,"estimated_distance_km":6,"instructions":["Warm up 10 min easy jog","4 × 800m at race pace (or 3 × 1000m)","2 minutes rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":240,"rest_seconds_timer":120,"repeats":4},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo + Speed","color":"orange","icon":"🔥","description":"Tempo followed by fast 200s","estimated_distance_km":7,"instructions":["Warm up 10 min easy","15 minutes at tempo pace","2 min easy jog recovery","4 × 200m fast (but controlled)","90 sec walk/jog between 200s","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":900},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic run — slightly shorter than Phase 1","estimated_distance_km":7,"instructions":["35–45 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":6,"phase":2,"days":[{"day":1,"type":"intervals","label":"Race Pace Intervals","color":"red","icon":"⚡","description":"Longer intervals at race pace","sets":4,"distance":"800m","rest_seconds":120,"estimated_distance_km":6,"instructions":["Warm up 10 min easy jog","4 × 800m at race pace (or 3 × 1000m)","2 minutes rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":240,"rest_seconds_timer":120,"repeats":4},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo + Speed","color":"orange","icon":"🔥","description":"Tempo followed by fast 200s","estimated_distance_km":7,"instructions":["Warm up 10 min easy","15 minutes at tempo pace","2 min easy jog recovery","4 × 200m fast (but controlled)","90 sec walk/jog between 200s","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":900},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic run","estimated_distance_km":7,"instructions":["35–45 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":7,"phase":2,"days":[{"day":1,"type":"intervals","label":"Race Pace Intervals","color":"red","icon":"⚡","description":"Longer intervals at race pace","sets":4,"distance":"800m","rest_seconds":120,"estimated_distance_km":6,"instructions":["Warm up 10 min easy jog","4 × 800m at race pace (or 3 × 1000m)","2 minutes rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":240,"rest_seconds_timer":120,"repeats":4},{"day":2,"type":"easy","label":"Easy Run + Strides","color":"green","icon":"🏃","description":"Comfortable aerobic pace with finishing strides","estimated_distance_km":6,"instructions":["30 minutes at easy conversational pace","Then 6 × 20 second strides","Walk 60 seconds between strides","Strides = fast but relaxed, not sprinting"],"timer_type":"countdown","work_seconds":1800,"stride_count":6,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"tempo","label":"Tempo + Speed","color":"orange","icon":"🔥","description":"Tempo followed by fast 200s","estimated_distance_km":7,"instructions":["Warm up 10 min easy","15 minutes at tempo pace","2 min easy jog recovery","4 × 200m fast (but controlled)","90 sec walk/jog between 200s","Cool down 5 min easy"],"timer_type":"countdown","work_seconds":900},{"day":4,"type":"long","label":"Long Run","color":"blue","icon":"🗺️","description":"Easy aerobic run","estimated_distance_km":7,"instructions":["35–45 minutes at easy comfortable pace","Should feel very relaxed and conversational","Focus on time on feet, not pace"],"timer_type":"stopwatch"}]},{"week":8,"phase":3,"phase_label":"Taper","days":[{"day":1,"type":"intervals","label":"Taper Intervals","color":"red","icon":"⚡","description":"Sharp race pace intervals — low volume","sets":4,"distance":"400m","rest_seconds":90,"estimated_distance_km":4,"instructions":["Warm up 10 min easy jog","4 × 400m at race pace — sharp and fast","90 seconds rest between each","Cool down 10 min easy jog"],"timer_type":"interval","work_seconds":120,"rest_seconds_timer":90,"repeats":4},{"day":2,"type":"easy","label":"Easy + Strides","color":"green","icon":"🏃","description":"Short easy run to stay sharp","estimated_distance_km":4,"instructions":["15 minutes easy jog","4 × 20 second strides","Walk 60 seconds between strides","Stay relaxed — legs should feel fresh"],"timer_type":"countdown","work_seconds":900,"stride_count":4,"stride_seconds":20,"stride_rest_seconds":60},{"day":3,"type":"race","label":"2-Mile Time Trial","color":"red","icon":"🏁","description":"Race day — go for it!","estimated_distance_km":3.2,"instructions":["Warm up 15 min easy with a few strides","RUN 2 MILES AS FAST AS YOU CAN","Record your time","Cool down 10 min easy walk/jog"],"timer_type":"stopwatch"}]}]}};

let WORKOUTS = null;   // Set from WORKOUT_DATA on init
let progress = null;   // Loaded from localStorage (mirrors progress.json structure)

// Timer state
const timerState = {
  mode: null,          // 'interval' | 'countdown' | 'stopwatch' | 'stride'
  running: false,
  interval: null,      // setInterval handle
  elapsed: 0,          // seconds elapsed (stopwatch)
  remaining: 0,        // seconds remaining (countdown)
  totalSeconds: 0,     // initial seconds for progress bar
  // Interval specific
  currentRep: 1,
  totalReps: 0,
  phase: 'work',       // 'work' | 'rest'
  workSeconds: 0,
  restSeconds: 0,
  // Stride specific
  strideTotal: 0,
  strideCurrent: 1,
  strideSeconds: 20,
  strideRestSeconds: 60,
  // Current workout ref
  workout: null,
  afterCountdownStrides: false,
};

// Charts
let charts = {};

// Test mode — 10× speed for trying out timers
let testMode = false;

// GPS tracking state
const gpsState = {
  active: false,
  watchId: null,
  distanceKm: 0,
  lastLat: null,
  lastLon: null,
  error: null,
};

// Current log context
let pendingLogWorkout = null;  // workout object to log
let selectedRPE = null;

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  loadWorkouts();
  loadProgress();
  renderNav();
  renderTodayPage();
  renderWorkoutsPage();
  renderProgressPage();
  bindEvents();
});

// ============================================================
// DATA LOADING
// ============================================================

function loadWorkouts() {
  WORKOUTS = WORKOUT_DATA.program.weeks;
}

function defaultProgress() {
  return {
    version: 2,
    startDate: "2026-03-02",   // Program started Mon Mar 2 — Week 2 begins Mon Mar 9
    workoutDays: [1, 3, 5, 6], // Mon, Wed, Fri, Sat
    workouts: []
  };
}

function loadProgress() {
  const raw = localStorage.getItem('runTrainerProgress');
  if (raw) {
    const saved = JSON.parse(raw);
    // Version migration: clear any old seeded data
    if (!saved.version || saved.version < 2) {
      progress = defaultProgress();
      saveProgress();
      return;
    }
    progress = saved;
  } else {
    progress = defaultProgress();
    saveProgress();
  }
}

function saveProgress() {
  localStorage.setItem('runTrainerProgress', JSON.stringify(progress));
}

// ============================================================
// DATE / SCHEDULE LOGIC
// ============================================================

// Returns { weekIndex (0-based), dayIndex (0-based) } for a given Date,
// based on the startDate and scheduled workout days.
function getWorkoutForDate(date) {
  if (!progress.startDate) return null;

  const start = new Date(progress.startDate + 'T00:00:00');
  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const startNorm = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  // Build ordered list of all workout dates
  const schedule = buildFullSchedule();

  // Find the target date in the schedule
  const targetStr = isoDate(target);
  const idx = schedule.findIndex(s => s.date === targetStr);
  if (idx === -1) return null;  // Not a workout day

  return schedule[idx];
}

// Build the full schedule of workout dates across 8 weeks
function buildFullSchedule() {
  if (!progress.startDate) return [];

  const days = [...progress.workoutDays].sort((a, b) => a - b);  // Sorted 0–6
  if (days.length < 1) return [];

  const start = new Date(progress.startDate + 'T00:00:00');
  const startNorm = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const schedule = [];
  let workoutSeq = 0;  // 0-based index across all workouts

  // Walk through days starting from the start date's week
  // We need to find what day-of-week the start date falls on and
  // potentially align to the nearest scheduled day.

  // Find the first scheduled day on or after startDate
  let current = new Date(startNorm);

  // Align to first scheduled day of week on or after startDate
  // The program start date IS Day 1 of Week 1 — so find first day in
  // workout days that is >= start.getDay()
  // We use the schedule as: start day = first workout day on/after startDate

  // Iterate calendar days to build schedule
  const maxDays = 8 * 7 * 4; // generous cap
  let searched = 0;
  let weekIdx = 0;

  while (workoutSeq < getTotalWorkouts() && searched < maxDays) {
    const dow = current.getDay();  // 0=Sun

    if (days.includes(dow)) {
      // This is a workout day
      // Which position in the week is this?
      const weeklyPos = days.indexOf(dow);  // 0-3

      // Which week are we in?
      weekIdx = Math.floor(workoutSeq / days.length);
      const dayIdx = workoutSeq % days.length;

      if (weekIdx < WORKOUTS.length) {
        const week = WORKOUTS[weekIdx];
        if (dayIdx < week.days.length) {
          schedule.push({
            date: isoDate(current),
            weekIndex: weekIdx,
            dayIndex: dayIdx,
            workoutSeq,
            week: week.week,
            day: week.days[dayIdx]
          });
          workoutSeq++;
        } else {
          // Week has fewer days — skip
          workoutSeq++;
        }
      }
    }

    current = addDays(current, 1);
    searched++;
  }

  return schedule;
}

function getTotalWorkouts() {
  if (!WORKOUTS) return 0;
  return WORKOUTS.reduce((sum, w) => sum + w.days.length, 0);
}

function isoDate(d) {
  return d.toISOString().split('T')[0];
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function todayISO() {
  return isoDate(new Date());
}

// Check if a workout (by weekIndex + dayIndex) has been logged
function isLogged(weekIndex, dayIndex) {
  return progress.workouts.some(
    w => w.weekIndex === weekIndex && w.dayIndex === dayIndex
  );
}

function getLogEntry(weekIndex, dayIndex) {
  return progress.workouts.find(
    w => w.weekIndex === weekIndex && w.dayIndex === dayIndex
  );
}

// ============================================================
// TODAY PAGE
// ============================================================

function renderTodayPage() {
  const noProgram = document.getElementById('no-program');
  const restDay = document.getElementById('rest-day');
  const programComplete = document.getElementById('program-complete');
  const todayCard = document.getElementById('today-card');

  // Hide all states first
  noProgram.classList.add('hidden');
  restDay.classList.add('hidden');
  programComplete.classList.add('hidden');
  todayCard.classList.add('hidden');

  if (!progress.startDate) {
    noProgram.classList.remove('hidden');
    return;
  }

  const today = new Date();
  const schedule = buildFullSchedule();
  if (schedule.length === 0) {
    noProgram.classList.remove('hidden');
    return;
  }

  const lastScheduled = schedule[schedule.length - 1];
  const lastDate = new Date(lastScheduled.date + 'T00:00:00');
  const todayNorm = new Date(isoDate(today) + 'T00:00:00');

  // Program is over
  if (todayNorm > lastDate) {
    programComplete.classList.remove('hidden');
    return;
  }

  // Is today a workout day?
  const todayEntry = schedule.find(s => s.date === isoDate(today));

  if (!todayEntry) {
    // Rest day — find next workout
    restDay.classList.remove('hidden');
    const upcoming = schedule.find(s => new Date(s.date + 'T00:00:00') > todayNorm);
    if (upcoming) {
      const upcomingDate = new Date(upcoming.date + 'T00:00:00');
      const diff = Math.round((upcomingDate - todayNorm) / 86400000);
      const nextLabel = diff === 1 ? 'tomorrow' : `in ${diff} days`;
      document.getElementById('next-workout-label').textContent = nextLabel;
    }
    return;
  }

  // Show workout card
  todayCard.classList.remove('hidden');
  renderWorkoutCard(todayEntry.weekIndex, todayEntry.dayIndex, todayEntry);
}

function renderWorkoutCard(weekIndex, dayIndex, scheduleEntry) {
  const week = WORKOUTS[weekIndex];
  const workout = week.days[dayIndex];

  document.getElementById('today-week-label').textContent = `Week ${week.week}`;
  document.getElementById('today-day-label').textContent = `Day ${dayIndex + 1}`;
  document.getElementById('workout-icon').textContent = workout.icon;
  document.getElementById('workout-title').textContent = workout.label;

  const pill = document.getElementById('workout-type-pill');
  pill.textContent = capitalise(workout.type);
  pill.className = `type-pill ${workout.color}`;

  document.getElementById('workout-distance').textContent =
    `~${workout.estimated_distance_km} km`;

  const list = document.getElementById('instructions-list');
  list.innerHTML = '';
  workout.instructions.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  });

  // Completion state
  const completedBadge = document.getElementById('workout-completed-badge');
  const startBtn = document.getElementById('start-workout-btn');
  const logManualBtn = document.getElementById('log-manual-btn');

  if (isLogged(weekIndex, dayIndex)) {
    completedBadge.classList.remove('hidden');
    startBtn.textContent = 'Redo Workout';
  } else {
    completedBadge.classList.add('hidden');
    startBtn.textContent = 'Start Workout';
  }

  // Wire up buttons for this workout
  startBtn.onclick = () => openTimerModal(workout, weekIndex, dayIndex);
  logManualBtn.onclick = () => openLogModal(workout, weekIndex, dayIndex);
}

// ============================================================
// WORKOUTS PAGE
// ============================================================

function renderWorkoutsPage() {
  const container = document.getElementById('workout-list');
  container.innerHTML = '';

  const todayEntry = progress.startDate
    ? buildFullSchedule().find(s => s.date === todayISO())
    : null;

  WORKOUTS.forEach((week, wIdx) => {
    const section = document.createElement('div');
    section.className = 'week-section';

    const completedInWeek = week.days.filter((_, dIdx) =>
      isLogged(wIdx, dIdx)
    ).length;
    const totalInWeek = week.days.length;

    const phaseLabel = week.phase === 3 ? 'Taper' : `Phase ${week.phase}`;

    const toggle = document.createElement('button');
    toggle.className = 'week-toggle';
    toggle.innerHTML = `
      <span class="week-toggle-left">
        <span class="week-num">WEEK ${week.week}</span>
        <span class="week-phase-badge">${phaseLabel}</span>
      </span>
      <span class="week-completion">${completedInWeek}/${totalInWeek} done</span>
      <span class="week-chevron">›</span>
    `;

    const body = document.createElement('div');
    body.className = 'week-body hidden';

    week.days.forEach((workout, dIdx) => {
      const isToday = todayEntry &&
        todayEntry.weekIndex === wIdx &&
        todayEntry.dayIndex === dIdx;
      const logged = isLogged(wIdx, dIdx);

      const row = document.createElement('div');
      row.className = 'workout-row';
      row.innerHTML = `
        <span class="workout-row-icon">${workout.icon}</span>
        <div class="workout-row-info">
          <div class="workout-row-label">${workout.label}</div>
          <div class="workout-row-sub">Day ${dIdx + 1} · ~${workout.estimated_distance_km} km</div>
        </div>
        ${isToday ? '<span class="workout-row-today">TODAY</span>' : ''}
        ${logged ? '<span class="workout-row-check">✓</span>' : ''}
      `;
      row.addEventListener('click', () => openDetailModal(wIdx, dIdx));
      body.appendChild(row);
    });

    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('open');
      toggle.classList.toggle('open', !isOpen);
      body.classList.toggle('hidden', isOpen);
    });

    // Auto-open current week
    if (todayEntry && todayEntry.weekIndex === wIdx) {
      toggle.classList.add('open');
      body.classList.remove('hidden');
    }

    section.appendChild(toggle);
    section.appendChild(body);
    container.appendChild(section);
  });
}

// ============================================================
// PROGRESS PAGE
// ============================================================

function renderProgressPage() {
  // Stats
  const total = getTotalWorkouts();
  const done = progress.workouts.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const totalKm = progress.workouts.reduce((s, w) => s + (w.distance || 0), 0);

  document.getElementById('stat-workouts').textContent = done;
  document.getElementById('stat-streak').textContent = calcWeekStreak();
  document.getElementById('stat-mileage').textContent = totalKm.toFixed(1);
  document.getElementById('stat-completion').textContent = `${pct}%`;

  // Charts
  renderMileageChart();
  renderTimeChart();
  renderRPEChart();

  // Log list
  renderLogList();
}

function calcWeekStreak() {
  // Count consecutive weeks with at least one logged workout
  let streak = 0;
  for (let w = 0; w < WORKOUTS.length; w++) {
    const hasAny = WORKOUTS[w].days.some((_, d) => isLogged(w, d));
    if (hasAny) streak++;
    else break;
  }
  return streak;
}

function renderMileageChart() {
  const labels = WORKOUTS.map((w, i) => `W${i + 1}`);
  const data = WORKOUTS.map((week, wIdx) => {
    return progress.workouts
      .filter(w => w.weekIndex === wIdx)
      .reduce((sum, w) => sum + (w.distance || 0), 0);
  });

  const ctx = document.getElementById('chart-mileage').getContext('2d');
  if (charts.mileage) charts.mileage.destroy();
  charts.mileage = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'km',
        data,
        backgroundColor: 'rgba(124, 108, 240, 0.7)',
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: chartDefaults('km')
  });
}

function renderTimeChart() {
  // Only show races / time trial entries
  const raceEntries = progress.workouts
    .filter(w => w.type === 'race' && w.time)
    .map((w, i) => ({
      label: `Trial ${i + 1}`,
      time: timeStringToSeconds(w.time)
    }));

  const ctx = document.getElementById('chart-time').getContext('2d');
  if (charts.time) charts.time.destroy();
  charts.time = new Chart(ctx, {
    type: 'line',
    data: {
      labels: raceEntries.map(e => e.label),
      datasets: [{
        label: 'Time (s)',
        data: raceEntries.map(e => e.time),
        borderColor: 'rgba(248, 113, 113, 0.9)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderWidth: 2,
        pointRadius: 6,
        fill: true,
        tension: 0.3,
      }]
    },
    options: {
      ...chartDefaults('sec'),
      scales: {
        ...chartDefaultScales(),
        y: {
          ...chartDefaultYAxis(),
          ticks: {
            color: '#8888a8',
            callback: v => formatTime(v)
          }
        }
      }
    }
  });
}

function renderRPEChart() {
  const entries = progress.workouts
    .filter(w => w.rpe != null)
    .slice(-16); // last 16 entries

  const ctx = document.getElementById('chart-rpe').getContext('2d');
  if (charts.rpe) charts.rpe.destroy();
  charts.rpe = new Chart(ctx, {
    type: 'line',
    data: {
      labels: entries.map((_, i) => `#${i + 1}`),
      datasets: [{
        label: 'RPE',
        data: entries.map(e => e.rpe),
        borderColor: 'rgba(251, 146, 60, 0.9)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        borderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.3,
      }]
    },
    options: {
      ...chartDefaults('RPE'),
      scales: {
        ...chartDefaultScales(),
        y: {
          ...chartDefaultYAxis(),
          min: 0,
          max: 10,
        }
      }
    }
  });
}

function chartDefaults(unit) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1e30',
        titleColor: '#f0f0f5',
        bodyColor: '#8888a8',
        cornerRadius: 8,
        padding: 10,
      }
    },
    scales: chartDefaultScales()
  };
}

function chartDefaultScales() {
  return {
    x: {
      grid: { color: 'rgba(46, 46, 69, 0.8)' },
      ticks: { color: '#8888a8', font: { size: 11 } }
    },
    y: chartDefaultYAxis()
  };
}

function chartDefaultYAxis() {
  return {
    grid: { color: 'rgba(46, 46, 69, 0.8)' },
    ticks: { color: '#8888a8', font: { size: 11 } }
  };
}

function renderLogList() {
  const container = document.getElementById('workout-log-list');
  container.innerHTML = '';

  if (progress.workouts.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); font-size: 15px; text-align: center; padding: 24px 0;">No workouts logged yet.</p>';
    return;
  }

  const sorted = [...progress.workouts].reverse();
  sorted.forEach(entry => {
    const weekData = WORKOUTS[entry.weekIndex];
    const workoutData = weekData?.days[entry.dayIndex];
    if (!workoutData) return;

    const row = document.createElement('div');
    row.className = 'log-entry';

    const distStr = entry.distance ? `${entry.distance} km` : '';
    const timeStr = entry.time ? entry.time : '';
    const sub = [distStr, timeStr].filter(Boolean).join(' · ');

    row.innerHTML = `
      <span class="log-entry-icon">${workoutData.icon}</span>
      <div class="log-entry-info">
        <div class="log-entry-title">W${weekData.week} D${entry.dayIndex + 1} — ${workoutData.label}</div>
        <div class="log-entry-sub">${entry.date || ''}${sub ? '  ·  ' + sub : ''}</div>
      </div>
      ${entry.rpe != null ? `<span class="log-entry-rpe">RPE ${entry.rpe}</span>` : ''}
    `;
    row.addEventListener('click', () => openDetailModal(entry.weekIndex, entry.dayIndex));
    container.appendChild(row);
  });
}

// ============================================================
// TIMER MODAL
// ============================================================

function openTimerModal(workout, weekIndex, dayIndex) {
  timerState.workout = { ...workout, weekIndex, dayIndex };
  resetTimer();

  // Reset GPS UI
  stopGPS();
  gpsState.distanceKm = 0;
  gpsState.lastLat = null;
  gpsState.lastLon = null;
  document.getElementById('gps-km').textContent = '0.00';
  document.getElementById('gps-status').textContent = '';
  document.getElementById('gps-distance-display').classList.add('hidden');
  document.getElementById('gps-toggle-btn').textContent = '📍 Track Distance';
  document.getElementById('gps-toggle-btn').classList.remove('active');

  // Reset test mode button visual (keep testMode state)
  document.getElementById('test-mode-btn').classList.toggle('active', testMode);

  const modal = document.getElementById('timer-modal');
  modal.classList.remove('hidden');

  document.getElementById('timer-workout-label').textContent = workout.label;

  // Hide all modes
  document.querySelectorAll('.timer-mode').forEach(m => m.classList.add('hidden'));

  switch (workout.timer_type) {
    case 'interval':
      setupIntervalTimer(workout);
      break;
    case 'countdown':
      if (workout.stride_count && workout.stride_count > 0) {
        timerState.afterCountdownStrides = true;
      } else {
        timerState.afterCountdownStrides = false;
      }
      setupCountdownTimer(workout);
      break;
    case 'stopwatch':
      setupStopwatch(workout);
      break;
    default:
      setupStopwatch(workout);
  }
}

// ---- Interval Timer ----
function setupIntervalTimer(workout) {
  timerState.mode = 'interval';
  timerState.currentRep = 1;
  timerState.totalReps = workout.repeats;
  timerState.phase = 'work';
  timerState.workSeconds = workout.work_seconds;
  timerState.restSeconds = workout.rest_seconds_timer || workout.rest_seconds;
  timerState.remaining = timerState.workSeconds;

  const mode = document.getElementById('timer-interval-mode');
  mode.classList.remove('hidden');
  mode.classList.remove('phase-rest');
  mode.classList.add('phase-work');

  document.getElementById('interval-total').textContent = timerState.totalReps;
  updateIntervalDisplay();
  buildIntervalDots();
}

function updateIntervalDisplay() {
  document.getElementById('timer-display').textContent =
    formatTime(timerState.remaining);
  document.getElementById('interval-current').textContent = timerState.currentRep;
  document.getElementById('interval-phase-label').textContent =
    timerState.phase === 'work' ? 'Work' : 'Rest';

  const mode = document.getElementById('timer-interval-mode');
  mode.classList.toggle('phase-work', timerState.phase === 'work');
  mode.classList.toggle('phase-rest', timerState.phase === 'rest');

  updateIntervalDots();
}

function buildIntervalDots() {
  const container = document.getElementById('interval-dots');
  container.innerHTML = '';
  for (let i = 0; i < timerState.totalReps; i++) {
    const dot = document.createElement('div');
    dot.className = 'interval-dot';
    dot.id = `dot-${i}`;
    container.appendChild(dot);
  }
  updateIntervalDots();
}

function updateIntervalDots() {
  for (let i = 0; i < timerState.totalReps; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    dot.classList.remove('done', 'current');
    if (i < timerState.currentRep - 1) dot.classList.add('done');
    else if (i === timerState.currentRep - 1) dot.classList.add('current');
  }
}

// ---- Countdown Timer ----
function setupCountdownTimer(workout) {
  timerState.mode = 'countdown';
  timerState.remaining = workout.work_seconds;
  timerState.totalSeconds = workout.work_seconds;

  const mode = document.getElementById('timer-countdown-mode');
  mode.classList.remove('hidden');
  document.getElementById('countdown-label').textContent = workout.label;

  updateCountdownDisplay();
}

function updateCountdownDisplay() {
  document.getElementById('timer-display-cd').textContent =
    formatTime(timerState.remaining);
  const pct = timerState.totalSeconds > 0
    ? (timerState.remaining / timerState.totalSeconds) * 100
    : 0;
  document.getElementById('countdown-progress-bar').style.width = `${pct}%`;
}

// ---- Stride Timer (follows a countdown or standalone) ----
function setupStrideTimer(workout) {
  timerState.mode = 'stride';
  timerState.strideTotal = workout.stride_count;
  timerState.strideCurrent = 1;
  timerState.strideSeconds = workout.stride_seconds || 20;
  timerState.strideRestSeconds = workout.stride_rest_seconds || 60;
  timerState.phase = 'work';
  timerState.remaining = timerState.strideSeconds;

  document.querySelectorAll('.timer-mode').forEach(m => m.classList.add('hidden'));
  const mode = document.getElementById('timer-stride-mode');
  mode.classList.remove('hidden');

  document.getElementById('stride-total').textContent = timerState.strideTotal;
  updateStrideDisplay();
}

function updateStrideDisplay() {
  document.getElementById('timer-display-stride').textContent =
    formatTime(timerState.remaining);
  document.getElementById('stride-current').textContent = timerState.strideCurrent;
  document.getElementById('stride-phase-label').textContent =
    timerState.phase === 'work' ? 'Stride' : 'Walk';
}

// ---- Stopwatch ----
function setupStopwatch(workout) {
  timerState.mode = 'stopwatch';
  timerState.elapsed = 0;

  const mode = document.getElementById('timer-stopwatch-mode');
  mode.classList.remove('hidden');
  document.getElementById('stopwatch-label').textContent = workout.label;
  document.getElementById('timer-display-sw').textContent = '0:00:00';
}

// ---- Core Timer Tick ----
function timerTick() {
  const inner = document.getElementById('timer-inner');

  if (timerState.mode === 'stopwatch') {
    timerState.elapsed++;
    document.getElementById('timer-display-sw').textContent =
      formatDuration(timerState.elapsed);
    return;
  }

  if (timerState.mode === 'countdown') {
    if (timerState.remaining > 0) {
      timerState.remaining--;
      updateCountdownDisplay();
    } else {
      // Countdown done
      vibrate([200, 100, 200]);
      playBeep();
      stopTimer();

      if (timerState.afterCountdownStrides) {
        // Move to stride timer
        setupStrideTimer(timerState.workout);
        // Auto start
        startTimer();
      } else {
        // Done — prompt log
        inner.classList.add('flash');
        setTimeout(() => inner.classList.remove('flash'), 800);
      }
    }
    return;
  }

  if (timerState.mode === 'interval') {
    if (timerState.remaining > 0) {
      timerState.remaining--;
      updateIntervalDisplay();
    } else {
      // Phase transition
      vibrate([150, 80, 150]);
      playBeep();

      if (timerState.phase === 'work') {
        // Move to rest (or check if last rep)
        if (timerState.currentRep >= timerState.totalReps) {
          // All reps done!
          stopTimer();
          vibrate([300, 100, 300, 100, 300]);
          inner.classList.add('flash');
          setTimeout(() => inner.classList.remove('flash'), 800);
          document.getElementById('interval-phase-label').textContent = 'Done! 🎉';
          return;
        }
        timerState.phase = 'rest';
        timerState.remaining = timerState.restSeconds;
      } else {
        // Rest done — next rep
        timerState.currentRep++;
        timerState.phase = 'work';
        timerState.remaining = timerState.workSeconds;
      }
      updateIntervalDisplay();
    }
    return;
  }

  if (timerState.mode === 'stride') {
    if (timerState.remaining > 0) {
      timerState.remaining--;
      updateStrideDisplay();
    } else {
      vibrate([150, 80, 150]);
      playBeep();

      if (timerState.phase === 'work') {
        if (timerState.strideCurrent >= timerState.strideTotal) {
          // All strides done
          stopTimer();
          vibrate([300, 100, 300]);
          inner.classList.add('flash');
          setTimeout(() => inner.classList.remove('flash'), 800);
          document.getElementById('stride-phase-label').textContent = 'Done! 🎉';
          return;
        }
        timerState.phase = 'rest';
        timerState.remaining = timerState.strideRestSeconds;
      } else {
        timerState.strideCurrent++;
        timerState.phase = 'work';
        timerState.remaining = timerState.strideSeconds;
      }
      updateStrideDisplay();
    }
    return;
  }
}

function startTimer() {
  if (timerState.running) return;
  timerState.running = true;
  // Test mode ticks every 100ms (10× real speed)
  const ms = testMode ? 100 : 1000;
  timerState.interval = setInterval(timerTick, ms);
  document.getElementById('timer-play-btn').textContent = '⏸';
  document.getElementById('timer-inner').classList.add('timer-running');
}

function pauseTimer() {
  if (!timerState.running) return;
  timerState.running = false;
  clearInterval(timerState.interval);
  document.getElementById('timer-play-btn').textContent = '▶';
  document.getElementById('timer-inner').classList.remove('timer-running');
}

function stopTimer() {
  pauseTimer();
}

function resetTimer() {
  stopTimer();
  timerState.elapsed = 0;
  timerState.remaining = 0;
  timerState.currentRep = 1;
  timerState.phase = 'work';
  timerState.strideCurrent = 1;
}

function skipCurrentPhase() {
  // Jump to end of current phase
  timerState.remaining = 0;
  timerTick();
}

function closeTimerModal() {
  stopTimer();
  stopGPS();
  document.getElementById('timer-modal').classList.add('hidden');
}

// ============================================================
// LOG MODAL
// ============================================================

function openLogModal(workout, weekIndex, dayIndex) {
  pendingLogWorkout = { ...workout, weekIndex, dayIndex };
  selectedRPE = null;

  // Pre-fill form with existing entry if editing
  const existing = getLogEntry(weekIndex, dayIndex);
  document.getElementById('log-distance').value = existing?.distance ?? '';
  document.getElementById('log-time').value = existing?.time ?? '';
  document.getElementById('log-pace').value = existing?.pace ?? '';
  document.getElementById('log-notes').value = existing?.notes ?? '';
  selectedRPE = existing?.rpe ?? null;
  document.querySelectorAll('.rpe-btn').forEach(b => {
    b.classList.toggle('selected', parseInt(b.dataset.rpe) === selectedRPE);
  });

  // Pre-fill timer elapsed if stopwatch was used
  if (timerState.mode === 'stopwatch' && timerState.elapsed > 0) {
    document.getElementById('log-time').value = formatDuration(timerState.elapsed);
  }

  // Pre-fill GPS distance if tracking was active
  if (gpsState.distanceKm > 0) {
    document.getElementById('log-distance').value = gpsState.distanceKm.toFixed(2);
  }

  // Stop GPS when opening log (workout is over)
  stopGPS();

  document.getElementById('log-modal').classList.remove('hidden');
}

function saveLog() {
  if (!pendingLogWorkout) return;

  const distance = parseFloat(document.getElementById('log-distance').value) || null;
  const time = document.getElementById('log-time').value.trim() || null;
  const pace = document.getElementById('log-pace').value.trim() || null;
  const notes = document.getElementById('log-notes').value.trim() || null;
  const rpe = selectedRPE;

  const entry = {
    weekIndex: pendingLogWorkout.weekIndex,
    dayIndex: pendingLogWorkout.dayIndex,
    type: pendingLogWorkout.type,
    date: todayISO(),
    distance,
    time,
    pace,
    rpe,
    notes,
    loggedAt: new Date().toISOString()
  };

  // Remove any existing entry for this workout (allow re-logging)
  progress.workouts = progress.workouts.filter(
    w => !(w.weekIndex === entry.weekIndex && w.dayIndex === entry.dayIndex)
  );
  progress.workouts.push(entry);
  saveProgress();

  document.getElementById('log-modal').classList.add('hidden');

  // Refresh all pages
  renderTodayPage();
  renderWorkoutsPage();
  renderProgressPage();

  pendingLogWorkout = null;
}

// ============================================================
// SETUP MODAL
// ============================================================

function openSetupModal() {
  // Pre-fill
  if (progress.startDate) {
    document.getElementById('start-date-input').value = progress.startDate;
  } else {
    // Default to today
    document.getElementById('start-date-input').value = todayISO();
  }

  // Day picker
  document.querySelectorAll('.day-btn').forEach(btn => {
    const dow = parseInt(btn.dataset.day);
    btn.classList.toggle('active', progress.workoutDays.includes(dow));
  });

  document.getElementById('setup-modal').classList.remove('hidden');
}

function saveSetup() {
  const dateInput = document.getElementById('start-date-input').value;
  if (!dateInput) {
    alert('Please enter a start date.');
    return;
  }

  const selectedDays = [];
  document.querySelectorAll('.day-btn.active').forEach(btn => {
    selectedDays.push(parseInt(btn.dataset.day));
  });

  if (selectedDays.length < 1) {
    alert('Please select at least one workout day.');
    return;
  }

  progress.startDate = dateInput;
  progress.workoutDays = selectedDays.sort((a, b) => a - b);
  saveProgress();

  document.getElementById('setup-modal').classList.add('hidden');
  renderTodayPage();
  renderWorkoutsPage();
}

function resetAllProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  progress = defaultProgress();
  saveProgress();
  document.getElementById('setup-modal').classList.add('hidden');
  renderTodayPage();
  renderWorkoutsPage();
  renderProgressPage();
}

// ============================================================
// DETAIL MODAL
// ============================================================

function openDetailModal(weekIndex, dayIndex) {
  const week = WORKOUTS[weekIndex];
  const workout = week.days[dayIndex];

  document.getElementById('detail-icon').textContent = workout.icon;
  document.getElementById('detail-title').textContent = workout.label;
  document.getElementById('detail-meta').textContent =
    `Week ${week.week} · Day ${dayIndex + 1} · ~${workout.estimated_distance_km} km`;

  const ul = document.getElementById('detail-instructions');
  ul.innerHTML = '';
  workout.instructions.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    ul.appendChild(li);
  });

  const loggedSection = document.getElementById('detail-logged-info');
  const logData = document.getElementById('detail-log-data');
  const entry = getLogEntry(weekIndex, dayIndex);

  if (entry) {
    loggedSection.classList.remove('hidden');
    logData.innerHTML = [
      entry.distance ? `Distance: ${entry.distance} km` : '',
      entry.time     ? `Time: ${entry.time}` : '',
      entry.pace     ? `Pace: ${entry.pace} min/km` : '',
      entry.rpe != null ? `RPE: ${entry.rpe}/10` : '',
      entry.notes    ? `Notes: ${entry.notes}` : '',
    ].filter(Boolean).join('<br>');
  } else {
    loggedSection.classList.add('hidden');
  }

  // Update Log button label depending on whether already logged
  const logBtn = document.getElementById('detail-log-btn');
  logBtn.textContent = entry ? 'Edit Log' : 'Log Workout';

  // Store context on the button for the click handler
  logBtn.dataset.weekIndex = weekIndex;
  logBtn.dataset.dayIndex = dayIndex;

  document.getElementById('detail-modal').classList.remove('hidden');
}

// ============================================================
// NAVIGATION
// ============================================================

function switchPage(name) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const page = document.getElementById(`page-${name}`);
  if (page) {
    page.classList.remove('hidden');
    page.classList.add('active');
  }

  const navBtn = document.querySelector(`.nav-btn[data-page="${name}"]`);
  if (navBtn) navBtn.classList.add('active');

  // Re-render progress when switching to it (charts need canvas in DOM)
  if (name === 'progress') {
    renderProgressPage();
  }
}

function renderNav() {
  // Already rendered in HTML — just bind
}

// ============================================================
// GPS TRACKING
// ============================================================

function toggleGPS() {
  if (gpsState.active) {
    stopGPS();
  } else {
    startGPS();
  }
}

function startGPS() {
  if (!navigator.geolocation) {
    document.getElementById('gps-status').textContent = 'GPS not supported on this device.';
    return;
  }

  gpsState.distanceKm = 0;
  gpsState.lastLat = null;
  gpsState.lastLon = null;
  gpsState.error = null;
  gpsState.active = true;

  updateGPSDisplay();
  document.getElementById('gps-status').textContent = 'Acquiring signal…';
  document.getElementById('gps-toggle-btn').textContent = '🛑 Stop GPS';
  document.getElementById('gps-toggle-btn').classList.add('active');
  document.getElementById('gps-distance-display').classList.remove('hidden');

  gpsState.watchId = navigator.geolocation.watchPosition(
    onGPSPosition,
    onGPSError,
    { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
  );
}

function stopGPS() {
  if (gpsState.watchId != null) {
    navigator.geolocation.clearWatch(gpsState.watchId);
    gpsState.watchId = null;
  }
  gpsState.active = false;
  document.getElementById('gps-toggle-btn').textContent = '📍 Track Distance';
  document.getElementById('gps-toggle-btn').classList.remove('active');
  document.getElementById('gps-status').textContent =
    gpsState.distanceKm > 0 ? `Final: ${gpsState.distanceKm.toFixed(2)} km` : '';
}

function onGPSPosition(pos) {
  const { latitude, longitude, accuracy } = pos.coords;

  // Only accept fixes with reasonable accuracy (< 30m)
  if (accuracy > 30) {
    document.getElementById('gps-status').textContent = `Low accuracy (${Math.round(accuracy)}m) — waiting…`;
    return;
  }

  document.getElementById('gps-status').textContent = `±${Math.round(accuracy)}m accuracy`;

  if (gpsState.lastLat !== null) {
    const d = haversine(gpsState.lastLat, gpsState.lastLon, latitude, longitude);
    // Filter out GPS noise: ignore jumps < 2m or > 50m between ticks
    if (d >= 0.002 && d <= 0.05) {
      gpsState.distanceKm += d;
      updateGPSDisplay();
    }
  }

  gpsState.lastLat = latitude;
  gpsState.lastLon = longitude;
}

function onGPSError(err) {
  const msgs = {
    1: 'Location permission denied. Enable in Settings → Safari → Location.',
    2: 'GPS signal unavailable.',
    3: 'GPS timed out.',
  };
  document.getElementById('gps-status').textContent = msgs[err.code] || 'GPS error.';
}

function updateGPSDisplay() {
  document.getElementById('gps-km').textContent = gpsState.distanceKm.toFixed(2);
}

// Haversine formula — returns distance in km between two lat/lon points
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// ============================================================
// EVENT BINDING
// ============================================================

function bindEvents() {
  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
  });

  // Settings button
  document.getElementById('setup-btn').addEventListener('click', openSetupModal);

  // Today page
  document.getElementById('start-program-btn').addEventListener('click', openSetupModal);
  document.getElementById('view-schedule-btn').addEventListener('click', () => switchPage('workouts'));

  // Setup modal
  document.getElementById('setup-save-btn').addEventListener('click', saveSetup);
  document.getElementById('setup-cancel-btn').addEventListener('click', () => {
    document.getElementById('setup-modal').classList.add('hidden');
  });
  document.getElementById('reset-btn').addEventListener('click', resetAllProgress);

  // Day picker (toggle active)
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Test mode toggle
  document.getElementById('test-mode-btn').addEventListener('click', () => {
    testMode = !testMode;
    document.getElementById('test-mode-btn').classList.toggle('active', testMode);
    // Restart interval at new speed if running
    if (timerState.running) {
      clearInterval(timerState.interval);
      const ms = testMode ? 100 : 1000;
      timerState.interval = setInterval(timerTick, ms);
    }
  });

  // GPS toggle
  document.getElementById('gps-toggle-btn').addEventListener('click', toggleGPS);

  // Timer modal
  document.getElementById('timer-close-btn').addEventListener('click', () => {
    if (confirm('End workout? You can log it manually from the Today page.')) {
      stopGPS();
      closeTimerModal();
    }
  });

  document.getElementById('timer-play-btn').addEventListener('click', () => {
    if (timerState.running) pauseTimer();
    else startTimer();
  });

  document.getElementById('timer-reset-btn').addEventListener('click', () => {
    if (!timerState.workout) return;
    stopTimer();
    // Re-setup
    if (timerState.workout.timer_type === 'interval') setupIntervalTimer(timerState.workout);
    else if (timerState.workout.timer_type === 'countdown') setupCountdownTimer(timerState.workout);
    else setupStopwatch(timerState.workout);
  });

  document.getElementById('timer-skip-btn').addEventListener('click', () => {
    if (timerState.running) skipCurrentPhase();
  });

  document.getElementById('timer-done-btn').addEventListener('click', () => {
    stopTimer();
    const w = timerState.workout;
    closeTimerModal();
    if (w) openLogModal(w, w.weekIndex, w.dayIndex);
  });

  // Log modal
  document.getElementById('log-save-btn').addEventListener('click', saveLog);
  document.getElementById('log-cancel-btn').addEventListener('click', () => {
    document.getElementById('log-modal').classList.add('hidden');
  });

  document.querySelectorAll('.rpe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRPE = parseInt(btn.dataset.rpe);
      document.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Detail modal
  document.getElementById('detail-log-btn').addEventListener('click', (e) => {
    const wIdx = parseInt(e.currentTarget.dataset.weekIndex);
    const dIdx = parseInt(e.currentTarget.dataset.dayIndex);
    const workout = WORKOUTS[wIdx].days[dIdx];
    document.getElementById('detail-modal').classList.add('hidden');
    openLogModal(workout, wIdx, dIdx);
  });

  document.getElementById('detail-close-btn').addEventListener('click', () => {
    document.getElementById('detail-modal').classList.add('hidden');
  });

  // Close modals on backdrop tap
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        if (modal.id === 'timer-modal') stopTimer();
      }
    });
  });

  // Prevent body scroll when modal open
  document.querySelectorAll('.modal-sheet').forEach(sheet => {
    sheet.addEventListener('touchmove', e => e.stopPropagation(), { passive: true });
  });
}

// ============================================================
// UTILITIES
// ============================================================

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function timeStringToSeconds(str) {
  if (!str) return 0;
  const parts = str.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parseInt(str) || 0;
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Vibration
function vibrate(pattern) {
  if (navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) {}
  }
}

// Audio beep (Web Audio API)
let audioCtx = null;
function playBeep() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {}
}
