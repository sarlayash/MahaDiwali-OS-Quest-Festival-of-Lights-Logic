/**
 * Diwali OS Quest - Complete Level Definitions and Interactive Mini-Games
 * Covers all 7 core OS modules in rich Diwali festival themes.
 */

const OS_LEVELS = [
  {
    id: 1,
    title: 'Level 1: The Mithai Karkhana',
    subtitle: 'Processes vs. Threads',
    icon: '🍬',
    diyaName: 'Pratham Diya of Concurrency',
    story: 'Halwai Ramu is preparing 10,000 festive sweets for the Grand Royal Diwali Feast! Should he build separate independent Mithai Bhavans (Processes) or hire swift Kitchen Helpers working in the same kitchen (Threads)? Master memory isolation, address spaces, and context switches to save the feast from kitchen chaos!',
    concepts: [
      'Process: Isolated memory space (Text, Data, Heap, Stack), separate PCB, high creation/switching overhead, fault isolation.',
      'Thread: Lightweight unit of execution within a process; shares Heap, Code, and Global Variables, but owns private Stack and Registers.',
      'Context Switch: Switching processes requires invalidating TLB and changing memory maps; thread context switch is significantly faster.',
      'Failure Isolation: If a thread crashes (e.g. segfault), the entire process dies. Separate processes are immune to sibling crashes.'
    ],
    render: (container, onComplete) => renderLevel1(container, onComplete)
  },
  {
    id: 2,
    title: 'Level 2: Aatishbazi Station',
    subtitle: 'CPU Scheduling & Gantt Charts',
    icon: '🚀',
    diyaName: 'Dvitiya Diya of Scheduling',
    story: 'The Royal Astrologer has declared the auspicious Muhurat for fireworks! 4 grand multi-shot rockets (P1, P2, P3, P4) have arrived at the launchpad with different burst times. You must schedule the CPU core using FCFS, SJF, and Round Robin to minimize waiting time and prevent rocket starvation before the festival hour passes!',
    concepts: [
      'FCFS (First-Come, First-Served): Non-preemptive. Suffers from Convoy Effect when a long burst job blocks fast jobs.',
      'SJF (Shortest Job First): Provably optimal for minimizing Average Waiting Time. Can cause starvation for long processes.',
      'Round Robin (RR): Preemptive with Time Quantum (Q). Fair share of CPU, ideal for time-sharing systems. Quantum must balance context switch overhead vs responsiveness.',
      'Turnaround Time (TAT) = Completion Time - Arrival Time. Waiting Time (WT) = TAT - Burst Time.'
    ],
    render: (container, onComplete) => renderLevel2(container, onComplete)
  },
  {
    id: 3,
    title: 'Level 3: The Akhand Jyoti',
    subtitle: 'Synchronization, Mutex & Semaphores',
    icon: '🪔',
    diyaName: 'Tritiya Diya of Synchronization',
    story: 'Three royal priests (Threads) are pouring sacred ghee into the Akhand Diya (Eternal Flame). When multiple priests pour uncoordinated, a critical Race Condition occurs: ghee spills, counters desynchronize, and the sacred flame flickers! Use Mutex locks and Semaphores to establish Mutual Exclusion in the Critical Section.',
    concepts: [
      'Race Condition: Multiple threads access and manipulate shared data concurrently; final result depends on execution order.',
      'Critical Section: Code segment accessing shared resources that must be executed by at most one thread at a time.',
      'Mutual Exclusion (Mutex): Binary lock ensuring only one thread enters the Critical Section (lock() -> write -> unlock()).',
      'Semaphores: Integer variables modified only via atomic wait() (P) and signal() (V) operations. Counting semaphores manage finite resource pools.'
    ],
    render: (container, onComplete) => renderLevel3(container, onComplete)
  },
  {
    id: 4,
    title: 'Level 4: The Phuljhadi Circle',
    subtitle: 'Deadlocks & Banker’s Algorithm',
    icon: '🎇',
    diyaName: 'Chaturtha Diya of Deadlock Freedom',
    story: 'Four festive children in a circle are holding sparklers (Phuljhadi), each clinging to a matchbox, lighter, or candle while waiting for the neighbor’s tool — a complete Deadlock Circular Wait! Furthermore, the Royal Firecracker Treasury must use the Banker’s Algorithm to safely allocate Chakris, Anaars, and Rockets to pandals without entering an Unsafe State.',
    concepts: [
      '4 Coffman Conditions for Deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
      'Resource Allocation Graph (RAG): If graph contains no cycles, no deadlock. If cycles exist with single-instance resources, deadlock is guaranteed.',
      'Banker’s Algorithm: Avoidance algorithm testing for safety before granting resources. Need = Max - Allocation.',
      'Safe State: An execution sequence <P1, P2... Pn> exists such that each process can satisfy its maximum remaining needs with current available resources.'
    ],
    render: (container, onComplete) => renderLevel4(container, onComplete)
  },
  {
    id: 5,
    title: 'Level 5: The Grand Rangoli',
    subtitle: 'Memory Management & Fragmentation',
    icon: '🎨',
    diyaName: 'Panchama Diya of Memory',
    story: 'The Palace courtyard floor is divided into memory partitions ready for colorful Diwali Rangoli stencils of various sizes (KB). Practice First Fit, Best Fit, and Worst Fit allocation strategies. Witness External Fragmentation when scattered free spaces cannot hold a large Peacock Rangoli, and execute Royal Memory Compaction!',
    concepts: [
      'Contiguous Allocation: Memory allocated in contiguous linear blocks. Easy translation via Base & Limit registers.',
      'First Fit: Allocates first hole big enough (fastest). Best Fit: Allocates smallest hole that fits (minimizes wasted block, but creates tiny leftover slivers). Worst Fit: Leaves largest remaining hole.',
      'Internal Fragmentation: Allocated memory block is larger than requested memory; unused space trapped inside.',
      'External Fragmentation: Total free memory is sufficient to satisfy request, but memory is non-contiguous. Solved by Compaction or Paging.'
    ],
    render: (container, onComplete) => renderLevel5(container, onComplete)
  },
  {
    id: 6,
    title: 'Level 6: Akash Kandil (Sky Lanterns)',
    subtitle: 'Paging & Virtual Memory',
    icon: '🏮',
    diyaName: 'Shashta Diya of Virtual Memory',
    story: 'Festive Akash Kandil (Sky Lanterns) representing Virtual Pages are requested by revelers to be mounted onto limited Palace Balcony Hooks (Physical Frames in RAM). Balance cache hits, resolve Page Faults, and test Page Replacement algorithms (FIFO vs LRU) to keep the night sky illuminated without Thrashing!',
    concepts: [
      'Paging: Divides logical memory into fixed-size Pages, and physical memory into same-sized Frames. Eliminates external fragmentation.',
      'Page Table & TLB: Maps logical page numbers to physical frame numbers. Translation Lookaside Buffer (TLB) acts as a high-speed hardware cache.',
      'Page Fault: Occurs when a requested page is not present in physical RAM; OS brings it from swap disk.',
      'Page Replacement: FIFO (replaces oldest page; susceptible to Belady’s Anomaly), LRU (Least Recently Used; replaces page unused for longest time), Optimal (OPT).'
    ],
    render: (container, onComplete) => renderLevel6(container, onComplete)
  },
  {
    id: 7,
    title: 'Level 7: The Royal Mithai Vault',
    subtitle: 'File Systems & Inodes',
    icon: '📦',
    diyaName: 'Saptama Diya of File Systems',
    story: 'The Emperor’s Golden Kaju Katli Box is locked inside the Royal Vault! The vault storage is organized as an Inode file system with Direct, Single Indirect, and Double Indirect block pointers. Inspect the Inode structure, trace pointer chains to extract the golden sweet, and evaluate file allocation methods to light the final 7th Sacred Diya!',
    concepts: [
      'Inode (Index Node): Data structure storing file metadata (type, size, owner, permissions, timestamps) and block pointers to physical disk sectors.',
      'Direct Pointers: Array of direct block addresses for fast immediate access to small files.',
      'Indirect Pointers: Single indirect pointer points to a block of pointers; double indirect points to a block of single indirect blocks, allowing files to scale to terabytes.',
      'Allocation Methods: Contiguous (fast sequential, prone to fragmentation), Linked List (scattered blocks, sequential traversal only, pointer overhead), Indexed (Inodes - fast random access, no external fragmentation).'
    ],
    render: (container, onComplete) => renderLevel7(container, onComplete)
  }
];

