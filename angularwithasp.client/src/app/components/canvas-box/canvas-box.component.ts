import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'dat.gui';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.css'
})
export class CanvasBoxComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');

    const scene = new THREE.Scene();

    const material = new THREE.MeshMatcapMaterial({ color: new THREE.Color("rgb(20, 20, 200)") });/// = new THREE.MeshToonMaterial();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    

    const pointLight = new THREE.PointLight(0xffffff, 5);
    pointLight.position.x = 6;
    pointLight.position.y = 2;
    pointLight.position.z = 6;
    scene.add(pointLight);
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      material
    );

    const geometry = new THREE.TorusGeometry(5, 1.5, 30, 20);

    const torus = new THREE.Mesh(
      geometry,
      material
    );

    scene.add(torus, box);

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: new THREE.Color("rgb(255, 200, 0)") }));
    torus.add(line);

    const canvasSizes = {
      width: window.innerWidth * 0.97,
      height: window.innerHeight * 0.7,
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    );
    camera.position.z = 30;
    scene.add(camera);


    const stats = new Stats()
    document.body.appendChild(stats.dom)

    const gui = new GUI()

    const cubeFolder = gui.addFolder('Cube')
    cubeFolder.add(torus.rotation, 'x', 0, Math.PI * 2, 0.01)
    cubeFolder.add(torus.rotation, 'y', 0, Math.PI * 2, 0.01)
    //cubeFolder.add(torus.rotation, 'z', 0, Math.PI * 2)
    cubeFolder.add(torus.rotation, 'z', 0, Math.PI * 2,0.01)
    cubeFolder.open()

    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera.position, 'z', 0, 20)
    cameraFolder.open()

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    renderer.setClearColor(new THREE.Color("rgb(230,230,230)"), 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth * 0.95;
      canvasSizes.height = window.innerHeight * 0.7;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });
    const clock = new THREE.Clock();

    const animateGeometry = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update animation objects
      box.rotation.x = elapsedTime * 2;
      box.rotation.y = elapsedTime;
      box.rotation.z = elapsedTime;

      //torus.rotation.x = -elapsedTime;
      //torus.rotation.y = -elapsedTime;
      //torus.rotation.z = -elapsedTime;
      stats.update();
      // Render
      renderer.render(scene, camera);

      // Call animateGeometry again on the next frame
      window.requestAnimationFrame(animateGeometry);
    };

    animateGeometry();
  }
}
