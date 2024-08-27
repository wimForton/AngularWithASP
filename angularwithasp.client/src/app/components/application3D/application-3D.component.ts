import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Viewport3D } from "./3Dtools/Viewport3D/Viewport3D";
import { ViewportNodal } from "./3Dtools/ViewportNodal/ViewportNodal"
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { WindowProperties } from './3Dtools/Utils/WindowProperties';

@Component({
    selector: 'app-application-3D',
    templateUrl: './application-3D.component.html',
  styleUrl: './application-3D.component.css',
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
export class Application3DComponent implements OnInit {

  containerAProps = {
    x: 1,
    y: 1,
    width: 1,
    height: 1,
  };

  //disabled = false;
  max = 100;
  min = -100;
  //showTicks = false;
  step = 0.01;
  thumbLabel = true;
  value: number = 0;

  onInputChange(event: Event) {
    this.value = +((event.target as HTMLInputElement).value);// + = string to number
  }

  ngOnInit(): void {
    this.createThreeJsBox();
    
  }

  createThreeJsBox(): void {
    let containerTop: Element;
    let containerA;
    let containerB;
    let rendererA: THREE.WebGLRenderer;
    let rendererB: THREE.WebGLRenderer;



    let aspectB;

    //let group: any;
    const pointer = new THREE.Vector2(), raycaster = new THREE.Raycaster();
    let INTERSECTED: any;

    containerTop = document.querySelector('.containerTop')!;
    containerA = document.getElementById("contA");
    containerB = document.getElementById("contB");

    console.log("containerA width" + containerA?.offsetWidth);
    console.log("containerA top" + containerA?.offsetTop);
    console.log("containerB left" + containerB?.offsetLeft);




    let containerAProps: WindowProperties = new WindowProperties();
    containerAProps.x = containerA?.offsetLeft!;
    containerAProps.y = containerA?.offsetTop!;
    containerAProps.width = containerA?.offsetWidth!;
    containerAProps.height = containerA?.offsetHeight!;

    let containerBProps: WindowProperties = new WindowProperties();
    containerBProps.x = containerB?.offsetLeft!;
    containerBProps.y = containerB?.offsetTop!;
    containerBProps.width = containerB?.offsetWidth!;
    containerBProps.height = containerB?.offsetHeight!;

    var widthB = containerB!.clientWidth;
    var heightB = containerB!.clientHeight;
    if (widthB > 2 * heightB) {

      widthB = 2 * heightB;

    } else {

      heightB = widthB / 2;

    }

    aspectB = widthB / heightB;
    //const viewport3D = new Viewport3D(viewport3DSize.width * 1.4, viewport3DSize.height, window);
    const viewport3D = new Viewport3D(containerAProps.width, containerAProps.height, window);
    const viewportNodal = new ViewportNodal(containerBProps.width, containerBProps.height, window);
    // renderer 
    rendererA = new THREE.WebGLRenderer({ antialias: true });
    rendererA.setSize(containerAProps.width, containerAProps.height);
    rendererA.setPixelRatio(window.devicePixelRatio)
    rendererA.setClearColor(new THREE.Color("rgb(230,230,230)"), 1);
    containerA!.appendChild(rendererA.domElement);
    new OrbitControls(viewport3D.camera, rendererA.domElement);

    rendererB = new THREE.WebGLRenderer({ antialias: true });
    rendererB.setSize(containerBProps.width, containerBProps.height);
    rendererB.setPixelRatio(window.devicePixelRatio);
    rendererB.setClearColor(new THREE.Color("rgb(30,30,230)"), 1);
    containerB!.appendChild(rendererB.domElement);
    const controls = new OrbitControls(viewportNodal.camera, rendererB.domElement);
    controls.enableRotate = false;



    //controls.addEventListener('change', () => { rendererB.render(viewportNodal.scene, viewportNodal.camera) });
    window.addEventListener('resize', () => {
      //containerA = document.getElementById("contA");
      containerAProps.x = containerA?.offsetLeft!;
      containerAProps.y = containerA?.offsetTop!;
      containerAProps.width = containerA?.offsetWidth!;
      containerAProps.height = containerA?.offsetHeight!;
      viewport3D.camera.aspect = containerAProps.width / containerAProps.height;
      viewport3D.camera.updateProjectionMatrix();
      rendererA.setSize(containerAProps.width, containerAProps.height);
      rendererA.setPixelRatio(window.devicePixelRatio)
      rendererA.render(viewport3D.scene, viewport3D.camera);

      containerBProps.x = containerB?.offsetLeft!;
      containerBProps.y = containerB?.offsetTop!;
      containerBProps.width = containerB?.offsetWidth!;
      containerBProps.height = containerB?.offsetHeight!;
      const aspect = containerBProps.width / containerBProps.height;
      const frustumSize = 20;
      
      viewportNodal.camera.left = - frustumSize * aspect / 2;
      viewportNodal.camera.right = frustumSize * aspect / 2;
      viewportNodal.camera.top = frustumSize / 2;
      viewportNodal.camera.bottom = - frustumSize / 2;
      viewportNodal.camera.updateProjectionMatrix();
      rendererB.setSize(containerBProps.width, containerBProps.height);
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
