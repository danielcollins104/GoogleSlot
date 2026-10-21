import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SymbolId } from '../types/game';

interface SymbolPalette {
  primaryHex: number;
  secondaryHex: number;
  emissiveHex: number;
  rimHex: number;
  shapeType: 'cyber_hex' | 'plasma_reactor' | 'royal_arch' | 'tactical_crest' | 'special_star';
}

const SYMBOL_PALETTES: Record<SymbolId, SymbolPalette> = {
  CYBER_MECH_SKULL: {
    primaryHex: 0xe2e8f0,
    secondaryHex: 0xff007f,
    emissiveHex: 0xff007f,
    rimHex: 0x00f5d4,
    shapeType: 'cyber_hex'
  },
  NEON_PLASMA_CORE: {
    primaryHex: 0x00f5d4,
    secondaryHex: 0x9d4edd,
    emissiveHex: 0x00f5d4,
    rimHex: 0xff007f,
    shapeType: 'plasma_reactor'
  },
  HOLO_CYBER_BLADE: {
    primaryHex: 0xc084fc,
    secondaryHex: 0xff007f,
    emissiveHex: 0xa855f7,
    rimHex: 0x39ff14,
    shapeType: 'cyber_hex'
  },
  CYBER_DRONE_ORB: {
    primaryHex: 0x39ff14,
    secondaryHex: 0x00f5d4,
    emissiveHex: 0x39ff14,
    rimHex: 0xff007f,
    shapeType: 'plasma_reactor'
  },
  ROYAL_KING: {
    primaryHex: 0xffbe0b,
    secondaryHex: 0x4361ee,
    emissiveHex: 0x9d4edd,
    rimHex: 0x00f5d4,
    shapeType: 'royal_arch'
  },
  EXPEDITION_LEADER: {
    primaryHex: 0xffbe0b,
    secondaryHex: 0x00f5d4,
    emissiveHex: 0xff007f,
    rimHex: 0x00f5d4,
    shapeType: 'tactical_crest'
  },
  BERET_COMMANDER: {
    primaryHex: 0x39ff14,
    secondaryHex: 0xffbe0b,
    emissiveHex: 0x10b981,
    rimHex: 0x00f5d4,
    shapeType: 'tactical_crest'
  },
  DESERT_WARRIOR: {
    primaryHex: 0xffbe0b,
    secondaryHex: 0xff007f,
    emissiveHex: 0x7209b7,
    rimHex: 0x39ff14,
    shapeType: 'royal_arch'
  },
  AIRCRAFT_SCOUT: {
    primaryHex: 0x00f5d4,
    secondaryHex: 0xffbe0b,
    emissiveHex: 0x00bbf9,
    rimHex: 0xff007f,
    shapeType: 'cyber_hex'
  },
  BINOCULARS: {
    primaryHex: 0xffbe0b,
    secondaryHex: 0x39ff14,
    emissiveHex: 0x00f5d4,
    rimHex: 0xa855f7,
    shapeType: 'tactical_crest'
  },
  COMPASS: {
    primaryHex: 0xffbe0b,
    secondaryHex: 0x00f5d4,
    emissiveHex: 0xff007f,
    rimHex: 0x00f5d4,
    shapeType: 'plasma_reactor'
  },
  DOG_TAGS: {
    primaryHex: 0x4cc9f0,
    secondaryHex: 0xffbe0b,
    emissiveHex: 0x4361ee,
    rimHex: 0xff007f,
    shapeType: 'tactical_crest'
  },
  AMMO_CRATE: {
    primaryHex: 0x39ff14,
    secondaryHex: 0xffbe0b,
    emissiveHex: 0x39ff14,
    rimHex: 0xff007f,
    shapeType: 'cyber_hex'
  },
  GOLD_COINS: {
    primaryHex: 0xffd700,
    secondaryHex: 0xff007f,
    emissiveHex: 0xffbe0b,
    rimHex: 0x00f5d4,
    shapeType: 'plasma_reactor'
  },
  WILD_SHIELD: {
    primaryHex: 0xffd700,
    secondaryHex: 0x00f5d4,
    emissiveHex: 0xff007f,
    rimHex: 0x00f5d4,
    shapeType: 'special_star'
  },
  CHEST_SCATTER: {
    primaryHex: 0xff007f,
    secondaryHex: 0x00f5d4,
    emissiveHex: 0x9d4edd,
    rimHex: 0x39ff14,
    shapeType: 'special_star'
  },
  FREE_SPINS_STAR: {
    primaryHex: 0x00f5d4,
    secondaryHex: 0x39ff14,
    emissiveHex: 0xff007f,
    rimHex: 0xffbe0b,
    shapeType: 'special_star'
  },
  GOLDEN_KEY: {
    primaryHex: 0xffbe0b,
    secondaryHex: 0xff007f,
    emissiveHex: 0x00f5d4,
    rimHex: 0xa855f7,
    shapeType: 'cyber_hex'
  }
};

