import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { map, NavigationControl } from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styles: ``
})
export class ZoomRangePageComponent implements AfterViewInit {
  @ViewChild('map') public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if ( !this.divMap ) return

    const zoomMap = map({
      key: environment.TOMTOM_KEY, // Usar API Key
      container: this.divMap?.nativeElement, // ID del elemento contenedor
      center: [-64.183, -31.417], // Coordenadas iniciales [longitud, latitud]
      zoom: 5 // Nivel inicial de zoom
    });

    // Agregar controles de zoom
    zoomMap.addControl(new NavigationControl());
  }

}