// ==========================================
// LEVEL 1: PROCESSES VS THREADS
// ==========================================
function renderLevel1(container, onComplete) {
  let score = 0;
  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">🍬</span>
        <div>
          <h3>Mithai Karkhana: Process vs. Thread Dispatch</h3>
          <p class="subtitle">Classify OS attributes into the correct realm to properly organize the Royal Sweet Kitchen!</p>
        </div>
      </div>

      <div class="karkhana-diagram">
        <div class="diagram-box process-box">
          <h4>🏰 Independent Mithai Bhavan (Process)</h4>
          <p class="desc">Own Address Space • Isolated PCB • Protected Heap</p>
          <div class="drop-zone" id="zone-process" data-realm="process">
            <span class="zone-placeholder">Drag or Click Process items here</span>
          </div>
        </div>

        <div class="diagram-box thread-box">
          <h4>👨‍🍳 Kitchen Helpers (Threads)</h4>
          <p class="desc">Shared Heap & Data • Private Stack/Registers • Fast Switch</p>
          <div class="drop-zone" id="zone-thread" data-realm="thread">
            <span class="zone-placeholder">Drag or Click Thread items here</span>
          </div>
        </div>
      </div>

      <div class="interactive-tray">
        <h4>📋 Unassigned Architectural Attributes (Tap to Place):</h4>
        <div class="item-tray" id="item-tray">
          <button class="tray-chip" data-correct="process" data-id="p1">Separate Virtual Address Space & Page Tables</button>
          <button class="tray-chip" data-correct="thread" data-id="t1">Shares Heap, Code & Global Variables</button>
          <button class="tray-chip" data-correct="process" data-id="p2">Crash Isolation (Segfault in one won't crash others)</button>
          <button class="tray-chip" data-correct="thread" data-id="t2">Has Private Program Counter, Stack & Registers only</button>
          <button class="tray-chip" data-correct="thread" data-id="t3">Extremely fast Context Switch (TLB preserved)</button>
          <button class="tray-chip" data-correct="process" data-id="p3">Communicates via IPC (Pipes, Sockets, Message Queues)</button>
        </div>
      </div>

      <div class="simulation-section">
        <h4>🧪 Kitchen Crash Test: What happens when Helper B corrupts memory?</h4>
        <div class="crash-demo">
          <div class="crash-column">
            <h5>Scenario A: Multi-Threaded Kitchen</h5>
            <div class="kitchen-status" id="thread-crash-status">
              <span>Helper 1: 🟡 Idle</span> | <span>Helper 2: 🟡 Idle</span> | <span>Shared Ghee: 100% Pure</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-corrupt-thread">Simulate Thread Memory Corruption</button>
          </div>
          <div class="crash-column">
            <h5>Scenario B: Multi-Process Kitchens</h5>
            <div class="kitchen-status" id="process-crash-status">
              <span>Bhavan 1: 🟢 OK</span> | <span>Bhavan 2: 🟢 OK</span> | <span>Isolated Memory</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-corrupt-process">Simulate Process Memory Corruption</button>
          </div>
        </div>
        <div id="crash-explanation" class="info-alert" style="display:none;"></div>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l1">Verify Kitchen Setup & Light Pratham Diya 🪔</button>
      </div>
    </div>
  `;

  // Item placement interaction (Click to toggle or assign)
  let activeSelectedChip = null;
  const chips = container.querySelectorAll('.tray-chip');
  const zoneProcess = container.querySelector('#zone-process');
  const zoneThread = container.querySelector('#zone-thread');
  const tray = container.querySelector('#item-tray');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      soundEngine.playClick();
      // If in tray, ask where or move to process/thread
      if (chip.parentElement === tray) {
        // Toggle selection
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        activeSelectedChip = chip;
      } else {
        // Move back to tray
        tray.appendChild(chip);
        chip.classList.remove('selected');
        activeSelectedChip = null;
      }
    });
  });

  [zoneProcess, zoneThread].forEach(zone => {
    zone.addEventListener('click', () => {
      if (activeSelectedChip) {
        soundEngine.playDiyaLight();
        zone.appendChild(activeSelectedChip);
        activeSelectedChip.classList.remove('selected');
        activeSelectedChip = null;
      }
    });
  });

  // Crash simulation demo
  const tStatus = container.querySelector('#thread-crash-status');
  const pStatus = container.querySelector('#process-crash-status');
  const expBox = container.querySelector('#crash-explanation');

  container.querySelector('#btn-corrupt-thread').addEventListener('click', () => {
    soundEngine.playError();
    tStatus.innerHTML = '<span style="color:#ff4d4d;">💥 FATAL: Helper 2 corrupted shared Ghee Bowl! SIGSEGV: Entire Kitchen Process CRASHED! Helper 1 also died!</span>';
    expBox.style.display = 'block';
    expBox.innerHTML = `<strong>OS Insight:</strong> Because threads share the exact same address space and heap, an illegal memory write or unhandled exception in any single thread brings down the <em>entire host process</em>.`;
  });

  container.querySelector('#btn-corrupt-process').addEventListener('click', () => {
    soundEngine.playBell(750);
    pStatus.innerHTML = '<span>Bhavan 1: 🟢 Producing Kaju Katli (Unharmed!)</span> | <span style="color:#ff9999;">Bhavan 2: 🔴 Crashed (Isolated)</span>';
    expBox.style.display = 'block';
    expBox.innerHTML = `<strong>OS Insight:</strong> Processes have strictly separated virtual address spaces protected by hardware MMU / page tables. Bhavan 2 crashing does <em>not</em> affect Bhavan 1!`;
  });

  // Verification
  container.querySelector('#btn-verify-l1').addEventListener('click', () => {
    let correctCount = 0;
    const procChildren = zoneProcess.querySelectorAll('.tray-chip');
    const threadChildren = zoneThread.querySelectorAll('.tray-chip');

    procChildren.forEach(c => {
      if (c.dataset.correct === 'process') {
        c.classList.add('correct');
        correctCount++;
      } else {
        c.classList.add('wrong');
      }
    });

    threadChildren.forEach(c => {
      if (c.dataset.correct === 'thread') {
        c.classList.add('correct');
        correctCount++;
      } else {
        c.classList.add('wrong');
      }
    });

    if (correctCount === 6) {
      soundEngine.playSuccess();
      soundEngine.playDiyaLight();
      onComplete(100);
    } else {
      soundEngine.playError();
      alert(`You correctly placed ${correctCount}/6 attributes! Remember:\n- Process = Isolated Address Space, Crash Isolation, IPC\n- Thread = Shared Heap, Fast Context Switch, Private Stack/PC only.\nTry moving the red items!`);
    }
  });
}

// ==========================================
// LEVEL 2: CPU SCHEDULING & GANTT CHARTS
// ==========================================
function renderLevel2(container, onComplete) {
  // 4 Rockets with Arrival Time and Burst Time
  const rockets = [
    { id: 'P1', name: 'Chakri Multi-Burst', arrival: 0, burst: 6, color: '#FF5722' },
    { id: 'P2', name: 'Anaar Fountain', arrival: 1, burst: 3, color: '#4CAF50' },
    { id: 'P3', name: 'Lakshmi VIP Rocket', arrival: 2, burst: 8, color: '#E91E63' },
    { id: 'P4', name: 'Phuljhadi Sparkler', arrival: 3, burst: 2, color: '#FFC107' }
  ];

  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">🚀</span>
        <div>
          <h3>Aatishbazi Station: CPU Launchpad Scheduling</h3>
          <p class="subtitle">Evaluate FCFS, SJF, and Round Robin on the Royal Fireworks Gantt Chart!</p>
        </div>
      </div>

      <div class="rocket-manifest">
        <h4>🎆 Ready Queue (Fireworks Awaiting Launch):</h4>
        <div class="rocket-cards">
          ${rockets.map(r => `
            <div class="rocket-card" style="border-top: 4px solid ${r.color}">
              <div class="r-name"><strong>${r.id}</strong>: ${r.name}</div>
              <div class="r-stats">Arrival (AT): <strong>${r.arrival}s</strong> | Burst (BT): <strong>${r.burst}s</strong></div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="algo-selection">
        <h4>⚙️ Choose Launchpad Scheduling Algorithm:</h4>
        <div class="btn-group">
          <button class="btn btn-secondary active" id="btn-fcfs">1. FCFS (First-Come First-Served)</button>
          <button class="btn btn-secondary" id="btn-sjf">2. SJF (Shortest Job First)</button>
          <button class="btn btn-secondary" id="btn-rr">3. Round Robin (Time Quantum Q = 2s)</button>
        </div>
      </div>

      <div class="gantt-container">
        <h4>📊 Live CPU Gantt Chart:</h4>
        <div class="gantt-chart" id="gantt-chart"></div>
        <div class="gantt-timeline" id="gantt-timeline"></div>
      </div>

      <div class="metrics-display" id="metrics-display"></div>

      <div class="scheduling-challenge">
        <h4>🎯 Astrologer's Calculation Challenge:</h4>
        <p>Which scheduling algorithm yielded the <strong>minimum Average Waiting Time ($W_{avg}$)</strong> for the fireworks, eliminating the Convoy Effect?</p>
        <div class="quiz-options">
          <button class="quiz-btn" data-ans="fcfs">FCFS (Due to sequential arrival)</button>
          <button class="quiz-btn" data-ans="sjf">SJF (Provably optimal for minimizing Average Waiting Time)</button>
          <button class="quiz-btn" data-ans="rr">Round Robin with large Quantum</button>
        </div>
        <div id="quiz-feedback" class="info-alert" style="display:none; margin-top:10px;"></div>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l2" disabled>Light Dvitiya Diya of Scheduling 🪔</button>
      </div>
    </div>
  `;

  let currentAlgo = 'fcfs';
  let solvedQuiz = false;

  const ganttChart = container.querySelector('#gantt-chart');
  const ganttTimeline = container.querySelector('#gantt-timeline');
  const metricsDisplay = container.querySelector('#metrics-display');
  const verifyBtn = container.querySelector('#btn-verify-l2');

  function computeAndRender(algo) {
    currentAlgo = algo;
    soundEngine.playFirecracker();
    
    let schedule = []; // { id, start, end, color }
    let waitingTimes = {};
    let turnaroundTimes = {};

    if (algo === 'fcfs') {
      // P1: 0-6, P2: 6-9, P3: 9-17, P4: 17-19
      schedule = [
        { id: 'P1', start: 0, end: 6, color: '#FF5722' },
        { id: 'P2', start: 6, end: 9, color: '#4CAF50' },
        { id: 'P3', start: 9, end: 17, color: '#E91E63' },
        { id: 'P4', start: 17, end: 19, color: '#FFC107' }
      ];
      // P1: TAT = 6-0=6, WT = 0
      // P2: TAT = 9-1=8, WT = 8-3=5
      // P3: TAT = 17-2=15, WT = 15-8=7
      // P4: TAT = 19-3=16, WT = 16-2=14
      waitingTimes = { P1: 0, P2: 5, P3: 7, P4: 14 };
      turnaroundTimes = { P1: 6, P2: 8, P3: 15, P4: 16 };
    } else if (algo === 'sjf') {
      // Non-preemptive SJF: At t=0 only P1 is available.
      // P1 runs 0-6. At t=6, P2(3), P3(8), P4(2) have arrived.
      // Shortest is P4(2) -> 6 to 8.
      // Next is P2(3) -> 8 to 11.
      // Next is P3(8) -> 11 to 19.
      schedule = [
        { id: 'P1', start: 0, end: 6, color: '#FF5722' },
        { id: 'P4', start: 6, end: 8, color: '#FFC107' },
        { id: 'P2', start: 8, end: 11, color: '#4CAF50' },
        { id: 'P3', start: 11, end: 19, color: '#E91E63' }
      ];
      // P1: Comp=6, TAT=6-0=6, WT=6-6=0
      // P4: Comp=8, TAT=8-3=5, WT=5-2=3
      // P2: Comp=11, TAT=11-1=10, WT=10-3=7
      // P3: Comp=19, TAT=19-2=17, WT=17-8=9
      waitingTimes = { P1: 0, P2: 7, P3: 9, P4: 3 };
      turnaroundTimes = { P1: 6, P2: 10, P3: 17, P4: 5 };
    } else if (algo === 'rr') {
      // Quantum = 2.
      // t=0: P1 runs [0, 2], rem 4. Arrivals P2(1). Queue: P2, P1
      // t=2: P2 runs [2, 4], rem 1. Arrivals P3(2), P4(3). Queue: P1, P3, P4, P2
      // t=4: P1 runs [4, 6], rem 2. Queue: P3, P4, P2, P1
      // t=6: P3 runs [6, 8], rem 6. Queue: P4, P2, P1, P3
      // t=8: P4 runs [8, 10], rem 0 (DONE!). Queue: P2, P1, P3
      // t=10: P2 runs [10, 11], rem 0 (DONE!). Queue: P1, P3
      // t=11: P1 runs [11, 13], rem 0 (DONE!). Queue: P3
      // t=13: P3 runs [13, 19], rem 0 (DONE!).
      schedule = [
        { id: 'P1', start: 0, end: 2, color: '#FF5722' },
        { id: 'P2', start: 2, end: 4, color: '#4CAF50' },
        { id: 'P1', start: 4, end: 6, color: '#FF5722' },
        { id: 'P3', start: 6, end: 8, color: '#E91E63' },
        { id: 'P4', start: 8, end: 10, color: '#FFC107' },
        { id: 'P2', start: 10, end: 11, color: '#4CAF50' },
        { id: 'P1', start: 11, end: 13, color: '#FF5722' },
        { id: 'P3', start: 13, end: 19, color: '#E91E63' }
      ];
      // Comp times: P4=10, P2=11, P1=13, P3=19
      // TAT: P1=13-0=13, P2=11-1=10, P3=19-2=17, P4=10-3=7
      // WT: P1=13-6=7, P2=10-3=7, P3=17-8=9, P4=7-2=5
      waitingTimes = { P1: 7, P2: 7, P3: 9, P4: 5 };
      turnaroundTimes = { P1: 13, P2: 10, P3: 17, P4: 7 };
    }

    // Render Gantt
    const totalTime = 19;
    ganttChart.innerHTML = '';
    ganttTimeline.innerHTML = '';

    schedule.forEach(block => {
      const duration = block.end - block.start;
      const widthPct = (duration / totalTime) * 100;
      const el = document.createElement('div');
      el.className = 'gantt-block';
      el.style.width = widthPct + '%';
      el.style.backgroundColor = block.color;
      el.innerHTML = `<strong>${block.id}</strong> <small>(${duration}s)</small>`;
      ganttChart.appendChild(el);
    });

    // Timeline markers
    const timePoints = [0, ...schedule.map(s => s.end)];
    const uniquePoints = [...new Set(timePoints)].sort((a,b) => a-b);
    uniquePoints.forEach(t => {
      const span = document.createElement('span');
      span.innerText = t + 's';
      span.style.left = (t / totalTime * 100) + '%';
      ganttTimeline.appendChild(span);
    });

    // Compute averages
    const avgWT = (Object.values(waitingTimes).reduce((a, b) => a + b, 0) / 4).toFixed(2);
    const avgTAT = (Object.values(turnaroundTimes).reduce((a, b) => a + b, 0) / 4).toFixed(2);

    metricsDisplay.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-card">
          <span class="m-val">${avgWT}s</span>
          <span class="m-label">Average Waiting Time</span>
        </div>
        <div class="metric-card">
          <span class="m-val">${avgTAT}s</span>
          <span class="m-label">Average Turnaround Time</span>
        </div>
        <div class="metric-card">
          <span class="m-val">${algo === 'sjf' ? 'Optimal 🏆' : (algo === 'fcfs' ? 'High Wait' : 'Responsive')}</span>
          <span class="m-label">Scheduling Characteristic</span>
        </div>
      </div>
    `;
  }

  // Hook algorithm buttons
  const algoBtns = container.querySelectorAll('.algo-selection .btn');
  algoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      algoBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (btn.id === 'btn-fcfs') computeAndRender('fcfs');
      if (btn.id === 'btn-sjf') computeAndRender('sjf');
      if (btn.id === 'btn-rr') computeAndRender('rr');
    });
  });

  // Initial render
  computeAndRender('fcfs');

  // Quiz click
  const quizBtns = container.querySelectorAll('.quiz-btn');
  const quizFeedback = container.querySelector('#quiz-feedback');
  quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.ans === 'sjf') {
        soundEngine.playSuccess();
        quizBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        quizFeedback.style.display = 'block';
        quizFeedback.className = 'info-alert success';
        quizFeedback.innerHTML = '<strong>Correct!</strong> Shortest Job First (SJF) gives an Average Waiting Time of only <strong>4.75s</strong> (vs 6.5s in FCFS and 7.0s in Round Robin), mathematically minimizing waiting time!';
        solvedQuiz = true;
        verifyBtn.removeAttribute('disabled');
      } else {
        soundEngine.playError();
        quizFeedback.style.display = 'block';
        quizFeedback.className = 'info-alert';
        quizFeedback.innerHTML = 'Not quite! Inspect the metrics above when switching between tabs. Compare the Average Waiting Time of SJF (4.75s) vs FCFS (6.5s).';
      }
    });
  });

  verifyBtn.addEventListener('click', () => {
    if (solvedQuiz) {
      soundEngine.playRocketLaunch();
      onComplete(100);
    }
  });
}

