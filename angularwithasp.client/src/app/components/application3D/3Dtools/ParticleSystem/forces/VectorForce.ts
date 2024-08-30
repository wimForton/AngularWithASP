import { Slider } from "../../../UiComponentData/Slider";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../../Utils/particleUtils";
import { Vector3D } from "../../Utils/Vector3D";
import { Particle } from "../Particle";
import { EmitClass, ForceClass } from "../ParticleSystem";




export class VectorForce implements ForceClass {
  public name = "Vector Force";
  public sliders: Slider[] = [];
  private slider0 = new Slider();
  private slider1 = new Slider();
  private slider2 = new Slider();
  private slider3 = new Slider();
  constructor() {
    let precision = 0.001;

    this.slider0.label = "Force X";
    this.slider0.min = -1;
    this.slider0.max = 1;
    this.slider0.step = precision;
    this.slider0.value = 0;
    this.sliders.push(this.slider0);

    this.slider1.label = "Force Y";
    this.slider1.min = -1;
    this.slider1.max = 1;
    this.slider1.step = precision;
    this.slider1.value = -0.1;
    this.sliders.push(this.slider1);

    this.slider2.label = "Force Z";
    this.slider2.min = -1;
    this.slider2.max = 1;
    this.slider2.step = precision;
    this.slider2.value = 0;
    this.sliders.push(this.slider2);

    this.slider3.label = "Overal Scale";
    this.slider3.min = 0;
    this.slider3.max = 1;
    this.slider3.step = precision;
    this.slider3.value = 0.1;
    this.sliders.push(this.slider3);
    console.log("vectorforce added");
  }

  calculate(p: Particle, i: number): void {
    let forceVector: Vector3D = new Vector3D(this.slider0.value * this.slider3.value, this.slider1.value * this.slider3.value, this.slider2.value * this.slider3.value);
    p.velocity.addVec(forceVector);
  }
}
