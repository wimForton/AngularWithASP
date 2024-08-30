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
    this.scene.fog = new THREE.Fog(new THREE.Color("rgb(50, 50, 50)"), 10, 25);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    //this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.x = 6;
    pointLight.position.y = 2;
    pointLight.position.z = 6;
    //this.scene.add(pointLight);
    const distantLight = new THREE.DirectionalLight(new THREE.Color("rgb(250, 250, 250)"), 4);

    distantLight.position.x = -6;
    distantLight.position.y = 6;
    distantLight.position.z = 4;
    this.scene.add(distantLight);
    const backLight = new THREE.DirectionalLight(new THREE.Color("rgb(100, 200, 250)"), 2);

    backLight.position.x = 6;
    backLight.position.y = -6;
    backLight.position.z = -4;
    this.scene.add(backLight);
  }

  private CreateThreeObjects() {
    for (var p = 0; p < this.particleSystem.Particles.length; p++) {
      const material = new THREE.MeshStandardMaterial({ color: new THREE.Color("rgb(20, 200, 200)"), wireframe: false });
      //const geometry = new THREE.TorusGeometry(1, 0.3, 90, 50);
      const geometry = new THREE.SphereGeometry(1, 20, 10);
      const sphere = new THREE.Mesh(
        geometry,
        material
      );
      //torus.scale.set(1, 1, 1);
      this.ThreeParticles.push(sphere);
      this.scene.add(sphere);

    }
  }

  public Update() {
    this.particleSystem.SimulateFrame();
    for (var p = 0; p < this.particleSystem.Particles.length; p++) {
      let particle = this.particleSystem.Particles[p];
      this.ThreeParticles[p].scale.set(particle.scale.x, particle.scale.y, particle.scale.z);
      this.ThreeParticles[p].position.set(particle.position.x, particle.position.y, particle.position.z);
    }
  }

}
