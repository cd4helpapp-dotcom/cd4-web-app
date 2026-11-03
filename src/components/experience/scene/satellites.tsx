"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  CatmullRomCurve3,
  DoubleSide,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LatheGeometry,
  LineBasicMaterial,
  MathUtils,
  EdgesGeometry,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  QuadraticBezierCurve3,
  SplineCurve,
  ShaderMaterial,
  SpriteMaterial,
  TubeGeometry,
  Vector2,
  Vector3
} from "three";
import { sceneStore } from "@/lib/scene-store";
import { CYAN, makeHologramMaterial, makeLabelTexture, makeRecordTexture } from "./materials";

const ANCHORS = {
  voice: new Vector3(-1.72, 1.32, 0.25),
  ai: new Vector3(1.72, 1.42, -0.25),
  doctor: new Vector3(-1.55, -1.2, 0.25),
  records: new Vector3(1.72, -1.28, 0.25)
};

function satelliteAnchor(anchor: Vector3, target: Vector3) {
  const pose = sceneStore.current;
  if (sceneStore.isMobile) {
    target.set(pose.orbX + Math.sign(anchor.x) * 0.72, pose.orbY + (anchor.y > 0 ? 0.76 : -0.74), anchor.z);
    return target;
  }
  const spread = 0.68 * sceneStore.xScale;
  target.set(pose.orbX + anchor.x * spread, pose.orbY + anchor.y * spread, anchor.z);
  return target;
}

function Label({ text, position, scale = 1, show = "satellites" }: { text: string; position: [number, number, number]; scale?: number; show?: "satellites" | "doctor" }) {
  const material = useMemo(() => {
    const map = makeLabelTexture(text);
    return new SpriteMaterial({ map, transparent: true, depthWrite: false, depthTest: false, toneMapped: false });
  }, [text]);

  useEffect(
    () => () => {
      material.map?.dispose();
      material.dispose();
    },
    [material]
  );

  useFrame(() => {
    material.opacity = sceneStore.current[show];
  });

  return <sprite material={material} position={position} scale={[1.15 * scale, 0.23 * scale, 1]} renderOrder={10} />;
}

function VoiceSatellite() {
  const group = useRef<Group>(null);
  const bars = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const geometry = useMemo(() => new BoxGeometry(0.026, 1, 0.026), []);
  const material = useMemo(() => new MeshBasicMaterial({ color: CYAN, transparent: true, toneMapped: false }), []);
  const anchor = useMemo(() => new Vector3(), []);
  const COUNT = 28;

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const { satellites } = sceneStore.current;
    material.opacity = satellites;
    if (group.current) {
      group.current.visible = satellites > 0.01 && !sceneStore.isMobile;
      group.current.position.copy(satelliteAnchor(ANCHORS.voice, anchor));
      group.current.position.y += Math.sin(time * 0.8) * 0.04;
    }
    if (!bars.current || satellites <= 0.01) return;
    for (let index = 0; index < COUNT; index += 1) {
      const angle = (index / COUNT) * Math.PI * 2;
      const level = 0.07 + Math.abs(Math.sin(time * 2.8 + index * 0.75) * Math.cos(time * 1.3 + index * 0.31)) * 0.22;
      dummy.position.set(Math.cos(angle) * 0.34, Math.sin(angle) * 0.34, 0);
      dummy.rotation.set(0, 0, angle - Math.PI / 2);
      dummy.scale.set(1, level, 1);
      dummy.updateMatrix();
      bars.current.setMatrixAt(index, dummy.matrix);
    }
    bars.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={bars} args={[geometry, material, COUNT]} frustumCulled={false} />
      <mesh material={material}>
        <circleGeometry args={[0.1, 24]} />
      </mesh>
    </group>
  );
}

