import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [ CommonModule, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styles: ``
})
export class AlonePageComponent {

}
