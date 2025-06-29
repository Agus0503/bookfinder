import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from 'src/app/models/libros.models';

// Ionic components necesarios
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg, IonHeader, IonTitle, IonToolbar, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [IonContent, IonToolbar, IonTitle, IonHeader, 
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
  ],
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss']
})
export class LibroComponent {
  @Input() libro!: Libro;
}

