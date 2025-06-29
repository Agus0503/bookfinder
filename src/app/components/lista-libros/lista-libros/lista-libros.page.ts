import { Component, Input} from '@angular/core';
import { Libro } from 'src/app/models/libros.models';
import { CommonModule } from '@angular/common';
import { LibroComponent } from '../../libros/libros/libros.page';
import { IonGrid, IonCol, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, CommonModule, LibroComponent],
  templateUrl: './lista-libros.page.html',
  styleUrls: ['./lista-libros.page.scss']
})
export class ListaLibrosComponent {
  @Input() libros: Libro[] = [];

}
