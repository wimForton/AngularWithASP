import { Slider } from "../../../UiComponentData/Slider";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../../Utils/particleUtils";
import { Vector3D } from "../../Utils/Vector3D";
import { Particle } from "../Particle";
import { IForceClass } from "./IForceClass";




export class BounceForce implements IForceClass {
  public name = "Bounce Force";
  public sliders: Slider[] = [];
  private slider0 = new Slider();
  private slider1 = new Slider();
  private slider2 = new Slider();

  constructor() {
    let precision = 0.001;

    this.slider0.label = "Floor Level";
    this.slider0.min = -10;
    this.slider0.max = 10;
    this.slider0.step = precision;
    this.slider0.value = -5;
    this.sliders.push(this.slider0);

    this.slider1.label = "Roughness X";
    this.slider1.min = 0;
    this.slider1.max = 1;
    this.slider1.step = precision;
    this.slider1.value = 0;
    this.sliders.push(this.slider1);

    this.slider2.label = "Roughness Z";
    this.slider2.min = 0;
    this.slider2.max = 1;
    this.slider2.step = precision;
    this.slider2.value = 0;
    this.sliders.push(this.slider2);
    console.log("BounceForce created");
  }

  calculate(p: Particle, i: number): void {
    if (p.position.y < this.slider0.value) {
      let randomVecX = MinMaxRandomize(this.slider1.value * -1, this.slider1.value);
      let randomVecY = MinMaxRandomize(this.slider2.value * -1, this.slider2.value);
      p.velocity.addVec(new Vector3D(randomVecX, 0, randomVecY));
      p.velocity.multVec(new Vector3D(1, -1, 1));
      p.position.set(p.position.x, this.slider0.value + 0.001, p.position.z);
    }

  }
}
