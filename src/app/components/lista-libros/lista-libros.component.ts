import { Component, Input} from '@angular/core';
import { Libro } from '../../models/libro.model';
import { CommonModule } from '@angular/common';
import { LibroComponent } from '../libro/libro.component';


@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, LibroComponent],
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent {
  @Input() libros: Libro[] = [];

}
