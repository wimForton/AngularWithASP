import { Slider } from "../../../UiComponentData/Slider";
import { lerpVector3D } from "../../Utils/particleUtils";
import { Vector3D } from "../../Utils/Vector3D";
import { Particle } from "../Particle";
import { IForceClass } from "./IForceClass";




export class ScaleInOutForce implements IForceClass {
  public name = "Scale In Out Force";
  public sliders: Slider[] = [];
  private slider0 = new Slider();
  private slider1 = new Slider();
  private slider2 = new Slider();
  private slider3 = new Slider();

  constructor() {
    let precision = 0.001;

    this.slider0.label = "Ease In End";
    this.slider0.min = 0;
    this.slider0.max = 1;
    this.slider0.step = precision;
    this.slider0.value = 0.05;
    this.sliders.push(this.slider0);

    this.slider1.label = "Ease Out Start";
    this.slider1.min = 0;
    this.slider1.max = 1;
    this.slider1.step = precision;
    this.slider1.value = 0.8;
    this.sliders.push(this.slider1);

    this.slider2.label = "Startscale";
    this.slider2.min = 0;
    this.slider2.max = 1;
    this.slider2.step = precision;
    this.slider2.value = 0;
    this.sliders.push(this.slider2);

    this.slider3.label = "Endscale";
    this.slider3.min = 0;
    this.slider3.max = 1;
    this.slider3.step = precision;
    this.slider3.value = 0;
    this.sliders.push(this.slider3);
    console.log("ScaleInOutForce created");
  }

  calculate(p: Particle, i: number): void {
    if (p.maxAge != 0 && this.slider0.value != 0 && this.slider1.value != 1) {
      let ageNormalized = p.age / p.maxAge;
      let EaseInWeight = Math.min((ageNormalized / this.slider0.value), 1);
      let EaseInFrom = new Vector3D(1, 1, 1);
      EaseInFrom.multNumber(this.slider2.value)
      let easeInScale = lerpVector3D(EaseInFrom, p.startscale, EaseInWeight);

      let EaseOutTo = new Vector3D(1, 1, 1);
      EaseOutTo.multNumber(this.slider3.value);
      let EaseOutWeight = Math.max((ageNormalized - this.slider1.value), 0) / (1 - this.slider1.value);
      let easeInOutScale = lerpVector3D(easeInScale , EaseOutTo, EaseOutWeight);

      p.scale = easeInOutScale;
    }
    //   (startsc = 0.4)   tussen 0 en 0.4                             0.4
    //  Math.max((ageNormalized - this.slider1.value), 0) / (1 - this.slider1.value))   = tussen 0 en 1
  }
}
