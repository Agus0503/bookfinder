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
  private map: any;

  constructor(private http: HttpClient) {}

  async ngAfterViewInit() {
  
//obtenemos la ubicación del usuario
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
// centramos el mapa en la ubicación del usuario
      this.map = L.map('map').setView([lat, lon], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
//marcamos al usuario en el mapa
      L.marker([lat, lon]).addTo(this.map)
        .bindPopup('Usted está aquí')
        .openPopup();
//se buscan las librerías cercanas con la api del gobierno argentino
      const url = `https://apis.datos.gob.ar/georef/api/puntos?nombre=libreria&lat=${lat}&lon=${lon}&radio=2000&max=10`;

      this.http.get<any>(url).subscribe(response => {
        if (response.puntos) {
          response.puntos.forEach((punto: any) => {
            if (punto.lat && punto.lon) {
              L.marker([punto.lat, punto.lon])
                .addTo(this.map)
                .bindPopup(punto.nombre || 'Librería');
            }
          });
        }
      });
    }
  } 
