import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, map, NavigationControl } from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styles: ``
})
export class ZoomRangePageComponent implements AfterViewInit {
  @ViewChild('map') public divMap?: ElementRef;

  public levelZoom: number = 10;
  public map?: Map;

  ngAfterViewInit(): void {
    if ( !this.divMap ) return

    this.map = map({
      key: environment.TOMTOM_KEY, // Usar API Key
      container: this.divMap?.nativeElement, // ID del elemento contenedor
      center: [-64.183, -31.417], // Coordenadas iniciales [longitud, latitud]
      zoom: this.levelZoom // Nivel inicial de zoom
    });

    // Agregar controles de zoom
    this.map.addControl(new NavigationControl());

    this.mapListeners();
  }

  mapListeners() {
    if ( !this.map ) throw new Error('Mapa no inicializado');

    this.map.on('zoom', () => {
      this.levelZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if( this.map!.getZoom() < 18) return;

      this.map!.setZoom(18);
    });
  }

  zoomIn() {
    if ( !this.map ) throw new Error('Mapa no inicializado');

    const currentZoom = this.map.getZoom();
    this.map.setZoom(currentZoom + 1);
  }

  zoomOut() {
    if ( !this.map ) throw new Error('Mapa no inicializado');

    const currentZoom = this.map.getZoom();
    this.map.setZoom(currentZoom - 1);
  }

  changeZoom( value: string ) {
    if ( !this.map ) throw new Error('Mapa no inicializado');

    this.map.setZoom( +value );
  }

}
