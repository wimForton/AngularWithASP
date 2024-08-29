import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Viewport } from '../3Dtools/Viewport/Viewport';
import { TestScene } from '../3Dtools/TestScene/TestScene';
import { Slider } from './../UiComponentData/Slider';
import { ParticleScene } from '../3Dtools/ParticleSystem/ParticleScene';
import { EmitClass, Emitter, ParticleSystem } from '../3Dtools/ParticleSystem/ParticleSystem';
import { EmitFromPoint } from '../3Dtools/ParticleSystem/emitters/EmitFromPoint';
import { MatExpansionModule } from '@angular/material/expansion';




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
    MatExpansionModule,
    CommonModule
  ],
  templateUrl: './particles-page.component.html',
  styleUrl: './particles-page.component.css'
})


export class ParticlesPageComponent {

  public value = 0;
  private viewPort?: Viewport;
  //private viewPortB?: Viewport;
  private testscene?: ParticleScene;
  public sliders: Array<Slider> = new Array<Slider>();
  public emitters: Array<Emitter> = [];

  private particleSystem?: ParticleSystem;


  ngOnInit(): void {
    this.particleSystem = new ParticleSystem(50);
    this.particleSystem.addEmitClass(new EmitFromPoint());


    for (var em = 0; em < this.particleSystem.GetEmitClasses().length; em++) {
      const emitter = new Emitter()

      for (let s = 0; s < this.particleSystem.GetEmitClasses()[em].sliders.length; s++) {
        this.sliders.push(this.particleSystem.GetEmitClasses()[em].sliders[s]);
      }
      //emitter.sliders = this.particleSystem.GetEmitClasses()[em].sliders;
      //emitter.name = this.particleSystem.GetEmitClasses()[em].name;
      emitter.name = this.particleSystem.GetEmitClasses()[em].name;
      emitter.sliders = this.particleSystem.GetEmitClasses()[em].sliders;
      this.emitters.push(emitter);
    }

    this.testscene = new ParticleScene(this.particleSystem);
    this.viewPort = new Viewport(this.testscene, "container");

  }

  onInputChange(event: Event) {
    this.value = +((event.target as HTMLInputElement).value);// + = string to number
    console.log(this.sliders[1].value);
  }
}