// ==========================================
// LEVEL 3: SYNCHRONIZATION & MUTEX
// ==========================================
function renderLevel3(container, onComplete) {
  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">🪔</span>
        <div>
          <h3>The Akhand Jyoti: Critical Section & Mutex Protection</h3>
          <p class="subtitle">Prevent Race Conditions on the Sacred Ghee Urn using Mutual Exclusion locks!</p>
        </div>
      </div>

      <div class="flame-arena">
        <div class="diya-visual" id="akhand-flame">
          <div class="flame-core"></div>
          <div class="flame-glow"></div>
          <div class="diya-clay">🪔</div>
        </div>
        <div class="ghee-meter">
          <h4>Sacred Ghee Urn Level: <span id="ghee-val">100</span> ml</h4>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="ghee-bar" style="width: 100%;"></div>
          </div>
          <p id="flame-status-text">Flame is burning steady.</p>
        </div>
      </div>

      <div class="priests-panel">
        <h4>Threads (3 Priests concurrently pouring ghee):</h4>
        <div class="priests-grid">
          <div class="priest-card" id="priest-1">
            <span class="p-avatar">🧘‍♂️</span>
            <strong>Priest 1</strong>
            <span class="p-state" id="p1-state">Ready</span>
          </div>
          <div class="priest-card" id="priest-2">
            <span class="p-avatar">🧘‍♂️</span>
            <strong>Priest 2</strong>
            <span class="p-state" id="p2-state">Ready</span>
          </div>
          <div class="priest-card" id="priest-3">
            <span class="p-avatar">🧘‍♂️</span>
            <strong>Priest 3</strong>
            <span class="p-state" id="p3-state">Ready</span>
          </div>
        </div>
      </div>

      <div class="mutex-control-panel">
        <div class="toggle-row">
          <label class="switch-label">
            <input type="checkbox" id="chk-mutex" />
            <span class="slider"></span>
            <strong>Enable Mutex Lock (<code>pthread_mutex_lock / unlock</code>)</strong>
          </label>
        </div>
        <button class="btn btn-secondary" id="btn-run-pour">Execute Concurrent Pour (100 iterations each)</button>
      </div>

      <div class="simulation-log" id="sync-log">
        <p class="log-entry">Waiting for priests to begin offering...</p>
      </div>

      <div class="code-puzzle">
        <h4>📜 Assemble the Correct Semaphore Critical Section:</h4>
        <p>Arrange the operations in the exact sequence a thread must execute to safely add ghee to the Urn:</p>
        <div class="code-slots" id="code-slots">
          <div class="code-slot" data-expected="wait_mutex">Step 1: [Drop Here]</div>
          <div class="code-slot" data-expected="critical_section">Step 2: [Drop Here]</div>
          <div class="code-slot" data-expected="signal_mutex">Step 3: [Drop Here]</div>
        </div>
        <div class="code-chips" id="code-chips">
          <button class="chip" data-code="critical_section"><code>urn_ghee += 10; // Critical Section</code></button>
          <button class="chip" data-code="wait_mutex"><code>sem_wait(&mutex); // Entry Section (P)</code></button>
          <button class="chip" data-code="signal_mutex"><code>sem_post(&mutex); // Exit Section (V)</code></button>
        </div>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l3" disabled>Light Tritiya Diya of Synchronization 🪔</button>
      </div>
    </div>
  `;

  const chkMutex = container.querySelector('#chk-mutex');
  const btnRun = container.querySelector('#btn-run-pour');
  const gheeVal = container.querySelector('#ghee-val');
  const gheeBar = container.querySelector('#ghee-bar');
  const syncLog = container.querySelector('#sync-log');
  const verifyBtn = container.querySelector('#btn-verify-l3');
  const flameVisual = container.querySelector('#akhand-flame');

  btnRun.addEventListener('click', () => {
    soundEngine.playFirecracker();
    const useMutex = chkMutex.checked;
    btnRun.disabled = true;

    syncLog.innerHTML = `<p class="log-entry">Starting concurrent pours with Mutex = <strong>${useMutex ? 'ENABLED (Safe)' : 'DISABLED (Unprotected)'}</strong>...</p>`;

    let sharedUrn = 0;
    const expected = 300; // 3 priests * 100

    if (useMutex) {
      // Perfectly serialized
      sharedUrn = expected;
      setTimeout(() => {
        gheeVal.innerText = sharedUrn;
        gheeBar.style.width = '100%';
        flameVisual.classList.add('radiant');
        soundEngine.playSuccess();
        syncLog.innerHTML = `
          <p class="log-entry" style="color:#00ff88;">✅ Mutex Lock Protected Critical Section!</p>
          <p class="log-entry">Expected: 300 ml | Actual: 300 ml. Zero race conditions! Each priest acquired lock before updating shared variable.</p>
        `;
        btnRun.disabled = false;
      }, 600);
    } else {
      // Race condition! Lost updates
      // Multiple threads read same old value, increment, and overwrite
      sharedUrn = 184; // Simulated race condition loss
      setTimeout(() => {
        soundEngine.playError();
        gheeVal.innerText = sharedUrn;
        gheeBar.style.width = '61%';
        flameVisual.classList.remove('radiant');
        syncLog.innerHTML = `
          <p class="log-entry" style="color:#ff4444;">❌ RACE CONDITION OCCURRED!</p>
          <p class="log-entry">Expected: 300 ml | Actual: <strong>${sharedUrn} ml</strong> (Lost 116 ml of sacred ghee!).</p>
          <p class="log-entry">Because threads preempted each other midway during (Read -> Modify -> Write), updates were overwritten!</p>
        `;
        btnRun.disabled = false;
      }, 600);
    }
  });

  // Code slot drag/click interaction
  let activeCodeChip = null;
  const chips = container.querySelectorAll('.code-chips .chip');
  const slots = container.querySelectorAll('.code-slots .code-slot');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      soundEngine.playClick();
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      activeCodeChip = chip;
    });
  });

  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (activeCodeChip) {
        soundEngine.playDiyaLight();
        slot.innerHTML = '';
        slot.appendChild(activeCodeChip);
        activeCodeChip.classList.remove('selected');
        activeCodeChip = null;
        checkCodeAssembly();
      }
    });
  });

  function checkCodeAssembly() {
    let allCorrect = true;
    slots.forEach(slot => {
      const child = slot.querySelector('.chip');
      if (!child || child.dataset.code !== slot.dataset.expected) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      soundEngine.playBell(880);
      slots.forEach(s => s.classList.add('correct'));
      verifyBtn.removeAttribute('disabled');
    }
  }

  verifyBtn.addEventListener('click', () => {
    soundEngine.playDiyaLight();
    onComplete(100);
  });
}

// ==========================================
// LEVEL 4: DEADLOCKS & BANKER'S ALGORITHM
// ==========================================
function renderLevel4(container, onComplete) {
  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">🎇</span>
        <div>
          <h3>The Phuljhadi Circle: Deadlocks & Banker’s Safety</h3>
          <p class="subtitle">Break the Circular Wait in the Sparkler Circle and find the Safe Allocation Sequence!</p>
        </div>
      </div>

      <div class="deadlock-part1">
        <h4>Part 1: Break the Circular Wait (Resource Allocation Graph)</h4>
        <p>4 children are locked in a circular dependency:</p>
        <div class="circle-graph">
          <div class="node" id="node-a">Child A 👦<br><small>Holds Matchbox 📦<br>Wants Candle 🕯️</small></div>
          <div class="arrow">➡️</div>
          <div class="node" id="node-b">Child B 👧<br><small>Holds Candle 🕯️<br>Wants Lighter 🔥</small></div>
          <div class="arrow">➡️</div>
          <div class="node" id="node-c">Child C 👦<br><small>Holds Lighter 🔥<br>Wants Diya 🪔</small></div>
          <div class="arrow">➡️</div>
          <div class="node" id="node-d">Child D 👧<br><small>Holds Diya 🪔<br>Wants Matchbox 📦</small></div>
        </div>

        <div class="break-actions">
          <p>Which intervention breaks the Coffman condition and resolves the deadlock?</p>
          <div class="quiz-options">
            <button class="quiz-btn" data-break="preempt">Preempt Child D's Diya or enforce global Resource Ordering</button>
            <button class="quiz-btn" data-break="wait">Let them hold and wait indefinitely</button>
            <button class="quiz-btn" data-break="more">Give them more sparklers without lighter</button>
          </div>
          <div id="rag-feedback" class="info-alert" style="display:none; margin-top:10px;"></div>
        </div>
      </div>

      <div class="banker-part2" style="margin-top: 25px;">
        <h4>Part 2: Royal Firecracker Treasury (Banker’s Algorithm)</h4>
        <p>Available Treasury Fireworks: <strong>[ Chakris: 3, Anaars: 3, Sky Rockets: 2 ]</strong></p>
        <table class="banker-table">
          <thead>
            <tr>
              <th>Pandal (Process)</th>
              <th>Current Allocation [C, A, R]</th>
              <th>Max Need [C, A, R]</th>
              <th>Remaining Need (Max - Alloc)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>P0 (North Pandal)</strong></td>
              <td>[ 0, 1, 0 ]</td>
              <td>[ 7, 5, 3 ]</td>
              <td><strong>[ 7, 4, 3 ]</strong></td>
            </tr>
            <tr>
              <td><strong>P1 (East Pandal)</strong></td>
              <td>[ 2, 0, 0 ]</td>
              <td>[ 3, 2, 2 ]</td>
              <td><strong>[ 1, 2, 2 ]</strong></td>
            </tr>
            <tr>
              <td><strong>P2 (South Pandal)</strong></td>
              <td>[ 3, 0, 2 ]</td>
              <td>[ 9, 0, 2 ]</td>
              <td><strong>[ 6, 0, 0 ]</strong></td>
            </tr>
            <tr>
              <td><strong>P3 (West Pandal)</strong></td>
              <td>[ 2, 1, 1 ]</td>
              <td>[ 2, 2, 2 ]</td>
              <td><strong>[ 0, 1, 1 ]</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="banker-solve">
          <p>Find the <strong>Safe Sequence</strong> that allows all Pandals to complete their festival without deadlock:</p>
          <div class="sequence-selector">
            <button class="seq-btn" data-seq="p0_first">P0 ➔ P1 ➔ P2 ➔ P3 (Unsafe! Need [7,4,3] > Avail [3,3,2])</button>
            <button class="seq-btn" data-seq="p3_first">P3 ➔ P1 ➔ P0 ➔ P2 (Safe Sequence! Need [0,1,1] ≤ Avail [3,3,2])</button>
            <button class="seq-btn" data-seq="p2_first">P2 ➔ P0 ➔ P1 ➔ P3 (Unsafe! Need [6,0,0] > Avail [3,3,2])</button>
          </div>
          <div id="banker-feedback" class="info-alert" style="display:none; margin-top:10px;"></div>
        </div>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l4" disabled>Light Chaturtha Diya of Deadlock Freedom 🪔</button>
      </div>
    </div>
  `;

  let part1Solved = false;
  let part2Solved = false;
  const verifyBtn = container.querySelector('#btn-verify-l4');

  // Part 1
  const ragBtns = container.querySelectorAll('.break-actions .quiz-btn');
  const ragFeedback = container.querySelector('#rag-feedback');
  ragBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.break === 'preempt') {
        soundEngine.playSuccess();
        ragBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        ragFeedback.style.display = 'block';
        ragFeedback.className = 'info-alert success';
        ragFeedback.innerHTML = '<strong>Splendid!</strong> Preempting resources or enforcing strict resource ordering (e.g., must request Matchbox < Candle < Lighter) breaks the <strong>Circular Wait</strong> condition, preventing deadlock!';
        part1Solved = true;
        checkCompletion();
      } else {
        soundEngine.playError();
        ragFeedback.style.display = 'block';
        ragFeedback.className = 'info-alert';
        ragFeedback.innerHTML = 'Holding and waiting or adding resources without ordering exacerbates deadlock. You must eliminate one of Coffman’s 4 conditions!';
      }
    });
  });

  // Part 2
  const seqBtns = container.querySelectorAll('.sequence-selector .seq-btn');
  const bankerFeedback = container.querySelector('#banker-feedback');
  seqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.seq === 'p3_first') {
        soundEngine.playSuccess();
        soundEngine.playFirecracker();
        seqBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        bankerFeedback.style.display = 'block';
        bankerFeedback.className = 'info-alert success';
        bankerFeedback.innerHTML = `<strong>Safe State Confirmed!</strong><br>
        1. P3 Need [0,1,1] ≤ Available [3,3,2] ➔ P3 finishes & releases [2,1,1] ➔ New Available = [5,4,3]<br>
        2. P1 Need [1,2,2] ≤ [5,4,3] ➔ P1 finishes & releases [2,0,0] ➔ New Available = [7,4,3]<br>
        3. P0 Need [7,4,3] ≤ [7,4,3] ➔ P0 finishes & releases [0,1,0] ➔ New Available = [7,5,3]<br>
        4. P2 finishes! Complete safe sequence: <strong>&lt;P3, P1, P0, P2&gt;</strong>`;
        part2Solved = true;
        checkCompletion();
      } else {
        soundEngine.playError();
        bankerFeedback.style.display = 'block';
        bankerFeedback.className = 'info-alert';
        bankerFeedback.innerHTML = 'That sequence enters an Unsafe State! Check the initial Available vector [3, 3, 2]. P0 needs [7,4,3] and P2 needs [6,0,0], which exceeds initial inventory!';
      }
    });
  });

  function checkCompletion() {
    if (part1Solved && part2Solved) {
      verifyBtn.removeAttribute('disabled');
    }
  }

  verifyBtn.addEventListener('click', () => {
    soundEngine.playDiyaLight();
    onComplete(100);
  });
}

