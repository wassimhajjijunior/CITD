import "../css/footer.css";
import * as THREE from "three";
// import {
//   MapControls,
//   OrbitControls,
// } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
// import vShader from "./shaders/vertex.vs";
// import fShader from "./shaders/fragment.fs";
//GLTFLoader
const gltfLoader = new GLTFLoader();
//DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("public/draco/");
gltfLoader.setDRACOLoader(dracoLoader);
//Scene
const scene = new THREE.Scene();

//Resizing
window.addEventListener("resize", () => {
    //Update Size
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    //New Aspect Ratio
    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    //New RendererSize
    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const firstModelColor1 = "#fe80b6";
const firstModelColor2 = "#fe80b6";
//Loading models
gltfLoader.load("public/models/logoTrial2.glb", (glb) => {
    const samplerMesh = new MeshSurfaceSampler(
        glb.scene.children[0].children[0]
    ).build();
    const particlesNumber = 10000;
    const particlesGeo = new THREE.BufferGeometry();
    const particlesArray = new Float32Array(particlesNumber * 3);
    const initParticlesArray = new Float32Array(particlesNumber * 3);
    for (let i = 0; i < particlesNumber; i++) {
        const particlePosition = new THREE.Vector3();
        samplerMesh.sample(particlePosition);
        particlesArray.set(
            [particlePosition.x, particlePosition.y, particlePosition.z],
            i * 3
        );
        initParticlesArray.set(
            [
                15000 - Math.random() * 100000,
                15000 - Math.random() * 100000,
                15000 - Math.random() * 100000,
            ],
            i * 3
        );
        particlesGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(particlesArray, 3)
        );
        particlesGeo.setAttribute(
            "initposition",
            new THREE.BufferAttribute(initParticlesArray, 3)
        );
    }

    const materialPoints = new THREE.RawShaderMaterial({
        vertexShader: `uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    uniform float u_progress;
    //uniform float u_scale;
    attribute vec3 position;
    varying vec3 v_positon;
    attribute vec3 initposition;    
    void main() {
       vec3 copy_position=position;
    
       copy_position=initposition+((position-initposition)*u_progress);
    
       vec4 modelPosition = modelMatrix * vec4(copy_position,1.0);
       vec4 viewPosition = viewMatrix * modelPosition;
       vec4 projectionPosition = projectionMatrix * viewPosition;
    
       gl_Position = projectionPosition;
       gl_PointSize=1.75;
       v_positon=position;
    }
    `,
        fragmentShader: `precision mediump float;
    uniform vec3 u_color_1;
    uniform vec3 u_color_2;
    varying vec3 v_positon;
    void main() {
        vec3 mix_colors=mix(u_color_1,u_color_2,v_positon.z);
        gl_FragColor = vec4(mix_colors,1.0);
    }`,
        uniforms: {
            u_color_1: { value: new THREE.Color(`${firstModelColor1}`) },
            u_color_2: { value: new THREE.Color(`${firstModelColor2}`) },
            //u_scale: { value: 0 },
            u_progress: { value: 0 },
        },
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    glb.scene.children[0] = new THREE.Points(particlesGeo, materialPoints);
    //gsap
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
        glb.scene.children[0].material.uniforms.u_progress,
        { value: 0 },
        {
            value: 1,
            duration: 3.5, //3.5
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".draw3",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        }
    );
    const bounceAnimation = () => {
        gsap.to(glb.scene.children[0].position, {
            y: "+=0.02",
            duration: 2.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
        });
    };
    glb.scene.children[0].scale.set(0.003, 0.003, 0.003);
    scene.add(glb.scene);
    glb.scene.children[0].position.y = -0.4;
    glb.scene.children[0].position.x = -0.31;
    bounceAnimation();
});
// ADDING PARTICLES
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 500;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
    // posArray[i] = Math.random() - 0.5
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}
particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
);
// Materials
// const cursor = {
//   curX: 0,
//   curY: 0,
// };
// window.addEventListener("mousemove", function (e) {
//   cursor.curX = e.clientX / window.innerWidth;
//   cursor.curY = e.clientY / window.innerHeight;
// });
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    // color: 0x5B1D76
    color: 0x5b1b76,
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particlesMesh);

//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
    30,
    aspect.width / aspect.height,
    0.01,
    100
);
camera.position.z = 3;

scene.add(camera);
//Renderer
const canvas = document.querySelector(".draw3");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(aspect.width, aspect.height);

// OrbitControls;
// const orbitControls = new OrbitControls(camera, canvas);
// orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();
let mouseX = 0;
let mouseY = 0;

// // .forEach((el, index) => {
// //   index % 2 === 0 ? el + cursor.curY : el + cursor.curX;
// // });

const animate = () => {
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime();
    particlesMesh.rotation.y = -0.1 * elapsedTime;

    if (mouseX > 0) {
        particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00005);
        particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00005);
    }

    // newPositions.forEach((el) => el * elapsedTime);
    //Update Controls
    //orbitControls.update();

    //Renderer
    renderer.render(scene, camera);

    //RequestAnimationFrame
    window.requestAnimationFrame(animate);
};
animate();

const footerContainer = document.getElementsByClassName(
    "footer-full_container"
)[0];
// console.log(footerContainer);

gsap.from(footerContainer, {
    // yPercent:130,
    opacity: 0,
    // stagger: 0.05,
    ease: "back.out",
    duration: 9,

    scrollTrigger: {
        trigger: ".footer-full_container",
        start: "top top",
        end: "200% top",
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
    },
});
// if (window.innerWidth < 900) {
//   gsap.fromTo(
//     ".second_card",
//     { opacity: 1, visibility: "visible" },
//     { opacity: 0, visibility: "hidden" }
//   );
//   gsap.fromTo(
//     ".first_card",
//     { opacity: 0, visibility: "hidden" },
//     { opacity: 1, visibility: "visible" }
//   );
// }
