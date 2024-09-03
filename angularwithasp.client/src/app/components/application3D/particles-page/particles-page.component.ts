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
import { EmitClass, ControlParameters, ParticleSystem, ForceClass, FunctionWithTrigger } from '../3Dtools/ParticleSystem/ParticleSystem';
import { EmitFromPoint } from '../3Dtools/ParticleSystem/emitters/EmitFromPoint';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { VectorForce } from '../3Dtools/ParticleSystem/forces/VectorForce';
import { DragForce } from '../3Dtools/ParticleSystem/forces/DragForce';
import { TurbulenceForce } from '../3Dtools/ParticleSystem/forces/TurbulenceForce';
import { BounceForce } from '../3Dtools/ParticleSystem/forces/BounceForce';
import { ScaleInOutForce } from '../3Dtools/ParticleSystem/forces/ScaleInOut';





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
  private particleScene?: ParticleScene;
  public emittersParameters: Array<ControlParameters> = [];
  public forcesParameters: Array<ControlParameters> = [];
  public addForces: Array<FunctionWithTrigger> = [];
  public panelOpenIndex = 0;

  private particleSystem?: ParticleSystem;
  public particleSystems: Array<ParticleSystem> = new Array<ParticleSystem>();


  ngOnInit(): void {
    this.particleSystem = new ParticleSystem(200);
    this.particleSystem.addEmitClass(new EmitFromPoint());

    const particleSystem = new ParticleSystem(200);
    particleSystem.addEmitClass(new EmitFromPoint());

    const particleSystem2 = new ParticleSystem(200);
    particleSystem2.addEmitClass(new EmitFromPoint());

    this.particleSystems.push(particleSystem);

    this.particleSystems.push(particleSystem2);

    //function addForceToArrays(this: any, force: ForceClass) {
    //  const controlParameters = new ControlParameters()
    //  this.particleSystem.addForceClass(force);
    //  controlParameters.name = force.name;
    //  controlParameters.sliders = force.sliders;
    //  controlParameters.id = this.forcesParameters.length;
    //  this.forcesParameters.push(controlParameters);
    //}

    //this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new VectorForce()), "Vector Force"));
    //this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new DragForce()), "Drag Force"));
    //this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new TurbulenceForce()), "Turbulence Force"));
    //this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new BounceForce()), "Bounce Force"));
    //this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new ScaleInOutForce()), "Scale In Out"));


    //for (var i = 0; i < this.particleSystem.GetEmitClasses().length; i++) {
    //  const controlParameters = new ControlParameters();
    //  controlParameters.name = this.particleSystem.GetEmitClasses()[i].name;
    //  controlParameters.sliders = this.particleSystem.GetEmitClasses()[i].sliders;
    //  controlParameters.id = i;
    //  this.emittersParameters.push(controlParameters);
    //}

    //for (var i = 0; i < this.particleSystem.GetForceClasses().length; i++) {
    //  const controlParameters = new ControlParameters()
    //  let force: ForceClass = this.particleSystem.GetForceClasses()[i]

    //  controlParameters.name = force.name;
    //  controlParameters.sliders = force.sliders;
    //  controlParameters.id = i;
    //  this.forcesParameters.push(controlParameters);
    //}

    this.particleScene = new ParticleScene(this.particleSystems[0]);
    this.viewPort = new Viewport(this.particleScene, "container");

  }
  public RemoveForce(item: ControlParameters, particlesystem: ParticleSystem) {
    let index = particlesystem.forcesParameters.indexOf(item);
    particlesystem.forcesParameters.splice(index, 1);
    particlesystem.GetForceClasses().splice(index, 1)
  }
}