const bakedSymbolCache: Partial<Record<SymbolId, string>> = {};
let bakingAttempted = false;

function detectSoftwareGl(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function getBaked3DStageUrl(symbolId: SymbolId): string | null {
  if (typeof window === 'undefined') return null;
  if (!bakingAttempted) {
    bakingAttempted = true;
    bakeAll3DSymbolStages();
  }
  return bakedSymbolCache[symbolId] || null;
}

function bakeAll3DSymbolStages(): void {
  try {
    const isSoftwareGl = detectSoftwareGl();
    const size = 256;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0.25, 4.6);
    camera.lookAt(0, 0, 0);

    // 4-Point Blacklight HDR Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xd8b4fe, 0x090218, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5cc, 3.4);
    keyLight.position.set(2.5, 3.5, 4.0);
    scene.add(keyLight);

    const magentaRim = new THREE.PointLight(0xff007f, 8.5, 10);
    magentaRim.position.set(-2.8, 1.8, 2.2);
    scene.add(magentaRim);

    const cyanRim = new THREE.PointLight(0x00f5d4, 8.5, 10);
    cyanRim.position.set(2.8, -1.6, 2.2);
    scene.add(cyanRim);

    const limeTop = new THREE.PointLight(0x39ff14, 4.5, 8);
    limeTop.position.set(0, 2.8, 1.5);
    scene.add(limeTop);

    // Shared Reusable Geometries (5-8 composite parts per symbol)
    const outerFrameGeo = new THREE.TorusGeometry(1.42, 0.11, 20, 6); // 3D Hexagonal Bevel Frame
    const innerRingGeo = new THREE.TorusGeometry(1.16, 0.055, 16, 48);
    const tiltedOrbitGeo = new THREE.TorusGeometry(1.25, 0.035, 12, 48);
    const backingPlateGeo = new THREE.CylinderGeometry(1.32, 1.38, 0.18, 6);
    const coreOctaGeo = new THREE.OctahedronGeometry(0.88, 1);
    const cornerStudGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const shadowPlaneGeo = new THREE.PlaneGeometry(3.2, 3.2);

    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x030008,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });

    (Object.keys(SYMBOL_PALETTES) as SymbolId[]).forEach((symId) => {
      const pal = SYMBOL_PALETTES[symId];
      const group = new THREE.Group();

      // Part 1: Grounding Contact Shadow Plane
      const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowMat);
      shadowMesh.position.set(0, 0, -0.55);
      group.add(shadowMesh);

      // Part 2: Deep Obsidian Metallic Hex Backing Vault Plate
      const plateMat = new THREE.MeshPhysicalMaterial({
        color: 0x100426,
        metalness: 0.85,
        roughness: 0.28,
        clearcoat: 0.8,
        emissive: pal.emissiveHex,
        emissiveIntensity: 0.18
      });
      const plateMesh = new THREE.Mesh(backingPlateGeo, plateMat);
      plateMesh.rotation.x = Math.PI / 2;
      plateMesh.rotation.y = Math.PI / 6;
      plateMesh.position.z = -0.32;
      group.add(plateMesh);

      // Part 3: Primary 3D Anisotropic Brushed Gold / Chrome Outer Bevel Frame
      const outerMat = new THREE.MeshPhysicalMaterial({
        color: pal.primaryHex,
        metalness: 0.95,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        emissive: pal.primaryHex,
        emissiveIntensity: 0.15
      });
      const outerFrame = new THREE.Mesh(outerFrameGeo, outerMat);
      outerFrame.rotation.z =
        pal.shapeType === 'cyber_hex' ? Math.PI / 6 : pal.shapeType === 'special_star' ? Math.PI / 4 : 0;
      outerFrame.position.z = -0.08;
      group.add(outerFrame);

      // Part 4: Blacklight Emissive Neon Inner Containment Ring
      const neonRingMat = new THREE.MeshPhysicalMaterial({
        color: pal.secondaryHex,
        metalness: 0.4,
        roughness: 0.1,
        emissive: pal.emissiveHex,
        emissiveIntensity: 1.45
      });
      const innerRing = new THREE.Mesh(innerRingGeo, neonRingMat);
      innerRing.position.z = 0.04;
      group.add(innerRing);

      // Part 5 & 6: Dual Gyroscopic 3D Blacklight Energy Orbits
      const rimMat = new THREE.MeshPhysicalMaterial({
        color: pal.rimHex,
        metalness: 0.6,
        roughness: 0.15,
        emissive: pal.rimHex,
        emissiveIntensity: 1.25
      });
      const orbit1 = new THREE.Mesh(tiltedOrbitGeo, rimMat);
      orbit1.rotation.set(0.55, 0.45, 0.2);
      orbit1.position.z = 0.06;
      group.add(orbit1);

      const orbit2 = new THREE.Mesh(tiltedOrbitGeo, neonRingMat);
      orbit2.rotation.set(-0.55, 0.45, -0.2);
      orbit2.position.z = 0.06;
      group.add(orbit2);

      // Part 7: Faceted 3D Crystal Center Pedestal
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: pal.secondaryHex,
        metalness: 0.75,
        roughness: 0.12,
        clearcoat: 1.0,
        emissive: pal.emissiveHex,
        emissiveIntensity: 0.55
      });
      const coreMesh = new THREE.Mesh(coreOctaGeo, crystalMat);
      coreMesh.rotation.set(0.35, 0.6, 0.15);
      coreMesh.scale.set(1, 1, 0.38);
      coreMesh.position.z = -0.14;
      group.add(coreMesh);

      // Part 8: 6 Corner 3D Energy Studs around the Bevel Frame
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const stud = new THREE.Mesh(cornerStudGeo, i % 2 === 0 ? rimMat : neonRingMat);
        stud.position.set(Math.cos(angle) * 1.42, Math.sin(angle) * 1.42, 0.08);
        group.add(stud);
      }

      // Slight 3D isometric tilt for dramatic depth
      group.rotation.x = -0.14;
      group.rotation.y = 0.16;

      scene.add(group);
      renderer.render(scene, camera);
      bakedSymbolCache[symId] = renderer.domElement.toDataURL('image/png');
      scene.remove(group);

      // Dispose symbol-specific materials
      plateMat.dispose();
      outerMat.dispose();
      neonRingMat.dispose();
      rimMat.dispose();
      crystalMat.dispose();
    });

    // Dispose shared geometries & renderer cleanly
    outerFrameGeo.dispose();
    innerRingGeo.dispose();
    tiltedOrbitGeo.dispose();
    backingPlateGeo.dispose();
    coreOctaGeo.dispose();
    cornerStudGeo.dispose();
    shadowPlaneGeo.dispose();
    shadowMat.dispose();
    envTexture.dispose();
    pmremGenerator.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  } catch (err) {
    console.warn('Three.js 3D Studio Baker fallback used:', err);
  }
}
