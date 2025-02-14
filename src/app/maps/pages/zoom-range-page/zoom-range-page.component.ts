import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, map, NavigationControl } from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styles: ``
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') public divMap?: ElementRef;

  public levelZoom: number = 10;
  public map?: Map;
  public lnglat: LngLat = new LngLat(-64.183, -31.417);

  ngAfterViewInit(): void {
    if ( !this.divMap ) return

    this.map = map({
      key: environment.TOMTOM_KEY, // Usar API Key
      container: this.divMap?.nativeElement, // ID del elemento contenedor
      center: this.lnglat, // Coordenadas iniciales [longitud, latitud]
      zoom: this.levelZoom // Nivel inicial de zoom
    });


    // Agregar controles de zoom
    this.map.addControl(new NavigationControl());

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
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

    this.map.on('moveend', () => {
      const lnglat = this.map!.getCenter();
      this.lnglat = new LngLat(lnglat.lng, lnglat.lat);
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
