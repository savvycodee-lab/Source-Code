import splt from "https://esm.sh/spltjs";
import { animate, press, hover, stagger } from "https://esm.sh/motion";
import { Howl } from "https://esm.sh/howler";
import VanillaTilt from "https://esm.sh/vanilla-tilt";

import AudioMotionAnalyzer from "https://cdn.skypack.dev/audiomotion-analyzer?min";

VanillaTilt.init(document.querySelector(".card-wrap"), {
  speed: 50,
  max: 5,
  glare: true,
  "max-glare": 0.05
});

splt({ reveal: true });

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let playAudio = true,
  ended = true,
  currentSound;

const play = async (file, volume = 0.5, speed = 1) => {
  await audioCtx.resume().catch(() => {});
  if (audioCtx.state === "suspended") return false;
  currentSound?.stop();
  ended = false;
  currentSound = new Howl({
    src: [file],
    autoplay: playAudio,
    volume,
    rate: speed,
    onend: () => {
      ended = true;
      currentSound = null;
    }
  });
  return true;
};

const audioEl = new Audio(
  "https://cdn.jsdelivr.net/gh/ouyahama/cdn@main/land.mp3"
);
audioEl.crossOrigin = "anonymous";

press(".card", () => {
  animate(".card", { scale: 1.05 });
  audioEl.play();
  return () => {
    animate(".card", { scale: 1 });
  };
});
// audio visulizer
const audioMotion = new AudioMotionAnalyzer(document.getElementById("wave"), {
  source: audioEl,
  mode: "led",
  ledBars: true,
  showBgColor: false,
  showFPS: false,
  showPeaks: false,
  showScaleX: false,
  showScaleY: false,
  gradient: "prism",

  mode: 1,
  colorMode: "bar"
});

// -----intro animation------
animate(".thumbnail", { opacity: 0 });
(async () => {
  animate(".made", { opacity: [0, 0.75] }, { duration: 0.5 });

  animate(".small", { opacity: [0, 0.75] }, { duration: 0.5 });

  animate(
    ".card",
    { filter: ["blur(1rem)", "blur(0)"], scale: [0.8, 1], opacity: [0, 1] },
    { duration: 0.3 }
  );

  await animate(
    ".logo",
    { scale: [0, 1], opacity: [0, 1] },
    { duration: 0.2, delay: 0.1 }
  );

  animate(
    ".right .on",
    { scale: [0.8, 1], opacity: [0, 1] },
    { duration: 0.2 }
  );

  animate(
    ".right .text",
    { scale: [0.8, 1], opacity: [0, 1] },
    { duration: 0.3 }
  );

  animate(
    ".right .flight",
    { scale: [0.8, 1], opacity: [0, 1] },
    { duration: 0.3 }
  );
  await animate(
    ".label",
    { scale: [0.8, 1], opacity: [0, 0.5] },
    { duration: 0.3 }
  );

  await animate(
    ".box",
    { filter: ["blur(1rem)", "blur(0)"], scale: [0.8, 1], opacity: [0, 1] },
    { duration: 0.3, delay: stagger(0.1) }
  );

  await animate(
    ".dur",
    { scale: [0, 1], z: 20, opacity: [0, 1] },
    { duration: 0.3 }
  );
  await animate(
    ".speed",
    { scale: [0.8, 1], opacity: [0, 0.5] },
    { duration: 0.3, delay: stagger(0.1) }
  );
  await animate(
    ".plane",
    { scale: [0.8, 1], opacity: [0, 0.9] },
    { duration: 0.3 }
  );

  await animate(
    ".item",
    { scale: [0.8, 1], opacity: [0, 1] },
    { duration: 0.3, delay: stagger(0.1) }
  );
})();

document.addEventListener("mousemove", (e) => {
  const tooltips = document.querySelectorAll(".info");
  tooltips.forEach((tooltip) => {
    tooltip.style.left = `${e.clientX + 20}px`;
    tooltip.style.top = `${e.clientY + 20}px`;
  });
});

hover(".box.to", () => {
  animate(
    ".info.to",
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0)"
    },
    { duration: 0.4 }
  );
  return () => {
    animate(
      ".info.to",
      {
        opacity: 0,
        scale: 0,
        filter: "blur(1rem)"
      },
      { duration: 0.4 }
    );
  };
});

hover(".box.from", () => {
  animate(
    ".info.from",
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0)"
    },
    { duration: 0.4 }
  );
  return () => {
    animate(
      ".info.from",
      {
        opacity: 0,
        scale: 0,
        filter: "blur(1rem)"
      },
      { duration: 0.4 }
    );
  };
});

