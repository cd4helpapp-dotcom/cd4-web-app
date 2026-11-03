"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Group, MathUtils, Mesh, ShaderMaterial } from "three";
import { Pose, sceneStore } from "@/lib/scene-store";
import { Orb } from "./orb";
import { Satellites } from "./satellites";
import { CareNetwork, Microphone, Particles, Phone, VoiceWave } from "./stages";

const POSE_KEYS = Object.keys(sceneStore.current) as (keyof Pose)[];

function Rig({ running }: { running: boolean }) {
  const camera = useThree((state) => state.camera);
  const setFrameloop = useThree((state) => state.setFrameloop);

  useEffect(() => {
    setFrameloop(running ? "always" : "never");
  }, [running, setFrameloop]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.25);
    const { current, target, pointer } = sceneStore;
    POSE_KEYS.forEach((key) => {
      current[key] = MathUtils.damp(current[key], target[key], 3.4, delta);
    });
    const portrait = camera.position;
    portrait.x = MathUtils.damp(portrait.x, (sceneStore.isMobile ? 0 : current.camX) + pointer.x * 0.24, 2.2, delta);
    portrait.y = MathUtils.damp(portrait.y, (sceneStore.isMobile ? 0 : current.camY) + pointer.y * 0.16, 2.2, delta);
    portrait.z = MathUtils.damp(portrait.z, current.camZ, 3, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Atmosphere() {
  const mesh = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        uniforms: { uFocus: { value: [0.72, 0.5] }, uTime: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,1.,1.); }`,
        fragmentShader: `
          uniform vec2 uFocus; uniform float uTime; varying vec2 vUv;
          void main(){
            vec3 navy = vec3(.0275,.0784,.149);
            vec3 midnight = vec3(.043,.122,.227);
            float glow = (1.-smoothstep(.0,.75,distance(vUv,uFocus)));
            float low = (1.-smoothstep(.0,.65,distance(vUv,vec2(.18+sin(uTime*.08)*.05,.08))));
            vec3 col = mix(navy,midnight,glow);
            col += vec3(.141,.545,1.)*glow*glow*.1;
            col += vec3(.216,.839,.91)*low*low*.035;
            gl_FragColor = vec4(col,1.);
          }`
      }),
    []
  );

  useFrame(({ clock, viewport }) => {
    const { orbX, orbY } = sceneStore.current;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uFocus.value = [0.5 + orbX / Math.max(viewport.width, 1), 0.5 + orbY / Math.max(viewport.height, 1)];
  });

  return (
    <mesh ref={mesh} material={material} renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

// On phones the 3D scrolls with its section, so text never passes over it.
function World() {
  const group = useRef<Group>(null);
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    if (!group.current) return;
    const worldPerPixel = (2 * Math.tan(MathUtils.degToRad(20)) * camera.position.z) / window.innerHeight;
    group.current.position.y = sceneStore.isMobile ? sceneStore.scrollShift * worldPerPixel : 0;
  });

  return (
    <group ref={group}>
      <Orb />
      <Satellites />
      <VoiceWave />
      <Microphone />
      <CareNetwork />
      <Phone />
    </group>
  );
}

export default function SceneRoot({ running, onReady, onFail }: { running: boolean; onReady: () => void; onFail: () => void }) {
  const [dprCap, setDprCap] = useState(sceneStore.tier === "high" ? 1.5 : 1.25);

  return (
    <Canvas
      dpr={[1, dprCap]}
      camera={{ fov: 40, position: [0, 0, 7.5], near: 0.1, far: 40 }}
      gl={{ antialias: sceneStore.tier !== "low", alpha: false, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFail);
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDprCap(1)}
      />
      <Rig running={running} />
      <Atmosphere />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 5]} intensity={46} color="#37D6E8" />
      <pointLight position={[-4, -2, 4]} intensity={26} color="#248BFF" />
      <Particles />
      <World />
    </Canvas>
  );
}
