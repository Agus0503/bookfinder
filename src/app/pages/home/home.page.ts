import { Component } from '@angular/core';
import { Libro } from 'src/app/models/libros.models';
import { LibrosService } from 'src/app/services/libros.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar/navbar.page';
import { ListaLibrosComponent } from 'src/app/components/lista-libros/lista-libros/lista-libros.page';
import { CommonModule } from '@angular/common';
import { IonHeader, IonFooter ,IonMenuButton,IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons } from "@ionic/angular/standalone";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonButtons, IonButton,IonMenuButton, IonIcon, IonContent, IonFooter , IonTitle, IonToolbar, IonHeader, CommonModule, NavbarComponent, ListaLibrosComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
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