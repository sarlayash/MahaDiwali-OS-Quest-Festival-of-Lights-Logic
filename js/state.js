/**
 * Diwali OS Quest - State Management
 * Persistent learner profile, XP, unlocked levels, badges, and high scores.
 */
class GameState {
  constructor() {
    this.STORAGE_KEY = 'diwali_os_quest_save_v1';
    this.player = {
      name: '',
      avatar: '🪔', // Default Diya avatar
      xp: 0,
      completedLevels: [], // e.g. [1, 2, 3...]
      currentLevel: 1,
      badges: [],
      levelScores: {},
      certId: '',
      completionDate: '',
      hasMasteredAll: false
    };

    this.allBadges = [
      {
        id: 'mithai_threadmaster',
        name: 'Mithai Threadmaster',
        icon: '🍬',
        title: 'Master of Processes & Threads',
        desc: 'Separated heavy Mithai processes from lightweight kitchen threads without memory corruption.',
        level: 1
      },
      {
        id: 'rocket_scheduler',
        name: 'Aatishbazi Scheduler',
        icon: '🚀',
        title: 'Conqueror of CPU Scheduling',
        desc: 'Mastered FCFS, SJF, and Round Robin time-slicing to launch fireworks before auspicious Muhurat.',
        level: 2
      },
      {
        id: 'akhand_jyoti_guard',
        name: 'Akhand Jyoti Guardian',
        icon: '🪔',
        title: 'Sentinel of Synchronization & Mutex',
        desc: 'Protected the sacred Ghee pot critical section with Semaphores and Mutex Locks without race conditions.',
        level: 3
      },
      {
        id: 'chakri_deadlock_breaker',
        name: 'Phuljhadi Deadlock Breaker',
        icon: '🎇',
        title: 'Architect of Deadlock Avoidance',
        desc: 'Broken circular wait in sparkler circles and navigated the Royal Treasury with Banker’s Algorithm.',
        level: 4
      },
      {
        id: 'rangoli_memory_architect',
        name: 'Rangoli Memory Architect',
        icon: '🎨',
        title: 'Virtuoso of Memory Management',
        desc: 'Allocated festive rangoli spaces using First/Best Fit and compacted external fragmentation.',
        level: 5
      },
      {
        id: 'akash_kandil_paging_sage',
        name: 'Akash Kandil Paging Sage',
        icon: '🏮',
        title: 'Sage of Paging & Virtual Memory',
        desc: 'Balanced glowing sky lanterns in RAM frames using LRU replacement and celebrated high TLB hits.',
        level: 6
      },
      {
        id: 'royal_vault_keeper',
        name: 'Royal Vault Keeper',
        icon: '📦',
        title: 'Custodian of File Systems & Inodes',
        desc: 'Traversed direct and indirect Inode blocks to locate the hidden Golden Kaju Katli safely.',
        level: 7
      },
      {
        id: 'diwali_os_samrat',
        name: 'MahaDiwali OS Samrat',
        icon: '👑',
        title: 'Supreme Master of Operating Systems',
        desc: 'Lit all 7 Akhand Diyas of the Grand Palace Core and attained complete Operating Systems mastery!',
        level: 'grand'
      }
    ];

    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        this.player = { ...this.player, ...data };
      }
    } catch (e) {
      console.warn('Could not load saved state:', e);
    }
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.player));
    } catch (e) {
      console.warn('Could not save state:', e);
    }
  }

  setPlayerName(name, avatar) {
    this.player.name = name.trim() || 'Festive Scholar';
    if (avatar) this.player.avatar = avatar;
    if (!this.player.certId) {
      this.player.certId = 'DOS-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    }
    this.save();
  }

  completeLevel(levelNum, score = 100) {
    if (!this.player.completedLevels.includes(levelNum)) {
      this.player.completedLevels.push(levelNum);
    }
    this.player.levelScores[levelNum] = Math.max(this.player.levelScores[levelNum] || 0, score);
    this.player.xp += score;

    // Check level badge award
    const badge = this.allBadges.find(b => b.level === levelNum);
    if (badge && !this.player.badges.includes(badge.id)) {
      this.player.badges.push(badge.id);
    }

    // Check if all 7 levels completed
    const allCompleted = [1, 2, 3, 4, 5, 6, 7].every(l => this.player.completedLevels.includes(l));
    if (allCompleted) {
      this.player.hasMasteredAll = true;
      if (!this.player.badges.includes('diwali_os_samrat')) {
        this.player.badges.push('diwali_os_samrat');
      }
      if (!this.player.completionDate) {
        const now = new Date();
        this.player.completionDate = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }

    this.save();
    return {
      awardedBadge: badge,
      isGrandVictory: allCompleted
    };
  }

  isLevelUnlocked(levelNum) {
    if (levelNum === 1) return true;
    return this.player.completedLevels.includes(levelNum - 1);
  }

  resetProgress() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.player = {
      name: '',
      avatar: '🪔',
      xp: 0,
      completedLevels: [],
      currentLevel: 1,
      badges: [],
      levelScores: {},
      certId: '',
      completionDate: '',
      hasMasteredAll: false
    };
  }
}

const gameState = new GameState();
