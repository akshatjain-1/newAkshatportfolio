import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';


const canvas = document.querySelector('.webgl')

// camera
const camera = new THREE.PerspectiveCamera(65 , innerWidth/innerHeight, 0.1 , 1000)
camera.position.set(0, 0, 600);
// camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// scene
const scene = new THREE.Scene();

const Gcube = new THREE.SphereGeometry(800, 18 ,10 );
const Mcube = new THREE.MeshBasicMaterial({wireframe:true , color: 'red'});
const cube = new THREE.Mesh(Gcube ,Mcube);
cube.position.z = 100
cube.position.y= 190
cube.position.x= -190
scene.add(cube)


let model = null
// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/o-YsnuTDrAKJXFPa/scene.splinecode',

  (splineScene) => {
    model = splineScene
    scene.add(model);
  }
);



// renderer
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
   
    // antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color('#181818');
//#181818
renderer.setClearAlpha(1);

// orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.left = window.innerWidth / - 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / - 2;
  camera.updateProjectionMatrix();
 
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.setSize(window.innerWidth, window.innerHeight);
}

const clock = new THREE.Clock()


function animate() {

  const time =  clock.getElapsedTime()


     // rotate model
  if(model){
    model.rotation.y = -time
    model.rotation.z = -time
  }
 
  cube.rotation.x = -time
  // cube.rotation.x += 0.001  * timeDiff

  controls.update();
  renderer.render(scene, camera);
}




