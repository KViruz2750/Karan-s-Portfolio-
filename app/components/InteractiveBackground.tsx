'use client';

import { useEffect, useRef } from 'react';

export default function Background3D({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let destroyed = false;

    (async () => {
      const THREE = await import('three');
      if (destroyed) return;

      // ── Renderer ────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(isDark ? 0x080c1e : 0xeef4ff, 1);
      container.appendChild(renderer.domElement);

      // ── Scene / Camera ───────────────────────────────────────────────
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(isDark ? 0x080c1e : 0xeef4ff, 0.012);

      const camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        300,
      );
      camera.position.set(0, 0, 60);

      // ── Master group (slowly rotates everything together) ───────────
      const world = new THREE.Group();
      scene.add(world);

      // ── Palette ──────────────────────────────────────────────────────
      const palette = isDark
        ? [0x4a9eff, 0xa855f7, 0x00d4ff, 0xff6ec7, 0x00e5a0, 0xff8c00]
        : [0x0050cc, 0x7c3aed, 0x0891b2, 0xdb2777, 0x059669, 0xea580c];

      // ── Wireframe Polyhedra ──────────────────────────────────────────
      type ShapeDef = {
        geo: THREE.BufferGeometry;
        pos: [number, number, number];
        rotSpeed: [number, number, number];
        scale: number;
      };

      const shapeDefs: ShapeDef[] = [
        { geo: new THREE.IcosahedronGeometry(10, 0), pos: [-20, 10, -10], rotSpeed: [0.004, 0.007, 0.002], scale: 1 },
        { geo: new THREE.OctahedronGeometry(8),      pos: [ 22, -12,   5], rotSpeed: [0.006, 0.003, 0.005], scale: 1 },
        { geo: new THREE.IcosahedronGeometry(6,  0), pos: [  5,  20, -20], rotSpeed: [0.003, 0.008, 0.001], scale: 1 },
        { geo: new THREE.TetrahedronGeometry(9),     pos: [-25, -18,   2], rotSpeed: [0.007, 0.004, 0.006], scale: 1 },
        { geo: new THREE.OctahedronGeometry(5),      pos: [ 18,  16, -12], rotSpeed: [0.005, 0.006, 0.003], scale: 1 },
        { geo: new THREE.IcosahedronGeometry(7,  1), pos: [  0,  -5,  15], rotSpeed: [0.002, 0.005, 0.004], scale: 1 },
      ];

      const meshes: THREE.Mesh[] = [];

      shapeDefs.forEach(({ geo, pos, rotSpeed, scale }, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: palette[i % palette.length],
          wireframe: true,
          transparent: true,
          opacity: isDark ? 0.40 : 0.28,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...pos);
        mesh.scale.setScalar(scale);
        // stash rot speed on userData
        mesh.userData.rs = rotSpeed;
        world.add(mesh);
        meshes.push(mesh);
      });

      // ── Star / Particle Cloud ────────────────────────────────────────
      const PARTICLE_COUNT = 280;
      const pPositions = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pPositions[i * 3    ] = (Math.random() - 0.5) * 140;
        pPositions[i * 3 + 1] = (Math.random() - 0.5) * 140;
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

      const pMat = new THREE.PointsMaterial({
        color: isDark ? 0x6ab4ff : 0x0064ff,
        size: 0.55,
        transparent: true,
        opacity: isDark ? 0.65 : 0.45,
        sizeAttenuation: true,
      });
      const particleMesh = new THREE.Points(pGeo, pMat);
      world.add(particleMesh);

      // ── Connecting Lines (static, pre-built) ─────────────────────────
      // Draw a web of lines among the first 40 particles (≤distance 28 units)
      const lineVerts: number[] = [];
      const SUBSET = 60;
      for (let a = 0; a < SUBSET; a++) {
        for (let b = a + 1; b < SUBSET; b++) {
          const ax = pPositions[a * 3], ay = pPositions[a * 3 + 1], az = pPositions[a * 3 + 2];
          const bx = pPositions[b * 3], by = pPositions[b * 3 + 1], bz = pPositions[b * 3 + 2];
          const d2 = (ax-bx)**2 + (ay-by)**2 + (az-bz)**2;
          if (d2 < 28 * 28) {
            lineVerts.push(ax, ay, az, bx, by, bz);
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
      const lMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x3a7ee0 : 0x0050cc,
        transparent: true,
        opacity: isDark ? 0.12 : 0.08,
      });
      world.add(new THREE.LineSegments(lGeo, lMat));

      // ── Ambient glow sphere (large, behind everything) ───────────────
      const glowGeo = new THREE.SphereGeometry(38, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x0a1a4a : 0xc5d8ff,
        transparent: true,
        opacity: isDark ? 0.18 : 0.25,
        side: THREE.BackSide,
      });
      world.add(new THREE.Mesh(glowGeo, glowMat));

      // ── Animation loop ───────────────────────────────────────────────
      let t = 0;

      const animate = () => {
        if (destroyed) return;
        rafId = requestAnimationFrame(animate);
        t += 0.004;

        // Rotate individual shapes
        meshes.forEach((m) => {
          const rs = m.userData.rs as [number, number, number];
          m.rotation.x += rs[0];
          m.rotation.y += rs[1];
          m.rotation.z += rs[2];
        });

        // Lazy drift on particles (JS loop but small — 280 items)
        const pos = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pos[i * 3 + 1] += Math.sin(t * 0.6 + i * 0.44) * 0.006;
          pos[i * 3    ] += Math.cos(t * 0.4 + i * 0.31) * 0.004;
        }
        pGeo.attributes.position.needsUpdate = true;

        // Slow world rotation for depth parallax
        world.rotation.y = t * 0.03;
        world.rotation.x = Math.sin(t * 0.05) * 0.07;

        renderer.render(scene, camera);
      };

      animate();

      // ── Resize handler ───────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', onResize);

      // ── Cleanup ──────────────────────────────────────────────────────
      // Store a teardown fn on container so the effect cleanup can call it
      // even before the async import resolves (destroyed flag handles that).
      (container as HTMLDivElement & { _3dCleanup?: () => void })._3dCleanup = () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(rafId);
        shapeDefs.forEach((s) => s.geo.dispose());
        pGeo.dispose();
        pMat.dispose();
        lGeo.dispose();
        lMat.dispose();
        glowGeo.dispose();
        glowMat.dispose();
        meshes.forEach((m) => (m.material as THREE.Material).dispose());
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      const c = container as HTMLDivElement & { _3dCleanup?: () => void };
      if (c._3dCleanup) c._3dCleanup();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