// ==========================================
// LEVEL 5: MEMORY MANAGEMENT & FRAGMENTATION
// ==========================================
function renderLevel5(container, onComplete) {
  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">🎨</span>
        <div>
          <h3>The Grand Rangoli: Memory Allocation & Compaction</h3>
          <p class="subtitle">Fit colorful Rangoli stencils into courtyard memory blocks and clean up External Fragmentation!</p>
        </div>
      </div>

      <div class="rangoli-memory-map">
        <h4>Courtyard Memory Partitions:</h4>
        <div class="partitions-bar" id="partitions-bar">
          <div class="mem-slot free" data-size="100" id="slot-0"><span>Slot 0 (100 KB)</span><small class="slot-status">FREE</small></div>
          <div class="mem-slot free" data-size="500" id="slot-1"><span>Slot 1 (500 KB)</span><small class="slot-status">FREE</small></div>
          <div class="mem-slot free" data-size="200" id="slot-2"><span>Slot 2 (200 KB)</span><small class="slot-status">FREE</small></div>
          <div class="mem-slot free" data-size="300" id="slot-3"><span>Slot 3 (300 KB)</span><small class="slot-status">FREE</small></div>
          <div class="mem-slot free" data-size="600" id="slot-4"><span>Slot 4 (600 KB)</span><small class="slot-status">FREE</small></div>
        </div>
      </div>

      <div class="stencils-tray">
        <h4>Festive Rangoli Stencils to Allocate:</h4>
        <div class="stencil-chips">
          <div class="stencil-card" data-size="212" id="st-1" style="border-left: 5px solid #FF5722;">
            <strong>🌸 Lotus Rangoli</strong> (212 KB)
          </div>
          <div class="stencil-card" data-size="417" id="st-2" style="border-left: 5px solid #00BCD4;">
            <strong>🦚 Peacock Rangoli</strong> (417 KB)
          </div>
          <div class="stencil-card" data-size="112" id="st-3" style="border-left: 5px solid #8BC34A;">
            <strong>🪔 Golden Diya Rangoli</strong> (112 KB)
          </div>
          <div class="stencil-card" data-size="426" id="st-4" style="border-left: 5px solid #E91E63;">
            <strong>✨ Mandana Geometric</strong> (426 KB)
          </div>
        </div>
      </div>

      <div class="algo-controls">
        <button class="btn btn-secondary active" id="btn-first-fit">Apply Best-Fit Allocation</button>
        <button class="btn btn-secondary" id="btn-reset-mem">Clear Courtyard</button>
        <button class="btn btn-warning" id="btn-compaction" style="display:none;">🧹 Execute Royal Memory Compaction</button>
      </div>

      <div class="frag-stats" id="frag-stats">
        <p>Select an allocation strategy to see how memory holes and fragmentation behave.</p>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l5" disabled>Light Panchama Diya of Memory 🪔</button>
      </div>
    </div>
  `;

  const btnBestFit = container.querySelector('#btn-first-fit');
  const btnReset = container.querySelector('#btn-reset-mem');
  const btnCompaction = container.querySelector('#btn-compaction');
  const fragStats = container.querySelector('#frag-stats');
  const verifyBtn = container.querySelector('#btn-verify-l5');

  btnBestFit.addEventListener('click', () => {
    soundEngine.playFirecracker();
    // Best Fit:
    // Stencil 1 (212 KB): fits in smallest hole >= 212. Holes: 100(no), 500, 200(no), 300(fits! left=88), 600. Best is 300!
    // Stencil 2 (417 KB): Holes remaining: 100, 500(left=83), 200, 88, 600. Best is 500!
    // Stencil 3 (112 KB): Holes remaining: 100(no), 83(no), 200(left=88), 88(no), 600. Best is 200!
    // Stencil 4 (426 KB): Holes remaining: 100, 83, 88, 88, 600(left=174). Fits in 600!
    
    container.querySelector('#slot-0').innerHTML = '<span>Slot 0 (100 KB)</span><small style="color:#ffcc00;">FREE (100 KB)</small>';
    container.querySelector('#slot-1').innerHTML = '<span>Slot 1</span><small style="color:#00ff88;">🦚 Peacock (417K)<br>Hole: 83K</small>';
    container.querySelector('#slot-2').innerHTML = '<span>Slot 2</span><small style="color:#00ff88;">🪔 Diya (112K)<br>Hole: 88K</small>';
    container.querySelector('#slot-3').innerHTML = '<span>Slot 3</span><small style="color:#00ff88;">🌸 Lotus (212K)<br>Hole: 88K</small>';
    container.querySelector('#slot-4').innerHTML = '<span>Slot 4</span><small style="color:#00ff88;">✨ Mandana (426K)<br>Hole: 174K</small>';

    fragStats.innerHTML = `
      <div class="info-alert success">
        <strong>Best-Fit Executed!</strong> All 4 initial stencils allocated.<br>
        Remaining scattered free fragments: 100 KB + 83 KB + 88 KB + 88 KB + 174 KB = <strong>533 KB TOTAL FREE MEMORY</strong>.<br>
        <em>Now an incoming Royal Maha-Rangoli (300 KB) arrives! But no single contiguous hole can hold 300 KB! This is <strong>External Fragmentation</strong>.</em>
      </div>
    `;

    btnCompaction.style.display = 'inline-block';
  });

  btnReset.addEventListener('click', () => {
    soundEngine.playClick();
    container.querySelectorAll('.mem-slot').forEach(s => {
      s.className = 'mem-slot free';
      s.innerHTML = `<span>${s.id} (${s.dataset.size} KB)</span><small class="slot-status">FREE</small>`;
    });
    btnCompaction.style.display = 'none';
    fragStats.innerHTML = '<p>Courtyard cleared.</p>';
  });

  btnCompaction.addEventListener('click', () => {
    soundEngine.playSuccess();
    soundEngine.playBell(1046);
    
    // Animate compaction
    const pBar = container.querySelector('#partitions-bar');
    pBar.innerHTML = `
      <div class="mem-slot allocated" style="flex:4; background:#2e7d32;">
        <span>Compacted Allocated Rangolis</span>
        <small style="color:#fff;">1167 KB Contiguous in RAM</small>
      </div>
      <div class="mem-slot free" style="flex:2; background:#ff9800;">
        <span>Unified Free Memory</span>
        <small style="color:#fff;">533 KB Contiguous Free Space! 🏆</small>
      </div>
    `;

    fragStats.innerHTML = `
      <div class="info-alert success">
        <strong>Royal Compaction Complete!</strong> Relocated all active processes to one end of memory, merging all free fragments into one unified <strong>533 KB contiguous hole</strong>. The 300 KB Maha-Rangoli can now comfortably fit!
      </div>
    `;

    verifyBtn.removeAttribute('disabled');
  });

  verifyBtn.addEventListener('click', () => {
    soundEngine.playDiyaLight();
    onComplete(100);
  });
}

// ==========================================
// LEVEL 6: PAGING & VIRTUAL MEMORY
// ==========================================
function renderLevel6(container, onComplete) {
  const referenceString = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3];
  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">🏮</span>
        <div>
          <h3>Akash Kandil: Paging, TLB & LRU Replacement</h3>
          <p class="subtitle">Manage festival sky lantern requests in 3 physical balcony frames!</p>
        </div>
      </div>

      <div class="reference-string-view">
        <h4>🏮 Sky Lantern Request Stream (Virtual Page Numbers):</h4>
        <div class="stream-chips">
          ${referenceString.map((num, i) => `<span class="page-num" id="page-req-${i}">${num}</span>`).join('')}
        </div>
      </div>

      <div class="frames-view">
        <h4>Palace Balcony Hooks (3 Physical RAM Frames):</h4>
        <div class="ram-frames">
          <div class="frame-slot" id="frame-0">Frame 0: [Empty]</div>
          <div class="frame-slot" id="frame-1">Frame 1: [Empty]</div>
          <div class="frame-slot" id="frame-2">Frame 2: [Empty]</div>
        </div>
      </div>

      <div class="lru-simulator">
        <div class="btn-group">
          <button class="btn btn-secondary active" id="btn-step-lru">Step Next Lantern Request (LRU)</button>
          <button class="btn btn-secondary" id="btn-auto-lru">Auto-Simulate All 10 Steps</button>
          <button class="btn btn-secondary" id="btn-reset-lru">Reset</button>
        </div>
      </div>

      <div class="tlb-scoreboard">
        <div class="score-card">
          <span class="sc-val" id="count-hits">0</span>
          <span class="sc-label">TLB / Page Hits 🟢</span>
        </div>
        <div class="score-card">
          <span class="sc-val" id="count-faults">0</span>
          <span class="sc-label">Page Faults (Misses) 🔴</span>
        </div>
        <div class="score-card">
          <span class="sc-val" id="fault-rate">0%</span>
          <span class="sc-label">Fault Ratio</span>
        </div>
      </div>

      <div class="step-log" id="paging-log">
        <p>Press "Step Next" or "Auto-Simulate" to watch the LRU stack update frames.</p>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l6" disabled>Light Shashta Diya of Virtual Memory 🪔</button>
      </div>
    </div>
  `;

  let currentStep = 0;
  let frames = [-1, -1, -1];
  let lastUsed = [-1, -1, -1];
  let hits = 0;
  let faults = 0;

  const countHits = container.querySelector('#count-hits');
  const countFaults = container.querySelector('#count-faults');
  const faultRate = container.querySelector('#fault-rate');
  const pagingLog = container.querySelector('#paging-log');
  const verifyBtn = container.querySelector('#btn-verify-l6');

  function updateFrameUI() {
    for (let i = 0; i < 3; i++) {
      const el = container.querySelector(`#frame-${i}`);
      if (frames[i] === -1) {
        el.innerHTML = `Frame ${i}: <small>[Empty]</small>`;
        el.className = 'frame-slot';
      } else {
        el.innerHTML = `Frame ${i}: <strong>🏮 Lantern Page ${frames[i]}</strong>`;
        el.className = 'frame-slot active';
      }
    }
    countHits.innerText = hits;
    countFaults.innerText = faults;
    const total = hits + faults;
    faultRate.innerText = total > 0 ? ((faults / total) * 100).toFixed(0) + '%' : '0%';
  }

  function step() {
    if (currentStep >= referenceString.length) return;
    const page = referenceString[currentStep];

    // Highlight current stream chip
    container.querySelectorAll('.page-num').forEach(c => c.classList.remove('current'));
    const currEl = container.querySelector(`#page-req-${currentStep}`);
    if (currEl) currEl.classList.add('current');

    // Check hit
    const existingIdx = frames.indexOf(page);
    if (existingIdx !== -1) {
      // HIT!
      hits++;
      lastUsed[existingIdx] = currentStep;
      soundEngine.playBell(920);
      pagingLog.innerHTML = `<p style="color:#00ff88;">Step ${currentStep + 1}: Requested Page <strong>${page}</strong> ➔ <strong>TLB / PAGE HIT!</strong> Page already present in Frame ${existingIdx}. No disk fetch needed.</p>`;
    } else {
      // FAULT!
      faults++;
      soundEngine.playFirecracker();
      // Empty slot?
      const emptyIdx = frames.indexOf(-1);
      if (emptyIdx !== -1) {
        frames[emptyIdx] = page;
        lastUsed[emptyIdx] = currentStep;
        pagingLog.innerHTML = `<p style="color:#ffcc00;">Step ${currentStep + 1}: Requested Page <strong>${page}</strong> ➔ <strong>PAGE FAULT!</strong> Loaded into empty Frame ${emptyIdx}.</p>`;
      } else {
        // Evict LRU (smallest lastUsed value)
        let lruIdx = 0;
        let minTime = lastUsed[0];
        for (let j = 1; j < 3; j++) {
          if (lastUsed[j] < minTime) {
            minTime = lastUsed[j];
            lruIdx = j;
          }
        }
        const victim = frames[lruIdx];
        frames[lruIdx] = page;
        lastUsed[lruIdx] = currentStep;
        pagingLog.innerHTML = `<p style="color:#ff4d4d;">Step ${currentStep + 1}: Requested Page <strong>${page}</strong> ➔ <strong>PAGE FAULT!</strong> LRU Replacement: Evicted Page ${victim} from Frame ${lruIdx}.</p>`;
      }
    }

    currentStep++;
    updateFrameUI();

    if (currentStep >= referenceString.length) {
      soundEngine.playSuccess();
      verifyBtn.removeAttribute('disabled');
      pagingLog.innerHTML += `<p style="color:#00ffff; font-weight:bold;">All 10 references evaluated! Final Fault Count: ${faults}/10. LRU minimized total faults!</p>`;
    }
  }

  container.querySelector('#btn-step-lru').addEventListener('click', step);

  container.querySelector('#btn-auto-lru').addEventListener('click', () => {
    const timer = setInterval(() => {
      if (currentStep >= referenceString.length) {
        clearInterval(timer);
      } else {
        step();
      }
    }, 400);
  });

  container.querySelector('#btn-reset-lru').addEventListener('click', () => {
    currentStep = 0;
    frames = [-1, -1, -1];
    lastUsed = [-1, -1, -1];
    hits = 0;
    faults = 0;
    container.querySelectorAll('.page-num').forEach(c => c.classList.remove('current'));
    updateFrameUI();
    pagingLog.innerHTML = '<p>Simulation reset.</p>';
  });

  verifyBtn.addEventListener('click', () => {
    soundEngine.playDiyaLight();
    onComplete(100);
  });
}

