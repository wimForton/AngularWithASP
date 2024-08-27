import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export class Viewport3D{
  canvasSizes = {
    width: 1,
    height: 1,
  };
  public scene = new THREE.Scene();
  public camera: THREE.PerspectiveCamera;
  private window: Window;
  public torus: THREE.Mesh
  constructor(canvasWidth: number, canvasHeight: number, window: Window) {
    this.window = window;
    this.canvasSizes.width = canvasWidth;
    this.canvasSizes.height = canvasHeight;
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvasSizes.width / this.canvasSizes.height,
      0.001,
      1000
    );
    this.camera.position.z = 30;
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color("rgb(20, 200, 200)"), wireframe: true, side: THREE.BackSide });
    const geometry = new THREE.TorusGeometry(5, 1.5, 30, 20);
    this.torus = new THREE.Mesh(
      geometry,
      material
    );

    this.scene.add(this.camera);
    this.AddSomeThreejsStuff();

  }

  AddSomeThreejsStuff = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.x = 6;
    pointLight.position.y = 2;
    pointLight.position.z = 6;
    this.scene.add(pointLight);

    this.scene.add(this.torus);
  }

}
