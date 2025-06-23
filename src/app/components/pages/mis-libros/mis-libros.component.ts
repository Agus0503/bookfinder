import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Libro } from '../../../models/libro.model'; 
import { LibrosLocalService } from '../../../services/libros-local.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-mis-libros',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.css']
})
export class MisLibrosComponent implements OnInit {
  libros: Libro[] = [];
  libroForm: Libro = { title: '', authors: [], description: '', image: '' };
  modoEdicion: boolean = false;

  constructor(private librosService: LibrosLocalService) { }

  ngOnInit(): void {
    this.actualizarLista();
  }

  actualizarLista(): void {
    this.librosService.getLibros().subscribe(libros => {
      this.libros = [...libros];
    });
  }

  guardarLibro(): void {
    const tituloValido = this.libroForm.title.trim() !== '';
    const autorValido = this.libroForm.authors[0]?.trim() !== '';

    if (!tituloValido || !autorValido) {
      alert('Por favor completá los campos obligatorios (Título y Autor)');
      return;
    }

    if (this.modoEdicion && this.libroForm.id) {
      this.librosService.actualizarLibro(this.libroForm).subscribe(() => {
        this.actualizarLista();
        this.resetForm();
        alert('Libro actualizado correctamente');
      });
    } else {
      this.librosService.crearLibro(this.libroForm).subscribe(() => {
        this.actualizarLista();
        this.resetForm();
        alert('Libro agregado correctamente');
      });
    }
  }


  editar(libro: Libro): void {
    this.libroForm = { ...libro };
    this.modoEdicion = true;
  }

  eliminar(id?: number): void {
    if (!id) return;
    if (confirm('¿Eliminar este libro?')) {
      this.librosService.eliminarLibro(id).subscribe(() => {
        this.actualizarLista();
        alert('Libro eliminado');
      });
    }
  }

  resetForm(form?: NgForm): void {
    this.libroForm = { title: '', authors: [], description: '', image: '' };
    this.modoEdicion = false;

    if(form){
      form.resetForm();
    }
  }

}
