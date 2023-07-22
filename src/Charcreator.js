/*Character creator file.*/
import * as THREE from 'three'
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js"

const loader = new GLTFLoader();
const scene = new THREE.Scene()
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
})
const sizes = {
    width: window.innerWidth / 1.8,
    height: window.innerHeight / 1.8
}

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(12, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)


const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);


//Update function.
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth / 1.8
    sizes.height = window.innerHeight / 1.8

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})
//GLTF models loader.
loader.load('../asset/Goku2.gltf',
    function (gltf) {
        const sword = gltf.scene;  // sword 3D object is loaded
        sword.scale.set(2, 2, 2);
        sword.position.y = -2;
        scene.add(sword);
    }
);
const loop = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()