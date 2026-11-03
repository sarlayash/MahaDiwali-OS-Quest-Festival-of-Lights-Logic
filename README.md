# 🪔 MahaDiwali OS Quest: Festival of Lights & Logic
### *दीपावली ओएस यात्रा: The Epic Operating Systems Video Game*

A rich, interactive educational video game built to master foundational and advanced **Operating Systems** concepts through the vibrant cultural tapestry of Diwali (Deepavali) — featuring interactive gameplay levels, authentic festive aesthetics, real-time Gantt charts, deadlock resolvers, memory compactor, LRU page simulators, Inode inspectors, procedural sound synthesis, badges, and printable/downloadable Royal Gold Certificates.

---

## 🌟 Key Features

1. **Diwali Festival Themed Storyline & Lore**:
   - The Grand Palace Core of Ayodhya Core is preparing for the grandest festival of lights. Concurrency chaos, race conditions, memory fragmentation, and deadlock cycles threaten the celebration. The learner is appointed **Royal Systems Architect** to illuminate the **7 Sacred Akhand Diyas**.
2. **Comprehensive Operating Systems Curriculum**:
   - **Level 1 (Pratham Diya)**: *Processes vs. Threads* (The Mithai Karkhana - Address spaces, PCB, context switches, crash isolation).
   - **Level 2 (Dvitiya Diya)**: *CPU Scheduling & Gantt Charts* (Aatishbazi Station - FCFS, SJF, Round Robin time quantum $Q=2$, turnaround & waiting time metrics).
   - **Level 3 (Tritiya Diya)**: *Process Synchronization* (The Akhand Jyoti - Race conditions, Critical Section, Mutex locks, Semaphores `wait()` and `signal()`).
   - **Level 4 (Chaturtha Diya)**: *Deadlocks & Banker's Algorithm* (The Phuljhadi Circle - 4 Coffman conditions, Circular Wait breaking, Banker's Safe State calculation).
   - **Level 5 (Panchama Diya)**: *Memory Management & Compaction* (The Grand Rangoli - First Fit, Best Fit, Internal/External Fragmentation, Compaction).
   - **Level 6 (Shashta Diya)**: *Paging & Virtual Memory* (Akash Kandil - Frames, Pages, TLB hits, Page Faults, LRU Page Replacement).
   - **Level 7 (Saptama Diya)**: *File Systems & Inodes* (The Royal Mithai Vault - Inode metadata, direct pointers, single indirect pointers, disk block allocation).
3. **Earn Badges & Grand Royal Certificate**:
   - **8 Prestigious Festive Badges** conferred dynamically:
     - 🍬 Mithai Threadmaster
     - 🚀 Aatishbazi Scheduler
     - 🪔 Akhand Jyoti Guardian
     - 🎇 Phuljhadi Deadlock Breaker
     - 🎨 Rangoli Memory Architect
     - 🏮 Akash Kandil Paging Sage
     - 📦 Royal Vault Keeper
     - 👑 MahaDiwali OS Samrat
   - **Ultra High-Res Royal Certificate Generator (2400x1600)**:
     - Personalized with the learner's name, unique credential hash, date of completion, mastery score, and embossed badges.
     - One-click **Download PNG** and **Print / Save as PDF** support.
4. **PWA (Progressive Web App) - Install on Phone & Desktop**:
   - Includes standard `manifest.json`, Service Worker caching (`sw.js`), and high-res maskable festive icons.
   - Installable on Android (Chrome: "Install app" or "Add to Home screen"), iPhone/iPad (Safari: Share -> "Add to Home Screen"), and Desktop (Chrome / Edge install prompt).
5. **Procedural Web Audio API Soundscape & Fireworks FX**:
   - Zero external audio files required: synthesizes authentic temple bells, firecracker snaps, rocket launches, victory raga fanfares, and meditative Tanpura drones directly via Web Audio API.
   - Dynamic canvas particle physics with fireworks bursts, sparklers, and falling marigold petals.

---

## 🚀 How to Run & Play

### Option 1: Instant Local Preview with Python
Open your terminal in this directory and start a local HTTP server:

```bash
cd "C:\Users\LC\.gemini\antigravity\scratch\diwali-os-game"
python -m http.server 8080
```

Now open your browser at:
👉 **`http://localhost:8080`**

### Option 2: Direct Browser Opening
You can also directly double-click or open `index.html` in Chrome, Edge, Safari, or Firefox.

### Option 3: Play & Install on Phone
1. Connect your phone and PC to the same Wi-Fi network.
2. Run `python -m http.server 8080 --bind 0.0.0.0`
3. On your phone's browser, navigate to `http://<YOUR-PC-IP>:8080`.
4. Tap **"📲 Install App"** or select **"Add to Home Screen"** to install it as a standalone app!

---

## 📁 Project Structure

```
diwali-os-game/
├── index.html              # Main game UI shell & screens
├── manifest.json           # PWA Web App Manifest
├── sw.js                   # Service Worker for offline play & caching
├── css/
│   └── styles.css          # Diwali festive styling, glowing diyas & responsive layout
├── js/
│   ├── audio.js            # Web Audio API procedural sound engine
│   ├── particles.js        # Festive fireworks, marigold petals & sparkles
│   ├── state.js            # Player profile, XP, level tracking, LocalStorage
│   ├── levels.js           # Interactive mini-games & OS concept simulations
│   ├── certificate.js      # Ultra high-res Royal Certificate generator
│   └── app.js              # Screen router, PWA prompt & modal controllers
└── icons/
    ├── favicon.png         # 64x64 favicon
    ├── apple-touch-icon.png# 180x180 iOS touch icon
    ├── icon-192.png        # 192x192 PWA maskable icon
    └── icon-512.png        # 512x512 PWA splash icon
```
