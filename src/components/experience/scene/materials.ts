import { AdditiveBlending, BackSide, CanvasTexture, Color, ShaderMaterial, SRGBColorSpace } from "three";

export const CYAN = new Color("#37D6E8");
export const BLUE = new Color("#248BFF");
export const SOFT = new Color("#EAF5FF");

const NOISE = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylor(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylor(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

export function makeMembraneMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 1 }, uGlow: { value: 0.6 } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal; varying vec3 vView; varying vec3 vObject; varying float vDisp;
      ${NOISE}
      void main(){
        vObject = position;
        float disp = snoise(position*1.25 + vec3(0., uTime*.16, uTime*.1));
        vDisp = disp;
        vec3 displaced = position + normal*disp*.075;
        vec4 mv = modelViewMatrix*vec4(displaced,1.);
        vNormal = normalize(normalMatrix*normalize(normal + position*disp*.18));
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix*mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uAlpha; uniform float uGlow;
      varying vec3 vNormal; varying vec3 vView; varying vec3 vObject; varying float vDisp;
      ${NOISE}
      void main(){
        float fres = pow(1.-abs(dot(normalize(vNormal),normalize(vView))),2.6);
        float n = snoise(vObject*3.4 + vec3(uTime*.12));
        float veins = smoothstep(.0,.05,abs(n)-.0)*-1.+1.;
        float cells = smoothstep(.15,.6,snoise(vObject*7.+vec3(0.,uTime*.08,0.)));
        vec3 deep = vec3(.03,.13,.33);
        vec3 blue = vec3(.141,.545,1.);
        vec3 cyan = vec3(.216,.839,.91);
        vec3 col = mix(deep, blue, .35+vDisp*.45);
        col += cyan*veins*(.35+uGlow*.7);
        col += blue*cells*.09;
        col = mix(col, cyan*1.35, fres);
        float alpha = (.16 + fres*.84 + veins*.28)*uAlpha;
        gl_FragColor = vec4(col, clamp(alpha,0.,1.));
      }
    `
  });
}

// A soft halo around the cell. It gives the glow without a full-screen post-processing pass.
export function makeHaloMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: BackSide,
    blending: AdditiveBlending,
    uniforms: { uAlpha: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal; varying vec3 vView;
      void main(){
        vec4 mv = modelViewMatrix*vec4(position,1.);
        vNormal = normalize(normalMatrix*normal); vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix*mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uAlpha;
      varying vec3 vNormal; varying vec3 vView;
      void main(){
        float facing = pow(max(-dot(normalize(vNormal),normalize(vView)),0.),2.8);
        gl_FragColor = vec4(mix(vec3(.141,.545,1.),vec3(.216,.839,.91),facing), facing*.5*uAlpha);
      }
    `
  });
}

export function makeCoreMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal; varying vec3 vView;
      void main(){
        vec4 mv = modelViewMatrix*vec4(position,1.);
        vNormal = normalize(normalMatrix*normal); vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix*mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uAlpha;
      varying vec3 vNormal; varying vec3 vView;
      void main(){
        float facing = pow(max(dot(normalize(vNormal),normalize(vView)),0.),2.4);
        float pulse = .78+.22*sin(uTime*1.3);
        vec3 col = mix(vec3(.141,.545,1.), vec3(.75,.98,1.), facing);
        gl_FragColor = vec4(col, facing*pulse*.42*uAlpha);
      }
    `
  });
}

// Lines with light travelling along them. aT runs 0 to 1 along each line and aSeed keeps the pulses out of step.
export function makePulseLineMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uAlpha: { value: 1 },
      uBase: { value: 0.14 },
      uSpeed: { value: 0.32 },
      uColor: { value: CYAN.clone() }
    },
    vertexShader: /* glsl */ `
      attribute float aT; attribute float aSeed;
      varying float vT; varying float vSeed;
      void main(){ vT=aT; vSeed=aSeed; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uAlpha; uniform float uBase; uniform float uSpeed; uniform vec3 uColor;
      varying float vT; varying float vSeed;
      void main(){
        float head = fract(uTime*uSpeed + vSeed);
        float d = abs(vT-head);
        float pulse = (1.-smoothstep(.0,.2,min(d,1.-d)));
        gl_FragColor = vec4(uColor*(1.+pulse*1.2), (uBase+pulse*.95)*uAlpha);
      }
    `
  });
}

export function makeParticleMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPixel: { value: 1 }, uAlpha: { value: 1 } },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uPixel;
      attribute float aSeed; attribute float aSize;
      varying float vTwinkle; varying float vSeed;
      void main(){
        vec3 p = position;
        p.x += sin(uTime*.14 + aSeed*6.3)*.2;
        p.y += cos(uTime*.11 + aSeed*9.1)*.24;
        p.z += sin(uTime*.09 + aSeed*3.7)*.18;
        vec4 mv = modelViewMatrix*vec4(p,1.);
        vTwinkle = .45+.55*sin(uTime*(.5+aSeed)+aSeed*20.);
        vSeed = aSeed;
        gl_PointSize = aSize*uPixel*(26./-mv.z);
        gl_Position = projectionMatrix*mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uAlpha;
      varying float vTwinkle; varying float vSeed;
      void main(){
        float d = length(gl_PointCoord-.5);
        float a = (1.-smoothstep(.05,.5,d));
        vec3 col = mix(vec3(.141,.545,1.), vec3(.216,.839,.91), vSeed);
        gl_FragColor = vec4(col, a*vTwinkle*.7*uAlpha);
      }
    `
  });
}

