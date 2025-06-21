import { Component } from '@angular/core';
import { Libro } from '../../../models/libro.model';
import { LibrosService } from '../../../services/libros.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ListaLibrosComponent } from '../../lista-libros/lista-libros.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ListaLibrosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  libros: Libro[] = [];

  constructor(private librosService: LibrosService) {
    this.buscarInicial();
  }

  onSearch(query: string) {
    this.librosService.getLibros(query).subscribe({
      next: (data) => this.libros = data,
      error: () => alert('Error al buscar libros')
    });
  }

  buscarInicial() {
    this.librosService.getLibros('Angular').subscribe({
      next: (data) => this.libros = data,
      error: () => alert('Error al cargar libros iniciales')
    });
  }

}
