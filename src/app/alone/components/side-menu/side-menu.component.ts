import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapsRoutingModule } from '../../../maps/maps-routing.module';

interface MenuItem {
  route: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, MapsRoutingModule],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Fullscreen', icon: 'assets/icons/fullscreen.svg' },
    { route: '/maps/zoom-range', name: 'Zoom', icon: 'assets/icons/zoom.svg' },
    { route: '/maps/markers', name: 'Markers', icon: 'assets/icons/marker.svg' },
    { route: '/maps/properties', name: 'Houses', icon: 'assets/icons/house.svg' },
    { route: '/alone', name: 'Alone Page', icon: 'assets/icons/house.svg' },
  ]

  constructor(public router: Router) {}
}
