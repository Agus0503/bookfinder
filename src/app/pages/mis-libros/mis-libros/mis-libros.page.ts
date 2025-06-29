import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import {
  AlertController,
  ToastController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonText,
  IonButton,
  IonList,
  IonListHeader,
  IonThumbnail,
  IonButtons
} from '@ionic/angular/standalone';

import { Libro } from 'src/app/models/libros.models';
import { LibrosLocalService } from '../../../services/libros-local.service';

@Component({
  selector: 'app-mis-libros',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonText,
    IonButton,
    IonList,
    IonListHeader,
    IonThumbnail,
    IonButtons
  ],
  templateUrl: './mis-libros.page.html',
  styleUrls: ['./mis-libros.page.scss']
})
export class MisLibrosComponent implements OnInit {
  libros: Libro[] = [];
  libroForm: Libro = { title: '', authors: [], description: '', image: '' };
  author: string = '';
  modoEdicion: boolean = false;

  constructor(
    private librosService: LibrosLocalService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.actualizarLista();
  }

  actualizarLista(): void {
    this.librosService.getLibros().subscribe(list => {
      this.libros = [...list];
    });
  }

  async guardarLibro(): Promise<void> {
    const tituloValido = this.libroForm.title.trim() !== '';
    const autorValido  = this.author.trim() !== '';

    if (!tituloValido || !autorValido) {
      const alert = await this.alertCtrl.create({
        header: 'Campos incompletos',
        message: 'Por favor completá los campos obligatorios (Título y Autor).',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.libroForm.authors = [this.author];

    if (this.modoEdicion && this.libroForm.id) {
      this.librosService.actualizarLibro(this.libroForm).subscribe(async () => {
        this.actualizarLista();
        this.resetForm();
        await this.showToast('Libro actualizado correctamente');
      });
    } else {
      this.librosService.crearLibro(this.libroForm).subscribe(async () => {
        this.actualizarLista();
        this.resetForm();
        await this.showToast('Libro agregado correctamente');
      });
    }
  }

  async editar(libro: Libro): Promise<void> {
    this.libroForm = { ...libro };
    this.author = libro.authors[0] || '';
    this.modoEdicion = true;
  }

  async eliminar(id?: number): Promise<void> {
    if (!id) return;

    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que querés eliminar este libro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.librosService.eliminarLibro(id).subscribe(async () => {
              this.actualizarLista();
              await this.showToast('Libro eliminado');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  resetForm(form?: NgForm): void {
    this.libroForm = { title: '', authors: [], description: '', image: '' };
    this.author     = '';
    this.modoEdicion = false;
    if (form) form.resetForm();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }
}