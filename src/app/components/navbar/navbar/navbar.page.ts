import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonSearchbar } from '@ionic/angular/standalone';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    IonicModule, IonSearchbar
  ],
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss']  // te recomiendo usar scss en Ionic
})
export class NavbarComponent {
  query: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  buscar() {
    if (this.query.trim()) {
      this.searchEvent.emit(this.query);
    }
  }
}