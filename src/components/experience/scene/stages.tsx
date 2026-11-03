"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  InstancedMesh,
  LineSegments,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Points,
  ShaderMaterial,
  SpriteMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3
} from "three";
import { particleBudget, sceneStore } from "@/lib/scene-store";
import { CYAN, makeLabelTexture, makeParticleMaterial, makePulseLineMaterial, makeWaveMaterial } from "./materials";

export function Particles() {
  const count = particleBudget[sceneStore.tier].particles;
  const dpr = useThree((state) => state.viewport.dpr);
  const material = useMemo(() => makeParticleMaterial(), []);
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      const radius = 2.4 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta) * 1.5;
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      positions[index * 3 + 2] = radius * Math.cos(phi) * 0.6 - 1;
      seeds[index] = Math.random();
      sizes[index] = 0.7 + Math.random() * Math.random() * 3.2;
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(positions, 3));
    result.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    result.setAttribute("aSize", new BufferAttribute(sizes, 1));
    return result;
  }, [count]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uPixel.value = dpr;
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.012 + sceneStore.progress * 3.4;
      points.current.rotation.x = sceneStore.progress * 1.5;
      points.current.rotation.z = sceneStore.progress * 0.8;
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

// Voice as a moving wave, which rearranges itself into rows of data as the snapshot section scrolls.
export function VoiceWave() {
  const count = particleBudget[sceneStore.tier].wave;
  const dpr = useThree((state) => state.viewport.dpr);
  const material = useMemo(() => makeWaveMaterial(), []);
  const group = useRef<Group>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const rows = new Float32Array(count);
    const progress = new Float32Array(count);
    const columns = Math.ceil(Math.sqrt(count * 2.2));
    const lines = Math.ceil(count / columns);
    for (let index = 0; index < count; index += 1) {
      progress[index] = Math.random();
      rows[index] = index % 5;
      const column = index % columns;
      const line = Math.floor(index / columns);
      grid[index * 3] = (column / columns - 0.5) * 4.2;
      grid[index * 3 + 1] = (0.5 - line / lines) * 2.6;
      grid[index * 3 + 2] = 0;
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(positions, 3));
    result.setAttribute("aGrid", new BufferAttribute(grid, 3));
    result.setAttribute("aRow", new BufferAttribute(rows, 1));
    result.setAttribute("aU", new BufferAttribute(progress, 1));
    return result;
  }, [count]);

  useFrame(({ clock }) => {
    const { wave } = sceneStore.current;
    const mobile = sceneStore.isMobile;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uAlpha.value = wave * (1 - sceneStore.current.morph * 0.2);
    material.uniforms.uPixel.value = dpr;
    material.uniforms.uMorph.value = sceneStore.current.morph;
    material.uniforms.uWidth.value = mobile ? 3 : 9.5;
    if (group.current) {
      group.current.visible = wave > 0.01;
      group.current.position.set(mobile ? 0 : 2.15 * sceneStore.current.morph * sceneStore.xScale, mobile ? 1.05 : -2.12 + sceneStore.current.morph * 2.12, -0.4 * sceneStore.current.morph);
      group.current.scale.setScalar(mobile ? 0.68 : 1);
    }
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

export function Microphone() {
  const group = useRef<Group>(null);
  const metal = useMemo(() => new MeshStandardMaterial({ color: "#2a5a96", metalness: 0.7, roughness: 0.3, emissive: "#0b2a55", emissiveIntensity: 0.7, transparent: true }), []);
  const glass = useMemo(() => new MeshStandardMaterial({ color: "#123a6b", metalness: 0.75, roughness: 0.34, emissive: "#0f4aa0", emissiveIntensity: 0.32, transparent: true }), []);
  const glow = useMemo(() => new MeshBasicMaterial({ color: CYAN, transparent: true, toneMapped: false, depthWrite: false }), []);
  const rings = useRef<Group>(null);

  useFrame(({ clock }) => {
    const { mic } = sceneStore.current;
    const time = clock.elapsedTime;
    metal.opacity = mic;
    glass.opacity = mic;
    glow.opacity = mic * 0.9;
    if (!group.current) return;
    group.current.visible = mic > 0.01;
    const mobile = sceneStore.isMobile;
    group.current.position.set(mobile ? 0 : 2.7 * sceneStore.xScale, (mobile ? 1.1 : -0.05) + Math.sin(time * 0.7) * 0.05, 0.2);
    group.current.scale.setScalar((mobile ? 0.46 : 0.9) * (0.86 + mic * 0.14));
    group.current.rotation.y = Math.sin(time * 0.4) * 0.26 + sceneStore.pointer.x * 0.26;
    group.current.rotation.x = -0.06 + sceneStore.pointer.y * 0.08;
    rings.current?.children.forEach((ring, index) => {
      const phase = (time * 0.42 + index / 3) % 1;
      ring.scale.setScalar(0.8 + phase * 0.7);
      ((ring as unknown as { material: MeshBasicMaterial }).material).opacity = (1 - phase) * 0.6 * mic;
    });
  });

  const ringMaterials = useMemo(
    () => [0, 1, 2].map(() => new MeshBasicMaterial({ color: CYAN, transparent: true, toneMapped: false, depthWrite: false })),
    []
  );

  return (
    <group ref={group}>
      <group position={[0, 0.72, 0]}>
        <mesh material={glass}>
          <capsuleGeometry args={[0.46, 0.68, 10, 28]} />
        </mesh>
        {[-0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((y) => (
          <mesh key={y} material={glow} renderOrder={4} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[Math.sqrt(Math.max(0.2116 - Math.max(Math.abs(y) - 0.34, 0) ** 2, 0.01)) + 0.004, 0.0085, 6, 48]} />
          </mesh>
        ))}
      </group>
      <mesh material={metal} position={[0, 0.52, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.72, 0.038, 10, 44, Math.PI]} />
      </mesh>
      <mesh material={metal} position={[0, -0.46, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.52, 14]} />
      </mesh>
      <mesh material={metal} position={[0, -0.74, 0]}>
        <cylinderGeometry args={[0.46, 0.54, 0.07, 36]} />
      </mesh>
      <group ref={rings} position={[0, -0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {ringMaterials.map((material, index) => (
          <mesh key={index} material={material}>
            <torusGeometry args={[0.72, 0.007, 6, 72]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const NETWORK_LABELS = ["Patients", "Doctors", "Appointments", "Medical reports", "Prescriptions", "Follow-up reminders", "Community"];

function NetworkLabel({ text, position, index }: { text: string; position: Vector3; index: number }) {
  const material = useMemo(
    () => new SpriteMaterial({ map: makeLabelTexture(text), transparent: true, depthTest: false, depthWrite: false, toneMapped: false }),
    [text]
  );

  useEffect(
    () => () => {
      material.map?.dispose();
      material.dispose();
    },
    [material]
  );

  useFrame(() => {
    const { network, netLabels } = sceneStore.current;
    const focus = sceneStore.networkFocus;
    material.opacity = network * netLabels * (focus === -1 || focus === index ? 1 : 0.32);
  });

  return <sprite material={material} position={[position.x, position.y - 0.32, position.z]} scale={[1.6, 0.32, 1]} renderOrder={10} />;
}

export function CareNetwork() {
  const group = useRef<Group>(null);
  const nodes = useRef<InstancedMesh>(null);
  const lines = useRef<LineSegments>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const lineMaterial = useMemo(() => makePulseLineMaterial(), []);
  const nodeMaterial = useMemo(() => new MeshBasicMaterial({ color: CYAN, transparent: true, toneMapped: false }), []);
  const highlight = useMemo(() => new Color("#EAF5FF"), []);
  const base = useMemo(() => new Color("#37D6E8"), []);
  const mobileLayout = sceneStore.isMobile;

  const points = useMemo(
    () =>
      NETWORK_LABELS.map((_, index) => {
        const angle = (index / NETWORK_LABELS.length) * Math.PI * 2 + Math.PI / 2;
        return mobileLayout
          ? new Vector3(Math.cos(angle) * 1.02, Math.sin(angle) * 0.92, Math.sin(angle * 2) * 0.2)
          : new Vector3(Math.cos(angle) * 3.5 * sceneStore.xScale, Math.sin(angle) * 1.45, Math.sin(angle * 2) * 0.5);
      }),
    [mobileLayout]
  );

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const progress: number[] = [];
    const seeds: number[] = [];
    points.forEach((point, index) => {
      positions.push(0, 0, 0, point.x, point.y, point.z);
      progress.push(0, 1);
      seeds.push(index / points.length, index / points.length);
      const next = points[(index + 1) % points.length];
      positions.push(point.x, point.y, point.z, next.x, next.y, next.z);
      progress.push(0, 1);
      seeds.push(index * 0.37, index * 0.37);
    });
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    result.setAttribute("aT", new BufferAttribute(new Float32Array(progress), 1));
    result.setAttribute("aSeed", new BufferAttribute(new Float32Array(seeds), 1));
    return result;
  }, [points]);

  useFrame(({ clock }) => {
    const { network, orbX, orbY, netScale } = sceneStore.current;
    const time = clock.elapsedTime;
    lineMaterial.uniforms.uTime.value = time;
    lineMaterial.uniforms.uAlpha.value = network;
    nodeMaterial.opacity = network;
    if (!group.current) return;
    group.current.visible = network > 0.01;
    group.current.position.set(orbX, orbY, 0);
    group.current.scale.setScalar((0.7 + network * 0.3) * netScale);
    group.current.rotation.y = sceneStore.pointer.x * 0.08;
    group.current.rotation.x = -sceneStore.pointer.y * 0.05;
    if (!nodes.current) return;
    points.forEach((point, index) => {
      const focused = sceneStore.networkFocus === index;
      dummy.position.copy(point);
      dummy.position.y += Math.sin(time * 0.7 + index) * 0.03;
      dummy.scale.setScalar((focused ? 0.11 : 0.066) * (1 + Math.sin(time * 1.6 + index) * 0.08));
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(index, dummy.matrix);
      nodes.current?.setColorAt(index, focused ? highlight : base);
    });
    nodes.current.instanceMatrix.needsUpdate = true;
    if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments ref={lines} geometry={geometry} material={lineMaterial} frustumCulled={false} />
      <instancedMesh ref={nodes} args={[undefined, nodeMaterial, points.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 14, 10]} />
      </instancedMesh>
      {NETWORK_LABELS.map((label, index) => (
        <NetworkLabel key={label} text={label} position={points[index]} index={index} />
      ))}
    </group>
  );
}

const SCREENS = ["/images/app/home.webp", "/images/app/explore.webp"];

// Real app screens. They only download once the phone is close to appearing.
export function Phone() {
  const group = useRef<Group>(null);
  const [textures, setTextures] = useState<Texture[] | null>(null);
  const requested = useRef(false);
  const screen = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        uniforms: { uA: { value: null }, uB: { value: null }, uMix: { value: 0 }, uAlpha: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `
          uniform sampler2D uA; uniform sampler2D uB; uniform float uMix; uniform float uAlpha; varying vec2 vUv;
          void main(){ gl_FragColor = vec4(mix(texture2D(uA,vUv).rgb, texture2D(uB,vUv).rgb, uMix), uAlpha); }`
      }),
    []
  );
  const shell = useMemo(() => new MeshStandardMaterial({ color: "#0c1d36", metalness: 0.92, roughness: 0.24, transparent: true }), []);
  const bezel = useMemo(() => new MeshBasicMaterial({ color: "#030912", transparent: true }), []);

  useEffect(
    () => () => {
      textures?.forEach((texture) => texture.dispose());
    },
    [textures]
  );

  useFrame(({ clock }) => {
    const { phone } = sceneStore.current;
    if (phone > 0.01 && !requested.current) {
      requested.current = true;
      const loader = new TextureLoader();
      Promise.all(SCREENS.map((url) => loader.loadAsync(url)))
        .then((loaded) => {
          loaded.forEach((texture) => {
            texture.colorSpace = SRGBColorSpace;
          });
          screen.uniforms.uA.value = loaded[0];
          screen.uniforms.uB.value = loaded[1];
          setTextures(loaded);
        })
        .catch(() => {
          requested.current = false;
        });
    }
    shell.opacity = phone;
    bezel.opacity = phone;
    screen.uniforms.uAlpha.value = textures ? phone : 0;
    const progress = sceneStore.phoneProgress;
    screen.uniforms.uMix.value = Math.min(Math.max((progress - 0.6) / 0.08, 0), 1);
    if (!group.current) return;
    group.current.visible = phone > 0.01;
    const mobile = sceneStore.isMobile;
    group.current.position.set(mobile ? 0 : 2.6 * sceneStore.xScale, (mobile ? 1.03 : 0) + Math.sin(clock.elapsedTime * 0.7) * 0.04, 0.6);
    group.current.scale.setScalar((mobile ? 0.5 : 1) * (0.84 + phone * 0.16));
    group.current.rotation.y = -0.44 + progress * 0.7 + sceneStore.pointer.x * 0.14;
    group.current.rotation.x = 0.04 + sceneStore.pointer.y * 0.07;
    group.current.rotation.z = 0.05 - progress * 0.1;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1.72, 3.56, 0.13]} radius={0.06} smoothness={4} material={shell} />
      <mesh position={[0, 0, 0.0665]} material={bezel}>
        <planeGeometry args={[1.62, 3.46]} />
      </mesh>
      <mesh position={[0, 0, 0.068]} material={screen}>
        <planeGeometry args={[1.56, 3.38]} />
      </mesh>
    </group>
  );
}
