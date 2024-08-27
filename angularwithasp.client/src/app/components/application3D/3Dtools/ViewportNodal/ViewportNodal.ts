import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

export class ViewportNodal{
  canvasSizes = {
    width: 1,
    height: 1,
  };
  public scene = new THREE.Scene();
  public camera: THREE.OrthographicCamera;
  private window: Window;
  public objects: Array<THREE.Object3D> = new Array<THREE.Object3D>();
  private dragcontrols!: DragControls;
  public group!: THREE.Group;
  constructor(canvasWidth: number, canvasHeight: number, window: Window) {
    this.window = window;
    this.canvasSizes.width = canvasWidth;
    this.canvasSizes.height = canvasHeight;
    const aspect = this.canvasSizes.width / this.canvasSizes.height;
    const frustumSize = 20;
    this.camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);

    this.camera.position.set(0, 0, 2);

    this.scene.add(this.camera);
    this.AddSomeThreejsStuff();

  }

  AddSomeThreejsStuff = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    this.group = new THREE.Group();
    this.scene.add(this.group);
    const geometry = new THREE.BoxGeometry();
    for (let i = 0; i < 200; i++) {

      const object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

      object.position.x = Math.random() * 30 - 15;
      object.position.y = Math.random() * 15 - 7.5;
      object.position.z = Math.random() * 20 - 10;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.x = Math.random() * 2 + 1;
      object.scale.y = Math.random() * 2 + 1;
      object.scale.z = Math.random() * 2 + 1;

      object.castShadow = true;
      object.receiveShadow = true;

      this.scene.add(object);

      this.objects.push(object);

    }

  }

}