function AiSatellite() {
  const group = useRef<Group>(null);
  const spinner = useRef<Group>(null);
  const edges = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(0.42, 1)), []);
  const material = useMemo(() => new LineBasicMaterial({ color: CYAN, transparent: true, toneMapped: false }), []);
  const core = useMemo(() => new MeshBasicMaterial({ color: "#248BFF", transparent: true, toneMapped: false }), []);
  const anchor = useMemo(() => new Vector3(), []);

  useFrame(({ clock }, delta) => {
    const { satellites } = sceneStore.current;
    material.opacity = satellites * 0.85;
    core.opacity = satellites * 0.8;
    if (group.current) {
      group.current.visible = satellites > 0.01 && !sceneStore.isMobile;
      group.current.position.copy(satelliteAnchor(ANCHORS.ai, anchor));
      group.current.position.y += Math.cos(clock.elapsedTime * 0.7) * 0.05;
    }
    if (spinner.current) {
      spinner.current.rotation.y += delta * 0.42;
      spinner.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={group}>
      <group ref={spinner}>
        <lineSegments geometry={edges} material={material} />
        <mesh material={core}>
          <icosahedronGeometry args={[0.13, 1]} />
        </mesh>
      </group>
    </group>
  );
}

function RecordsSatellite() {
  const group = useRef<Group>(null);
  const plane = useMemo(() => new PlaneGeometry(0.52, 0.68), []);
  const cards = useMemo(
    () =>
      [
        { title: "History", accent: "#248BFF", rows: [260, 190, 240, 150, 220, 170, 110] },
        { title: "Rx", accent: "#37D6E8", rows: [200, 260, 170, 230, 130, 210, 150] },
        { title: "Report", accent: "#248BFF", rows: [240, 170, 260, 120, 200, 240, 130] }
      ].map((card) => {
        const map = makeRecordTexture(card.title, card.accent, card.rows);
        return new MeshBasicMaterial({ map, color: "#c7d9ec", transparent: true, side: DoubleSide, toneMapped: false, depthWrite: false });
      }),
    []
  );
  const anchor = useMemo(() => new Vector3(), []);

  useEffect(
    () => () => {
      cards.forEach((card) => {
        card.map?.dispose();
        card.dispose();
      });
    },
    [cards]
  );

  useFrame(({ clock, pointer }) => {
    const time = clock.elapsedTime;
    const { satellites, records, orbX, orbY } = sceneStore.current;
    const presence = Math.max(satellites, records);
    cards.forEach((card) => {
      card.opacity = presence;
    });
    if (group.current) {
      group.current.visible = presence > 0.01 && !sceneStore.isMobile;
      // In the care ecosystem, the records settle between the report and prescription points.
      const toNetwork = records / Math.max(records + satellites, 0.0001);
      satelliteAnchor(ANCHORS.records, anchor);
      group.current.position.set(anchor.x + (orbX - anchor.x) * toNetwork, anchor.y + (orbY - (sceneStore.current.network > 0.5 ? 1.12 : 0) - anchor.y) * toNetwork, anchor.z);
      group.current.rotation.y = -0.34 + Math.sin(time * 0.4) * 0.08 + pointer.x * 0.12;
      group.current.rotation.x = Math.sin(time * 0.5) * 0.04;
    }
  });

  return (
    <group ref={group}>
      {cards.map((material, index) => (
        <mesh
          key={index}
          geometry={plane}
          material={material}
          position={[(index - 1) * 0.15, (1 - index) * 0.07, index * 0.07]}
          rotation={[0, 0, (1 - index) * 0.1]}
        />
      ))}
    </group>
  );
}

// One figure used twice: small as the hero's "doctor connection", then large in the doctor discovery section.
function DoctorHologram() {
  const group = useRef<Group>(null);
  const rings = useRef<Group>(null);
  const profileTags = useRef<Group>(null);
  const hologram = useMemo(() => makeHologramMaterial(), []);
  const lineMaterial = useMemo(() => new MeshBasicMaterial({ color: CYAN, transparent: true, toneMapped: false, depthWrite: false }), []);
  const torso = useMemo(() => {
    const profile = new SplineCurve(
      [
        [0.001, -1.18], [0.46, -1.18], [0.52, -0.8], [0.57, -0.36], [0.6, -0.08], [0.55, 0.06], [0.36, 0.15], [0.17, 0.22], [0.115, 0.3], [0.115, 0.44], [0.001, 0.46]
      ].map(([x, y]) => new Vector2(x, y))
    );
    return new LatheGeometry(profile.getPoints(56), 44);
  }, []);
  const stethoscope = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.2, 0.2, 0.17), new Vector3(-0.36, -0.14, 0.42), new Vector3(-0.16, -0.5, 0.56),
      new Vector3(0.04, -0.62, 0.58), new Vector3(0.26, -0.3, 0.54), new Vector3(0.32, -0.02, 0.38), new Vector3(0.2, 0.2, 0.17)
    ]);
    return new TubeGeometry(curve, 48, 0.012, 6, false);
  }, []);
  const anchor = useMemo(() => new Vector3(), []);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;
    const { satellites, doctor } = sceneStore.current;
    const mobile = sceneStore.isMobile;
    const presence = mobile ? doctor : Math.max(satellites, doctor);
    hologram.uniforms.uTime.value = time;
    hologram.uniforms.uAlpha.value = presence;
    lineMaterial.opacity = presence * 0.9;
    if (!group.current) return;
    group.current.visible = presence > 0.01;
    satelliteAnchor(ANCHORS.doctor, anchor);
    const stageX = mobile ? 0 : 2.7 * sceneStore.xScale;
    const stageY = mobile ? 1.1 : 0.1;
    const blend = doctor / Math.max(doctor + satellites, 0.0001);
    group.current.position.set(anchor.x + (stageX - anchor.x) * blend, anchor.y + (stageY - anchor.y) * blend + Math.sin(time * 0.7) * 0.03, 0.2);
    const small = 0.3;
    const large = mobile ? 0.62 : 1.3;
    group.current.scale.setScalar(small + (large - small) * blend);
    group.current.rotation.y = Math.sin(time * 0.32) * 0.2 + sceneStore.pointer.x * 0.16;
    if (rings.current) {
      rings.current.rotation.z += delta * 0.18;
      rings.current.children.forEach((ring, index) => {
        ring.scale.setScalar(1 + Math.sin(time * 0.9 + index) * 0.03);
      });
    }
    if (profileTags.current) profileTags.current.visible = !mobile && blend >= 0.4;
  });

  return (
    <group ref={group}>
      <mesh geometry={torso} material={hologram} />
      <mesh material={hologram} position={[0, 0.74, 0]} scale={[0.92, 1.08, 0.98]}>
        <sphereGeometry args={[0.33, 28, 22]} />
      </mesh>
      <mesh geometry={stethoscope} material={lineMaterial} />
      <mesh material={lineMaterial} position={[0.04, -0.66, 0.59]}>
        <sphereGeometry args={[0.055, 14, 10]} />
      </mesh>
      <group ref={rings} position={[0, -1.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={lineMaterial}>
          <torusGeometry args={[0.72, 0.007, 6, 72]} />
        </mesh>
        <mesh material={lineMaterial}>
          <torusGeometry args={[0.92, 0.004, 6, 72]} />
        </mesh>
      </group>
      <group ref={profileTags}>
        <Label show="doctor" text="Specialization" position={[-1.04, 0.58, 0.45]} scale={0.72} />
        <Label show="doctor" text="Location" position={[-1.2, 0.08, 0.5]} scale={0.72} />
        <Label show="doctor" text="Availability" position={[-1.02, -0.42, 0.6]} scale={0.72} />
      </group>
    </group>
  );
}

function Pathway({ end, seed }: { end: Vector3; seed: number }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 }, uSeed: { value: seed } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `
          uniform float uTime; uniform float uAlpha; uniform float uSeed; varying vec2 vUv;
          void main(){
            float head = fract(uTime*.28+uSeed);
            float d = abs(vUv.x-head);
            float pulse = (1.-smoothstep(0.,.13,min(d,1.-d)));
            float fade = smoothstep(0.,.08,vUv.x)*(1.-smoothstep(.92,1.,vUv.x));
            gl_FragColor = vec4(vec3(.216,.839,.91)*(1.+pulse), (.2+pulse*.8)*fade*uAlpha);
          }`
      }),
    [seed]
  );
  const geometry = useMemo(() => {
    const control = end.clone().multiplyScalar(0.55).add(new Vector3(end.y * 0.22, -end.x * 0.22, 0.2));
    return new TubeGeometry(new QuadraticBezierCurve3(new Vector3(0, 0, 0), control, end), 36, 0.011, 5, false);
  }, [end]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uAlpha.value = sceneStore.current.satellites;
  });

  return <mesh geometry={geometry} material={material} frustumCulled={false} />;
}

