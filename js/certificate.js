/**
 * Diwali OS Quest - Grand Festive Certificate & Badge PNG Generator
 * White Background Edition with Colorful Indian Festive Vibes.
 * Verified: NO fake signatories — only "Powered By Kapil" and 5 Diyas at bottom.
 * Pure PNG downloads for Certificates and Badges.
 */
class CertificateGenerator {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 2400;
    this.canvas.height = 1600;
    this.ctx = this.canvas.getContext('2d');
  }

  generate(player, badges) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Background: Pristine Ivory White with subtle warm festive vignette
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 200, w / 2, h / 2, 1400);
    bgGrad.addColorStop(0, '#FFFFFF');
    bgGrad.addColorStop(0.6, '#FFFDF8');
    bgGrad.addColorStop(1, '#FFF5EA');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ornate Dual Festive Borders (Gold & Rani Pink / Saffron)
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#D4AF37'; // 24K Gold
    ctx.strokeRect(60, 60, w - 120, h - 120);

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#E91E63'; // Rani Pink
    ctx.strokeRect(88, 88, w - 176, h - 176);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FF9800'; // Marigold Saffron
    ctx.strokeRect(104, 104, w - 208, h - 208);

    // Corner Ornaments
    this.drawCorner(ctx, 104, 104, 1, 1);
    this.drawCorner(ctx, w - 104, 104, -1, 1);
    this.drawCorner(ctx, 104, h - 104, 1, -1);
    this.drawCorner(ctx, w - 104, h - 104, -1, -1);

    // Header Emblem
    ctx.textAlign = 'center';
    
    // Top Sanskrit invocation
    ctx.font = 'italic 26px "Times New Roman", Georgia, serif';
    ctx.fillStyle = '#BF360C';
    ctx.fillText('॥ तमसो मा ज्योतिर्गमय — From Darkness into Light, From Stagnation into Concurrency ॥', w / 2, 165);

    // Auspicious Header Emblems
    ctx.font = '68px serif';
    ctx.fillText('🪔 ✨ 👑 ✨ 🪔', w / 2, 245);

    // Main Certificate Title
    ctx.font = 'bold 54px "Cinzel", "Times New Roman", serif';
    ctx.fillStyle = '#C2185B'; // Rani Pink
    ctx.fillText('MAHADIWALI OPERATING SYSTEMS QUEST', w / 2, 325);

    ctx.font = 'bold 36px "Times New Roman", serif';
    ctx.fillStyle = '#E65100'; // Deep Saffron
    ctx.fillText('CERTIFICATE OF DISTINCTION & MASTERY', w / 2, 380);

    // Ribbon / Subtitle
    ctx.font = '28px Georgia, serif';
    ctx.fillStyle = '#4A5568';
    ctx.fillText('This royal credential is proudly presented to commemorate that', w / 2, 450);

    // Learner's Name (regal, prominent in crimson & gold)
    ctx.font = 'bold 74px "Playfair Display", "Georgia", cursive, serif';
    ctx.fillStyle = '#B71C1C';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(233, 30, 99, 0.25)';
    ctx.fillText(player.name.toUpperCase(), w / 2, 545);
    ctx.shadowBlur = 0;

    // Underline flourish
    ctx.beginPath();
    ctx.moveTo(w / 2 - 420, 565);
    ctx.lineTo(w / 2 + 420, 565);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFB300';
    ctx.stroke();

    // Achievement Description
    ctx.font = '28px Georgia, serif';
    ctx.fillStyle = '#2D3748';
    const lines = [
      'has illuminated all 7 Sacred Akhand Diyas of the Grand Palace Core and demonstrated supreme mastery over',
      'Processes & Threads, CPU Scheduling (FCFS/SJF/RR), Concurrency Synchronization & Mutexes,',
      'Deadlock Avoidance (Banker\'s Algorithm), Memory Partitioning & Compaction, Virtual Paging (LRU/TLB),',
      'and High-Performance Inode-Structured File Systems during the auspicious festival of Deepavali.'
    ];
    lines.forEach((line, idx) => {
      ctx.fillText(line, w / 2, 630 + idx * 46);
    });

    // Badges Showcase Banner
    ctx.font = 'bold 30px "Times New Roman", serif';
    ctx.fillStyle = '#C2185B';
    ctx.fillText('✦ ✦ ✦   HONORARY FESTIVE BADGES CONFERRED   ✦ ✦ ✦', w / 2, 850);

    // Draw 8 Badges horizontally
    const badgeW = 240;
    const startX = (w - (8 * badgeW)) / 2 + 120;
    const badgeY = 930;

    badges.forEach((b, i) => {
      const bx = startX + i * badgeW;
      
      // Badge ring
      ctx.beginPath();
      ctx.arc(bx, badgeY, 48, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8E1';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#FFB300';
      ctx.stroke();

      // Badge emoji
      ctx.font = '46px serif';
      ctx.fillText(b.icon, bx, badgeY + 16);

      // Badge label
      ctx.font = 'bold 18px "Times New Roman", serif';
      ctx.fillStyle = '#C2185B';
      const shortName = b.name.split(' ')[0] + ' ' + (b.name.split(' ')[1] || '');
      ctx.fillText(shortName, bx, badgeY + 80);
    });

    // Verification ID, Date & XP Block (Left footer)
    const footerY = 1260;
    ctx.textAlign = 'left';
    ctx.font = '22px monospace';
    ctx.fillStyle = '#4A5568';
    ctx.fillText(`Credential ID: ${player.certId}`, 180, footerY);
    ctx.fillText(`Date of Conferrer: ${player.completionDate || new Date().toDateString()}`, 180, footerY + 36);
    ctx.fillText(`Mastery Score: ${player.xp} XP (Grade A+ Outstanding)`, 180, footerY + 72);

    // Official Stamp / Seal (Center)
    const sealX = w / 2;
    const sealY = footerY + 35;
    ctx.save();
    ctx.beginPath();
    ctx.arc(sealX, sealY, 90, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF8E1';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(255, 179, 0, 0.4)';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#D4AF37';
    ctx.stroke();

    ctx.fillStyle = '#C2185B';
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px "Times New Roman", serif';
    ctx.fillText('★ OFFICIAL SEAL ★', sealX, sealY - 36);
    ctx.font = '40px serif';
    ctx.fillText('🪔', sealX, sealY);
    ctx.font = 'bold 18px "Times New Roman", serif';
    ctx.fillText('MAHADIWALI OS', sealX, sealY + 35);
    ctx.fillText('AUTHENTICATED', sealX, sealY + 56);
    ctx.restore();

    // Right Footer: ONLY "Powered By Kapil" (No fake signatories!)
    ctx.textAlign = 'right';
    ctx.font = 'bold 36px "Cinzel", "Georgia", serif';
    ctx.fillStyle = '#C2185B';
    ctx.fillText('Powered By Kapil', w - 180, footerY + 35);

    ctx.beginPath();
    ctx.moveTo(w - 480, footerY + 48);
    ctx.lineTo(w - 180, footerY + 48);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFB300';
    ctx.stroke();

    ctx.font = '20px Georgia, serif';
    ctx.fillStyle = '#718096';
    ctx.fillText('Diwali Operating Systems Mahotsav', w - 180, footerY + 76);

    // EXACT 5 DIYAS AT THE VERY BOTTOM OF THE CERTIFICATE
    ctx.textAlign = 'center';
    ctx.font = '52px serif';
    ctx.fillText('🪔   🪔   🪔   🪔   🪔', w / 2, h - 90);

    return this.canvas.toDataURL('image/png');
  }

  drawCorner(ctx, x, y, dx, dy) {
    ctx.save();
    ctx.strokeStyle = '#E91E63';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 60);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 60, y);
    ctx.stroke();

    // Small decorative golden flower at corner
    ctx.beginPath();
    ctx.arc(x + dx * 20, y + dy * 20, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FFB300';
    ctx.fill();
    ctx.restore();
  }

  downloadCertificate(player, badges) {
    const dataUrl = this.generate(player, badges);
    const link = document.createElement('a');
    link.download = `Diwali_OS_Mastery_Certificate_${player.name.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  }

  // Generate an individual high-res PNG Badge card for learners
  downloadBadgePNG(badge, playerName) {
    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 1000;
    badgeCanvas.height = 1000;
    const bCtx = badgeCanvas.getContext('2d');

    // White background with festive radial warmth
    const grad = bCtx.createRadialGradient(500, 500, 100, 500, 500, 600);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.8, '#FFFDF8');
    grad.addColorStop(1, '#FFF5EA');
    bCtx.fillStyle = grad;
    bCtx.fillRect(0, 0, 1000, 1000);

    // Dual Festive Borders
    bCtx.lineWidth = 14;
    bCtx.strokeStyle = '#D4AF37'; // 24K Gold
    bCtx.strokeRect(40, 40, 920, 920);

    bCtx.lineWidth = 4;
    bCtx.strokeStyle = '#E91E63'; // Rani Pink
    bCtx.strokeRect(62, 62, 876, 876);

    // Header Tag
    bCtx.textAlign = 'center';
    bCtx.font = 'bold 26px "Cinzel", serif';
    bCtx.fillStyle = '#C2185B';
    bCtx.fillText('MAHADIWALI OS QUEST • OFFICIAL BADGE', 500, 120);

    // Badge Icon Circle (Vibrant Gold)
    bCtx.beginPath();
    bCtx.arc(500, 310, 140, 0, Math.PI * 2);
    bCtx.fillStyle = '#FFF8E1';
    bCtx.shadowBlur = 20;
    bCtx.shadowColor = 'rgba(255, 179, 0, 0.4)';
    bCtx.fill();
    bCtx.lineWidth = 6;
    bCtx.strokeStyle = '#FFB300';
    bCtx.stroke();
    bCtx.shadowBlur = 0;

    // Badge Emoji
    bCtx.font = '130px serif';
    bCtx.fillText(badge.icon, 500, 355);

    // Badge Name
    bCtx.font = 'bold 44px "Cinzel", "Times New Roman", serif';
    bCtx.fillStyle = '#B71C1C';
    bCtx.fillText(badge.name, 500, 520);

    // Badge Title
    bCtx.font = 'bold 26px Georgia, serif';
    bCtx.fillStyle = '#E65100';
    bCtx.fillText(badge.title, 500, 570);

    // Awarded To
    bCtx.font = '24px Georgia, serif';
    bCtx.fillStyle = '#4A5568';
    bCtx.fillText('Proudly Awarded To', 500, 640);

    bCtx.font = 'bold 40px "Playfair Display", serif';
    bCtx.fillStyle = '#C2185B';
    bCtx.fillText((playerName || 'Scholar').toUpperCase(), 500, 695);

    // Description text
    bCtx.font = '20px Georgia, serif';
    bCtx.fillStyle = '#718096';
    bCtx.fillText(badge.desc, 500, 755);

    // Footer: ONLY "Powered By Kapil"
    bCtx.font = 'bold 30px "Cinzel", serif';
    bCtx.fillStyle = '#C2185B';
    bCtx.fillText('Powered By Kapil', 500, 845);

    // EXACT 5 DIYAS AT THE BOTTOM OF THE BADGE
    bCtx.font = '38px serif';
    bCtx.fillText('🪔   🪔   🪔   🪔   🪔', 500, 915);

    const dataUrl = badgeCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Diwali_OS_Badge_${badge.id}_${(playerName || 'Scholar').replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  }
}

const certificateGenerator = new CertificateGenerator();