export function makeWaveMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uMorph: { value: 0 },
      uPixel: { value: 1 },
      uWidth: { value: 8 }
    },
    vertexShader: /* glsl */ `
      uniform float uTime; uniform float uMorph; uniform float uPixel; uniform float uWidth;
      attribute vec3 aGrid; attribute float aRow; attribute float aU;
      varying float vGlow;
      void main(){
        float env = sin(aU*3.14159);
        float y = sin(aU*16.+uTime*2.6+aRow*.9)*.62*env*env + sin(aU*43.-uTime*3.4)*.14*env;
        vec3 wave = vec3((aU-.5)*uWidth, y*(.5+aRow*.2)+(aRow-2.)*.06, (aRow-2.)*.14);
        float m = smoothstep(.0,1.,clamp(uMorph*1.6-aU*.6,0.,1.));
        vec3 p = mix(wave, aGrid, m);
        vec4 mv = modelViewMatrix*vec4(p,1.);
        vGlow = mix(.6+env*.4, 1., m);
        gl_PointSize = (3.4+m*1.8)*uPixel*(9./-mv.z);
        gl_Position = projectionMatrix*mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uAlpha;
      varying float vGlow;
      void main(){
        float a = (1.-smoothstep(.1,.5,length(gl_PointCoord-.5)));
        gl_FragColor = vec4(mix(vec3(.141,.545,1.),vec3(.45,.92,1.),vGlow), a*vGlow*uAlpha);
      }
    `
  });
}

export function makeHologramMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal; varying vec3 vView; varying vec3 vWorld;
      void main(){
        vec4 world = modelMatrix*vec4(position,1.);
        vec4 mv = viewMatrix*world;
        vWorld = position; vNormal = normalize(normalMatrix*normal); vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix*mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform float uAlpha;
      varying vec3 vNormal; varying vec3 vView; varying vec3 vWorld;
      void main(){
        float fres = pow(1.-abs(dot(normalize(vNormal),normalize(vView))),1.9);
        float scan = .86+.14*sin(vWorld.y*170.-uTime*2.8);
        float sweep = (1.-smoothstep(.0,.2,abs(fract(uTime*.14)*3.4-1.7-vWorld.y)));
        vec3 col = mix(vec3(.141,.545,1.),vec3(.45,.92,1.),fres+sweep*.6);
        gl_FragColor = vec4(col,(.045+fres*.8+sweep*.32)*scan*uAlpha);
      }
    `
  });
}

export function makeLabelTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    context.font = '600 46px Manrope, "Segoe UI", Arial, sans-serif';
    const width = Math.min(context.measureText(text).width + 88, 636);
    const left = (640 - width) / 2;
    context.fillStyle = "rgba(11,31,58,0.82)";
    context.strokeStyle = "rgba(55,214,232,0.55)";
    context.lineWidth = 3;
    context.beginPath();
    context.roundRect(left, 18, width, 92, 46);
    context.fill();
    context.stroke();
    context.fillStyle = "#EAF5FF";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 320, 66);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function makeRecordTexture(title: string, accent: string, rows: number[]) {
  const canvas = document.createElement("canvas");
  canvas.width = 340;
  canvas.height = 440;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "rgba(234,245,255,0.95)";
    context.beginPath();
    context.roundRect(4, 4, 332, 432, 30);
    context.fill();
    context.fillStyle = accent;
    context.beginPath();
    context.roundRect(30, 30, 56, 56, 16);
    context.fill();
    context.fillStyle = "#071426";
    context.font = '700 32px Manrope, "Segoe UI", Arial, sans-serif';
    context.fillText(title, 100, 68);
    rows.forEach((width, index) => {
      context.fillStyle = index % 3 === 0 ? accent : "rgba(11,31,58,0.2)";
      context.beginPath();
      context.roundRect(30, 124 + index * 42, width, 18, 9);
      context.fill();
    });
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
