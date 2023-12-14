import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import * as THREE from 'three';

//Always 3 objects required
//1. Scene
//2. Camera
//3. Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
/*
const camera = new THREE.PerspectiveCamera(
  75,// field of view
  window.innerWidth/window.innerHeight, // aspect ratio (dependent from the user's window)
  0,1, // view frustum parameter
  1000 // view frustum parameter
);
*/
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); //move it along the z-Axis
camera.position.setX(-3);


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

//Light

const pointLigth = new THREE.PointLight(0xffffff);
pointLigth.position.set(0,0,12);

//Ambient light
const ambientLigth = new THREE.AmbientLight(0xffffff);

//light helper to watch position of the pointLight
const ligthHelper = new THREE.PointLightHelper(pointLigth)

//Grid helper
const gridHelper = new THREE.GridHelper(200,5)

//adding mouse controls 
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLigth, ambientLigth, ligthHelper, gridHelper)

//Adding stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update()

  renderer.render(scene, camera);
}

animate()



