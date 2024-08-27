import * as THREE from 'three';

export class TestScene {
  private scene: THREE.Scene = new THREE.Scene();
  constructor() {
    this.CreateScene();
  }
  CreateScene() {

    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color("rgb(20, 200, 200)"), wireframe: false });
    const geometry = new THREE.TorusGeometry(5, 1.5, 90, 50);
    const torus = new THREE.Mesh(
      geometry,
      material
    );
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.x = 6;
    pointLight.position.y = 2;
    pointLight.position.z = 6;
    this.scene.add(pointLight);

    this.scene.add(torus);
  }
  public GetScene(): THREE.Scene {
    return this.scene;
  }
}
