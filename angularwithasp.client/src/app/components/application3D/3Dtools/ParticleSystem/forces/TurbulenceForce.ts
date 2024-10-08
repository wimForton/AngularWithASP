import { Slider } from "../../../UiComponentData/Slider";
import { noise } from "../../Utils/noise";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../../Utils/particleUtils";
import { Vector3D } from "../../Utils/Vector3D";
import { Particle } from "../Particle";
import { EmitClass, ForceClass } from "../ParticleSystem";




export class TurbulenceForce implements ForceClass {

  public name = "Turbulence Force";
  public sliders: Slider[] = [];
  private slider0 = new Slider();
  private slider1 = new Slider();
  private slider2 = new Slider();
  private slider3 = new Slider();
  private slider4 = new Slider();
  private noiseX?: noise;
  private noiseY?: noise;
  private noiseZ?: noise;
  private offsetMove = 0;
  constructor() {
    let precision = 0.001;

    this.noiseX = new noise(20);
    this.noiseY = new noise(20);
    this.noiseZ = new noise(20);


    this.slider0.label = "Force X";
    this.slider0.min = 0;
    this.slider0.max = 1;
    this.slider0.step = precision;
    this.slider0.value = 0.5;
    this.sliders.push(this.slider0);

    this.slider1.label = "Force Y";
    this.slider1.min = 0;
    this.slider1.max = 1;
    this.slider1.step = precision;
    this.slider1.value = 0.5;
    this.sliders.push(this.slider1);

    this.slider2.label = "Force Z";
    this.slider2.min = 0;
    this.slider2.max = 1;
    this.slider2.step = precision;
    this.slider2.value = 0.5;
    this.sliders.push(this.slider2);

    this.slider3.label = "Force Scale";
    this.slider3.min = 0;
    this.slider3.max = 1;
    this.slider3.step = precision;
    this.slider3.value = 0.1;
    this.sliders.push(this.slider3);

    this.slider4.label = "Turb Density";
    this.slider4.min = 0;
    this.slider4.max = 1;
    this.slider4.step = precision;
    this.slider4.value = 0.1;
    this.sliders.push(this.slider4);
    console.log("TurbulenceForce created");
  }

  calculate(p: Particle, i: number): void {
    let lutPos = new Vector3D(p.position.x, p.position.y, p.position.z);
    lutPos.multNumber(this.slider4.value);
    this.offsetMove += 0.0001;
    lutPos.addVec(new Vector3D(0, this.offsetMove, 0));
    let nx = (this.noiseX!.noise(lutPos.x + 1, lutPos.y, lutPos.z) - 0.5) * this.slider0.value * this.slider3.value;
    let ny = (this.noiseY!.noise(lutPos.x + 0.5, lutPos.y, lutPos.z) - 0.5) * this.slider1.value * this.slider3.value;
    let nz = (this.noiseZ!.noise(lutPos.x + 1, lutPos.y, lutPos.z) - 0.5) * this.slider2.value * this.slider3.value;

    p.velocity.addVec(new Vector3D(nx, ny, nz));
  }
}
