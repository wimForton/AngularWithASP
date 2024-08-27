import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Application3DComponent } from './components/application3D/application-3D.component';
import { ParticlesPageComponent } from './components/application3D/particles-page/particles-page.component';
import { FormsModule } from '@angular/forms';

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
  imports: [Application3DComponent, ParticlesPageComponent, FormsModule]
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularwithasp.client';
}
