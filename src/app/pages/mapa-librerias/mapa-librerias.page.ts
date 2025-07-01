import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapa-librerias',
  templateUrl: './mapa-librerias.page.html',
  styleUrls: ['./mapa-librerias.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MapaLibreriasPage implements AfterViewInit {
  private map!: L.Map;

  constructor(private http: HttpClient) {}

  async ngAfterViewInit() {
    const position = await Geolocation.getCurrentPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Mostrar mapa centrado en la ubicación del usuario
    this.map = L.map('map').setView([lat, lon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', ).addTo(this.map);

 //marcador
    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Usted está aquí')
      .openPopup();

    // api de overpass
    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    const query = `
      [out:json];
      node["shop"="books"](around:4000, ${lat}, ${lon});
      out body;
    `; // esta seteado para que aparezcan librerías dentro de un radio de 4000 metros de mi ubicación

    // Enviar la consulta
    this.http.post(overpassUrl, query, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((data: any) => {
      if (data.elements && data.elements.length > 0) {
        data.elements.forEach((element: any) => {
          if (element.lat && element.lon) {
            const nombre = element.tags?.name || 'Librería';
            L.marker([element.lat, element.lon])
              .addTo(this.map)
              .bindPopup(nombre);
          }
        });
      } else {
        console.log('No se encontraron librerías cercanas.');
      }
    }, error => {
      console.error('Error buscando librerías:', error);
    });
  }
}
