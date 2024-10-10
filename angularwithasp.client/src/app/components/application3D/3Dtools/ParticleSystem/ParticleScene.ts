import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';


export class ParticleScene {
  public scene: THREE.Scene = new THREE.Scene();
  private particleSystem: ParticleSystem;
  private ThreeParticles: THREE.Object3D[] = [];
  //private vertices: Float32Array = new Float32Array();
  private vertices: Array<number> = [];
  private sizes: Array<number> = [];
  private threeSpriteParticles: THREE.Points = new THREE.Points();
  private threeSprites: Array<THREE.Sprite> = [];
  private spritegeometry = new THREE.BufferGeometry();
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
    //const spritegeometry = new THREE.BufferGeometry();

    const textureLoader = new THREE.TextureLoader();
    //const assignSRGB = (texture: { colorSpace: string; }) => {texture.colorSpace = THREE.SRGBColorSpace;};
    //const sprite = textureLoader.load('textures/sprites/snowflake1.png', assignSRGB);
    const sprite = textureLoader.load('textures/snowflake2.png');
    sprite.colorSpace = THREE.SRGBColorSpace;
    const size = 5;
    const color = [0.3, 0.8, 0.5];
    const material = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true });
    material.color.setHSL(color[0], color[1], color[2], THREE.SRGBColorSpace);
    const spriteMaterial = new THREE.SpriteMaterial({ map: sprite, blending: THREE.AdditiveBlending, transparent: true, color: 0xffffff, fog: true });
    spriteMaterial.color.setHSL(color[0], color[1], color[2], THREE.SRGBColorSpace);


    for (var p = 0; p < this.particleSystem.Particles.length; p++) {
      this.vertices.push(0, 0, 0);
      this.sizes.push(0.1);

      const sprite = new THREE.Sprite(spriteMaterial);
      this.scene.add(sprite);
      this.threeSprites.push(sprite);
    }
    this.spritegeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
    this.spritegeometry.setAttribute('size', new THREE.Float32BufferAttribute(this.sizes, 1));
    this.threeSpriteParticles = new THREE.Points(this.spritegeometry, material);
    //this.scene.add(this.threeSpriteParticles);
    //this.scene.add(this.threeSprites);

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
      //this.scene.add(sphere);

    }
  }

  public Update() {
    this.particleSystem.SimulateFrame();
    for (var p = 0; p < this.particleSystem.Particles.length; p++) {



      let particle = this.particleSystem.Particles[p];
      this.ThreeParticles[p].scale.set(particle.scale.x, particle.scale.y, particle.scale.z);
      this.ThreeParticles[p].position.set(particle.position.x, particle.position.y, particle.position.z);

      const vectorIndexStart = p * 3;

      this.vertices[vectorIndexStart] = particle.position.x;
      this.vertices[vectorIndexStart + 1] = particle.position.y;
      this.vertices[vectorIndexStart + 2] = particle.position.z;
      this.sizes[p] = particle.scale.x;
      this.spritegeometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
      this.spritegeometry.setAttribute('size', new THREE.Float32BufferAttribute(this.sizes, 1));
      //this.spritegeometry.attributes.position.needsUpdate = true;
      this.threeSprites[p].position.set(particle.position.x, particle.position.y, particle.position.z);
      this.threeSprites[p].scale.set(particle.scale.x, particle.scale.y, particle.scale.z);
    }
  }

}
