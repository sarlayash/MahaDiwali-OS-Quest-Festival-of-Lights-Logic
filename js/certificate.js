/**
 * Diwali OS Quest - Grand Festive Certificate Generator
 * Canvas-based ultra high-res (2400x1600) golden Diwali parchment certificate.
 * Includes Diya motifs, Sanskrit shloka, learner's name, badges grid, and verification ID.
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

    // Background gradient: Royal parchment cream with subtle gold warmth
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 200, w / 2, h / 2, 1400);
    bgGrad.addColorStop(0, '#FFFDF5');
    bgGrad.addColorStop(0.6, '#FFF8E7');
    bgGrad.addColorStop(1, '#F7E7CE');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ornate Golden Dual Borders
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#D4AF37'; // Metallic Gold
    ctx.strokeRect(60, 60, w - 120, h - 120);

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#B8860B';
    ctx.strokeRect(90, 90, w - 180, h - 180);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#8B0000'; // Royal Deep Crimson
    ctx.strokeRect(105, 105, w - 210, h - 210);

    // Ornate corner flourishes
    this.drawCorner(ctx, 105, 105, 1, 1);
    this.drawCorner(ctx, w - 105, 105, -1, 1);
    this.drawCorner(ctx, 105, h - 105, 1, -1);
    this.drawCorner(ctx, w - 105, h - 105, -1, -1);

    // Header Emblem - Sacred Om / Diya & Rangoli
    ctx.textAlign = 'center';
    
    // Top auspicious Sanskrit quote
    ctx.font = 'italic 26px "Times New Roman", Georgia, serif';
    ctx.fillStyle = '#8B0000';
    ctx.fillText('॥ तमसो मा ज्योतिर्गमय — From Darkness into Light, From Stagnation into Concurrency ॥', w / 2, 165);

    // Top Emblem Diya Icon
    ctx.font = '70px serif';
    ctx.fillText('🪔 ✨ 👑 ✨ 🪔', w / 2, 245);

    // Main Certificate Title
    ctx.font = 'bold 54px "Cinzel", "Times New Roman", serif';
    ctx.fillStyle = '#6A0572'; // Imperial Deep Purple
    ctx.fillText('MAHADIWALI OPERATING SYSTEMS QUEST', w / 2, 325);

    ctx.font = 'bold 36px "Times New Roman", serif';
    ctx.fillStyle = '#B8860B'; // Gold
    ctx.fillText('CERTIFICATE OF DISTINCTION & MASTERY', w / 2, 380);

    // Ribbon / Subtitle
    ctx.font = '28px Georgia, serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('This is proudly presented to commemorate that', w / 2, 450);

    // Learner's Name (regal and prominent)
    ctx.font = 'bold 74px "Playfair Display", "Georgia", cursive, serif';
    ctx.fillStyle = '#B22222'; // Firebrick crimson
    ctx.fillText(player.name.toUpperCase(), w / 2, 545);

    // Underline flourish for name
    ctx.beginPath();
    ctx.moveTo(w / 2 - 400, 565);
    ctx.lineTo(w / 2 + 400, 565);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#D4AF37';
    ctx.stroke();

    // Achievement Description
    ctx.font = '30px Georgia, serif';
    ctx.fillStyle = '#222222';
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
    ctx.fillStyle = '#8B0000';
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
      ctx.fillStyle = '#FFF8E7';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#D4AF37';
      ctx.stroke();

      // Badge emoji
      ctx.font = '46px serif';
      ctx.fillText(b.icon, bx, badgeY + 16);

      // Badge label
      ctx.font = 'bold 18px "Times New Roman", serif';
      ctx.fillStyle = '#4A154B';
      const shortName = b.name.split(' ')[0] + ' ' + (b.name.split(' ')[1] || '');
      ctx.fillText(shortName, bx, badgeY + 80);
    });

    // Verification ID, Date & XP Block
    const footerY = 1260;
    ctx.textAlign = 'left';
    ctx.font = '22px monospace';
    ctx.fillStyle = '#555555';
    ctx.fillText(`Credential ID: ${player.certId}`, 180, footerY);
    ctx.fillText(`Date of Conferrer: ${player.completionDate || new Date().toDateString()}`, 180, footerY + 36);
    ctx.fillText(`Mastery Score: ${player.xp} XP (Grade A+ Outstanding)`, 180, footerY + 72);

    // Official Gold Seal / Stamp
    const sealX = w / 2;
    const sealY = footerY + 35;
    ctx.save();
    ctx.beginPath();
    ctx.arc(sealX, sealY, 95, 0, Math.PI * 2);
    ctx.fillStyle = '#D4AF37';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(212,175,55,0.6)';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#B8860B';
    ctx.stroke();

    ctx.fillStyle = '#8B0000';
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px "Times New Roman", serif';
    ctx.fillText('★ OFFICIAL SEAL ★', sealX, sealY - 40);
    ctx.font = '40px serif';
    ctx.fillText('🪔', sealX, sealY);
    ctx.font = 'bold 18px "Times New Roman", serif';
    ctx.fillText('MAHADIWALI OS', sealX, sealY + 35);
    ctx.fillText('AUTHENTICATED', sealX, sealY + 58);
    ctx.restore();

    // Signatures
    ctx.textAlign = 'right';
    ctx.font = 'italic bold 28px "Brush Script MT", "Playfair Display", cursive, serif';
    ctx.fillStyle = '#1A237E';
    ctx.fillText('Grand OS Architect', w - 180, footerY + 10);
    ctx.beginPath();
    ctx.moveTo(w - 380, footerY + 25);
    ctx.lineTo(w - 180, footerY + 25);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#777';
    ctx.stroke();

    ctx.font = '20px Georgia, serif';
    ctx.fillStyle = '#444';
    ctx.fillText('Chair of Concurrency & Systems', w - 180, footerY + 55);
    ctx.fillText('Royal Deepavali Council of Ayodhya Core', w - 180, footerY + 80);

    return this.canvas.toDataURL('image/png');
  }

  drawCorner(ctx, x, y, dx, dy) {
    ctx.save();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 60);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 60, y);
    ctx.stroke();

    // Small decorative circle
    ctx.beginPath();
    ctx.arc(x + dx * 20, y + dy * 20, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#B22222';
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
}

const certificateGenerator = new CertificateGenerator();
