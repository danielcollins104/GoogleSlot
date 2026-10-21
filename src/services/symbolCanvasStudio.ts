import { SymbolId } from '../types/game';

const SOURCE_IMAGE_URL = '/assets/aistudio/Screenshot_20261020_064929_Files_by_Google_466f8996.jpg';
const FALLBACK_IMAGE_URL = '/public/assets/aistudio/Screenshot_20261020_064929_Files_by_Google_466f8996.jpg';

// Exact Full-HD (2340 x 1080) inner cell bounding boxes for the clean painted 3D artwork
interface CropRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

const CELL_CROPS: Record<string, CropRect> = {
  // Row 0 (Top Row)
  R0_C0_KEFFIYEH_SCOUT: { sx: 505, sy: 197, sw: 248, sh: 220 },
  R0_C1_GYROCOPTER:     { sx: 777, sy: 197, sw: 248, sh: 220 },
  R0_C2_ROYAL_FAMILY:   { sx: 1049, sy: 197, sw: 248, sh: 220 },
  R0_C3_BINOCULARS:     { sx: 1321, sy: 197, sw: 248, sh: 220 },
  R0_C4_BERET_OFFICER:  { sx: 1593, sy: 197, sw: 248, sh: 220 },

  // Row 1 (Middle Row)
  R1_C0_AMMO_CRATE:     { sx: 505, sy: 439, sw: 248, sh: 220 },
  R1_C1_GOLD_COINS:     { sx: 777, sy: 439, sw: 248, sh: 220 },
  R1_C2_CREST_OFFICER:  { sx: 1049, sy: 439, sw: 248, sh: 220 },
  R1_C3_DOG_TAGS:       { sx: 1321, sy: 439, sw: 248, sh: 220 },
  R1_C4_COMPASS:        { sx: 1593, sy: 439, sw: 248, sh: 220 },

  // Row 2 (Bottom Row - Clean cells)
  R2_C0_MASKED_SCOUT:   { sx: 505, sy: 681, sw: 248, sh: 214 },
  R2_C3_RIFLE_GUARD_1:  { sx: 1330, sy: 681, sw: 239, sh: 214 },
  R2_C4_RIFLE_GUARD_2:  { sx: 1593, sy: 681, sw: 248, sh: 214 }
};

export interface SymbolVisualTheme {
  tier: 'SPECIAL' | 'HIGH' | 'CYBER' | 'MID';
  borderColor: string;
  glowColor: string;
  accentColor: string;
  badgeLabel?: string;
}

export const SYMBOL_VISUAL_THEMES: Record<SymbolId, SymbolVisualTheme> = {
  ROYAL_KING: {
    tier: 'HIGH',
    borderColor: '#ffd700',
    glowColor: 'rgba(255, 215, 0, 0.55)',
    accentColor: '#3b82f6'
  },
  EXPEDITION_LEADER: {
    tier: 'HIGH',
    borderColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    accentColor: '#06b6d4'
  },
  BERET_COMMANDER: {
    tier: 'HIGH',
    borderColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    accentColor: '#eab308'
  },
  DESERT_WARRIOR: {
    tier: 'HIGH',
    borderColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    accentColor: '#eab308'
  },
  CYBER_MECH_SKULL: {
    tier: 'CYBER',
    borderColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.55)',
    accentColor: '#00f5d4',
    badgeLabel: 'MAX PAY'
  },
  NEON_PLASMA_CORE: {
    tier: 'CYBER',
    borderColor: '#00f5d4',
    glowColor: 'rgba(0, 245, 212, 0.55)',
    accentColor: '#a855f7'
  },
  HOLO_CYBER_BLADE: {
    tier: 'CYBER',
    borderColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    accentColor: '#00f5d4'
  },
  CYBER_DRONE_ORB: {
    tier: 'CYBER',
    borderColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    accentColor: '#10b981'
  },
  AIRCRAFT_SCOUT: {
    tier: 'MID',
    borderColor: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    accentColor: '#f59e0b'
  },
  BINOCULARS: {
    tier: 'MID',
    borderColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    accentColor: '#14b8a6'
  },
  COMPASS: {
    tier: 'MID',
    borderColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    accentColor: '#fbbf24'
  },
  DOG_TAGS: {
    tier: 'MID',
    borderColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    accentColor: '#fbbf24'
  },
  AMMO_CRATE: {
    tier: 'MID',
    borderColor: '#84cc16',
    glowColor: 'rgba(132, 204, 22, 0.35)',
    accentColor: '#fbbf24'
  },
  GOLD_COINS: {
    tier: 'MID',
    borderColor: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    accentColor: '#f59e0b'
  },
  WILD_SHIELD: {
    tier: 'SPECIAL',
    borderColor: '#ffd700',
    glowColor: 'rgba(255, 215, 0, 0.75)',
    accentColor: '#00f5d4',
    badgeLabel: 'WILD'
  },
  CHEST_SCATTER: {
    tier: 'SPECIAL',
    borderColor: '#e879f9',
    glowColor: 'rgba(232, 121, 249, 0.75)',
    accentColor: '#ffd700',
    badgeLabel: 'SCATTER'
  },
  FREE_SPINS_STAR: {
    tier: 'SPECIAL',
    borderColor: '#00f5d4',
    glowColor: 'rgba(0, 245, 212, 0.75)',
    accentColor: '#ffd700',
    badgeLabel: 'FREE SPINS'
  },
  GOLDEN_KEY: {
    tier: 'SPECIAL',
    borderColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.7)',
    accentColor: '#00f5d4',
    badgeLabel: 'BONUS KEY'
  }
};

