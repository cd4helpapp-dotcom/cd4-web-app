"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  Color,
  ExtrudeGeometry,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  MeshBasicMaterial,
  Object3D,
  Path,
  ShaderMaterial,
  Shape,
  SphereGeometry,
  TubeGeometry,
  Vector2,
  Vector3
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { particleBudget, sceneStore } from "@/lib/scene-store";
import { BLUE, CYAN, SOFT, makeCoreMaterial, makeHaloMaterial, makeMembraneMaterial, makePulseLineMaterial } from "./materials";

const RECEPTOR_COLORS = [CYAN, BLUE, SOFT];

function fibonacciPoint(index: number, total: number) {
  const y = 1 - ((index + 0.5) / total) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  return new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
}

// The surface proteins that give a CD4 cell its name. The three sets light up for patient, AI and doctor in the "Why CD4" section.
function Receptors({ count }: { count: number }) {
  const refs = useRef<(InstancedMesh | null)[]>([]);
  const geometry = useMemo(() => {
    const stem = new CapsuleGeometry(0.012, 0.09, 3, 6);
    stem.translate(0, 0.05, 0);
    const head = new SphereGeometry(0.036, 10, 8);
    head.translate(0, 0.125, 0);
    const merged = mergeGeometries([stem.toNonIndexed(), head.toNonIndexed()]);
    stem.dispose();
    head.dispose();
    return merged;
  }, []);
  const materials = useMemo(
    () => RECEPTOR_COLORS.map((color) => new MeshBasicMaterial({ color, transparent: true, toneMapped: false })),
    []
  );

  useLayoutEffect(() => {
    const dummy = new Object3D();
    const up = new Vector3(0, 1, 0);
    const perSet = Math.floor(count / 3);
    refs.current.forEach((mesh, set) => {
      if (!mesh) return;
      for (let index = 0; index < perSet; index += 1) {
        const point = fibonacciPoint(index * 3 + set, perSet * 3);
        dummy.position.copy(point).multiplyScalar(1.02);
        dummy.quaternion.setFromUnitVectors(up, point);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [count]);

  useFrame(() => {
    const { cellFocus, current } = sceneStore;
    materials.forEach((material, set) => {
      const lit = cellFocus === -1 ? 0.8 : cellFocus === set ? 1 : 0.16;
      material.opacity += (lit * current.orbAlpha - material.opacity) * 0.12;
    });
  });

  return (
    <>
      {materials.map((material, set) => (
        <instancedMesh
          key={set}
          ref={(mesh) => {
            refs.current[set] = mesh;
          }}
          args={[geometry, material, Math.floor(count / 3)]}
          frustumCulled={false}
        />
      ))}
    </>
  );
}

function NeuralNetwork({ count }: { count: number }) {
  const lines = useRef<LineSegments>(null);
  const material = useMemo(() => makePulseLineMaterial(), []);
  const geometry = useMemo(() => {
    const nodes = Array.from({ length: count }, (_, index) =>
      fibonacciPoint(index, count).multiplyScalar(0.34 + ((index * 37) % 100) / 180)
    );
    const positions: number[] = [];
    const progress: number[] = [];
    const seeds: number[] = [];
    nodes.forEach((node, index) => {
      const nearest = nodes
        .map((other, otherIndex) => ({ otherIndex, distance: node.distanceTo(other) }))
        .filter(({ otherIndex }) => otherIndex !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);
      nearest.forEach(({ otherIndex }) => {
        if (otherIndex < index) return;
        const other = nodes[otherIndex];
        const seed = ((index * 13 + otherIndex * 7) % 100) / 100;
        positions.push(node.x, node.y, node.z, other.x, other.y, other.z);
        progress.push(0, 1);
        seeds.push(seed, seed);
      });
    });
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    result.setAttribute("aT", new BufferAttribute(new Float32Array(progress), 1));
    result.setAttribute("aSeed", new BufferAttribute(new Float32Array(seeds), 1));
    return result;
  }, [count]);

  useFrame(({ clock }) => {
    const { neural, orbAlpha } = sceneStore.current;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uAlpha.value = neural * orbAlpha;
    if (lines.current) lines.current.rotation.y = clock.elapsedTime * -0.08;
  });

  return <lineSegments ref={lines} geometry={geometry} material={material} />;
}

// Two lub-dub beats and a rest, about 66 beats a minute.
function heartbeat(time: number) {
  const beat = (time * 1.1) % 1;
  const lub = Math.exp(-Math.pow((beat - 0.1) / 0.05, 2));
  const dub = Math.exp(-Math.pow((beat - 0.3) / 0.06, 2)) * 0.7;
  return lub + dub;
}

// One heartbeat trace, as [position along the beat, height].
const ECG_SHAPE: [number, number][] = [
  [0, 0], [0.16, 0], [0.22, 0.035], [0.28, 0], [0.36, 0], [0.39, -0.05], [0.44, 0.27], [0.49, -0.1], [0.53, 0], [0.64, 0], [0.72, 0.06], [0.8, 0], [1, 0]
];

function ecgHeight(position: number) {
  for (let index = 1; index < ECG_SHAPE.length; index += 1) {
    const [x1, y1] = ECG_SHAPE[index];
    const [x0, y0] = ECG_SHAPE[index - 1];
    if (position <= x1) return y0 + ((position - x0) / (x1 - x0)) * (y1 - y0);
  }
  return 0;
}

// A hospital monitor's trace wrapped around the cell, with a pulse of light running along it.
function EcgRing({ radius, segments }: { radius: number; segments: number }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uAlpha: { value: 1 } },
        vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
        fragmentShader: `
          uniform float uTime; uniform float uAlpha; varying vec2 vUv;
          void main(){
            float head = fract(uTime*.16);
            float behind = fract(head-vUv.x);
            float trail = 1.-smoothstep(0.,.28,behind);
            vec3 col = mix(vec3(.141,.545,1.),vec3(.8,1.,1.),trail);
            gl_FragColor = vec4(col,(.22+trail*.95)*uAlpha);
          }`
      }),
    []
  );
  const geometry = useMemo(() => {
    const beats = 7;
    const steps = beats * 40;
    const points = Array.from({ length: steps }, (_, index) => {
      const t = index / steps;
      const angle = t * Math.PI * 2;
      const r = radius + ecgHeight((t * beats) % 1);
      return new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0);
    });
    return new TubeGeometry(new CatmullRomCurve3(points, true, "catmullrom", 0.1), segments, 0.0075, 5, true);
  }, [radius, segments]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uAlpha.value = sceneStore.current.orbAlpha;
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

// A DNA double helix bent into a circle.
function DnaRing({ radius, pairs }: { radius: number; pairs: number }) {
  const beads = useRef<InstancedMesh>(null);
  const beadMaterial = useMemo(() => new MeshBasicMaterial({ transparent: true, toneMapped: false, depthWrite: false }), []);
  const rungMaterial = useMemo(() => new LineBasicMaterial({ color: CYAN, transparent: true, toneMapped: false, depthWrite: false }), []);
  const turns = 16;
  const width = 0.075;
  const position = (index: number, phaseShift: number) => {
    const angle = (index / pairs) * Math.PI * 2;
    const phase = angle * turns + phaseShift;
    const r = radius + Math.cos(phase) * width;
    return new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, Math.sin(phase) * width);
  };
  const rungs = useMemo(() => {
    const points: Vector3[] = [];
    for (let index = 0; index < pairs; index += 2) points.push(position(index, 0), position(index, Math.PI));
    return new BufferGeometry().setFromPoints(points);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs, radius]);

  useLayoutEffect(() => {
    const mesh = beads.current;
    if (!mesh) return;
    const dummy = new Object3D();
    for (let index = 0; index < pairs; index += 1) {
      [0, Math.PI].forEach((shift, strand) => {
        dummy.position.copy(position(index, shift));
        dummy.updateMatrix();
        mesh.setMatrixAt(index * 2 + strand, dummy.matrix);
        mesh.setColorAt(index * 2 + strand, strand === 0 ? CYAN : SOFT);
      });
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs, radius]);

  useFrame(() => {
    const { orbAlpha } = sceneStore.current;
    beadMaterial.opacity = orbAlpha;
    rungMaterial.opacity = orbAlpha * 0.4;
  });

  return (
    <>
      <lineSegments geometry={rungs} material={rungMaterial} frustumCulled={false} />
      <instancedMesh ref={beads} args={[undefined, beadMaterial, pairs * 2]} frustumCulled={false}>
        <sphereGeometry args={[0.017, 8, 6]} />
      </instancedMesh>
    </>
  );
}

// The CD4 logo, traced from the brand artwork. One unit is the height of the letters.
function logoC() {
  const open = 0.82;
  const shape = new Shape();
  shape.absarc(0.517, 0.5, 0.52, open, Math.PI * 2 - open, false);
  shape.absarc(0.517, 0.5, 0.32, Math.PI * 2 - open, open, true);
  shape.closePath();
  return shape;
}

function logoD() {
  const left = 0.943;
  const curve = left + 0.33;
  const shape = new Shape();
  shape.moveTo(left, 0);
  shape.lineTo(left, 1);
  shape.lineTo(curve, 1);
  shape.absarc(curve, 0.5, 0.5, Math.PI / 2, -Math.PI / 2, true);
  shape.lineTo(left, 0);
  const hole = new Path();
  hole.moveTo(left + 0.18, 0.2);
  hole.lineTo(curve, 0.2);
  hole.absarc(curve, 0.5, 0.3, -Math.PI / 2, Math.PI / 2, false);
  hole.lineTo(left + 0.18, 0.8);
  hole.lineTo(left + 0.18, 0.2);
  shape.holes.push(hole);
  return shape;
}

function outline(points: number[][], offset: number) {
  return points.map(([x, y]) => new Vector2(x + offset, y));
}

function logoFour() {
  const left = 1.792;
  const shape = new Shape(
    outline([[0.434, 0], [0.642, 0], [0.642, 0.177], [0.755, 0.177], [0.755, 0.404], [0.642, 0.404], [0.642, 1], [0.434, 1], [0, 0.404], [0, 0.177], [0.434, 0.177]], left)
  );
  shape.holes.push(new Path(outline([[0.434, 0.404], [0.19, 0.404], [0.434, 0.67]], left)));
  return shape;
}

function logoPlus() {
  const reach = 0.28;
  const arm = 0.09;
  return new Shape(
    outline([[-arm, -reach], [arm, -reach], [arm, -arm], [reach, -arm], [reach, arm], [arm, arm], [arm, reach], [-arm, reach], [-arm, arm], [-reach, arm], [-reach, -arm], [-arm, -arm]], 0)
  );
}

const LOGO_TRACE = [[1.755, 0.245], [1.94, 0.245], [1.985, 0.36], [2.01, 0.245], [2.05, 0.05], [2.132, 0.51], [2.208, 0.17], [2.264, 0.245], [2.547, 0.245]];

// Faces take the logo's colour and the sides a deeper one, so the flat artwork gains real depth without any lighting.
function paint(geometry: BufferGeometry, face: string, side: string) {
  const faceColor = new Color(face);
  const sideColor = new Color(side);
  const normal = geometry.getAttribute("normal");
  const colors = new Float32Array(normal.count * 3);
  const mixed = new Color();
  for (let index = 0; index < normal.count; index += 1) {
    mixed.copy(sideColor).lerp(faceColor, Math.pow(Math.abs(normal.getZ(index)), 3));
    colors.set([mixed.r, mixed.g, mixed.b], index * 3);
  }
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  return geometry;
}

function logoHalfTurn(time: number) {
  // Passes edge-on quickly and rests facing the viewer. It restarts while edge-on, which hides the change, so the logo always reads the right way round.
  const progress = (time / 6.5) % 1;
  return (Math.PI / 2) * Math.pow(2 * progress - 1, 3);
}

// The CD4 logo in solid 3D at the heart of the cell.
function Cd4Logo() {
  const group = useRef<Group>(null);
  const material = useMemo(() => new MeshBasicMaterial({ vertexColors: true, toneMapped: false, transparent: true }), []);
  const geometry = useMemo(() => {
    const curveSegments = sceneStore.tier === "low" ? 12 : 26;
    const depth = 0.24;
    const settings = { depth, curveSegments, bevelEnabled: true, bevelThickness: 0.026, bevelSize: 0.012, bevelSegments: 2 };
    const front = depth + settings.bevelThickness;
    const trace = (z: number, radius: number) =>
      new TubeGeometry(new CatmullRomCurve3(LOGO_TRACE.map(([x, y]) => new Vector3(x, y, z)), false, "catmullrom", 0.05), 90, radius, 6, false).toNonIndexed();
    const parts = [
      paint(new ExtrudeGeometry(logoC(), settings), "#ffffff", "#1a63d8"),
      paint(new ExtrudeGeometry(logoD(), settings), "#ffffff", "#1a63d8"),
      paint(new ExtrudeGeometry(logoFour(), settings), "#ffffff", "#1a63d8"),
      paint(new ExtrudeGeometry(logoPlus(), { ...settings, depth: depth + 0.07 }).translate(1.034, 0.506, -0.02), "#12e3f5", "#0a8fb8"),
      // A blue edge around the heartbeat line separates it from the white 4, as in the artwork.
      paint(trace(front - 0.002, 0.042), "#0c50c9", "#0c50c9"),
      paint(trace(front + 0.022, 0.021), "#12e3f5", "#12e3f5")
    ];
    const merged = mergeGeometries(parts);
    parts.forEach((part) => part.dispose());
    merged.computeBoundingBox();
    const middle = new Vector3();
    merged.boundingBox?.getCenter(middle);
    merged.translate(-middle.x, -middle.y, -middle.z);
    merged.scale(0.56, 0.56, 0.56);
    return merged;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    material.opacity = Math.min(sceneStore.current.orbAlpha * 1.5, 1);
    if (!group.current) return;
    group.current.rotation.y = logoHalfTurn(time);
    group.current.rotation.x = Math.sin(time * 0.5) * 0.08 - sceneStore.pointer.y * 0.08;
    group.current.scale.setScalar(1 + heartbeat(time) * 0.05);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} renderOrder={7} />
    </group>
  );
}

// Medical orbits: a neon ring, a heartbeat trace and a DNA helix.
function MedicalOrbits() {
  const group = useRef<Group>(null);
  const tier = sceneStore.tier;
  const lines = useMemo(() => new MeshBasicMaterial({ color: CYAN, transparent: true, toneMapped: false, depthWrite: false, blending: AdditiveBlending }), []);
  const glows = useMemo(() => new MeshBasicMaterial({ color: BLUE, transparent: true, toneMapped: false, depthWrite: false, blending: AdditiveBlending }), []);

  useFrame((_, delta) => {
    const { orbAlpha } = sceneStore.current;
    lines.opacity = orbAlpha * 0.8;
    glows.opacity = orbAlpha * 0.18;
    if (group.current) group.current.rotation.y = sceneStore.progress * 9;
    group.current?.children.forEach((orbit, index) => {
      orbit.rotation.z += delta * (index % 2 === 0 ? 0.16 : -0.11);
    });
  });

  return (
    <group ref={group}>
      <group rotation={[1.25, 0.2, 0]}>
        <EcgRing radius={1.46} segments={tier === "low" ? 320 : 560} />
      </group>
      <group rotation={[1.02, -0.55, 0]}>
        <DnaRing radius={1.74} pairs={tier === "low" ? 70 : tier === "mid" ? 110 : 150} />
      </group>
      <group rotation={[1.45, 0.6, 0]}>
        <mesh material={lines}>
          <torusGeometry args={[2, 0.0055, 6, 140]} />
        </mesh>
        <mesh material={glows}>
          <torusGeometry args={[2, 0.03, 6, 100]} />
        </mesh>
      </group>
    </group>
  );
}

export function Orb() {
  const budget = particleBudget[sceneStore.tier];
  const outer = useRef<Group>(null);
  const cell = useRef<Group>(null);
  const membrane = useMemo(() => makeMembraneMaterial(), []);
  const core = useMemo(() => makeCoreMaterial(), []);
  const halo = useMemo(() => makeHaloMaterial(), []);
  const surface = useMemo(() => new IcosahedronGeometry(1, budget.detail), [budget.detail]);

  useFrame(({ clock }) => {
    const pose = sceneStore.current;
    const time = clock.elapsedTime;
    if (outer.current) {
      outer.current.position.set(pose.orbX, pose.orbY + Math.sin(time * 0.55) * 0.05, -1.6 * pose.phone);
      outer.current.scale.setScalar(pose.orbScale * (1 + Math.sin(time * 0.9) * 0.012 + heartbeat(time) * 0.016));
    }
    if (cell.current) {
      cell.current.rotation.y = time * 0.09 + pose.spin * 0.85;
      cell.current.rotation.x = pose.spin * 0.32;
      cell.current.rotation.z = pose.spin * 0.12;
    }
    membrane.uniforms.uTime.value = time;
    membrane.uniforms.uAlpha.value = pose.orbAlpha;
    membrane.uniforms.uGlow.value = pose.neural;
    core.uniforms.uTime.value = time;
    core.uniforms.uAlpha.value = pose.orbAlpha;
    halo.uniforms.uAlpha.value = pose.orbAlpha;
  });

  return (
    <group ref={outer}>
      <mesh scale={1.42} material={halo} renderOrder={0}>
        <sphereGeometry args={[1, 32, 24]} />
      </mesh>
      <MedicalOrbits />
      <Cd4Logo />
      <group ref={cell}>
        <mesh geometry={surface} material={membrane} renderOrder={3} />
        <mesh scale={0.4} renderOrder={1} material={core}>
          <sphereGeometry args={[1, 24, 18]} />
        </mesh>
        <NeuralNetwork count={budget.nodes} />
        <Receptors count={budget.receptors} />
      </group>
    </group>
  );
}
