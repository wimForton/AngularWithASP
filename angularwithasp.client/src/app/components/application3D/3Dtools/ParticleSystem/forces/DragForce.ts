import { Slider } from "../../../UiComponentData/Slider";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../../Utils/particleUtils";
import { Vector3D } from "../../Utils/Vector3D";
import { Particle } from "../Particle";
import { EmitClass, ForceClass } from "../ParticleSystem";




export class DragForce implements ForceClass {
  public name = "Drag Force";
  public sliders: Slider[] = [];
  private slider0 = new Slider();
  private slider1 = new Slider();

  constructor() {
    let precision = 0.001;

    this.slider0.label = "strength";
    this.slider0.min = 0;
    this.slider0.max = 1;
    this.slider0.step = precision;
    this.slider0.value = 0.2;
    this.sliders.push(this.slider0);

    this.slider1.label = "Overal Scale";
    this.slider1.min = 0;
    this.slider1.max = 1;
    this.slider1.step = precision;
    this.slider1.value = 0.1;
    this.sliders.push(this.slider1);
    

  }

  calculate(p: Particle, i: number): void {
    let scaleBy = 1 - this.slider0.value * this.slider1.value;

    p.velocity.multNumber(scaleBy);
  }
}