function Pathways() {
  const group = useRef<Group>(null);
  useLayoutEffect(() => {
    if (group.current) group.current.renderOrder = 2;
  }, []);

  useFrame(() => {
    const { orbX, orbY, satellites } = sceneStore.current;
    if (!group.current) return;
    group.current.visible = satellites > 0.01;
    group.current.position.set(orbX, orbY, 0);
    const spread = 0.68 * sceneStore.xScale;
    if (sceneStore.isMobile) group.current.scale.set(0.42, 0.6, 1);
    else group.current.scale.set(spread, spread, 1);
  });

  return (
    <group ref={group}>
      <Pathway end={ANCHORS.voice} seed={0} />
      <Pathway end={ANCHORS.ai} seed={0.27} />
      <Pathway end={ANCHORS.doctor} seed={0.52} />
      <Pathway end={ANCHORS.records} seed={0.78} />
    </group>
  );
}

const CHIPS: { id: string; anchor: Vector3; drop: number }[] = [
  { id: "voice", anchor: ANCHORS.voice, drop: 0.46 },
  { id: "ai", anchor: ANCHORS.ai, drop: 0.46 },
  { id: "doctor", anchor: ANCHORS.doctor, drop: 0.44 },
  { id: "records", anchor: ANCHORS.records, drop: 0.44 }
];

