import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {
  @Input() libro!: Libro;
}

