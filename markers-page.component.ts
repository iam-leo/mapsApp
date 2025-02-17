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
    if (!this.divMap) return;

    this.map = map({
    key: environment.TOMTOM_KEY,
    container: this.divMap?.nativeElement,
    center: this.lnglat,
    zoom: this.levelZoom
    });

    this.map.addControl(new NavigationControl());

    this.map.on('load', () => {
    const marker = new Marker({ anchor: 'bottom' })
        .setLngLat(this.lnglat)
        .addTo(this.map!);
    });
}
}

