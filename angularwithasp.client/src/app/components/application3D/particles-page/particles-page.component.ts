import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, model } from '@angular/core';
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
import { ControlParameters, ParticleSystem, FunctionWithTrigger, ParticleParameterGroup } from '../3Dtools/ParticleSystem/ParticleSystem';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PanelSelectorComponent } from '../3Dtools/ParticleSystem/AngularComponents/ForceComponents/panelselector.component';
import { Load, Save } from '../3Dtools/ParticleSystem/LoadSave/LoadSave';
import { EmitFromPoint } from '../3Dtools/ParticleSystem/emitters/EmitFromParticles';






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
    CommonModule,
    PanelSelectorComponent
  ],
  templateUrl: './particles-page.component.html',
  styleUrl: './particles-page.component.css'
})


export class ParticlesPageComponent implements AfterViewInit {

  public value = 0;
  private viewPort?: Viewport;
  private particleScenes: Array<ParticleScene> = [];
  public addForces: Array<FunctionWithTrigger> = [];
  public panelOpenIndex = 0;
  readonly checked = model(false);

  //private loadsave = LoadSave.instance;
  public particleSystems: Array<ParticleSystem> = new Array<ParticleSystem>();

  @ViewChild('viewportcontainer', { read: ElementRef, static:false })//@ViewChild('viewportcontainer', { read: ElementRef })
  viewportcontainer!: ElementRef;

  //ngOnInit(): void{
  //  if (this.viewPort != undefined) {
  //    this.viewPort?.render();
  //  }
  //}

  ngAfterViewInit(): void {
    var container: HTMLElement = this.viewportcontainer.nativeElement;

    setTimeout(() => {
      console.log("container:", container);
      

      const particleSystem = new ParticleSystem(200);

      //particleSystem.addEmitClass(new EmitFromPoint());

      //particleSystem.addForceClass()
      //const particleSystem2 = new ParticleSystem(3);
      //const particleSystem3 = new ParticleSystem(200);

      this.particleSystems.push(particleSystem);
      //this.particleSystems.push(particleSystem2);
      //this.particleSystems.push(particleSystem3);



      for (let i = 0; i < this.particleSystems.length; i++) {
        this.particleScenes.push(new ParticleScene(this.particleSystems[i]));
      }

      this.viewPort = new Viewport(this.particleScenes, "container", container);

    }, 50);
    console.log("containeraftertimeout:", container);

  }

  public LoadParticles() {
    //this.viewPort!.clear();
    //this.particleSystems = [];
    //this.particleScenes = [];
    Load(this.particleSystems, this.particleScenes, this.viewPort!);
    console.log("particleScenes length", this.particleScenes.length);
  }
  public SaveParticles() {
    let particleparametergroup: ParticleParameterGroup = new ParticleParameterGroup(this.particleSystems);
    Save(particleparametergroup);
  }

  public getParticleSystemId(particlesystem: ParticleSystem): number {
    let index = this.particleSystems.indexOf(particlesystem) + 1;
    return index;
  }

  public RemoveForce(item: ControlParameters, particlesystem: ParticleSystem) {
    let index = particlesystem.forcesParameters.indexOf(item);
    particlesystem.forcesParameters.splice(index, 1);
    particlesystem.GetForceClasses().splice(index, 1)
  }
}
