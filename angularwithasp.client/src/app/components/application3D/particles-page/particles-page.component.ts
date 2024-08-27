import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Viewport } from '../3Dtools/Viewport/Viewport';
import { TestScene } from '../3Dtools/TestScene/TestScene';



@Component({
  selector: 'app-particles-page',
  standalone: true,
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './particles-page.component.html',
  styleUrl: './particles-page.component.css'
})
export class ParticlesPageComponent {

  private viewPort?: Viewport;
  //private viewPortB?: Viewport;
  private testscene: TestScene = new TestScene();

  ngOnInit(): void {

    this.viewPort = new Viewport(this.testscene.GetScene(), "container");
    //this.viewPortB = new Viewport(this.testscene.GetScene(), "containerB");

  }
}
