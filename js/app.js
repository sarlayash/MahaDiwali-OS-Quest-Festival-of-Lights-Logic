/**
 * Diwali OS Quest - Main Application Controller
 * Handles screen transitions, PWA installation, audio toggles, and modal dialogues.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Particle Canvas
  const particles = new ParticleEngine('fx-canvas');

  // DOM Elements
  const screenLanding = document.getElementById('screen-landing');
  const screenMap = document.getElementById('screen-map');
  const screenLevel = document.getElementById('screen-level');
  const screenCert = document.getElementById('screen-certificate');

  // Modals
  const modalBadges = document.getElementById('modal-badges');
  const modalVictory = document.getElementById('modal-victory');

  // Audio & Settings
  const btnMute = document.getElementById('btn-sound-toggle');
  const btnMusic = document.getElementById('btn-music-toggle');
  const btnInstall = document.getElementById('btn-install-app');
  const installBanner = document.getElementById('install-banner');

  // State elements
  const inputPlayerName = document.getElementById('input-player-name');
  const avatarButtons = document.querySelectorAll('.avatar-option');
  const btnStartJourney = document.getElementById('btn-start-journey');

  let selectedAvatar = '🪔';
  let deferredInstallPrompt = null;

  // ==========================================
  // PWA Install Prompt Handler
  // ==========================================
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (btnInstall) btnInstall.style.display = 'inline-flex';
    if (installBanner) installBanner.style.display = 'flex';
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Application was successfully installed!');
    deferredInstallPrompt = null;
    if (btnInstall) btnInstall.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
  });

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      soundEngine.playClick();
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        console.log(`User response to install: ${outcome}`);
        deferredInstallPrompt = null;
        btnInstall.style.display = 'none';
      } else {
        alert('To install on Android: Tap Chrome menu (⋮) -> "Add to Home screen" or "Install App".\nOn iPhone: Tap Share -> "Add to Home Screen".');
      }
    });
  }

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('[ServiceWorker] Registered with scope:', reg.scope);
    }).catch((err) => {
      console.warn('[ServiceWorker] Registration failed:', err);
    });
  }

  // ==========================================
  // Sound Controls
  // ==========================================
  if (btnMute) {
    btnMute.addEventListener('click', () => {
      soundEngine.enabled = !soundEngine.enabled;
      btnMute.innerText = soundEngine.enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      soundEngine.playClick();
    });
  }

  if (btnMusic) {
    btnMusic.addEventListener('click', () => {
      const isPlaying = soundEngine.toggleBgm();
      btnMusic.innerText = isPlaying ? '🪕 Tanpura: ON' : '🪕 Tanpura: OFF';
    });
  }

  // ==========================================
  // Landing Screen & Profile Setup
  // ==========================================
  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      soundEngine.playClick();
      avatarButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAvatar = btn.dataset.avatar || '🪔';
    });
  });

  // If player already has a name, prefill
  if (gameState.player.name) {
    inputPlayerName.value = gameState.player.name;
    selectedAvatar = gameState.player.avatar || '🪔';
    avatarButtons.forEach(b => {
      if (b.dataset.avatar === selectedAvatar) b.classList.add('selected');
    });
  }

  btnStartJourney.addEventListener('click', () => {
    const name = inputPlayerName.value.trim();
    if (!name) {
      soundEngine.playError();
      alert('Auspicious Traveler, please enter your name to begin your journey!');
      inputPlayerName.focus();
      return;
    }
    soundEngine.playSuccess();
    soundEngine.playBell(780);
    gameState.setPlayerName(name, selectedAvatar);
    showScreen(screenMap);
    renderMap();
  });

  // ==========================================
  // Navigation & Screen Management
  // ==========================================
  function showScreen(screen) {
    [screenLanding, screenMap, screenLevel, screenCert].forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    screen.classList.add('active');
    screen.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render Royal Deepavali Map
  function renderMap() {
    // Update player header
    document.getElementById('map-player-name').innerText = gameState.player.name;
    document.getElementById('map-player-avatar').innerText = gameState.player.avatar;
    document.getElementById('map-player-xp').innerText = `${gameState.player.xp} XP`;
    document.getElementById('map-badges-count').innerText = `${gameState.player.badges.length}/8 Badges`;

    const diyasContainer = document.getElementById('palace-diyas-grid');
    diyasContainer.innerHTML = '';

    OS_LEVELS.forEach(lvl => {
      const isCompleted = gameState.player.completedLevels.includes(lvl.id);
      const isUnlocked = gameState.isLevelUnlocked(lvl.id);

      const card = document.createElement('div');
      card.className = `diya-level-card ${isCompleted ? 'completed' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="diya-status-icon">
          ${isCompleted ? '🔥' : (isUnlocked ? '🪔' : '🔒')}
        </div>
        <div class="diya-content">
          <div class="diya-number">${lvl.diyaName}</div>
          <h4 class="diya-title">${lvl.title}</h4>
          <p class="diya-subtitle">${lvl.subtitle}</p>
          <div class="diya-meta">
            ${isCompleted ? '<span class="tag-done">Lit & Mastered ⭐</span>' : (isUnlocked ? '<span class="tag-ready">Ready to Explore 🚀</span>' : '<span class="tag-lock">Locked (Complete prev level)</span>')}
          </div>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          soundEngine.playBell(700);
          launchLevel(lvl.id);
        });
      }

      diyasContainer.appendChild(card);
    });

    // Check certificate button state
    const certBtn = document.getElementById('btn-open-certificate');
    if (gameState.player.hasMasteredAll || gameState.player.completedLevels.length === 7) {
      certBtn.classList.remove('disabled');
      certBtn.disabled = false;
      certBtn.innerHTML = '👑 Claim Grand Royal OS Certificate!';
    } else {
      certBtn.innerHTML = `📜 View Certificate (${gameState.player.completedLevels.length}/7 Diyas Lit)`;
    }
  }

  // Launch a level
  function launchLevel(levelId) {
    const levelData = OS_LEVELS.find(l => l.id === levelId);
    if (!levelData) return;

    showScreen(screenLevel);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Populate level shell
    document.getElementById('level-breadcrumb-title').innerText = `${levelData.diyaName} • ${levelData.title}`;
    document.getElementById('level-story-text').innerText = levelData.story;
    
    // Concepts checklist
    const conceptsList = document.getElementById('level-concepts-list');
    conceptsList.innerHTML = levelData.concepts.map(c => `<li>${c}</li>`).join('');

    // Render interactive gameplay container
    const gameMount = document.getElementById('level-interactive-mount');
    gameMount.innerHTML = '';

    levelData.render(gameMount, (scoreEarned) => {
      // Level completed callback
      const result = gameState.completeLevel(levelId, scoreEarned);
      particles.burstFireworks(window.innerWidth / 2, window.innerHeight / 3, 80);
      showVictoryModal(levelData, result.awardedBadge, result.isGrandVictory);
    });
  }

  // Victory Modal Handler
  function showVictoryModal(levelData, badge, isGrandVictory) {
    soundEngine.playSuccess();
    modalVictory.style.display = 'flex';

    document.getElementById('vic-title').innerText = `Diya ${levelData.id} Illuminated! 🪔`;
    document.getElementById('vic-msg').innerHTML = `
      Magnificent work, <strong>${gameState.player.name}</strong>! You have mastered <strong>${levelData.subtitle}</strong>.
    `;

    const badgeShowcase = document.getElementById('vic-badge-showcase');
    if (badge) {
      badgeShowcase.innerHTML = `
        <div class="new-badge-alert">
          <span class="badge-icon-huge">${badge.icon}</span>
          <div>
            <h4>Honour Awarded: ${badge.name}</h4>
            <p>${badge.title}</p>
            <small>${badge.desc}</small>
          </div>
        </div>
      `;
    } else {
      badgeShowcase.innerHTML = '';
    }

    const nextBtn = document.getElementById('vic-btn-next') || document.getElementById('btn-vic-next');
    const mapBtn = document.getElementById('vic-btn-map') || document.getElementById('btn-vic-map');
    const closeVicBtn = document.getElementById('btn-close-victory');

    if (mapBtn) {
      mapBtn.onclick = () => {
        soundEngine.playClick();
        modalVictory.style.display = 'none';
        showScreen(screenMap);
        renderMap();
      };
    }

    if (closeVicBtn) {
      closeVicBtn.onclick = () => {
        soundEngine.playClick();
        modalVictory.style.display = 'none';
        showScreen(screenMap);
        renderMap();
      };
    }

    if (nextBtn) {
      if (isGrandVictory || levelData.id >= 7) {
        nextBtn.innerText = '👑 Claim Grand Royal Certificate!';
        nextBtn.onclick = () => {
          soundEngine.playClick();
          modalVictory.style.display = 'none';
          openCertificateScreen();
        };
      } else {
        nextBtn.innerText = 'Next Realm ➔';
        nextBtn.onclick = () => {
          soundEngine.playClick();
          modalVictory.style.display = 'none';
          launchLevel(levelData.id + 1);
        };
      }
    }
  }

  // Level back to map button
  document.getElementById('btn-level-back-map').addEventListener('click', () => {
    soundEngine.playClick();
    showScreen(screenMap);
    renderMap();
  });

  // Certificate Screen View
  function openCertificateScreen() {
    showScreen(screenCert);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    particles.celebrateGrandVictory();
    soundEngine.playSuccess();
    soundEngine.playRocketLaunch();

    const certImg = document.getElementById('cert-canvas-img');
    const certDataUrl = certificateGenerator.generate(gameState.player, gameState.allBadges);
    certImg.src = certDataUrl;
  }

  document.getElementById('btn-open-certificate').addEventListener('click', () => {
    soundEngine.playBell(900);
    openCertificateScreen();
  });

  document.getElementById('btn-cert-back-map').addEventListener('click', () => {
    soundEngine.playClick();
    showScreen(screenMap);
    renderMap();
  });

  document.getElementById('btn-download-cert').addEventListener('click', () => {
    soundEngine.playBell(1000);
    certificateGenerator.downloadCertificate(gameState.player, gameState.allBadges);
  });

  document.getElementById('btn-print-cert').addEventListener('click', () => {
    soundEngine.playClick();
    window.print();
  });

  // Badges Modal
  const btnShowBadges = document.getElementById('btn-show-badges');
  btnShowBadges.addEventListener('click', () => {
    soundEngine.playClick();
    renderBadgesModal();
    modalBadges.style.display = 'flex';
  });

  document.getElementById('btn-close-badges').addEventListener('click', () => {
    modalBadges.style.display = 'none';
  });

  function renderBadgesModal() {
    const list = document.getElementById('badges-grid-list');
    list.innerHTML = '';

    gameState.allBadges.forEach(b => {
      const isEarned = gameState.player.badges.includes(b.id);
      const item = document.createElement('div');
      item.className = `badge-item-card ${isEarned ? 'earned' : 'locked'}`;
      item.innerHTML = `
        <div class="b-icon">${b.icon}</div>
        <div class="b-details">
          <h4>${b.name} ${isEarned ? '✅' : '🔒'}</h4>
          <span class="b-title">${b.title}</span>
          <p class="b-desc">${b.desc}</p>
        </div>
      `;
      list.appendChild(item);
    });
  }

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === modalBadges) modalBadges.style.display = 'none';
    if (e.target === modalVictory) {
      modalVictory.style.display = 'none';
      showScreen(screenMap);
      renderMap();
    }
  });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalVictory.style.display === 'flex') {
        modalVictory.style.display = 'none';
        showScreen(screenMap);
        renderMap();
      }
      if (modalBadges.style.display === 'flex') {
        modalBadges.style.display = 'none';
      }
    }
  });
});
