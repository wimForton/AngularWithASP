import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { Application3DComponent } from './components/application3D/application-3D.component';
import { ParticlesPageComponent } from './components/application3D/particles-page/particles-page.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { EarlyworkComponent } from './components/earlywork/earlywork.component';

import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
//import { CurvesComponent } from './components/application3D/UI/curves/curves.component';




interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
  imports: [ParticlesPageComponent, HomeComponent, EarlyworkComponent, FormsModule, MatTabsModule]
})
export class AppComponent implements OnInit {
  //public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //this.getForecasts();
    //this.testDocumentElements();
  }

  //testDocumentElements() {
  //  let tabgroup = document.getElementById("tabgroup");
  //  let child0 = tabgroup?.children[0];
  //  let child1 = tabgroup?.children[1];

  //  let secondtablabel = document.getElementById("secondtablabel");
  //  let secondtabcontent = document.getElementById("secondtabcontent");
  //  //let tabcontentb = document.getElementById("mat-tab-content-0-1");
  //  console.log("tabgroup", tabgroup);
  //  console.log("child 0:", child0);
  //  console.log("child 1:", child1);
  //  //console.log("childbyid", tabcontentb);
  //  console.log("secondtablabel", secondtablabel);
  //  console.log("secondtabcontent", secondtabcontent);
  //}

  //getForecasts() {
  //  this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
  //    (result) => {
  //      this.forecasts = result;
  //    },
  //    (error) => {
  //      console.error(error);
  //    }
  //  );
  //}

  title = 'angularwithasp.client';
}
