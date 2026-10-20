import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Palette = {
  bg: string;
  fill: string;
  fillOpacity: number;
  edge: string;
  edgeSoft: string;
  accent: string;
  label: string;
  muted: string;
};

const DARK: Palette = {
  bg: '#0f1419',
  fill: '#0369a1',
  fillOpacity: 0.18,
  edge: '#7dd3fc',
  edgeSoft: '#1e3a5f',
  accent: '#38bdf8',
  label: '#f8fafc',
  muted: '#bae6fd',
};

const LIGHT: Palette = {
  bg: '#f4f6f8',
  fill: '#bae6fd',
  fillOpacity: 0.55,
  edge: '#0369a1',
  edgeSoft: '#7dd3fc',
  accent: '#0284c7',
  label: '#0c4a6e',
  muted: '#075985',
};

function makeTextTexture(lines: { text: string; size: number; color: string }[]) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  const paint = (paletteLines = lines) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const start = paletteLines.length === 1 ? 80 : 58;
    paletteLines.forEach((line, index) => {
      ctx.font = `600 ${line.size}px Inter, ui-sans-serif, sans-serif`;
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, canvas.width / 2, start + index * 52);
    });
    texture.needsUpdate = true;
  };
  paint();
  return { texture, paint };
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 80);
    camera.position.set(8.2, 4.4, 8.2);
    camera.lookAt(0, 0.15, 0);

    const root = new THREE.Group();
    root.position.y = -0.55;
    scene.add(root);

    const disposables: { dispose: () => void }[] = [];

    const platformGeo = new THREE.BoxGeometry(4.5, 0.1, 2.35);
    const platform = new THREE.Mesh(platformGeo, new THREE.MeshBasicMaterial({ transparent: true }));
    const platformEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(platformGeo),
      new THREE.LineBasicMaterial(),
    );
    platform.add(platformEdges);
    platform.position.y = -0.05;
    root.add(platform);
    disposables.push(platformGeo, platformEdges.geometry);

    const makeCube = (width: number, height: number, depth: number) => {
      const geo = new THREE.BoxGeometry(width, height, depth);
      const fill = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }));
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial());
      const group = new THREE.Group();
      group.add(fill, edges);
      disposables.push(geo, edges.geometry);
      return { group, fill, edges, height };
    };

    const ingest = makeCube(0.98, 1.08, 0.98);
    ingest.group.position.set(-1.42, 0.54, 0.22);
    const agents = makeCube(1.22, 1.52, 1.22);
    agents.group.position.set(0.12, 0.76, -0.42);
    const deliver = makeCube(0.92, 0.98, 0.92);
    deliver.group.position.set(1.72, 0.49, 0.36);
    root.add(ingest.group, agents.group, deliver.group);

    const cubes = [ingest, agents, deliver];

    const pathPoints = [
      new THREE.Vector3(-1.42, 0.08, 0.22),
      new THREE.Vector3(-0.66, 0.08, -0.08),
      new THREE.Vector3(0.12, 0.08, -0.42),
      new THREE.Vector3(0.9, 0.08, -0.06),
      new THREE.Vector3(1.72, 0.08, 0.36),
    ];
    const curve = new THREE.CatmullRomCurve3(pathPoints);
    const flowGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
    const flow = new THREE.Line(flowGeo, new THREE.LineDashedMaterial({ dashSize: 0.08, gapSize: 0.07, transparent: true }));
    flow.computeLineDistances();
    root.add(flow);
    disposables.push(flowGeo);

    const packetGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const packets = [0, 0.33, 0.66].map((offset) => {
      const mesh = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial());
      mesh.userData.offset = offset;
      root.add(mesh);
      return mesh;
    });
    disposables.push(packetGeo);

    const marks: THREE.LineSegments[] = [];
    [[-1.9, 0.9], [1.9, -0.85], [-1.7, -0.8], [1.75, 0.85]].forEach(([x, z]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.06, 0, 0),
        new THREE.Vector3(0.06, 0, 0),
        new THREE.Vector3(0, 0, -0.06),
        new THREE.Vector3(0, 0, 0.06),
      ]);
      const mark = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ transparent: true }));
      mark.position.set(x, 0.08, z);
      root.add(mark);
      marks.push(mark);
      disposables.push(geo);
    });

    const labelDefs = [
      { cube: ingest, title: 'DOCS', subtitle: '', width: 0.98, height: 1.08, depth: 0.98 },
      { cube: agents, title: 'AGENT', subtitle: 'RAG  ·  MCP', width: 1.22, height: 1.52, depth: 1.22 },
      { cube: deliver, title: 'SHIP', subtitle: '', width: 0.92, height: 0.98, depth: 0.92 },
    ];
    const labels = labelDefs.map((item) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 4;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(item.width * 0.84, item.subtitle ? 0.5 : 0.34), material);
      if (item.title === 'SHIP') {
        plane.position.set(item.width / 2 + 0.02, item.height * 0.08, 0);
        plane.rotation.y = Math.PI / 2;
      } else {
        plane.position.set(0, item.height * 0.08, item.depth / 2 + 0.02);
      }
      item.cube.group.add(plane);
      const paint = (titleColor: string, subColor: string) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = titleColor;
        ctx.font = `600 ${item.subtitle ? 78 : 92}px Inter, ui-sans-serif, sans-serif`;
        ctx.fillText(item.title, 256, item.subtitle ? 96 : 128);
        if (item.subtitle) {
          ctx.fillStyle = subColor;
          ctx.font = '500 30px Inter, ui-sans-serif, sans-serif';
          ctx.fillText(item.subtitle, 256, 164);
        }
        texture.needsUpdate = true;
      };
      disposables.push(texture, material, plane.geometry);
      return { paint };
    });

    const { texture: baseTexture, paint: paintBase } = makeTextTexture([
      { text: 'ONE PIPELINE', size: 42, color: '#fff' },
    ]);
    const baseSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: baseTexture, transparent: true, depthWrite: false }));
    baseSprite.position.set(0.05, 0.22, 1.28);
    baseSprite.scale.set(1.7, 0.42, 1);
    root.add(baseSprite);
    disposables.push(baseTexture, baseSprite.material);

    const materials = [
      platform.material as THREE.Material,
      platformEdges.material as THREE.Material,
      ...cubes.flatMap((cube) => [cube.fill.material as THREE.Material, cube.edges.material as THREE.Material]),
      flow.material as THREE.Material,
      ...packets.map((mesh) => mesh.material as THREE.Material),
      ...marks.map((mark) => mark.material as THREE.Material),
    ];
    disposables.push(...materials);

    let applied: boolean | null = null;
    const applyPalette = (light: boolean) => {
      if (applied === light) return;
      applied = light;
      const palette = light ? LIGHT : DARK;
      scene.background = new THREE.Color(palette.bg);
      const platformMat = platform.material as THREE.MeshBasicMaterial;
      platformMat.color.set(light ? '#e0f2fe' : '#0b1218');
      platformMat.opacity = light ? 0.95 : 1;
      (platformEdges.material as THREE.LineBasicMaterial).color.set(palette.edgeSoft);
      cubes.forEach((cube, index) => {
        const fill = cube.fill.material as THREE.MeshBasicMaterial;
        fill.color.set(palette.fill);
        fill.opacity = palette.fillOpacity;
        (cube.edges.material as THREE.LineBasicMaterial).color.set(index === 1 ? palette.edge : palette.edgeSoft);
      });
      const flowMat = flow.material as THREE.LineDashedMaterial;
      flowMat.color.set(palette.edge);
      flowMat.opacity = light ? 0.7 : 0.85;
      packets.forEach((mesh) => {
        (mesh.material as THREE.MeshBasicMaterial).color.set(palette.accent);
      });
      marks.forEach((mark) => {
        const mat = mark.material as THREE.LineBasicMaterial;
        mat.color.set(palette.edgeSoft);
        mat.opacity = 0.7;
      });
      labels.forEach((label) => label.paint(palette.label, palette.muted));
      paintBase([{ text: 'ONE PIPELINE', size: 42, color: palette.muted }]);
    };

    const isLight = () => document.documentElement.classList.contains('light');
    applyPalette(isLight());
    const classObserver = new MutationObserver(() => applyPalette(isLight()));
    classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0 };
    const onPointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width) return;
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    };
    mount.addEventListener('pointermove', onPointer);

    const fit = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      const aspect = width / height;
      const view = 3.05;
      camera.left = -view * aspect;
      camera.right = view * aspect;
      camera.top = view * 0.92;
      camera.bottom = -view * 1.08;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(mount);

    let frame = 0;
    let running = true;
    const clock = new THREE.Clock();
    const animate = () => {
      if (!running) return;
      frame = requestAnimationFrame(animate);
      const t = reduced ? 0.2 : clock.getElapsedTime();
      if (!reduced) {
        smooth.x += (pointer.x - smooth.x) * 0.04;
        root.rotation.y = smooth.x * 0.08;
        agents.group.position.y = 0.76 + Math.sin(t * 1.2) * 0.03;
        packets.forEach((mesh) => {
          const point = curve.getPoint((t * 0.12 + (mesh.userData.offset as number)) % 1);
          mesh.position.copy(point);
          mesh.position.y += 0.08;
          mesh.rotation.y = t;
        });
        (flow.material as THREE.LineDashedMaterial).dashOffset = -t * 0.2;
      }
      renderer.render(scene, camera);
    };
    animate();

    const visibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        clock.getDelta();
        animate();
      }
    };
    document.addEventListener('visibilitychange', visibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      classObserver.disconnect();
      resizeObserver.disconnect();
      mount.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', visibility);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
