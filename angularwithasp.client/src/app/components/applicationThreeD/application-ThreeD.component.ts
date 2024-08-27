import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Viewport3D } from "./3Dtools/Viewport3D/Viewport3D";
import { ViewportNodal } from "./3Dtools/ViewportNodal/ViewportNodal"
import { DragControls } from 'three/addons/controls/DragControls.js';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-application-ThreeD',
    templateUrl: './application-ThreeD.component.html',
  styleUrl: './application-ThreeD.component.css',
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
    standalone: true,
})
export class ApplicationThreeDComponent implements OnInit {

  formatLabel(value: number): string {
    if (value >= 1000) {
      return String(value);// Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value: number = 0;

  onInputChange(event: Event) {
    console.log("This is emitted as the thumb slides");
    console.log((event.target as HTMLInputElement).value);
    this.value = +((event.target as HTMLInputElement).value);
  }
  ngOnInit(): void {
    this.createThreeJsBox();
    
  }

  createThreeJsBox(): void {
    var containerTop;
    var containerA;
    var containerB;
    var rendererA: THREE.WebGLRenderer;
    var rendererB: THREE.WebGLRenderer;



    var aspectB;

    //let group: any;
    const pointer = new THREE.Vector2(), raycaster = new THREE.Raycaster();
    let INTERSECTED: any;

    containerTop = document.querySelector('.containerTop');
    //containerA = document.querySelector('.containerA');
    containerA = document.getElementById("contA");
    //containerB = document.querySelector('.containerB');
    containerB = document.getElementById("contB");

    console.log("containerA width" + containerA?.offsetWidth);
    console.log("containerB left" + containerB?.offsetLeft);


    const canvas = document.getElementById('application-ThreeD');
    const viewport3DSize = {
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.7,
    };
    const viewportNodesSize = {
      width: window.innerWidth * 0.3,
      height: window.innerHeight * 0.3,
    };

    var widthB = containerB!.clientWidth;
    var heightB = containerB!.clientHeight;
    if (widthB > 2 * heightB) {

      widthB = 2 * heightB;

    } else {

      heightB = widthB / 2;

    }

    aspectB = widthB / heightB;

    const viewport3D = new Viewport3D(viewport3DSize.width * 1.4, viewport3DSize.height, window);
    const viewportNodal = new ViewportNodal(viewport3DSize.width * 0.6, viewport3DSize.height, window);
    // renderer 
    rendererA = new THREE.WebGLRenderer({ antialias: true });
    rendererA.setSize(containerA!.clientWidth * 0.7, containerA!.clientHeight * 0.5);
    //rendererA.domElement.style.position = 'absolute';
    //rendererA.domElement.style.left = String(containerA!.clientWidth * 0.5) + "px";
    rendererA.setPixelRatio(window.devicePixelRatio)
    rendererA.setClearColor(new THREE.Color("rgb(230,230,230)"), 1);
    containerA!.appendChild(rendererA.domElement);
    new OrbitControls(viewport3D.camera, rendererA.domElement);

    rendererB = new THREE.WebGLRenderer({ antialias: true });
    rendererB.setSize(containerB!.clientWidth * 0.3, containerB!.clientHeight * 0.5);
    rendererB.domElement.style.position = 'absolute';
    //rendererB.domElement.style.left = String(containerB!.clientWidth * 0.5) + "px";
    //rendererB.setViewport(0, 0, containerB!.clientWidth * 0.5, containerB!.clientHeight * 0.5);
    rendererB.setPixelRatio(window.devicePixelRatio);
    rendererB.setClearColor(new THREE.Color("rgb(30,30,230)"), 1);
    containerB!.appendChild(rendererB.domElement);
    const controls = new OrbitControls(viewportNodal.camera, rendererB.domElement);
    controls.enableRotate = false;



    //controls.addEventListener('change', () => { rendererB.render(viewportNodal.scene, viewportNodal.camera) });
    window.addEventListener('resize', () => {

      viewport3D.camera.aspect = window.innerWidth * 1.4 / window.innerHeight;
      viewport3D.camera.updateProjectionMatrix();

      const aspect = window.innerWidth * 0.6 / window.innerHeight;
      const frustumSize = 20;
      
      viewportNodal.camera.left = - frustumSize * aspect / 2;
      viewportNodal.camera.right = frustumSize * aspect / 2;
      viewportNodal.camera.top = frustumSize / 2;
      viewportNodal.camera.bottom = - frustumSize / 2;
      viewportNodal.camera.updateProjectionMatrix();

      rendererA.setSize(containerA!.clientWidth * 0.7, containerA!.clientHeight * 0.5);
      rendererA.setPixelRatio(window.devicePixelRatio)
      //rendererA.domElement.style.left = String(containerA!.clientWidth * 0.5) + "px";
      rendererA.render(viewport3D.scene, viewport3D.camera);

      rendererB.setSize(containerB!.clientWidth * 0.3, containerB!.clientHeight * 0.5);
      //rendererB.domElement.style.left = String(containerB!.clientWidth * 0.5) + "px";
      rendererB.setPixelRatio(window.devicePixelRatio);
      rendererB.render(viewportNodal.scene, viewportNodal.camera);
    });
    containerB!.addEventListener('mousemove', onPointerMove);
    function onPointerMove(event: any) {

      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = - (event.clientY / window.innerHeight);
      console.log("pointer X" + ((event.clientX / window.innerWidth) * 1));
      console.log("pointer Y" + (event.clientY / window.innerHeight));
    }

    rendererB.setAnimationLoop(() => { render(this.value / 10); });

    function render(value: number) {

      rendererA.render(viewport3D.scene, viewport3D.camera);
      rendererB.render(viewportNodal.scene, viewportNodal.camera);
      viewport3D.torus.setRotationFromEuler(new THREE.Euler(0, value,0))
      raycaster.setFromCamera(pointer, viewportNodal.camera);

      const intersects = raycaster.intersectObjects(viewportNodal.scene.children, false);

      if (intersects.length > 0) {
        //console.log("intersect");
        if (INTERSECTED != intersects[0].object) {

          if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

          INTERSECTED = intersects[0].object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.emissive.setHex(0xff0000);

        }

      } else {
        //console.log("intersect else");
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

      }
      //controls.update();

    }







  }
}