function HeroChipTracker() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const point = useMemo(() => new Vector3(), []);
  const elements = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    CHIPS.forEach(({ id }) => {
      elements.current[id] = document.querySelector<HTMLElement>(`[data-chip="${id}"]`);
    });
  }, []);

  useFrame(({ clock }) => {
    const { satellites } = sceneStore.current;
    const mobile = sceneStore.isMobile;
    const worldPerPixel = (2 * Math.tan(MathUtils.degToRad(20)) * camera.position.z) / window.innerHeight;
    CHIPS.forEach(({ id, anchor, drop }, index) => {
      const element = elements.current[id];
      if (!element) return;
      if (satellites < 0.02) {
        element.style.opacity = "0";
        return;
      }
      satelliteAnchor(anchor, point);
      if (!mobile) point.y -= drop;
      point.y += Math.sin(clock.elapsedTime * 0.8 + index) * 0.035;
      if (mobile) point.y += sceneStore.scrollShift * worldPerPixel;
      point.project(camera);
      const x = (point.x * 0.5 + 0.5) * size.width;
      const y = (-point.y * 0.5 + 0.5) * size.height;
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translateX(-50%)`;
      element.style.opacity = String(satellites);
    });
  });

  return null;
}

export function Satellites() {
  return (
    <>
      <Pathways />
      <VoiceSatellite />
      <AiSatellite />
      <RecordsSatellite />
      <DoctorHologram />
      <HeroChipTracker />
    </>
  );
}
