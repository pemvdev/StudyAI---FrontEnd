import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Perfil],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  active = 'home';

setActive(section: string) {
  this.active = section;
}


}
