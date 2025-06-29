import { Component, Input} from '@angular/core';
import { Libro } from 'src/app/models/libros.models';
import { CommonModule } from '@angular/common';
import { LibroComponent } from '../../libros/libros/libros.page';
import { IonContent, IonToolbar, IonHeader, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [IonTitle, IonHeader, IonToolbar, IonContent, CommonModule, LibroComponent],
  templateUrl: './lista-libros.page.html',
  styleUrls: ['./lista-libros.page.scss']
})
export class ListaLibrosComponent {
  @Input() libros: Libro[] = [];

}
