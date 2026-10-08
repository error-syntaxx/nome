import { useEffect, useId, useRef, useState } from "react";
import * as THREE from "three";

/** A procedural sculpture: no models, textures, or external requests. */
export default function DynamoVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const gradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Testing the context first also avoids Three's noisy unsupported-WebGL error.
    let context: WebGL2RenderingContext | null = null;
    try {
      context = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }
    if (!context) {
      setHasWebGL(false);
      return;
    }

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const removeListeners: Array<() => void> = [];
    let renderer: THREE.WebGLRenderer | undefined;
    let environment: THREE.WebGLRenderTarget | undefined;
    let pmrem: THREE.PMREMGenerator | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let frame: number | undefined;
    let disposed = false;

    const geometry = <T extends THREE.BufferGeometry>(value: T): T => {
      geometries.add(value);
      return value;
    };
    const material = <T extends THREE.Material>(value: T): T => {
      materials.add(value);
      return value;
    };
    const release = () => {
      if (disposed) return;
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      removeListeners.forEach((remove) => remove());
      environment?.dispose();
      pmrem?.dispose();
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      renderer?.dispose();
    };

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
      });
      const engine = renderer;
      engine.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      engine.setClearColor(0x000000, 0);
      engine.outputColorSpace = THREE.SRGBColorSpace;
      engine.toneMapping = THREE.ACESFilmicToneMapping;
      engine.toneMappingExposure = 1.2;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
      camera.position.set(0, 0.12, 8.2);

      // A small studio environment gives metal real, crisp reflections without
      // an HDR download. The panels are used only to generate the environment.
      const studio = new THREE.Scene();
      studio.background = new THREE.Color(0x111a2b);
      const addPanel = (
        position: [number, number, number],
        size: [number, number],
        color: number,
        intensity: number,
      ) => {
        const panelMaterial = material(
          new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
        );
        panelMaterial.color.multiplyScalar(intensity);
        const panel = new THREE.Mesh(
          geometry(new THREE.PlaneGeometry(...size)),
          panelMaterial,
        );
        panel.position.set(...position);
        panel.lookAt(0, 0, 0);
        studio.add(panel);
      };
      addPanel([-4, 5, 4], [4, 7], 0xd6ebff, 4);
      addPanel([5, 1, 3], [2, 8], 0x258aff, 5);
      addPanel([1, -4, 3], [6, 2], 0xb9dfff, 2.5);
      addPanel([-3, 2, -5], [3, 7], 0xffffff, 3);
      pmrem = new THREE.PMREMGenerator(engine);
      environment = pmrem.fromScene(studio, 0.025);
      scene.environment = environment.texture;
      pmrem.dispose();
      pmrem = undefined;

      scene.add(new THREE.AmbientLight(0x668bb5, 1.2));
      const key = new THREE.DirectionalLight(0xd4efff, 5);
      key.position.set(-3, 5, 5);
      scene.add(key);
      const blueLight = new THREE.PointLight(0x1684ff, 35, 14, 2);
      blueLight.position.set(3, 0, 3);
      scene.add(blueLight);
      const rim = new THREE.DirectionalLight(0x379cff, 3.2);
      rim.position.set(-2, -3, -2);
      scene.add(rim);

      const sculpture = new THREE.Group();
      sculpture.rotation.set(-0.24, 0.38, -0.16);
      scene.add(sculpture);

      const blueMetal = material(
        new THREE.MeshPhysicalMaterial({
          color: 0x0875eb,
          metalness: 0.94,
          roughness: 0.18,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          envMapIntensity: 1.35,
        }),
      );
      const silverMetal = material(
        new THREE.MeshPhysicalMaterial({
          color: 0xd7e7f3,
          metalness: 0.97,
          roughness: 0.15,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.25,
        }),
      );
      const blueRing = new THREE.Mesh(
        geometry(new THREE.TorusGeometry(1.98, 0.29, 40, 144)),
        blueMetal,
      );
      blueRing.rotation.set(0.18, -0.26, 0.2);
      sculpture.add(blueRing);

      const orbit = new THREE.Group();
      orbit.rotation.set(1.18, -0.34, 0.57);
      const silverRing = new THREE.Mesh(
        geometry(new THREE.TorusGeometry(2.18, 0.105, 24, 144)),
        silverMetal,
      );
      orbit.add(silverRing);
      sculpture.add(orbit);

      const darkMetal = material(
        new THREE.MeshPhysicalMaterial({
          color: 0x030b16,
          metalness: 0.82,
          roughness: 0.24,
          clearcoat: 1,
          clearcoatRoughness: 0.15,
          envMapIntensity: 0.9,
        }),
      );
      const core = new THREE.Mesh(
        geometry(new THREE.SphereGeometry(0.84, 48, 32)),
        darkMetal,
      );
      sculpture.add(core);

      const glowMaterial = material(
        new THREE.MeshBasicMaterial({
          color: 0x39a5ff,
          transparent: true,
          opacity: 0.75,
          depthWrite: false,
        }),
      );
      const coreHalo = new THREE.Mesh(
        geometry(new THREE.TorusGeometry(0.94, 0.013, 8, 96)),
        glowMaterial,
      );
      coreHalo.rotation.set(0.12, -0.13, 0);
      sculpture.add(coreHalo);

      const orbitalMaterial = material(
        new THREE.MeshBasicMaterial({
          color: 0x3387d4,
          transparent: true,
          opacity: 0.2,
          depthWrite: false,
        }),
      );
      const fineOrbit = new THREE.Mesh(
        geometry(new THREE.TorusGeometry(2.67, 0.005, 6, 128)),
        orbitalMaterial,
      );
      fineOrbit.rotation.set(0.72, 0.4, 0.25);
      sculpture.add(fineOrbit);

      const satelliteGeometry = geometry(
        new THREE.SphereGeometry(0.065, 16, 12),
      );
      const satellite = new THREE.Mesh(satelliteGeometry, silverMetal);
      satellite.position.set(Math.cos(0.75) * 2.18, Math.sin(0.75) * 2.18, 0);
      orbit.add(satellite);
      const blueSatellite = new THREE.Mesh(
        geometry(new THREE.IcosahedronGeometry(0.11, 1)),
        blueMetal,
      );
      blueSatellite.position.set(-2.62, 0.7, 0.1);
      sculpture.add(blueSatellite);

      // Stable placement keeps the composition consistent between visits.
      const positions = new Float32Array(72 * 3);
      let seed = 21;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      for (let index = 0; index < 72; index++) {
        const angle = random() * Math.PI * 2;
        const radius = 2.45 + random() * 1.05;
        positions[index * 3] = Math.cos(angle) * radius;
        positions[index * 3 + 1] = Math.sin(angle) * radius;
        positions[index * 3 + 2] = (random() - 0.5) * 2.4;
      }
      const particleGeometry = geometry(new THREE.BufferGeometry());
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const particles = new THREE.Points(
        particleGeometry,
        material(
          new THREE.PointsMaterial({
            color: 0x7bc6ff,
            size: 0.021,
            transparent: true,
            opacity: 0.64,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        ),
      );
      scene.add(particles);

      const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      let inViewport = true;
      let visible = document.visibilityState !== "hidden";
      let lastTimestamp = 0;
      let elapsed = 0;
      let targetX = 0;
      let targetY = 0;
      let pointerX = 0;
      let pointerY = 0;

      const draw = (timestamp: number) => {
        frame = undefined;
        if (disposed || !visible || !inViewport) return;
        const delta = lastTimestamp
          ? Math.min((timestamp - lastTimestamp) / 1000, 0.05)
          : 0;
        lastTimestamp = timestamp;
        if (!motionPreference.matches) {
          elapsed += delta;
          const smoothing = 1 - Math.exp(-delta * 4);
          pointerX += (targetX - pointerX) * smoothing;
          pointerY += (targetY - pointerY) * smoothing;
        } else {
          pointerX = 0;
          pointerY = 0;
        }
        sculpture.rotation.x =
          -0.24 + Math.sin(elapsed * 0.2) * 0.055 + pointerY * 0.08;
        sculpture.rotation.y =
          0.38 + Math.sin(elapsed * 0.15) * 0.17 + pointerX * 0.12;
        sculpture.rotation.z = -0.16 + Math.sin(elapsed * 0.12) * 0.055;
        blueRing.rotation.z = 0.2 + elapsed * 0.075;
        orbit.rotation.z = 0.57 - elapsed * 0.095;
        core.rotation.y = elapsed * 0.09;
        particles.rotation.z = -elapsed * 0.013;
        blueSatellite.rotation.x = elapsed * 0.2;
        blueSatellite.rotation.y = elapsed * 0.25;
        camera.position.x = pointerX * 0.13;
        camera.position.y = 0.12 - pointerY * 0.1;
        camera.lookAt(0, 0, 0);
        engine.render(scene, camera);
        if (!motionPreference.matches) frame = requestAnimationFrame(draw);
      };
      const requestDraw = () => {
        if (!disposed && visible && inViewport && frame === undefined) {
          lastTimestamp = 0;
          frame = requestAnimationFrame(draw);
        }
      };
      const pause = () => {
        if (frame !== undefined) cancelAnimationFrame(frame);
        frame = undefined;
        lastTimestamp = 0;
      };
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (width < 1 || height < 1) return;
        engine.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = 8.2 / Math.min(camera.aspect, 1);
        camera.updateProjectionMatrix();
        requestDraw();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const onPointerMove = (event: PointerEvent) => {
        if (motionPreference.matches || event.pointerType === "touch") return;
        const rect = container.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      const onPointerLeave = () => {
        targetX = 0;
        targetY = 0;
      };
      const onVisibilityChange = () => {
        visible = document.visibilityState !== "hidden";
        if (visible) requestDraw();
        else pause();
      };
      const onMotionChange = () => {
        pause();
        requestDraw();
      };
      const onContextLost = (event: Event) => {
        event.preventDefault();
        pause();
        setHasWebGL(false);
      };
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibilityChange);
      motionPreference.addEventListener("change", onMotionChange);
      canvas.addEventListener("webglcontextlost", onContextLost);
      removeListeners.push(
        () => container.removeEventListener("pointermove", onPointerMove),
        () => container.removeEventListener("pointerleave", onPointerLeave),
        () =>
          document.removeEventListener("visibilitychange", onVisibilityChange),
        () => motionPreference.removeEventListener("change", onMotionChange),
        () => canvas.removeEventListener("webglcontextlost", onContextLost),
      );
      if ("IntersectionObserver" in window) {
        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            inViewport = entry.isIntersecting;
            if (inViewport) requestDraw();
            else pause();
          },
          { threshold: 0.01 },
        );
        intersectionObserver.observe(container);
      }
      setHasWebGL(true);
      requestDraw();
    } catch {
      release();
      setHasWebGL(false);
    }

    return release;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`dynamo-visual${hasWebGL ? "" : " no-webgl"}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
      {!hasWebGL && (
        <svg className="dynamo-fallback" viewBox="0 0 560 560" fill="none">
          <defs>
            <linearGradient
              id={`${gradientId}-blue`}
              x1="96"
              y1="105"
              x2="425"
              y2="452"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#81CFFF" />
              <stop offset=".23" stopColor="#007AFF" />
              <stop offset=".54" stopColor="#034AAB" />
              <stop offset=".8" stopColor="#168DFF" />
              <stop offset="1" stopColor="#B8E8FF" />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-silver`}
              x1="112"
              y1="193"
              x2="462"
              y2="370"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" />
              <stop offset=".25" stopColor="#56809F" />
              <stop offset=".61" stopColor="#E2F2FF" />
              <stop offset="1" stopColor="#29577F" />
            </linearGradient>
            <radialGradient id={`${gradientId}-core`} cx=".35" cy=".2" r=".85">
              <stop stopColor="#1D3953" />
              <stop offset=".5" stopColor="#081423" />
              <stop offset="1" stopColor="#01050D" />
            </radialGradient>
          </defs>
          <ellipse
            cx="280"
            cy="280"
            rx="225"
            ry="160"
            transform="rotate(-25 280 280)"
            stroke="#3C96E7"
            strokeOpacity=".25"
          />
          <ellipse
            cx="280"
            cy="280"
            rx="179"
            ry="163"
            transform="rotate(-30 280 280)"
            stroke={`url(#${gradientId}-blue)`}
            strokeWidth="35"
          />
          <circle
            cx="280"
            cy="280"
            r="70"
            fill={`url(#${gradientId}-core)`}
            stroke="#1A85DC"
            strokeOpacity=".65"
          />
          <ellipse
            cx="280"
            cy="280"
            rx="192"
            ry="78"
            transform="rotate(30 280 280)"
            stroke={`url(#${gradientId}-silver)`}
            strokeWidth="13"
          />
          <circle cx="108" cy="162" r="3" fill="#80CBFF" />
          <circle cx="435" cy="394" r="2" fill="#80CBFF" />
          <circle cx="403" cy="104" r="2" fill="#80CBFF" />
          <circle cx="83" cy="342" r="2" fill="#80CBFF" />
        </svg>
      )}
      <div className="dynamo-label dynamo-label-top">
        IDEIA → CÓDIGO → IMPACTO
      </div>
      <img className="dynamo-core-mark" src="/brand-mark.svg" alt="" />
      <div className="dynamo-label dynamo-label-bottom">
        <span />
        Em constante movimento
      </div>
    </div>
  );
}
