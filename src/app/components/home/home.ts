import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
