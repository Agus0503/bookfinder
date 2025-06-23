import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [    
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
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