const symbolTextureCache: Partial<Record<SymbolId, string>> = {};
let sourceImageLoaded = false;
let loadingPromise: Promise<void> | null = null;
const listeners = new Set<() => void>();

export function subscribeSymbolStudio(cb: () => void): () => void {
  listeners.add(cb);
  if (!sourceImageLoaded && !loadingPromise) {
    initSymbolCanvasStudio();
  }
  return () => {
    listeners.delete(cb);
  };
}

export function getSymbolStudioTexture(symbolId: SymbolId): string | null {
  if (!sourceImageLoaded && !loadingPromise && typeof window !== 'undefined') {
    initSymbolCanvasStudio();
  }
  return symbolTextureCache[symbolId] || null;
}

function initSymbolCanvasStudio(): Promise<void> {
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise<void>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const onLoaded = () => {
      buildAllSymbolCanvases(img);
      sourceImageLoaded = true;
      listeners.forEach((fn) => fn());
      resolve();
    };

    img.onload = onLoaded;
    img.onerror = () => {
      // Try fallback path
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = 'anonymous';
      fallbackImg.onload = () => {
        buildAllSymbolCanvases(fallbackImg);
        sourceImageLoaded = true;
        listeners.forEach((fn) => fn());
        resolve();
      };
      fallbackImg.onerror = () => {
        buildAllSymbolCanvases(null);
        sourceImageLoaded = true;
        listeners.forEach((fn) => fn());
        resolve();
      };
      fallbackImg.src = FALLBACK_IMAGE_URL;
    };

    img.src = SOURCE_IMAGE_URL;
  });

  return loadingPromise;
}

function drawCroppedBase(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  crop: CropRect,
  size: number,
  filterCss: string = 'contrast(1.08) saturate(1.18)'
) {
  if (!img) return;
  ctx.save();
  ctx.filter = filterCss;
  ctx.drawImage(img, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, size, size);
  ctx.restore();
}

function drawHdrRimVignette(
  ctx: CanvasRenderingContext2D,
  size: number,
  innerGlowColor: string,
  topHighlight: boolean = true
) {
  // Subtle dark outer vignette to make center subject pop (reduces eye fatigue)
  const rad = ctx.createRadialGradient(size / 2, size / 2, size * 0.28, size / 2, size / 2, size * 0.72);
  rad.addColorStop(0, 'rgba(0,0,0,0)');
  rad.addColorStop(0.75, 'rgba(4, 8, 20, 0.18)');
  rad.addColorStop(1, 'rgba(2, 4, 12, 0.65)');
  ctx.fillStyle = rad;
  ctx.fillRect(0, 0, size, size);

  // Subtle HDR bottom ambient rim light
  const rim = ctx.createLinearGradient(0, size * 0.65, 0, size);
  rim.addColorStop(0, 'rgba(0,0,0,0)');
  rim.addColorStop(1, innerGlowColor);
  ctx.fillStyle = rim;
  ctx.fillRect(0, size * 0.65, size, size * 0.35);

  if (topHighlight) {
    const sheen = ctx.createLinearGradient(0, 0, 0, size * 0.22);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
    sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, size, size * 0.22);
  }
}

