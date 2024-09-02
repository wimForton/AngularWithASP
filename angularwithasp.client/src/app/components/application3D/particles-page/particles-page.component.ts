import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { EmitClass, ControlParameters, ParticleSystem, ForceClass, FunctionWithTrigger } from '../3Dtools/ParticleSystem/ParticleSystem';
import { EmitFromPoint } from '../3Dtools/ParticleSystem/emitters/EmitFromPoint';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Vector } from '../3Dtools/Utils/trigFunctions';
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
  //public sliders: Array<Slider> = new Array<Slider>();
  public emittersParameters: Array<ControlParameters> = [];
  public forcesParameters: Array<ControlParameters> = [];
  public addForces: Array<FunctionWithTrigger> = [];
  public panelOpenIndex = 0;

  private particleSystem?: ParticleSystem;

  //constructor(
  //  private changeDetection: ChangeDetectorRef
  //) { }

  ngOnInit(): void {
    this.particleSystem = new ParticleSystem(200);
    this.particleSystem.addEmitClass(new EmitFromPoint());


    function addVectorForce(this: any) {
      let force = new VectorForce();
      const controlParameters = new ControlParameters()
      this.particleSystem.addForceClass(force);
      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = this.forcesParameters.length;
      console.log("this.controlParameters.id" + controlParameters.id);
      this.forcesParameters.push(controlParameters);
    }
    function addDragForce(this: any) {
      let force = new DragForce();
      const controlParameters = new ControlParameters()
      this.particleSystem.addForceClass(force);
      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = this.forcesParameters.length;
      console.log("this.controlParameters.id" + controlParameters.id);
      this.forcesParameters.push(controlParameters);
    }

    function addTurbForce(this: any) {
      let force = new TurbulenceForce();
      const controlParameters = new ControlParameters()
      this.particleSystem.addForceClass(force);
      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = this.forcesParameters.length;
      console.log("this.controlParameters.id" + controlParameters.id);
      this.forcesParameters.push(controlParameters);
    }
    function addBounceForce(this: any) {
      let force = new BounceForce();
      const controlParameters = new ControlParameters()
      this.particleSystem.addForceClass(force);
      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = this.forcesParameters.length;
      console.log("this.controlParameters.id" + controlParameters.id);
      this.forcesParameters.push(controlParameters);
    }

    function addForceToArrays(this: any, force: ForceClass) {
      const controlParameters = new ControlParameters()
      this.particleSystem.addForceClass(force);
      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = this.forcesParameters.length;
      this.forcesParameters.push(controlParameters);
      //this.panelOpenIndex = this.forcesParameters.length;
    }

    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new VectorForce()), "Vector Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new DragForce()), "Drag Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new TurbulenceForce()), "Turbulence Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new BounceForce()), "Bounce Force"));
    this.addForces.push(new FunctionWithTrigger(addForceToArrays.bind(this, new ScaleInOutForce()), "Scale In Out"));

    //this.addForces.push(new FunctionWithTrigger(addVectorForce.bind(this), "Vector Force"));
    //this.addForces.push(new FunctionWithTrigger(addDragForce.bind(this), "Drag Force"));
    //this.addForces.push(new FunctionWithTrigger(addTurbForce.bind(this), "Turbulence Force"));
    //this.addForces.push(new FunctionWithTrigger(addBounceForce.bind(this), "Bounce Force"));

    for (var i = 0; i < this.particleSystem.GetEmitClasses().length; i++) {
      const controlParameters = new ControlParameters();
      controlParameters.name = this.particleSystem.GetEmitClasses()[i].name;
      controlParameters.sliders = this.particleSystem.GetEmitClasses()[i].sliders;
      controlParameters.id = i;
      this.emittersParameters.push(controlParameters);
    }

    for (var i = 0; i < this.particleSystem.GetForceClasses().length; i++) {
      const controlParameters = new ControlParameters()
      let force: ForceClass = this.particleSystem.GetForceClasses()[i]

      controlParameters.name = force.name;
      controlParameters.sliders = force.sliders;
      controlParameters.id = i;
      this.forcesParameters.push(controlParameters);
    }

    this.testscene = new ParticleScene(this.particleSystem);
    this.viewPort = new Viewport(this.testscene, "container");

  }
  public RemoveForce(item: ControlParameters) {
    let index = this.forcesParameters.indexOf(item);
    this.forcesParameters.splice(index, 1);
    this.particleSystem?.GetForceClasses().splice(index, 1)
  }
}
