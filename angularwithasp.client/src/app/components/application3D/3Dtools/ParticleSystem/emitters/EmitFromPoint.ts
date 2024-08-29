import { Slider } from "../../../UiComponentData/Slider";
import { MinMaxRandomize, MinMaxRandomizeArray } from "../../Utils/particleUtils";
import { Particle } from "../Particle";
import { EmitClass } from "../ParticleSystem";




export class EmitFromPoint implements EmitClass{
  public name = "EmitFromPoint";
  public sliders: Slider[] = [];
  constructor() {
    let slider = new Slider();
    slider.label = "strength";
    slider.min = 0;
    slider.max = 20;
    this.sliders.push(slider);
  }

  emit(p: Particle, i: number): void {
    if (MinMaxRandomize(0, 10) > 8) {

      p.position.set(0, 0, 0);//(p.position.x, p.position.y, p.position.z)
      let min = -0.01 * this.sliders[0].value;
      let max = 0.01 * this.sliders[0].value;
      let randomvelocity: number[] = MinMaxRandomizeArray([min, min, min], [max, max, max])
      p.velocity.set(randomvelocity[0], randomvelocity[1], randomvelocity[2]);
      p.age = 0;
    }
   }
}