function drawLuxuryBadge(
  ctx: CanvasRenderingContext2D,
  size: number,
  text: string,
  primaryHex: string,
  secondaryHex: string
) {
  const w = size * 0.78;
  const h = size * 0.17;
  const x = (size - w) / 2;
  const y = size - h - 8;

  ctx.save();
  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;

  // Metallic pill background
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, primaryHex);
  grad.addColorStop(0.5, secondaryHex);
  grad.addColorStop(1, primaryHex);

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 8);
  ctx.fillStyle = '#070b16';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = grad;
  ctx.stroke();

  // Crisp Typography
  ctx.shadowBlur = 4;
  ctx.shadowColor = primaryHex;
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${Math.round(size * 0.095)}px "Cinzel", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, y + h / 2 + 1);
  ctx.restore();
}

function draw3DFacetedGem(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  topColor: string,
  midColor: string,
  deepColor: string,
  glowColor: string
) {
  ctx.save();
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 24;

  // Outer Octagon Crown
  const sides = 8;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = (i * Math.PI * 2) / sides - Math.PI / 8;
    const px = cx + Math.cos(a) * radius;
    const py = cy + Math.sin(a) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  const bodyGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  bodyGrad.addColorStop(0, topColor);
  bodyGrad.addColorStop(0.5, midColor);
  bodyGrad.addColorStop(1, deepColor);
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Facet Star Lines
  ctx.shadowBlur = 0;
  const innerR = radius * 0.56;
  for (let i = 0; i < sides; i++) {
    const a1 = (i * Math.PI * 2) / sides - Math.PI / 8;
    const a2 = ((i + 1) * Math.PI * 2) / sides - Math.PI / 8;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a1) * innerR, cy + Math.sin(a1) * innerR);
    ctx.lineTo(cx + Math.cos(a1) * radius, cy + Math.sin(a1) * radius);
    ctx.lineTo(cx + Math.cos(a2) * radius, cy + Math.sin(a2) * radius);
    ctx.lineTo(cx + Math.cos(a2) * innerR, cy + Math.sin(a2) * innerR);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.28)';
    ctx.fill();
  }

  // Inner Table Facet
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = (i * Math.PI * 2) / sides - Math.PI / 8;
    const px = cx + Math.cos(a) * innerR;
    const py = cy + Math.sin(a) * innerR;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  const tableGrad = ctx.createRadialGradient(cx - innerR * 0.3, cy - innerR * 0.3, 2, cx, cy, innerR);
  tableGrad.addColorStop(0, '#ffffff');
  tableGrad.addColorStop(0.35, topColor);
  tableGrad.addColorStop(1, midColor);
  ctx.fillStyle = tableGrad;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.stroke();

  ctx.restore();
}

