import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Viewport } from '../3Dtools/Viewport/Viewport';
import { ParticleScene } from '../3Dtools/ParticleSystem/ParticleScene';
import { ControlParameters, ParticleSystem, FunctionWithTrigger } from '../3Dtools/ParticleSystem/ParticleSystem';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';






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
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    CommonModule
  ],
  templateUrl: './particles-page.component.html',
  styleUrl: './particles-page.component.css'
})


export class ParticlesPageComponent {

  public value = 0;
  private viewPort?: Viewport;
  private particleScenes: Array<ParticleScene> = [];
  public addForces: Array<FunctionWithTrigger> = [];
  public panelOpenIndex = 0;

  public particleSystems: Array<ParticleSystem> = new Array<ParticleSystem>();


  ngOnInit(): void {

    const particleSystem = new ParticleSystem(20);
    const particleSystem2 = new ParticleSystem(200);
    const particleSystem3 = new ParticleSystem(200);

    this.particleSystems.push(particleSystem);
    this.particleSystems.push(particleSystem2);
    this.particleSystems.push(particleSystem3);


    for (let i = 0; i < this.particleSystems.length; i++) {
      this.particleScenes.push(new ParticleScene(this.particleSystems[i]));
    }
    this.viewPort = new Viewport(this.particleScenes, "container");
  }
  public RemoveForce(item: ControlParameters, particlesystem: ParticleSystem) {
    let index = particlesystem.forcesParameters.indexOf(item);
    particlesystem.forcesParameters.splice(index, 1);
    particlesystem.GetForceClasses().splice(index, 1)
  }
}