window.addEventListener("DOMContentLoaded", async () => {
  const [
    THREE,
    { OrbitControls },
    { GLTFLoader },
    { DRACOLoader },
    { RGBELoader },
    { EffectComposer },
    { RenderPass },
    { ShaderPass },
    { BrightnessContrastShader }
  ] = await Promise.all([
    import("https://esm.sh/three@0.178.0"),
    import("https://esm.sh/three@0.178.0/examples/jsm/controls/OrbitControls"),
    import("https://esm.sh/three@0.178.0/examples/jsm/loaders/GLTFLoader"),
    import("https://esm.sh/three@0.178.0/examples/jsm/loaders/DRACOLoader"),
    import("https://esm.sh/three@0.178.0/examples/jsm/loaders/RGBELoader"),
    import(
      "https://esm.sh/three@0.178.0/examples/jsm/postprocessing/EffectComposer"
    ),
    import(
      "https://esm.sh/three@0.178.0/examples/jsm/postprocessing/RenderPass"
    ),
    import(
      "https://esm.sh/three@0.178.0/examples/jsm/postprocessing/ShaderPass"
    ),
    import(
      "https://esm.sh/three@0.178.0/examples/jsm/shaders/BrightnessContrastShader"
    )
  ]);

  const canvas = document.querySelector("#plane");
  const { width, height } = canvas.getBoundingClientRect();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
  camera.position.set(40, 20, 70);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableRotate = false;
  controls.autoRotate = false;

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.1);
  rimLight.position.set(-5, 5, 10);
  scene.add(rimLight, new THREE.AmbientLight(0xffffff, 0.2));

  const modelGroup = new THREE.Group();
  const baseYaw = Math.PI / 1.6;
  scene.add(modelGroup);

  hover(".card", () => {
    animate(modelGroup.scale, { x: 1.05, y: 1.05, z: 1.05 }, { duration: 0.4 });

    return () => {
      animate(modelGroup.scale, { x: 1, y: 1, z: 1 }, { duration: 0.4 });
    };
  });

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  new RGBELoader()
    .setPath("https://cdn.jsdelivr.net/gh/ouyahama/cdn@main/")
    .load("light3.hdr", (hdr) => {
      const envMap = pmrem.fromEquirectangular(hdr).texture;
      scene.environment = envMap;
      hdr.dispose();
      pmrem.dispose();
    });

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  dracoLoader.setDecoderConfig({ type: "js" });

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "https://cdn.jsdelivr.net/gh/ouyahama/cdn@main/plane.glb",
    (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const mat = child.material;
          if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
            mat.roughness = 0.4;
            mat.metalness = 0.7;
            mat.envMapIntensity = 0.9;
          }
        }
      });
      modelGroup.add(gltf.scene);
    },
    undefined,
    console.error
  );

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const brightnessContrast = new ShaderPass(BrightnessContrastShader);
  brightnessContrast.uniforms["brightness"].value = 0;
  brightnessContrast.uniforms["contrast"].value = 0;
  composer.addPass(brightnessContrast);

  const clock = new THREE.Clock();

  const renderLoop = () => {
    requestAnimationFrame(renderLoop);
    const t = clock.getElapsedTime();

    const yaw = baseYaw + Math.sin(t * 0.25) * 0.1;
    const pitch = Math.sin(t * 0.35) * 0.05;
    const roll = Math.sin(t * 0.5) * 0.07;

    modelGroup.rotation.set(pitch, yaw, roll);
    controls.update();
    composer.render();
  };
  requestAnimationFrame(() => {
    renderLoop();
  });
  animate(canvas, { opacity: [0, 1] }, { duration: 1, delay: 0.2 });
  window.addEventListener("resize", () => {
    const { width, height } = canvas.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
  });
});

let s = 290;
setInterval(() => {
  const n = Math.min(306, Math.max(278, s + (Math.random() * 6 - 3)));
  animate(s, n, {
    duration: 0.5,
    ease: "circOut",
    onUpdate: (v) =>
      (document.querySelector(".speed-value").innerHTML = Math.round(v))
  });
  s = n;
}, 500);

let alt = 5500; // altitude in meters

setInterval(() => {
  const descentRate = 4.5; // slow descent ~540 m/min
  const fluctuation = Math.random() * 6 - 3; // small noise ±3m
  const nextAlt = Math.max(0, alt - descentRate + fluctuation);

  animate(alt, nextAlt, {
    duration: 0.5,
    ease: "circOut",
    onUpdate: (v) =>
      (document.querySelector(".altitude-value").innerHTML = Math.round(v))
  });

  alt = nextAlt;
}, 500);

let pitch = 3.5; // start with mild nose-down

setInterval(() => {
  const leveling = -0.01; // subtle leveling trend
  const fluctuation = Math.random() * 0.2 - 0.1; // small noise
  const nextPitch = Math.min(5, Math.max(2, pitch + leveling + fluctuation));

  animate(pitch, nextPitch, {
    duration: 0.5,
    ease: "circOut",
    onUpdate: (v) =>
      (document.querySelector(".pitch-value").innerHTML = v.toFixed(1))
  });

  pitch = nextPitch;
}, 500);

hover(".made", () => {
  animate(
    ".made",
    { scale: 1.02, opacity: 1 },
    { type: "spring", stiffness: 200 }
  );
  return () =>
    animate(".made", { scale: 1, opacity: 0.75 }, { type: "spring" });
});

hover(".follow", () => {
  animate(
    ".follow",
    { scale: 1.02, opacity: 1 },
    { type: "spring", stiffness: 200 }
  );
  return () =>
    animate(".follow", { scale: 1, opacity: 0.75 }, { type: "spring" });
});
