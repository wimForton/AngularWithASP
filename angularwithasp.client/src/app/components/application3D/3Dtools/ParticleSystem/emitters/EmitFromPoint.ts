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
    slider.value = 10;
    this.sliders.push(slider);
    let slider1 = new Slider();
    slider1.label = "amount";
    slider1.min = 0;
    slider1.max = 1;
    slider1.value = 0.5;
    this.sliders.push(slider1);
    let slider2 = new Slider();
    slider2.label = "lifespan";
    slider2.min = 0;
    slider2.max = 50;
    slider2.value = 25;
    this.sliders.push(slider2);
  }

  emit(p: Particle, i: number): void {
    p.position.z = 1000;
    if (MinMaxRandomize(0, 20) < this.sliders[1].value) {

      p.position.set(0, 0, 0);//(p.position.x, p.position.y, p.position.z)
      let min = -0.01 * this.sliders[0].value;
      let max = 0.01 * this.sliders[0].value;
      let randomvelocity: number[] = MinMaxRandomizeArray([min, min, min], [max, max, max])
      p.velocity.set(randomvelocity[0], randomvelocity[1], randomvelocity[2]);
      p.age = 0;
    }
      p.maxAge = this.sliders[2].value;
   }
}


