import { Slider } from "../../UiComponentData/Slider";
import { Particle } from "./Particle";
import { ParticleSystemData } from "./ParticleSystemData";


export class Emitter {
  sliders: Array<Slider> = [];
  name: String = "";
}

export interface ForceClass {
  name: String;
  sliders: Slider[];
  calculate(p: Particle, particleIndex: number, delta: number): void;
}
export interface EmitClass {
  name: String;
  sliders: Slider[];
  emit(p: Particle, particleIndex: number): void;
}

export class ParticleSystem {
  maxParticles: number = 0;
  Particles: Particle[] = [];
  private forceClasses: Array<ForceClass> = new Array<ForceClass>();
  private emitClasses: Array<EmitClass> = new Array<EmitClass>();
  constructor(maxParticles: number) {
    this.maxParticles = maxParticles;
    this.initParticles();
  }

  private initParticles() {
    for (var p = 0; p < this.maxParticles; p++) {
      let particle = new Particle();
      this.Particles.push(particle);
    }
  }

  public addForceClass(forceclass: ForceClass) {
    this.forceClasses.push(forceclass);
  }

  public addEmitClass(emitClass: EmitClass) {
    this.emitClasses.push(emitClass);
  }
  public GetEmitClasses(): EmitClass[] {
    return this.emitClasses;
  }

  public SimulateFrame() {
    for (var p = 0; p < this.Particles.length; p++) {
      let particle = this.Particles[p];
      if (particle.age > particle.maxAge) {
        for (var e = 0; e < this.emitClasses.length; e++) {
          this.emitClasses[e].emit(particle, p)
        }
        
      }

      //for (var p = 0; p < this.forceClasses.length; p++) {

      //}
      let newX = particle.position.x + particle.velocity.x;//particle.position.x + particle.velocity.x;
      let newY = particle.position.y + particle.velocity.y;
      let newZ = particle.position.z + particle.velocity.z;
      particle.position.set(newX, newY, newZ);
      particle.age++;

    }
  }
}
