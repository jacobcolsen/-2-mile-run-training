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

// Phase-based timer state
const timerState = {
  running: false,
  intervalHandle: null,

  phases: [],          // Array of phase objects built per workout
  phaseIndex: 0,       // Which phase we're in

  // Per-phase counters
  elapsed: 0,          // seconds elapsed (stopwatch phases)
  remaining: 0,        // seconds remaining (countdown/interval phases)
  totalSeconds: 0,     // initial value for progress bar

  // Rep tracking (interval/stride phases)
  repCurrent: 1,
  repTotal: 0,
  subPhase: 'work',    // 'work' | 'rest'
  workSeconds: 0,
  restSeconds: 0,

  workout: null,       // full workout object reference
};

// Charts
let charts = {};

// Detail modal context (shared between Start and Log buttons)
let detailContext = { weekIndex: null, dayIndex: null };

// Audio settings — persisted in localStorage
// audioMode: 'voice' | 'beeps' | 'silent'
let audioMode = localStorage.getItem('audioMode') || 'voice';
let selectedVoiceName = localStorage.getItem('selectedVoice') || '';
let availableVoices = [];

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
  updateVoiceBtn();
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
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
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

  // Is today a workout day? Check both schedule and day-of-week guard.
  const todayDOW = today.getDay();
  const todayEntry = schedule.find(s => s.date === isoDate(today));

  if (!todayEntry || !progress.workoutDays.includes(todayDOW)) {
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
// AUDIO / VOICE CUES
// ============================================================

// iOS Safari quirk: getVoices() returns [] on first call and
// onvoiceschanged fires inconsistently. We poll until voices appear.
let voicePollTimer = null;

function loadVoices() {
  if (!window.speechSynthesis) return;

  const raw = window.speechSynthesis.getVoices();
  if (raw.length > 0) {
    availableVoices = raw.filter(v => v.lang.startsWith('en'));
    clearInterval(voicePollTimer);
    populateVoiceSelect();
    return;
  }

  // Not ready yet — start polling if not already
  if (!voicePollTimer) {
    let attempts = 0;
    voicePollTimer = setInterval(() => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0 || ++attempts > 40) {  // give up after ~8 seconds
        clearInterval(voicePollTimer);
        voicePollTimer = null;
        availableVoices = v.filter(v => v.lang.startsWith('en'));
        populateVoiceSelect();
      }
    }, 200);
  }
}

if (window.speechSynthesis) {
  // onvoiceschanged works on Chrome/desktop; polling covers iOS Safari
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

function populateVoiceSelect() {
  const sel = document.getElementById('voice-select');
  if (!sel) return;

  if (availableVoices.length === 0) {
    // Still no voices (iOS may never expose them in Safari without interaction)
    sel.innerHTML = '<option value="">System default</option>';
    sel.disabled = true;
    const hint = document.getElementById('voice-picker-hint');
    if (hint) hint.textContent = 'Voice selection unavailable in Safari — iOS will use its default voice.';
    return;
  }

  sel.disabled = false;
  sel.innerHTML = '';
  availableVoices.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    if (v.name === selectedVoiceName) opt.selected = true;
    sel.appendChild(opt);
  });

  // Auto-select: prefer previously saved, then Samantha, then first
  if (!selectedVoiceName || !availableVoices.find(v => v.name === selectedVoiceName)) {
    const preferred = availableVoices.find(v => v.name === 'Samantha') || availableVoices[0];
    if (preferred) {
      selectedVoiceName = preferred.name;
      sel.value = preferred.name;
    }
  } else {
    sel.value = selectedVoiceName;
  }

  const hint = document.getElementById('voice-picker-hint');
  if (hint) hint.textContent = '';
}

function getVoice() {
  // If no voices loaded, return null — iOS will use its system default
  if (availableVoices.length === 0) return null;
  return availableVoices.find(v => v.name === selectedVoiceName) || availableVoices[0];
}

// Unlock iOS speech synthesis — must be called from a user gesture
function initSpeech() {
  if (!window.speechSynthesis || audioMode !== 'voice') return;
  const unlock = new SpeechSynthesisUtterance('');
  window.speechSynthesis.speak(unlock);
}

