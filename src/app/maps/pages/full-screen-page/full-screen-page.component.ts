import { AfterViewInit, Component } from '@angular/core';
import * as tt from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './full-screen-page.component.html',
  styles: ``
})
export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = tt.map({
      key: environment.TOMTOM_KEY, // Usar API Key
      container: 'map', // ID del elemento contenedor
      center: [-64.183, -31.417], // Coordenadas iniciales [longitud, latitud]
      zoom: 5 // Nivel inicial de zoom
    });

    // Agregar controles de zoom
    map.addControl(new tt.NavigationControl());
  }

}
