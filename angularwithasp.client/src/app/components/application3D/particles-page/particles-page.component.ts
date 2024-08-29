import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Viewport } from '../3Dtools/Viewport/Viewport';
import { TestScene } from '../3Dtools/TestScene/TestScene';
import { Slider } from './../UiComponentData/Slider';



@Component({
  selector: 'app-particles-page',
  standalone: true,
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './particles-page.component.html',
  styleUrl: './particles-page.component.css'
})
export class ParticlesPageComponent {
  public value = 0;
  private viewPort?: Viewport;
  //private viewPortB?: Viewport;
  private testscene: TestScene = new TestScene();
  public sliders: Array<Slider> = new Array<Slider>();
  public stringarray: Array<String> = ["a", "b", "c", "d"];
  public users = [{ id: 1, username: 'john' }, { id: 2, username: 'jane' }];


  ngOnInit(): void {

    this.viewPort = new Viewport(this.testscene.GetScene(), "container");
    //this.viewPortB = new Viewport(this.testscene.GetScene(), "containerB");
    this.sliders.push(new Slider);
    this.sliders.push(new Slider);
    this.sliders.push(new Slider);
    this.sliders.push(new Slider);
    this.sliders.push(new Slider);
    this.sliders.push(new Slider);
    this.sliders[1].showTicks = true;
    this.sliders[1].max = 20;
    this.sliders[1].label = "wim";
    //this.sliders[0].max
  }

  onInputChange(event: Event) {
    this.value = +((event.target as HTMLInputElement).value);// + = string to number
    console.log(this.sliders[1].value);
  }
}