function speak(text) {
  if (audioMode !== 'voice' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  const voice = getVoice();
  if (voice) utt.voice = voice;
  utt.rate = 0.95;   // Slightly slower = more natural
  utt.pitch = 1.0;
  utt.volume = 1.0;
  // onend fires when iOS finishes speaking — iOS audio session then
  // automatically resumes any interrupted app (Audible, Spotify, etc.)
  utt.onend = () => {};
  window.speechSynthesis.speak(utt);
}

// Called every tick — announces key countdowns
function announceWarnings(remaining, context) {
  if (remaining === 30) speak('30 seconds.');
  if (remaining === 10) speak('10 seconds.');
  if (remaining === 5)  speak(context === 'rest' ? 'Get ready. 5, 4, 3, 2, 1.' : '5, 4, 3, 2, 1.');
}

// Called on stopwatch ticks — milestone every 5 minutes
function announceMilestone(elapsed) {
  if (elapsed > 0 && elapsed % 300 === 0) {
    const mins = elapsed / 60;
    speak(`${mins} ${mins === 1 ? 'minute' : 'minutes'}.`);
  }
}

// ============================================================
// WORKOUT PHASE BUILDER
// ============================================================

// Returns an ordered array of phase objects for a given workout.
// Phases auto-advance in sequence — warmup → main set → cooldown etc.
function buildWorkoutPhases(workout) {
  const phases = [];

  switch (workout.type) {

    case 'intervals': {
      const reps = workout.repeats;
      const dist = workout.distance || '';
      const rest = workout.rest_seconds_timer || 90;
      phases.push({
        kind: 'countdown', label: 'Warm Up', color: 'green',
        seconds: 600,
        voiceStart: 'Starting warm up. Easy jog for 10 minutes.',
      });
      phases.push({
        kind: 'intervals', label: 'Intervals', color: 'red',
        reps, workSeconds: workout.work_seconds, restSeconds: rest,
        voiceStart: `Warm up complete. ${reps} intervals of ${dist}. Let's go.`,
        voiceRepStart:  (r, t) => `Rep ${r} of ${t}. Go!`,
        voiceRestStart: (r, t) => `Rep ${r} done. Rest.`,
        voiceComplete: 'Intervals complete! Great work.',
      });
      phases.push({
        kind: 'countdown', label: 'Cool Down', color: 'green',
        seconds: 600,
        voiceStart: 'Starting cool down. Easy jog for 10 minutes.',
      });
      break;
    }

    case 'easy': {
      const mins = Math.round((workout.work_seconds || 1800) / 60);
      phases.push({
        kind: 'countdown', label: 'Easy Run', color: 'green',
        seconds: workout.work_seconds || 1800,
        voiceStart: `Starting ${mins} minute easy run. Comfortable, conversational pace.`,
      });
      if (workout.stride_count) {
        const sc = workout.stride_count;
        phases.push({
          kind: 'strides', label: 'Strides', color: 'green',
          reps: sc,
          workSeconds: workout.stride_seconds || 20,
          restSeconds: workout.stride_rest_seconds || 60,
          voiceStart: `Easy run complete. Now ${sc} strides. Fast but relaxed.`,
          voiceRepStart:  (r, t) => `Stride ${r} of ${t}. Go!`,
          voiceRestStart: (r)    => `Stride ${r} done. Walk for 60 seconds.`,
          voiceComplete: 'All strides done. Great workout!',
        });
      }
      break;
    }

    case 'tempo': {
      const tempoMins = Math.round((workout.work_seconds || 900) / 60);
      const isSpeed = workout.label === 'Tempo + Speed';
      phases.push({
        kind: 'countdown', label: 'Warm Up', color: 'green',
        seconds: 600,
        voiceStart: 'Starting warm up. Easy jog for 10 minutes.',
      });
      phases.push({
        kind: 'countdown', label: 'Tempo Run', color: 'orange',
        seconds: workout.work_seconds,
        voiceStart: `Warm up complete. ${tempoMins} minute tempo run. Comfortably hard — about 7 out of 10 effort.`,
      });
      if (isSpeed) {
        phases.push({
          kind: 'strides', label: '200m Reps', color: 'red',
          reps: 4, workSeconds: 45, restSeconds: 90,
          voiceStart: 'Tempo complete. Now 4 times 200 meters. Fast but controlled.',
          voiceRepStart:  (r, t) => `200 meter rep ${r} of ${t}. Go fast!`,
          voiceRestStart: (r)    => `Rep ${r} done. 90 second recovery.`,
          voiceComplete: 'Speed work complete!',
        });
      }
      phases.push({
        kind: 'countdown', label: 'Cool Down', color: 'green',
        seconds: 300,
        voiceStart: isSpeed
          ? 'Starting cool down. 5 minutes easy.'
          : 'Tempo complete! Cool down for 5 minutes.',
      });
      break;
    }

    case 'long': {
      phases.push({
        kind: 'stopwatch', label: 'Long Run', color: 'blue',
        voiceStart: 'Starting long run. Easy comfortable pace. Focus on time on feet.',
      });
      break;
    }

    case 'race': {
      phases.push({
        kind: 'stopwatch', label: '2-Mile Time Trial', color: 'red',
        voiceStart: 'Race time! Run 2 miles as fast as you can. Good luck!',
      });
      break;
    }

    default: {
      phases.push({
        kind: 'stopwatch', label: workout.label, color: 'green',
        voiceStart: `Starting ${workout.label}.`,
      });
    }
  }

  // Annotate each phase with its index and total count
  phases.forEach((p, i) => {
    p.phaseIndex = i;
    p.totalPhases = phases.length;
    p.phaseLabel = phases.length > 1 ? `Phase ${i + 1} of ${phases.length}` : '';
  });

  return phases;
}

// ============================================================
// TIMER MODAL
// ============================================================

function openTimerModal(workout, weekIndex, dayIndex) {
  timerState.workout = { ...workout, weekIndex, dayIndex };
  timerState.phases = buildWorkoutPhases(workout);
  timerState.running = false;
  clearInterval(timerState.intervalHandle);

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

  // Set up header
  document.getElementById('timer-workout-label').textContent = workout.label;
  document.getElementById('timer-play-btn').textContent = '▶';
  document.getElementById('timer-inner').classList.remove('timer-running');

  // Init first phase and show modal
  initPhase(0);
  document.getElementById('timer-modal').classList.remove('hidden');
}

// Set up state for phase[index] without starting the timer
function initPhase(index) {
  const phase = timerState.phases[index];
  timerState.phaseIndex = index;
  timerState.subPhase = 'work';
  timerState.repCurrent = 1;
  timerState.repTotal = phase.reps || 0;

  if (phase.kind === 'countdown') {
    timerState.remaining = phase.seconds;
    timerState.totalSeconds = phase.seconds;
    timerState.elapsed = 0;
  } else if (phase.kind === 'intervals' || phase.kind === 'strides') {
    timerState.workSeconds = phase.workSeconds;
    timerState.restSeconds = phase.restSeconds;
    timerState.remaining = phase.workSeconds;
    timerState.totalSeconds = phase.workSeconds;
    timerState.elapsed = 0;
  } else {
    // stopwatch
    timerState.elapsed = 0;
    timerState.remaining = 0;
    timerState.totalSeconds = 0;
  }

  updateTimerDisplay();
}

// Advance to the next phase (called when current phase completes)
function advancePhase() {
  vibrate([200, 100, 200]);
  playBeep('end');

  if (timerState.phaseIndex < timerState.phases.length - 1) {
    const nextIndex = timerState.phaseIndex + 1;
    initPhase(nextIndex);
    const next = timerState.phases[nextIndex];
    if (next.voiceStart) setTimeout(() => speak(next.voiceStart), 600);
  } else {
    // All phases done — workout complete
    pauseTimer();
    speak('Workout complete! Great job!');
    vibrate([300, 100, 300, 100, 300]);
    document.getElementById('timer-phase-label').textContent = 'Complete! 🎉';
    document.getElementById('timer-phase-sub').textContent = '';
  }
}

function timerTick() {
  const phase = timerState.phases[timerState.phaseIndex];

  // --- Stopwatch ---
  if (phase.kind === 'stopwatch') {
    timerState.elapsed++;
    updateTimerDisplay();
    announceMilestone(timerState.elapsed);
    return;
  }

  // --- Countdown ---
  if (phase.kind === 'countdown') {
    if (timerState.remaining > 0) {
      timerState.remaining--;
      updateTimerDisplay();
      announceWarnings(timerState.remaining, 'work');
    } else {
      advancePhase();
    }
    return;
  }

  // --- Intervals or Strides ---
  if (timerState.remaining > 0) {
    timerState.remaining--;
    updateTimerDisplay();
    announceWarnings(timerState.remaining, timerState.subPhase);
    return;
  }

  // Phase boundary within rep set
  if (timerState.subPhase === 'work') {
    if (timerState.repCurrent >= timerState.repTotal) {
      // All reps done — go to next workout phase
      if (phase.voiceComplete) setTimeout(() => speak(phase.voiceComplete), 100);
      vibrate([200, 100, 200, 100, 200]);
      playBeep('end');   // Distinct "done" tone
      advancePhase();
    } else {
      // Switch to rest
      timerState.subPhase = 'rest';
      timerState.remaining = timerState.restSeconds;
      timerState.totalSeconds = timerState.restSeconds;
      const msg = phase.voiceRestStart
        ? phase.voiceRestStart(timerState.repCurrent, timerState.repTotal)
        : `Rep ${timerState.repCurrent} done. Rest.`;
      setTimeout(() => speak(msg), 100);
      vibrate([150, 80, 150]);
      playBeep('low');   // Low tone = rest
      updateTimerDisplay();
    }
  } else {
    // Rest done — start next rep
    timerState.repCurrent++;
    timerState.subPhase = 'work';
    timerState.remaining = timerState.workSeconds;
    timerState.totalSeconds = timerState.workSeconds;
    const msg = phase.voiceRepStart
      ? phase.voiceRepStart(timerState.repCurrent, timerState.repTotal)
      : `Rep ${timerState.repCurrent}. Go!`;
    setTimeout(() => speak(msg), 100);
    vibrate([200, 100, 200]);
    playBeep('high');   // High tone = go
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  const phase = timerState.phases[timerState.phaseIndex];

  // Phase label — shows 'Rest' during rest sub-phases
  const isRest = (phase.kind === 'intervals' || phase.kind === 'strides') && timerState.subPhase === 'rest';
  document.getElementById('timer-phase-label').textContent = isRest ? 'Rest' : phase.label;
  document.getElementById('timer-phase-sub').textContent = phase.phaseLabel || '';

  // Main display
  if (phase.kind === 'stopwatch') {
    document.getElementById('timer-main-display').textContent = formatDuration(timerState.elapsed);
  } else {
    document.getElementById('timer-main-display').textContent = formatTime(timerState.remaining);
  }

  // Rep row
  const repRow = document.getElementById('timer-rep-row');
  if (phase.kind === 'intervals' || phase.kind === 'strides') {
    repRow.classList.remove('hidden');
    document.getElementById('timer-rep-current').textContent = timerState.repCurrent;
    document.getElementById('timer-rep-total').textContent = timerState.repTotal;
  } else {
    repRow.classList.add('hidden');
  }

  // Progress bar
  const wrap = document.getElementById('timer-progress-wrap');
  if (phase.kind !== 'stopwatch' && timerState.totalSeconds > 0) {
    wrap.classList.remove('hidden');
    const pct = (timerState.remaining / timerState.totalSeconds) * 100;
    document.getElementById('timer-progress-bar').style.width = `${pct}%`;
  } else {
    wrap.classList.add('hidden');
  }

  // Rep dots
  const dotsEl = document.getElementById('timer-dots');
  if (phase.kind === 'intervals' || phase.kind === 'strides') {
    dotsEl.classList.remove('hidden');
    refreshDots(timerState.repCurrent, timerState.repTotal, timerState.subPhase);
  } else {
    dotsEl.classList.add('hidden');
  }

  // Color theme on the container drives CSS variables
  const color = isRest ? 'rest' : (phase.color || 'default');
  document.getElementById('timer-inner').dataset.color = color;
}

function refreshDots(current, total, subPhase) {
  const container = document.getElementById('timer-dots');
  if (container.children.length !== total) {
    container.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'interval-dot';
      container.appendChild(d);
    }
  }
  Array.from(container.children).forEach((dot, i) => {
    dot.classList.remove('done', 'current', 'current-rest');
    if (i < current - 1) dot.classList.add('done');
    else if (i === current - 1) dot.classList.add(subPhase === 'rest' ? 'current-rest' : 'current');
  });
}

function startTimer() {
  if (timerState.running) return;
  initSpeech(); // Unlock iOS speech synthesis on user gesture
  initBeeps();  // Pre-generate WAV blobs so first beep isn't delayed

  // Auto-start GPS tracking on first press
  if (!gpsState.active) {
    startGPS();
  }

  // Announce current phase on first press
  const phase = timerState.phases[timerState.phaseIndex];
  const isFirstTick = timerState.elapsed === 0 &&
    (phase.kind === 'stopwatch' || timerState.remaining === timerState.totalSeconds);
  if (isFirstTick && phase.voiceStart) {
    setTimeout(() => speak(phase.voiceStart), 400);
  }

  timerState.running = true;
  timerState.intervalHandle = setInterval(timerTick, 1000);
  document.getElementById('timer-play-btn').textContent = '⏸';
  document.getElementById('timer-inner').classList.add('timer-running');
}

function pauseTimer() {
  if (!timerState.running) return;
  timerState.running = false;
  clearInterval(timerState.intervalHandle);
  document.getElementById('timer-play-btn').textContent = '▶';
  document.getElementById('timer-inner').classList.remove('timer-running');
}

function skipCurrentPhase() {
  const phase = timerState.phases[timerState.phaseIndex];
  if (phase.kind === 'stopwatch') return; // nothing to skip on a stopwatch
  timerState.remaining = 0;
  timerTick(); // trigger the boundary logic immediately
}

function closeTimerModal() {
  pauseTimer();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
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
  // Pre-fill date
  document.getElementById('start-date-input').value =
    progress.startDate || todayISO();

  // Day picker
  document.querySelectorAll('.day-btn').forEach(btn => {
    const dow = parseInt(btn.dataset.day);
    btn.classList.toggle('active', progress.workoutDays.includes(dow));
  });

  // Audio mode picker
  document.querySelectorAll('.segment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === audioMode);
  });
  document.getElementById('voice-picker-group').style.display =
    audioMode === 'voice' ? 'block' : 'none';

  // iOS often won't have voices until after a user gesture — retry now
  // since opening settings IS a user gesture
  loadVoices();
  // Also refresh the select with whatever we have right now
  populateVoiceSelect();

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

  // Save audio prefs
  const activeMode = document.querySelector('.segment-btn.active')?.dataset.mode || 'voice';
  audioMode = activeMode;
  localStorage.setItem('audioMode', audioMode);
  const voiceSel = document.getElementById('voice-select');
  if (voiceSel.value) {
    selectedVoiceName = voiceSel.value;
    localStorage.setItem('selectedVoice', selectedVoiceName);
  }
  updateVoiceBtn();

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

  // Store context for the Start and Log button handlers
  detailContext = { weekIndex, dayIndex };

  // Update button labels
  document.getElementById('detail-log-btn').textContent = entry ? 'Edit Log' : 'Log Workout';

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

  // Quick mute toggle on the timer screen
  document.getElementById('voice-btn').addEventListener('click', () => {
    if (audioMode === 'silent') {
      audioMode = localStorage.getItem('audioMode') || 'voice';
    } else {
      audioMode = 'silent';
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
    updateVoiceBtn();
  });

  // Audio mode segmented picker
  document.querySelectorAll('.segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      document.getElementById('voice-picker-group').style.display =
        mode === 'voice' ? 'block' : 'none';
    });
  });

  // Voice preview button
  document.getElementById('voice-preview-btn').addEventListener('click', () => {
    const sel = document.getElementById('voice-select');
    selectedVoiceName = sel.value;
    const savedMode = audioMode;
    audioMode = 'voice'; // temporarily force voice for preview
    initSpeech();
    setTimeout(() => speak("Rep 3 of 6. Go! 10 seconds. Intervals complete, great work!"), 200);
    audioMode = savedMode;
  });

  // Voice select change
  document.getElementById('voice-select').addEventListener('change', (e) => {
    selectedVoiceName = e.target.value;
  });

  // GPS toggle
  document.getElementById('gps-toggle-btn').addEventListener('click', toggleGPS);

  // Timer modal — close
  document.getElementById('timer-close-btn').addEventListener('click', () => {
    if (confirm('End workout? You can log it manually.')) {
      closeTimerModal();
    }
  });

  // Timer modal — play/pause
  document.getElementById('timer-play-btn').addEventListener('click', () => {
    if (timerState.running) pauseTimer();
    else startTimer();
  });

  // Timer modal — restart from phase 1
  document.getElementById('timer-reset-btn').addEventListener('click', () => {
    if (!timerState.workout) return;
    pauseTimer();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    initPhase(0);
  });

  // Timer modal — skip current phase
  document.getElementById('timer-skip-btn').addEventListener('click', () => {
    skipCurrentPhase();
  });

  // Timer modal — done, open log
  document.getElementById('timer-done-btn').addEventListener('click', () => {
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

  // Detail modal — Start Workout
  document.getElementById('detail-start-btn').addEventListener('click', () => {
    const { weekIndex, dayIndex } = detailContext;
    if (weekIndex === null) return;
    const workout = WORKOUTS[weekIndex].days[dayIndex];
    document.getElementById('detail-modal').classList.add('hidden');
    openTimerModal(workout, weekIndex, dayIndex);
  });

  // Detail modal — Log Workout / Edit Log
  document.getElementById('detail-log-btn').addEventListener('click', () => {
    const { weekIndex, dayIndex } = detailContext;
    if (weekIndex === null) return;
    const workout = WORKOUTS[weekIndex].days[dayIndex];
    document.getElementById('detail-modal').classList.add('hidden');
    openLogModal(workout, weekIndex, dayIndex);
  });

  document.getElementById('detail-close-btn').addEventListener('click', () => {
    document.getElementById('detail-modal').classList.add('hidden');
  });

  // Close modals on backdrop tap
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        if (modal.id === 'timer-modal') pauseTimer();
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

function updateVoiceBtn() {
  const btn = document.getElementById('voice-btn');
  if (!btn) return;
  const icons = { voice: '🔊', beeps: '🔔', silent: '🔇' };
  btn.textContent = icons[audioMode] || '🔊';
}

// Vibration
function vibrate(pattern) {
  if (navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) {}
  }
}

// ---- Beep tones via <audio> + generated WAV ----
// Using <audio> instead of AudioContext so iOS treats playback as a proper
// audio-session interruption — this is what pauses Audible/Spotify/podcasts
// and resumes them automatically when the beep finishes.
//
// speechSynthesis already does this natively on iOS (it uses the "speech"
// audio session category). We match that behavior for beeps by routing
// through an Audio element, which iOS places in the "playback" session.

const beepCache = {};

// Build a short sine-wave WAV in memory and return a reusable Blob URL.
// freq: Hz, dur: seconds, fadeMs: ms of linear fade-out
function makeBeepUrl(freq, dur, fadeMs = 80) {
  const sr = 22050;
  const n  = Math.floor(sr * dur);
  const buf = new ArrayBuffer(44 + n * 2);
  const v   = new DataView(buf);
  const str = (off, s) => [...s].forEach((c, i) => v.setUint8(off + i, c.charCodeAt(0)));

  // Minimal WAV header (PCM, 16-bit, mono)
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true);
  str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true);    // chunk size
  v.setUint16(20, 1, true);     // PCM
  v.setUint16(22, 1, true);     // mono
  v.setUint32(24, sr, true);    // sample rate
  v.setUint32(28, sr * 2, true);// byte rate
  v.setUint16(32, 2, true);     // block align
  v.setUint16(34, 16, true);    // bits per sample
  str(36, 'data'); v.setUint32(40, n * 2, true);

  const fadeStart = n - Math.floor(sr * fadeMs / 1000);
  for (let i = 0; i < n; i++) {
    const env = i >= fadeStart ? (n - i) / (n - fadeStart) : 1;
    const s   = Math.sin(2 * Math.PI * freq * i / sr) * 0.65 * env;
    v.setInt16(44 + i * 2, Math.round(s * 32767), true);
  }
  return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
}

function getBeepUrl(type) {
  if (!beepCache[type]) {
    if (type === 'high')     beepCache.high = makeBeepUrl(880, 0.22);
    else if (type === 'low') beepCache.low  = makeBeepUrl(523, 0.32); // C5
    else if (type === 'end') beepCache.end  = makeBeepUrl(660, 0.18); // E5
  }
  return beepCache[type];
}

// Call once from a user-gesture to pre-generate and warm up Audio on iOS
function initBeeps() {
  ['high', 'low', 'end'].forEach(getBeepUrl);
}

function playBeep(type = 'high') {
  if (audioMode === 'silent') return;
  try {
    const audio = new Audio(getBeepUrl(type));
    audio.play().catch(() => {});
  } catch (e) {}
}
