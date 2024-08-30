import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ParticleScene } from '../ParticleSystem/ParticleScene';

export class Viewport {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private container: HTMLElement;
  private particleScene: ParticleScene;
  private containerProps = {
    x: 1,
    y: 1,
    width: 1,
    height: 1,
  };
  constructor(particleScene: ParticleScene, containerid: string) {
    this.particleScene = particleScene;
    //this.renderer = renderer;
    this.scene = this.particleScene.scene;
    //this.camera = camera;
    this.container = document.getElementById(containerid)!;
    this.containerProps.x = this.container.offsetLeft;
    this.containerProps.y = this.container.offsetTop;
    this.containerProps.width = this.container.offsetWidth;
    this.containerProps.height = this.container.offsetHeight;
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.containerProps.width / this.containerProps.height,
      0.001,
      1000
    );
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.containerProps.width, this.containerProps.height);
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(new THREE.Color("rgb(30,30,30)"), 1);
    this.renderer.setAnimationLoop(() => { this.render(); });

    this.container.appendChild(this.renderer.domElement);
    new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.containerProps.x = this.container.offsetLeft;
      this.containerProps.y = this.container.offsetTop;
      this.containerProps.width = this.container.offsetWidth;
      this.containerProps.height = this.container.offsetHeight;
      this.camera.aspect = this.containerProps.width / this.containerProps.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.containerProps.width, this.containerProps.height);
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.render(this.scene, this.camera);
    });
  }

  public render() {
    this.particleScene.Update();
    this.renderer.render(this.scene, this.camera);
  }
}
