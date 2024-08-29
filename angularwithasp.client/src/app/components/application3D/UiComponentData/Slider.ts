export class Slider {
  disabled = false;
  max = 100;
  min = -100;
  showTicks = false;
  step = 0.01;
  thumbLabel = true;
  value: number = 0;
  label: string = "unnamed";

  public onInputChange(event: Event) {
    this.value = +((event.target as HTMLInputElement).value);// + = string to number
    console.log(this.label + this.value);
  }
}
