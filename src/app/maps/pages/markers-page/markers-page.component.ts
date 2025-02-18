  import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
  import { LngLat, map, Map, Marker, NavigationControl, Popup } from '@tomtom-international/web-sdk-maps';
  import { environment } from '../../../../environments/environment';

  interface MarkerAndColor {
    marker: Marker;
    color: string;
  }

  @Component({
    templateUrl: './markers-page.component.html',
    styles: ``
  })

  export class MarkersPageComponent implements AfterViewInit, OnDestroy {
    @ViewChild('map', { static: false }) public divMap?: ElementRef;

    public levelZoom: number = 10;
    public map?: Map;
    public lnglat: LngLat = new LngLat(-64.183, -31.417);
    public markers: MarkerAndColor[] = [];

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

      // Agregar un marker
        this.map.on('load', () => {
          new Marker({ anchor: 'center', color: 'rgb(55, 48, 163)' })
            .setLngLat(this.lnglat)
            .setPopup(new Popup({ offset: 25 }).setText('Ubicación Actual')) // add popups
            .addTo(this.map!);
      });

    }

    ngOnDestroy(): void {
      this.map?.remove();
    }

    createMarker(){
      if( !this.map ) return

      // Generar color aleatorio
      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

      // Obtener coordenadas del centro
      const lnglat = this.map.getCenter();

      this.addMarker(lnglat, color);
    }

    addMarker( lnglat: LngLat, color: string = 'rgb(55, 48, 163)' ){
      if( !this.map ) return

      const marker = new Marker({ anchor: 'center', color: color, draggable: true })
        .setLngLat(lnglat)
        .addTo(this.map!);

      this.markers.push( { marker, color } );
    }

    deleteMarker( index: number ){
      if( !this.map ) return
      this.markers[index].marker.remove();
      this.markers.splice(index, 1);
    }
  }
