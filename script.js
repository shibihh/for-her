/**
 * CODE ROMANCE - CORE LOGIC & INTERACTION ENGINE
 * Built with pure devotion, clean JavaScript & Web Audio API
 */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    crushName: "My Crush",
    proposerName: "Your Dev",
    customNote: "I promise to love you, support your dreams, make you laugh on hard days, and treat you like the treasure you truly are. Let’s make this official!",
    theme: "theme-neon-rose",
    musicPlaying: false,
    noHoverCount: 0,
    startTime: null,
    timerInterval: null
  };

  // Themes list
  const THEMES = [
    { id: "theme-neon-rose", name: "Rose Neon" },
    { id: "theme-cyber-violet", name: "Cyber Violet" },
    { id: "theme-emerald-matrix", name: "Emerald Love" },
    { id: "theme-pastel-sunset", name: "Pastel Sunset" }
  ];

  // Evasive No Button witty developer messages
  const EVASIVE_MSGS = [
    "Error 404: 'No' option not found on this server.",
    "Permission denied: Sudo command required to reject.",
    "SyntaxError: Expected 'YES' at line 1, found 'No'.",
    "Merge conflict: Automatic resolution requires saying YES.",
    "Segmentation fault: Heart cannot process rejection.",
    "Network timeout: The universe dropped that response packet.",
    "Unhandled Exception: You are far too cute to click No!"
  ];

  // DOM Elements cache
  const el = {
    ambientCanvas: document.getElementById('ambientCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    audioToggleBtn: document.getElementById('audioToggleBtn'),
    floatingMusicBtn: document.getElementById('floatingMusicBtn'),
    musicStatusText: document.getElementById('musicStatusText'),
    themeCycleBtn: document.getElementById('themeCycleBtn'),
    themeNameText: document.getElementById('themeNameText'),
    openCustomizeBtn: document.getElementById('openCustomizeBtn'),
    customizeFooterBtn: document.getElementById('customizeFooterBtn'),
    closeCustomizeBtn: document.getElementById('closeCustomizeBtn'),
    customizeModal: document.getElementById('customizeModal'),
    saveAndApplyBtn: document.getElementById('saveAndApplyBtn'),
    copyShareLinkBtn: document.getElementById('copyShareLinkBtn'),
    copySuccessMsg: document.getElementById('copySuccessMsg'),
    inputCrushName: document.getElementById('inputCrushName'),
    inputProposerName: document.getElementById('inputProposerName'),
    inputCustomNote: document.getElementById('inputCustomNote'),
    themeSelect: document.getElementById('themeSelect'),
    lineNumbers: document.getElementById('lineNumbers'),
    activeTabFileName: document.getElementById('activeTabFileName'),
    runCodeBtn: document.getElementById('runCodeBtn'),
    bottomRunTrigger: document.getElementById('bottomRunTrigger'),
    heroRunBtn: document.getElementById('heroRunBtn'),
    heroExploreBtn: document.getElementById('heroExploreBtn'),
    floatingProposalBtn: document.getElementById('floatingProposalBtn'),
    terminalDrawer: document.getElementById('terminalDrawer'),
    closeTerminalBtn: document.getElementById('closeTerminalBtn'),
    terminalOutput: document.getElementById('terminalOutput'),
    buildStatusBadge: document.getElementById('buildStatusBadge'),
    proposalModal: document.getElementById('proposalModal'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    buttonPlayground: document.getElementById('buttonPlayground'),
    evasiveAlert: document.getElementById('evasiveAlert'),
    evasiveAlertText: document.getElementById('evasiveAlertText'),
    celebrationOverlay: document.getElementById('celebrationOverlay'),
    closeCelebrationBtn: document.getElementById('closeCelebrationBtn'),
    replayCelebrationBtn: document.getElementById('replayCelebrationBtn'),
    saveScreenshotBtn: document.getElementById('saveScreenshotBtn'),
    relationshipTimer: document.getElementById('timerSeconds'),
    modalCustomNote: document.getElementById('modalCustomNote'),
    heroCrushName: document.getElementById('heroCrushName'),
    heroProposerName: document.getElementById('heroProposerName'),
    certCommitId: document.getElementById('certCommitId')
  };

  // ==========================================================================
  // WEB AUDIO SYNTHESIZER (LO-FI ROMANTIC AMBIENT ENGINE & SFX)
  // Zero external MP3 files needed! Guaranteed 100% offline & instant playback.
  // ==========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.musicTimer = null;
      this.step = 0;
      // Gentle romantic chord progression in Pentatonic/Lydian major
      this.chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
        [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
        [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
        [196.00, 246.94, 293.66, 392.00]  // G7/Gsus (G3, B3, D4, G4)
      ];
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Play a single soft synthetic bell / piano note
    playNote(freq, duration = 1.4, type = 'sine', gainVal = 0.08) {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(gainVal, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (err) {
        console.warn("Audio error", err);
      }
    }

    // UI Click Sound
    playClick() {
      this.init();
      this.playNote(520, 0.08, 'triangle', 0.05);
    }

    // Cute run code sound
    playRunChime() {
      this.init();
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((n, idx) => {
        setTimeout(() => this.playNote(n, 0.3, 'sine', 0.06), idx * 75);
      });
    }

    // Celebratory victory fanfare
    playCelebrationFanfare() {
      this.init();
      const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      arpeggio.forEach((n, idx) => {
        setTimeout(() => this.playNote(n, 1.2, 'triangle', 0.12), idx * 120);
      });
    }

    // Playful Evasive "Whoosh"
    playEvasion() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    }

    // Lo-Fi Arpeggio loop
    startLoFiMusic() {
      this.init();
      this.isPlaying = true;
      this.step = 0;
      
      const stepMusic = () => {
        if (!this.isPlaying) return;
        const currentChord = this.chords[Math.floor(this.step / 4) % this.chords.length];
        const noteIndex = this.step % currentChord.length;
        const noteFreq = currentChord[noteIndex];

        // Soft melodic note
        this.playNote(noteFreq, 1.6, 'sine', 0.07);

        // Light harmonic shimmer
        if (this.step % 2 === 0) {
          this.playNote(noteFreq * 2, 0.8, 'triangle', 0.02);
        }

        this.step++;
        this.musicTimer = setTimeout(stepMusic, 550);
      };

      stepMusic();
    }

    stopLoFiMusic() {
      this.isPlaying = false;
      if (this.musicTimer) {
        clearTimeout(this.musicTimer);
        this.musicTimer = null;
      }
    }
  }

  const sound = new SoundEngine();

  // ==========================================================================
  // AMBIENT PARTICLES ENGINE (BINARY CODE + FLOATING HEARTS CANVAS)
  // ==========================================================================
  function initAmbientCanvas() {
    const canvas = el.ambientCanvas;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const SYMBOLS = ['0', '1', '♥', '<3', '{ }', '=>', '++', '101', 'git'];
    const PARTICLE_COUNT = Math.min(45, Math.floor(width / 30));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: 0.3 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.4,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        size: 11 + Math.random() * 12,
        opacity: 0.15 + Math.random() * 0.35,
        isHeart: Math.random() > 0.6
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        if (p.isHeart || p.symbol === '♥' || p.symbol === '<3') {
          ctx.fillStyle = `rgba(255, 107, 157, ${p.opacity * 1.5})`;
        } else {
          ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
        }
        ctx.fillText(p.symbol, p.x, p.y);
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  // ==========================================================================
  // CONFETTI & HEART BURST ENGINE (CELEBRATION ON "YES")
  // ==========================================================================
  function fireConfetti() {
    const canvas = el.confettiCanvas;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const confettiPieces = [];
    const colors = ['#ff4d8d', '#ff75a0', '#a78bfa', '#38bdf8', '#34d399', '#fbbf24', '#ffffff'];

    for (let i = 0; i < 180; i++) {
      confettiPieces.push({
        x: width / 2,
        y: height / 2 + 50,
        vx: (Math.random() - 0.5) * 22,
        vy: (Math.random() - 0.8) * 20,
        size: 7 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        gravity: 0.45,
        opacity: 1,
        isHeart: Math.random() > 0.4
      });
    }

    let animationFrame;
    function update() {
      ctx.clearRect(0, 0, width, height);
      let activeCount = 0;

      confettiPieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.vRot;
        p.opacity -= 0.006;

        if (p.opacity > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);

          if (p.isHeart) {
            ctx.fillStyle = p.color;
            ctx.font = `${p.size * 1.5}px sans-serif`;
            ctx.fillText('💖', -p.size / 2, p.size / 2);
          } else {
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          }
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrame = requestAnimationFrame(update);
      }
    }

    update();
  }

  // ==========================================================================
  // IDE LINE NUMBERS & TAB NAVIGATION
  // ==========================================================================
  function generateLineNumbers() {
    if (!el.lineNumbers) return;
    const lines = 52; // code length
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<span>${i}</span>`;
    }
    el.lineNumbers.innerHTML = html;
  }

  function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const sidebarButtons = document.querySelectorAll('.file-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    const fileMap = {
      proposal: 'proposal.ts',
      commits: 'git_log.md',
      reasons: 'reasons.json',
      letter: 'love_letter.md',
      terminal: 'proposal.ts'
    };

    function activateTab(tabId) {
      sound.playClick();

      // If clicked debugger terminal
      if (tabId === 'terminal') {
        openTerminalDrawer();
        return;
      }

      tabButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
      });

      sidebarButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
      });

      tabPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === `tab-${tabId}`);
      });

      if (el.activeTabFileName && fileMap[tabId]) {
        el.activeTabFileName.textContent = fileMap[tabId];
      }
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });

    sidebarButtons.forEach((btn) => {
      btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });
  }

  // ==========================================================================
  // RUN CODE SEQUENCE & TERMINAL LOGS
  // ==========================================================================
  function openTerminalDrawer() {
    el.terminalDrawer.classList.add('open');
  }

  function closeTerminalDrawer() {
    el.terminalDrawer.classList.remove('open');
  }

  function executeCodeProposal() {
    sound.playRunChime();
    openTerminalDrawer();

    const output = el.terminalOutput;
    output.innerHTML = '';
    el.buildStatusBadge.textContent = 'COMPILING...';
    el.buildStatusBadge.style.color = '#fbbf24';

    const logs = [
      { text: `$ tsc --target ES2026 src/proposal.ts`, cls: 'text-muted', delay: 100 },
      { text: `[1/4] Inspecting feelings repository for "${state.crushName}"...`, cls: 'text-muted', delay: 400 },
      { text: `[2/4] Verifying compatibility quotient... 100% PERFECT MATCH!`, cls: 'text-success', delay: 850 },
      { text: `[3/4] Memory usage: 0MB free (100% allocated to thinking of her)`, cls: 'text-pink', delay: 1300 },
      { text: `[4/4] Executing proposeForever() sequence...`, cls: 'text-muted', delay: 1750 },
      { text: `✨ SYSTEM READY: Critical proposal request waiting for answer!`, cls: 'text-pink', delay: 2200 }
    ];

    logs.forEach((item) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = `log-line ${item.cls}`;
        div.textContent = item.text;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
      }, item.delay);
    });

    setTimeout(() => {
      el.buildStatusBadge.textContent = 'READY TO MERGE';
      el.buildStatusBadge.style.color = '#34d399';
      openProposalModal();
    }, 2500);
  }

  // ==========================================================================
  // THE PROPOSAL MODAL & EVASIVE "NO" BUTTON
  // ==========================================================================
  function openProposalModal() {
    el.proposalModal.classList.add('active');
    state.noHoverCount = 0;
    resetNoButton();
  }

  function closeProposalModal() {
    el.proposalModal.classList.remove('active');
  }

  function resetNoButton() {
    const btn = el.noBtn;
    btn.classList.remove('evading');
    btn.style.left = '';
    btn.style.top = '';
    btn.style.transform = '';
    btn.innerText = 'No';
    if (el.evasiveAlert) {
      el.evasiveAlert.style.display = 'none';
    }
  }

  // The fun evasive logic!
  function evadeNoButton(e) {
    sound.playEvasion();
    state.noHoverCount++;

    const btn = el.noBtn;
    const playground = el.buttonPlayground;
    const rect = playground.getBoundingClientRect();

    btn.classList.add('evading');

    // Calculate boundary within the playground
    const maxLeft = rect.width - btn.offsetWidth - 20;
    const maxTop = rect.height - btn.offsetHeight - 10;

    const randomLeft = Math.max(10, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(0, Math.floor(Math.random() * maxTop));

    btn.style.left = `${randomLeft}px`;
    btn.style.top = `${randomTop}px`;

    // Display witty dev message
    const msg = EVASIVE_MSGS[(state.noHoverCount - 1) % EVASIVE_MSGS.length];
    if (el.evasiveAlert && el.evasiveAlertText) {
      el.evasiveAlertText.textContent = msg;
      el.evasiveAlert.style.display = 'inline-flex';
    }

    // Shrink slightly or change text if stubborn
    if (state.noHoverCount >= 3) {
      btn.innerText = 'Are you sure? 🥺';
    }
    if (state.noHoverCount >= 5) {
      btn.innerText = 'Error: 404';
    }
  }

  // "YES!" Button Celebration
  function handleYesClick() {
    sound.playCelebrationFanfare();
    closeProposalModal();
    el.celebrationOverlay.classList.add('active');
    fireConfetti();

    // Start live relationship timer
    state.startTime = new Date();
    if (state.timerInterval) clearInterval(state.timerInterval);

    state.timerInterval = setInterval(updateRelationshipTimer, 1000);
    updateRelationshipTimer();

    // Random commit id
    if (el.certCommitId) {
      const hash = Math.random().toString(16).substring(2, 9);
      el.certCommitId.textContent = `HASH: ${hash}-FOREVER`;
    }
  }

  function updateRelationshipTimer() {
    if (!state.startTime || !el.relationshipTimer) return;
    const now = new Date();
    const diffMs = now - state.startTime;
    const totalSecs = Math.floor(diffMs / 1000);

    const hours = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');

    el.relationshipTimer.textContent = `${hours}:${mins}:${secs}`;
  }

  // ==========================================================================
  // CUSTOMIZATION & STATE PERSISTENCE
  // ==========================================================================
  function renderDynamicNames() {
    // Update all occurrences of dynamic-crush
    document.querySelectorAll('.dynamic-crush').forEach((node) => {
      node.textContent = state.crushName;
    });

    // Update all occurrences of dynamic-proposer
    document.querySelectorAll('.dynamic-proposer').forEach((node) => {
      node.textContent = state.proposerName;
    });

    if (el.heroCrushName) el.heroCrushName.textContent = state.crushName;
    if (el.heroProposerName) el.heroProposerName.textContent = state.proposerName;
    if (el.modalCustomNote) el.modalCustomNote.textContent = state.customNote;
  }

  function applyTheme(themeId) {
    THEMES.forEach((t) => document.body.classList.remove(t.id));
    document.body.classList.add(themeId);
    state.theme = themeId;

    const currentTheme = THEMES.find((t) => t.id === themeId);
    if (el.themeNameText && currentTheme) {
      el.themeNameText.textContent = currentTheme.name;
    }
    if (el.themeSelect) {
      el.themeSelect.value = themeId;
    }
  }

  function loadStateFromStorageOrURL() {
    // Check URL params / hash first: #crush=Sarah&proposer=Alex&note=...
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash || window.location.search);

    const urlCrush = searchParams.get('crush') || searchParams.get('name');
    const urlProposer = searchParams.get('proposer') || searchParams.get('dev');
    const urlNote = searchParams.get('note');
    const urlTheme = searchParams.get('theme');

    if (urlCrush) state.crushName = decodeURIComponent(urlCrush);
    if (urlProposer) state.proposerName = decodeURIComponent(urlProposer);
    if (urlNote) state.customNote = decodeURIComponent(urlNote);
    if (urlTheme) state.theme = urlTheme;

    // LocalStorage fallback
    if (!urlCrush && localStorage.getItem('code_crush_name')) {
      state.crushName = localStorage.getItem('code_crush_name');
    }
    if (!urlProposer && localStorage.getItem('code_proposer_name')) {
      state.proposerName = localStorage.getItem('code_proposer_name');
    }
    if (!urlNote && localStorage.getItem('code_custom_note')) {
      state.customNote = localStorage.getItem('code_custom_note');
    }
    if (!urlTheme && localStorage.getItem('code_theme')) {
      state.theme = localStorage.getItem('code_theme');
    }

    // Populate inputs
    if (el.inputCrushName) el.inputCrushName.value = state.crushName;
    if (el.inputProposerName) el.inputProposerName.value = state.proposerName;
    if (el.inputCustomNote) el.inputCustomNote.value = state.customNote;

    applyTheme(state.theme);
    renderDynamicNames();
  }

  function saveCustomization() {
    sound.playClick();
    if (el.inputCrushName && el.inputCrushName.value.trim()) {
      state.crushName = el.inputCrushName.value.trim();
      localStorage.setItem('code_crush_name', state.crushName);
    }
    if (el.inputProposerName && el.inputProposerName.value.trim()) {
      state.proposerName = el.inputProposerName.value.trim();
      localStorage.setItem('code_proposer_name', state.proposerName);
    }
    if (el.inputCustomNote && el.inputCustomNote.value.trim()) {
      state.customNote = el.inputCustomNote.value.trim();
      localStorage.setItem('code_custom_note', state.customNote);
    }
    if (el.themeSelect) {
      applyTheme(el.themeSelect.value);
      localStorage.setItem('code_theme', state.theme);
    }

    renderDynamicNames();
    el.customizeModal.classList.remove('active');
  }

  function copyShareLink() {
    sound.playClick();
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      crush: state.crushName,
      proposer: state.proposerName,
      note: state.customNote,
      theme: state.theme
    });

    const fullShareUrl = `${baseUrl}#${params.toString()}`;

    navigator.clipboard.writeText(fullShareUrl).then(() => {
      if (el.copySuccessMsg) {
        el.copySuccessMsg.style.display = 'block';
        setTimeout(() => {
          el.copySuccessMsg.style.display = 'none';
        }, 3000);
      }
    }).catch(() => {
      prompt("Copy this romantic link to send to her:", fullShareUrl);
    });
  }

  // ==========================================================================
  // EVENT LISTENERS & INITIALIZATION
  // ==========================================================================
  function setupEventListeners() {
    // Music toggles
    function toggleMusic() {
      if (state.musicPlaying) {
        sound.stopLoFiMusic();
        state.musicPlaying = false;
        el.musicStatusText.textContent = 'OFF';
        el.audioToggleBtn.classList.remove('playing');
        el.floatingMusicBtn.classList.remove('playing');
      } else {
        sound.startLoFiMusic();
        state.musicPlaying = true;
        el.musicStatusText.textContent = 'ON';
        el.audioToggleBtn.classList.add('playing');
        el.floatingMusicBtn.classList.add('playing');
      }
    }

    el.audioToggleBtn.addEventListener('click', toggleMusic);
    el.floatingMusicBtn.addEventListener('click', toggleMusic);

    // Theme cycle button
    el.themeCycleBtn.addEventListener('click', () => {
      sound.playClick();
      const currentIndex = THEMES.findIndex((t) => t.id === state.theme);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      applyTheme(THEMES[nextIndex].id);
      localStorage.setItem('code_theme', state.theme);
    });

    // Customizer Modal triggers
    el.openCustomizeBtn.addEventListener('click', () => {
      sound.playClick();
      el.customizeModal.classList.add('active');
    });

    el.customizeFooterBtn.addEventListener('click', () => {
      sound.playClick();
      el.customizeModal.classList.add('active');
    });

    el.closeCustomizeBtn.addEventListener('click', () => {
      sound.playClick();
      el.customizeModal.classList.remove('active');
    });

    el.saveAndApplyBtn.addEventListener('click', saveCustomization);
    el.copyShareLinkBtn.addEventListener('click', copyShareLink);

    // Run Code triggers
    el.runCodeBtn.addEventListener('click', executeCodeProposal);
    el.bottomRunTrigger.addEventListener('click', executeCodeProposal);
    el.heroRunBtn.addEventListener('click', executeCodeProposal);
    el.floatingProposalBtn.addEventListener('click', executeCodeProposal);

    // Explore Codebase hero button
    el.heroExploreBtn.addEventListener('click', () => {
      sound.playClick();
      document.getElementById('ideContainer').scrollIntoView({ behavior: 'smooth' });
    });

    // Secondary buttons in tabs that trigger proposal
    document.querySelectorAll('.trigger-proposal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        openProposalModal();
      });
    });

    // Terminal Close
    el.closeTerminalBtn.addEventListener('click', closeTerminalDrawer);

    // Evasive No Button handlers (hover & mobile touch)
    el.noBtn.addEventListener('mouseenter', evadeNoButton);
    el.noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      evadeNoButton(e);
    });
    el.noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      evadeNoButton(e);
    });

    // Yes Button handler
    el.yesBtn.addEventListener('click', handleYesClick);

    // Celebration modal actions
    el.closeCelebrationBtn.addEventListener('click', () => {
      sound.playClick();
      el.celebrationOverlay.classList.remove('active');
    });

    el.replayCelebrationBtn.addEventListener('click', () => {
      sound.playCelebrationFanfare();
      fireConfetti();
    });

    el.saveScreenshotBtn.addEventListener('click', () => {
      sound.playClick();
      window.print();
    });

    // Easter eggs for macOS window controls
    const winClose = document.querySelector('.win-btn.close');
    const winMin = document.querySelector('.win-btn.minimize');
    const winMax = document.querySelector('.win-btn.maximize');

    if (winClose) {
      winClose.addEventListener('click', () => {
        sound.playClick();
        alert("Operation Aborted: Feelings cannot be terminated! ❤️");
      });
    }

    if (winMin) {
      winMin.addEventListener('click', () => {
        sound.playClick();
        alert("System Notice: You occupy 100% of my thoughts, cannot minimize! ✨");
      });
    }

    if (winMax) {
      winMax.addEventListener('click', () => {
        sound.playClick();
        executeCodeProposal();
      });
    }

    // Keyboard shortcut: Ctrl + K or Ctrl + Enter to run code
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'k')) {
        e.preventDefault();
        executeCodeProposal();
      }
    });
  }

  // Initial startup
  function init() {
    initAmbientCanvas();
    generateLineNumbers();
    setupTabs();
    loadStateFromStorageOrURL();
    setupEventListeners();
  }

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