function buildAllSymbolCanvases(img: HTMLImageElement | null) {
  const size = 256;

  const createCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    return [c, c.getContext('2d')!];
  };

  // 1. ROYAL_KING (Row 0, Col 2)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R0_C2_ROYAL_FAMILY, size, 'contrast(1.12) saturate(1.25)');
    drawHdrRimVignette(ctx, size, 'rgba(255, 215, 0, 0.25)');
    symbolTextureCache.ROYAL_KING = c.toDataURL('image/jpeg', 0.92);
  }

  // 2. EXPEDITION_LEADER (Row 0, Col 0)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R0_C0_KEFFIYEH_SCOUT, size, 'contrast(1.1) saturate(1.2)');
    drawHdrRimVignette(ctx, size, 'rgba(245, 158, 11, 0.22)');
    symbolTextureCache.EXPEDITION_LEADER = c.toDataURL('image/jpeg', 0.92);
  }

  // 3. BERET_COMMANDER (Row 0, Col 4)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R0_C4_BERET_OFFICER, size, 'contrast(1.1) saturate(1.22)');
    drawHdrRimVignette(ctx, size, 'rgba(16, 185, 129, 0.22)');
    symbolTextureCache.BERET_COMMANDER = c.toDataURL('image/jpeg', 0.92);
  }

  // 4. DESERT_WARRIOR (Row 2, Col 4)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R2_C4_RIFLE_GUARD_2, size, 'contrast(1.12) saturate(1.22)');
    drawHdrRimVignette(ctx, size, 'rgba(249, 115, 22, 0.24)');
    symbolTextureCache.DESERT_WARRIOR = c.toDataURL('image/jpeg', 0.92);
  }

  // 5. AIRCRAFT_SCOUT (Row 0, Col 1)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R0_C1_GYROCOPTER, size, 'contrast(1.12) saturate(1.28)');
    drawHdrRimVignette(ctx, size, 'rgba(20, 184, 166, 0.22)');
    symbolTextureCache.AIRCRAFT_SCOUT = c.toDataURL('image/jpeg', 0.92);
  }

  // 6. BINOCULARS (Row 0, Col 3)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R0_C3_BINOCULARS, size, 'contrast(1.12) saturate(1.25)');
    drawHdrRimVignette(ctx, size, 'rgba(234, 179, 8, 0.2)');
    symbolTextureCache.BINOCULARS = c.toDataURL('image/jpeg', 0.92);
  }

  // 7. COMPASS (Row 1, Col 4)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R1_C4_COMPASS, size, 'contrast(1.12) saturate(1.25)');
    drawHdrRimVignette(ctx, size, 'rgba(6, 182, 212, 0.22)');
    symbolTextureCache.COMPASS = c.toDataURL('image/jpeg', 0.92);
  }

  // 8. DOG_TAGS (Row 1, Col 3)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R1_C3_DOG_TAGS, size, 'contrast(1.12) saturate(1.25)');
    drawHdrRimVignette(ctx, size, 'rgba(59, 130, 246, 0.22)');
    symbolTextureCache.DOG_TAGS = c.toDataURL('image/jpeg', 0.92);
  }

  // 9. AMMO_CRATE (Row 1, Col 0)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R1_C0_AMMO_CRATE, size, 'contrast(1.12) saturate(1.22)');
    drawHdrRimVignette(ctx, size, 'rgba(132, 204, 22, 0.2)');
    symbolTextureCache.AMMO_CRATE = c.toDataURL('image/jpeg', 0.92);
  }

  // 10. GOLD_COINS (Row 1, Col 1)
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R1_C1_GOLD_COINS, size, 'contrast(1.15) saturate(1.3)');
    drawHdrRimVignette(ctx, size, 'rgba(250, 204, 21, 0.28)');
    symbolTextureCache.GOLD_COINS = c.toDataURL('image/jpeg', 0.92);
  }

  // 11. CYBER_MECH_SKULL -> Vanguard Crest Commander (Row 1, Col 2) with HDR Crimson-Cyan Cyber Visor Glow
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R1_C2_CREST_OFFICER, size, 'contrast(1.18) saturate(1.35)');
    drawHdrRimVignette(ctx, size, 'rgba(244, 63, 94, 0.35)');
    drawLuxuryBadge(ctx, size, 'VANGUARD', '#f43f5e', '#fbbf24');
    symbolTextureCache.CYBER_MECH_SKULL = c.toDataURL('image/jpeg', 0.92);
  }

  // 12. NEON_PLASMA_CORE -> Elite Rifle Guardian (Row 2, Col 3) with Electric Cyan Aura
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R2_C3_RIFLE_GUARD_1, size, 'contrast(1.15) saturate(1.3)');
    drawHdrRimVignette(ctx, size, 'rgba(0, 245, 212, 0.32)');
    symbolTextureCache.NEON_PLASMA_CORE = c.toDataURL('image/jpeg', 0.92);
  }

  // 13. HOLO_CYBER_BLADE -> Masked Desert Scout (Row 2, Col 0) with Royal Amethyst Rim
  {
    const [c, ctx] = createCanvas();
    drawCroppedBase(ctx, img, CELL_CROPS.R2_C0_MASKED_SCOUT, size, 'contrast(1.14) saturate(1.25)');
    drawHdrRimVignette(ctx, size, 'rgba(168, 85, 247, 0.28)');
    symbolTextureCache.HOLO_CYBER_BLADE = c.toDataURL('image/jpeg', 0.92);
  }

  // 14. CYBER_DRONE_ORB -> 3D Faceted Emerald-Cyan Relic Gem over Dark Vault Backdrop
  {
    const [c, ctx] = createCanvas();
    const bg = ctx.createRadialGradient(128, 128, 10, 128, 128, 140);
    bg.addColorStop(0, '#0f2942');
    bg.addColorStop(0.6, '#091526');
    bg.addColorStop(1, '#040912');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    // Ornate Gold Ring behind Gem
    ctx.save();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 118, 84, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    draw3DFacetedGem(ctx, 128, 118, 72, '#67e8f9', '#06b6d4', '#0e7490', 'rgba(0, 245, 212, 0.85)');
    drawHdrRimVignette(ctx, size, 'rgba(0, 245, 212, 0.3)');
    drawLuxuryBadge(ctx, size, 'SAPPHIRE', '#00f5d4', '#ffd700');
    symbolTextureCache.CYBER_DRONE_ORB = c.toDataURL('image/jpeg', 0.92);
  }

  // 15. WILD_SHIELD -> 3D Imperial Gold Laurel Shield & Blue Enamel Star
  {
    const [c, ctx] = createCanvas();
    const bg = ctx.createRadialGradient(128, 115, 10, 128, 128, 140);
    bg.addColorStop(0, '#172554');
    bg.addColorStop(0.65, '#0a1124');
    bg.addColorStop(1, '#040711');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    // Golden Laurel Wreath Outer Halo
    ctx.shadowColor = 'rgba(255, 215, 0, 0.75)';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(128, 112, 78, Math.PI * 0.15, Math.PI * 0.85, true);
    ctx.stroke();

    // 3D Heater Shield Body
    ctx.beginPath();
    ctx.moveTo(128, 28);
    ctx.lineTo(196, 52);
    ctx.quadraticCurveTo(196, 138, 128, 192);
    ctx.quadraticCurveTo(60, 138, 60, 52);
    ctx.closePath();

    const shieldRim = ctx.createLinearGradient(60, 28, 196, 192);
    shieldRim.addColorStop(0, '#fff799');
    shieldRim.addColorStop(0.4, '#ffd700');
    shieldRim.addColorStop(0.8, '#b45309');
    shieldRim.addColorStop(1, '#fde047');
    ctx.fillStyle = shieldRim;
    ctx.fill();

    // Inner Royal Blue Enamel Field
    ctx.beginPath();
    ctx.moveTo(128, 42);
    ctx.lineTo(182, 62);
    ctx.quadraticCurveTo(182, 132, 128, 176);
    ctx.quadraticCurveTo(74, 132, 74, 62);
    ctx.closePath();
    const blueEnamel = ctx.createRadialGradient(128, 100, 5, 128, 108, 70);
    blueEnamel.addColorStop(0, '#38bdf8');
    blueEnamel.addColorStop(0.55, '#0284c7');
    blueEnamel.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = blueEnamel;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Central 5-Pointed 3D Gold Star
    ctx.beginPath();
    const cx = 128;
    const cy = 108;
    const outerR = 42;
    const innerR = 18;
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = shieldRim;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.restore();

    drawHdrRimVignette(ctx, size, 'rgba(255, 215, 0, 0.35)');
    drawLuxuryBadge(ctx, size, 'WILD', '#ffd700', '#f59e0b');
    symbolTextureCache.WILD_SHIELD = c.toDataURL('image/jpeg', 0.92);
  }

  // 16. CHEST_SCATTER -> 3D Glowing Royal Amethyst & Gold Treasure Chest
  {
    const [c, ctx] = createCanvas();
    const bg = ctx.createRadialGradient(128, 110, 15, 128, 128, 140);
    bg.addColorStop(0, '#4c1d95');
    bg.addColorStop(0.55, '#1e1b4b');
    bg.addColorStop(1, '#050814');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    // Volumetric God-Rays behind Chest
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      ctx.save();
      ctx.translate(128, 112);
      ctx.rotate(a);
      const rayGrad = ctx.createLinearGradient(0, 0, 0, -110);
      rayGrad.addColorStop(0, 'rgba(0, 245, 212, 0.45)');
      rayGrad.addColorStop(1, 'rgba(0, 245, 212, 0)');
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-28, -110);
      ctx.lineTo(28, -110);
      ctx.lineTo(12, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Chest Base Box (3D Bronze & Gold Straps)
    const goldGrad = ctx.createLinearGradient(64, 50, 192, 180);
    goldGrad.addColorStop(0, '#fff799');
    goldGrad.addColorStop(0.45, '#ffd700');
    goldGrad.addColorStop(1, '#b45309');

    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(56, 106, 144, 76, 8);
    ctx.fill();
    ctx.stroke();

    // Glowing Treasure Hoard Inside
    const hoardGrad = ctx.createRadialGradient(128, 104, 6, 128, 104, 68);
    hoardGrad.addColorStop(0, '#ffffff');
    hoardGrad.addColorStop(0.35, '#00f5d4');
    hoardGrad.addColorStop(0.7, '#ffd700');
    hoardGrad.addColorStop(1, 'rgba(232, 121, 249, 0)');
    ctx.fillStyle = hoardGrad;
    ctx.beginPath();
    ctx.ellipse(128, 106, 66, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Chest Arched Lid
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(52, 96);
    ctx.quadraticCurveTo(128, 38, 204, 96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center Gold Lock Plate & Ruby Gem
    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.roundRect(112, 114, 32, 40, 6);
    ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(128, 134, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawHdrRimVignette(ctx, size, 'rgba(232, 121, 249, 0.38)');
    drawLuxuryBadge(ctx, size, 'SCATTER', '#e879f9', '#ffd700');
    symbolTextureCache.CHEST_SCATTER = c.toDataURL('image/jpeg', 0.92);
  }

  // 17. FREE_SPINS_STAR -> 3D Supernova Turquoise & Gold Compass Star
  {
    const [c, ctx] = createCanvas();
    const bg = ctx.createRadialGradient(128, 115, 10, 128, 128, 140);
    bg.addColorStop(0, '#0f766e');
    bg.addColorStop(0.6, '#082f49');
    bg.addColorStop(1, '#030712');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.shadowColor = 'rgba(0, 245, 212, 0.85)';
    ctx.shadowBlur = 22;

    // Outer Gold Ring
    const goldGrad = ctx.createLinearGradient(50, 40, 206, 190);
    goldGrad.addColorStop(0, '#ffffff');
    goldGrad.addColorStop(0.4, '#ffd700');
    goldGrad.addColorStop(1, '#d97706');

    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(128, 112, 74, 0, Math.PI * 2);
    ctx.stroke();

    // 8-Point 3D Celestial Starburst
    const cx = 128;
    const cy = 112;
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const r = i % 2 === 0 ? 78 : 28;
      const a = (i * Math.PI) / 8 - Math.PI / 2;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = goldGrad;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Center Turquoise Gem
    draw3DFacetedGem(ctx, 128, 112, 26, '#a5f3fc', '#00f5d4', '#0284c7', '#00f5d4');
    ctx.restore();

    drawHdrRimVignette(ctx, size, 'rgba(0, 245, 212, 0.35)');
    drawLuxuryBadge(ctx, size, 'FREE SPINS', '#00f5d4', '#ffd700');
    symbolTextureCache.FREE_SPINS_STAR = c.toDataURL('image/jpeg', 0.92);
  }

  // 18. GOLDEN_KEY -> 3D Royal Filigree Master Key with Ruby & Cyan Gems
  {
    const [c, ctx] = createCanvas();
    const bg = ctx.createRadialGradient(128, 115, 10, 128, 128, 140);
    bg.addColorStop(0, '#3b1d06');
    bg.addColorStop(0.65, '#160d08');
    bg.addColorStop(1, '#05040a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.translate(128, 112);
    ctx.rotate(-Math.PI / 4);

    const goldGrad = ctx.createLinearGradient(-80, -40, 80, 40);
    goldGrad.addColorStop(0, '#fff799');
    goldGrad.addColorStop(0.45, '#ffd700');
    goldGrad.addColorStop(1, '#b45309');

    ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
    ctx.shadowBlur = 18;
    ctx.fillStyle = goldGrad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;

    // Key Shaft & Bit Teeth
    ctx.beginPath();
    ctx.roundRect(-14, -6, 98, 14, 6);
    ctx.roundRect(54, 8, 12, 24, 3);
    ctx.roundRect(34, 8, 10, 16, 3);
    ctx.fill();
    ctx.stroke();

    // Ornate Key Bow (Handle Ring)
    ctx.beginPath();
    ctx.arc(-44, 0, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Turquoise Jewel in Key Handle
    ctx.restore();
    draw3DFacetedGem(ctx, 97, 81, 18, '#a5f3fc', '#00f5d4', '#0369a1', '#00f5d4');

    drawHdrRimVignette(ctx, size, 'rgba(251, 191, 36, 0.32)');
    drawLuxuryBadge(ctx, size, 'VAULT KEY', '#fbbf24', '#f59e0b');
    symbolTextureCache.GOLDEN_KEY = c.toDataURL('image/jpeg', 0.92);
  }
}
