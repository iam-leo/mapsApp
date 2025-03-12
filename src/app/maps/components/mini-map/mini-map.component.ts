import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, map, Map, Marker} from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styles: ``
})
export class MiniMapComponent implements AfterViewInit{
  @ViewChild('map', { static: false }) public divMap?: ElementRef;
  @Input() lngLat?: [number, number] = [0,0];

  public map?: Map;


  ngAfterViewInit(): void {
   if (!this.divMap) {
      console.error('Map container is not defined.');
      return;
    }
    if (!this.lngLat || this.lngLat.length !== 2 || this.lngLat.some(coord => coord == null)) {
      console.error(`Invalid lngLat: ${JSON.stringify(this.lngLat)}`);
      return;
    }

    // create a map
    this.map = map({
      key: environment.TOMTOM_KEY, // Usar API Key
      container: this.divMap?.nativeElement, // ID del elemento contenedor
      center: this.lngLat, // Coordenadas iniciales [longitud, latitud]
      zoom: 15, // Nivel inicial de zoom
      interactive: false, // Desactivar interacción
    });

    // Agregar un marker
    this.map.on('load', () => {
      if(!this.lngLat) throw new Error('lngLat is not defined');
      const marker = new Marker({ anchor: 'center', color: 'rgb(55, 48, 163)' })
        .setLngLat(this.lngLat)
        .addTo(this.map!);
    });

  }

}