// ==========================================
// LEVEL 7: FILE SYSTEMS & INODES
// ==========================================
function renderLevel7(container, onComplete) {
  container.innerHTML = `
    <div class="level-card">
      <div class="level-header">
        <span class="badge-icon">📦</span>
        <div>
          <h3>The Royal Mithai Vault: Inodes & File Block Allocation</h3>
          <p class="subtitle">Traverse direct and indirect Inode pointers to locate the Emperor's Golden Kaju Katli!</p>
        </div>
      </div>

      <div class="inode-inspector">
        <div class="inode-struct">
          <h4>📑 Inode Structure: <code>/palace/vault/golden_kaju.box</code></h4>
          <div class="inode-fields">
            <div class="field"><span>Inode Number:</span> <strong>#42001</strong></div>
            <div class="field"><span>Owner:</span> <strong>royal_halwai:emperor</strong></div>
            <div class="field"><span>Permissions:</span> <strong>-rw-r----- (0640)</strong></div>
            <div class="field"><span>Size:</span> <strong>24 KB (6 Data Blocks @ 4KB/block)</strong></div>
          </div>

          <div class="pointer-table">
            <h5>Pointers Array:</h5>
            <div class="p-row">
              <span class="p-type">Direct Pointer 0:</span> ➡️ <button class="btn-ptr" data-block="104">Block 104</button>
            </div>
            <div class="p-row">
              <span class="p-type">Direct Pointer 1:</span> ➡️ <button class="btn-ptr" data-block="105">Block 105</button>
            </div>
            <div class="p-row">
              <span class="p-type">Direct Pointer 2:</span> ➡️ <button class="btn-ptr" data-block="108">Block 108</button>
            </div>
            <div class="p-row">
              <span class="p-type">Direct Pointer 3:</span> ➡️ <button class="btn-ptr" data-block="112">Block 112</button>
            </div>
            <div class="p-row">
              <span class="p-type">Single Indirect Pointer:</span> ➡️ <button class="btn-ptr highlight" data-block="250">Index Block 250</button>
            </div>
          </div>
        </div>

        <div class="disk-blocks-view">
          <h4>💾 Storage Vault Blocks:</h4>
          <div class="disk-grid" id="disk-grid">
            <div class="disk-cell" id="blk-104">Block 104: Silver Foil Recipe</div>
            <div class="disk-cell" id="blk-105">Block 105: Cashew Paste Log</div>
            <div class="disk-cell" id="blk-108">Block 108: Saffron Infusion</div>
            <div class="disk-cell" id="blk-112">Block 112: Cardamom Essence</div>
            <div class="disk-cell index-block" id="blk-250">Block 250 (Index Block): Pointers [301, 302]</div>
            <div class="disk-cell" id="blk-301">Block 301: Royal Seal of Purity</div>
            <div class="disk-cell golden-target" id="blk-302">Block 302: 🎁 GOLDEN KAJU KATLI!</div>
          </div>
        </div>
      </div>

      <div class="fs-quiz">
        <h4>🧠 Chief Architect's Architectural Query:</h4>
        <p>Why do modern Unix file systems use an Inode structure with direct and indirect pointers instead of a simple contiguous allocation method for storing files?</p>
        <div class="quiz-options">
          <button class="quiz-btn" data-fs="inode">Allows files to grow dynamically without external fragmentation & supports fast direct random access</button>
          <button class="quiz-btn" data-fs="contig">Contiguous allocation is always superior for random writes</button>
          <button class="quiz-btn" data-fs="linked">Pure linked allocation gives the fastest random disk seeks</button>
        </div>
        <div id="fs-feedback" class="info-alert" style="display:none; margin-top:10px;"></div>
      </div>

      <div class="action-footer">
        <button class="btn btn-primary" id="btn-verify-l7" disabled>Light Saptama Diya & Attain MahaDiwali Mastery! 👑</button>
      </div>
    </div>
  `;

  let foundGoldenSweet = false;
  let answeredQuiz = false;
  const verifyBtn = container.querySelector('#btn-verify-l7');
  const fsFeedback = container.querySelector('#fs-feedback');

  // Pointer clicking
  container.querySelectorAll('.btn-ptr').forEach(btn => {
    btn.addEventListener('click', () => {
      soundEngine.playClick();
      const blockId = btn.dataset.block;
      const targetCell = container.querySelector(`#blk-${blockId}`);
      
      container.querySelectorAll('.disk-cell').forEach(c => c.classList.remove('selected'));
      if (targetCell) {
        targetCell.classList.add('selected');
        if (blockId === '250') {
          soundEngine.playBell(700);
          alert('Opened Index Block 250! It holds pointers to Data Blocks [301, 302]. Tap on Block 302 in the grid to inspect!');
        }
      }
    });
  });

  const goldenCell = container.querySelector('#blk-302');
  goldenCell.addEventListener('click', () => {
    soundEngine.playSuccess();
    soundEngine.playFirecracker();
    goldenCell.classList.add('discovered');
    foundGoldenSweet = true;
    checkEnd();
  });

  // Quiz
  container.querySelectorAll('.fs-quiz .quiz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.fs === 'inode') {
        soundEngine.playSuccess();
        container.querySelectorAll('.fs-quiz .quiz-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        fsFeedback.style.display = 'block';
        fsFeedback.className = 'info-alert success';
        fsFeedback.innerHTML = '<strong>Outstanding!</strong> Inodes eliminate external fragmentation, allow flexible dynamic file growth, and permit direct random access via indexing without walking lengthy sequential linked chains!';
        answeredQuiz = true;
        checkEnd();
      } else {
        soundEngine.playError();
        fsFeedback.style.display = 'block';
        fsFeedback.className = 'info-alert';
        fsFeedback.innerHTML = 'Contiguous allocation suffers from external fragmentation and file growth issues. Pure linked allocation requires $O(n)$ slow sequential disk seeks. Inodes combine the best of both!';
      }
    });
  });

  function checkEnd() {
    if (foundGoldenSweet && answeredQuiz) {
      verifyBtn.removeAttribute('disabled');
    }
  }

  verifyBtn.addEventListener('click', () => {
    soundEngine.playSuccess();
    onComplete(100);
  });
}
