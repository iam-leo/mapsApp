import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, map, Map, Marker, NavigationControl } from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './markers-page.component.html',
  styles: ``
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') public divMap?: ElementRef;

  public levelZoom: number = 10;
  public map?: Map;
  public lnglat: LngLat = new LngLat(-58.64761325775214, -34.56477897222805);

  ngAfterViewInit(): void {
    if ( !this.divMap ) return

    this.map = map({
      key: environment.TOMTOM_KEY, // Usar API Key
      container: this.divMap?.nativeElement, // ID del elemento contenedor
      center: this.lnglat, // Coordenadas iniciales [longitud, latitud]
      zoom: this.levelZoom // Nivel inicial de zoom
    });

    console.log('Mapa inicializado:', this.map);
    
    // Agregar controles de zoom
    this.map.addControl(new NavigationControl());

    // Agregar un marker
      this.map.on('load', () => {
      console.log('✅ Mapa cargado. Agregando marcador...');

      const marker = new Marker({ anchor: 'top' }) // Asegura que el marcador esté centrado correctamente
        .setLngLat(this.lnglat)
        .addTo(this.map!);

      console.log('✅ Marcador agregado en:', this.lnglat);
    });
  }
}
