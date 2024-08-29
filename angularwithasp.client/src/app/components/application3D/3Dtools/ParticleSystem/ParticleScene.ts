import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';


export class ParticleScene {
  public scene: THREE.Scene = new THREE.Scene();
  private particleSystem: ParticleSystem;
  private ThreeParticles: THREE.Object3D[] = [];
  constructor(particleSystem: ParticleSystem) {
    this.particleSystem = particleSystem;
    this.CreateSceneLights();
    this.CreateThreeObjects();
  }

  private CreateSceneLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.x = 6;
    pointLight.position.y = 2;
    pointLight.position.z = 6;
    this.scene.add(pointLight);
  }

  private CreateThreeObjects() {
    for (var p = 0; p < this.particleSystem.Particles.length; p++) {
      const material = new THREE.MeshStandardMaterial({ color: new THREE.Color("rgb(20, 200, 200)"), wireframe: false });
      const geometry = new THREE.TorusGeometry(5, 1.5, 90, 50);
      const torus = new THREE.Mesh(
        geometry,
        material
      );
      torus.scale.set(0.1, 0.1, 0.1);
      this.ThreeParticles.push(torus);
      this.scene.add(torus);

    }
  }

  public Update() {
    this.particleSystem.SimulateFrame();
    for (var p = 0; p < this.particleSystem.Particles.length; p++) {
      let particle = this.particleSystem.Particles[p];
      this.ThreeParticles[p].position.set(particle.position.x, particle.position.y, particle.position.z);
    }
  }

}
