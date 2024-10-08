import { Slider } from "../../UiComponentData/Slider";
import { EmitFromPoint } from "./emitters/EmitFromPoint";
import { BounceForce } from "./forces/BounceForce";
import { DragForce } from "./forces/DragForce";
import { ScaleInOutForce } from "./forces/ScaleInOut";
import { TurbulenceForce } from "./forces/TurbulenceForce";
import { VectorForce } from "./forces/VectorForce";
import { Particle } from "./Particle";


export class ControlParameters {
  sliders: Array<Slider> = [];
  name: String = "";
  id: number = 0;
}

export interface ForceClass {
  name: String;
  sliders: Slider[];
  calculate(p: Particle, particleIndex: number): void;
}
export interface EmitClass {
  name: String;
  sliders: Slider[];
  emit(p: Particle, particleIndex: number): void;
}

export class FunctionWithTrigger {
  private fn: Function;
  public name = "";
  constructor(fn: Function, name: string) {
    this.fn = fn;
    this.name = name;
    console.log("FunctionWithTrigger name" + this.name);
  }
  public run() {
    this.fn();
  }
}

export class ParticleSystem {
  maxParticles: number = 0;
  Particles: Particle[] = [];
  private forceClasses: Array<ForceClass> = new Array<ForceClass>();
  private emitClasses: Array<EmitClass> = new Array<EmitClass>();

  public emittersParameters: Array<ControlParameters> = [];
  public forcesParameters: Array<ControlParameters> = [];
  public addForces: Array<FunctionWithTrigger> = [];
  public name = "";
  constructor(maxParticles: number) {
    this.maxParticles = maxParticles;
    this.initParticles();

    function addForceToArrays(this: any, force: ForceClass) {///this whole function becomes the function in FunctionWithTrigger
      const controlParameters = new ControlParameters()
      this.addForceClass(force);
      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = this.forcesParameters.length;
      this.forcesParameters.push(controlParameters);
    }

    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new VectorForce()), "Vector Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new DragForce()), "Drag Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new TurbulenceForce()), "Turbulence Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new BounceForce()), "Bounce Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new ScaleInOutForce()), "Scale In Out"));
    this.addEmitClass(new EmitFromPoint());
    for (var i = 0; i < this.GetEmitClasses().length; i++) {
      const controlParameters = new ControlParameters();
      controlParameters.name = this.GetEmitClasses()[i].name;
      controlParameters.sliders = this.GetEmitClasses()[i].sliders;
      controlParameters.id = i;
      this.emittersParameters.push(controlParameters);
    }
  }

  private initParticles() {
    for (var p = 0; p < this.maxParticles; p++) {
      let particle = new Particle();
      particle.position.z = 1000;
      particle.age = particle.maxAge + 1;
      this.Particles.push(particle);
    }
  }

  public addForceClass(forceclass: ForceClass) {
    this.forceClasses.push(forceclass);
  }

  public addEmitClass(emitClass: EmitClass) {
    this.emitClasses.push(emitClass);
  }

  public GetParticles(): Particle[] {
    return this.Particles;
  }

  public GetEmitClasses(): EmitClass[] {
    return this.emitClasses;
  }

  public GetForceClasses(): ForceClass[] {
    return this.forceClasses;
  }

  public SimulateFrame() {
    for (var p = 0; p < this.Particles.length; p++) {
      let particle = this.Particles[p];
      if (particle.age > particle.maxAge) {
        for (var e = 0; e < this.emitClasses.length; e++) {
          this.emitClasses[e].emit(particle, p)
        }
        
      }

      for (var f = 0; f < this.forceClasses.length; f++) {
        this.forceClasses[f].calculate(particle, p);
      }
      let newX = particle.position.x + particle.velocity.x;//particle.position.x + particle.velocity.x;
      let newY = particle.position.y + particle.velocity.y;
      let newZ = particle.position.z + particle.velocity.z;
      particle.position.set(newX, newY, newZ);
      particle.age++;

    }
  }
}
