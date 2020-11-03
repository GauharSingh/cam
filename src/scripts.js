// import * as THREE from "three/build/three.module";
import {
    Scene,
    Color,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    PointLight,
    WebGLRenderer,
} from "three.module.js";
// import Scene from 'three/Scene';
// import Color from 'three/Color';
// import PerspectiveCamera from 'three/PerspectiveCamera';
// import AmbientLight from 'three/AmbientLight';
// import DirectionalLight from 'three/DirectionalLight';
// import WebGLRenderer from 'three/WebGLRenderer';
// import PointLight from 'three/PointLight';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import GLTFLoader from 'gltf-webpack-loader';

// import gltfPath from '../3d-obj-loader/assets/scene.gltf';
// console.log("gltfPath", gltfPath);

export var scene, camera, render;
export var renderer;
const canvas = document.querySelector("#glb");

//var loader = new GLTFLoader().setPath("./3d-obj-loader/assets/");

window.addEventListener("resize", function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

async function init() {
    scene = new Scene();
    scene.background = new Color(0xdddddd);
    scene.background = null;

    camera = new PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        5000
    );
    camera.rotation.y = (45 / 180) * Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;

    // let hlight = new AmbientLight(0x404040, 100);
    // scene.add(hlight);

    // let directionalLight = new DirectionalLight(0xffffff, 100);
    // directionalLight.position.set(0, 1, 0);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);

    // let light = new PointLight(0xc4c4cc4, 10);
    // light.position.set(0, 300, 500);
    // scene.add(light);

    // let light2 = new PointLight(0xc4c4cc4, 10);
    // light.position.set(500, 100, 0);
    // scene.add(light2);

    // let light3 = new PointLight(0xc4c4cc4, 10);
    // light.position.set(0, 100, -500);
    // scene.add(light3);

    // let light4 = new PointLight(0xc4c4cc4, 10);
    // light.position.set(-5000, 300, 0);
    // scene.add(light4);

    renderer = new WebGLRenderer({ canvas, alpha: true });
    var width = window.screen.width; //1024; //640;
    var height = window.screen.height; //768; //480;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    let controls = new OrbitControls(camera, renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    let loader = new GLTFLoader();

    // loader.load("../3d-obj-loader/assets/scene.gltf", function(gltf) {
    //     let car = gltf.scene.children[0];
    //     console.log("init -> gltf", gltf);
    //     car.scale.set(0.5, 0.5, 0.5);
    //     scene.add(gltf.scene);
    //     animate();
    // });

    // loader.load("../3d-obj-loader/assets/flamingo.glb", function(gltf) {
    //     console.log("init -> gltf", gltf);

    //     let car = gltf.scene.children[0];
    //     car.scale.set(0.5, 0.5, 0.5);
    //     scene.add(gltf.scene);
    //     animate();
    // });

    async function loadBirds() {
        const loader = new GLTFLoader();

        const [parrotData, flamingoData, storkData] = await Promise.all([
            loader.loadAsync("./3d-obj-loader/assets/parrot.glb"),
            loader.loadAsync("./3d-obj-loader/assets/flamingo.glb"),
            loader.loadAsync("./3d-obj-loader/assets/stork.glb"),
        ]);

        console.log("Squaaawk!", parrotData);

        const parrot = setupModel(parrotData);
        parrot.position.set(0, 0, 10);
        const flamingo = setupModel(flamingoData);
        flamingo.position.set(0, 0, -200);
        const stork = setupModel(storkData);
        stork.position.set(100, 2, -200);

        return {
            parrot,
            flamingo,
            stork,
        };
    }

    const { parrot, flamingo, stork } = await loadBirds();
    scene.add(parrot, flamingo, stork);
    animate();

    function render() {
        renderer.render(scene, camera);
    }
}

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function setupModel(data) {
    const model = data.scene;
    return model;
}

init();