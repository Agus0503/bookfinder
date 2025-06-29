import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Libro } from '../models/libros.models';

@Injectable({ providedIn: 'root' })
export class LibrosLocalService {
  private storageKey = 'misLibros';
  private librosSubject = new BehaviorSubject<Libro[]>(this.cargarLibros());
  libros$ = this.librosSubject.asObservable();

  private cargarLibros(): Libro[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private guardar(libros: Libro[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(libros));
    this.librosSubject.next(libros);
  }

  getLibros(): Observable<Libro[]> {
    return this.libros$;
  }

  crearLibro(libro: Libro): Observable<void> {
    const libros = this.cargarLibros();
    libro.id = Date.now();
    libros.push(libro);
    this.guardar(libros);
    return of();
  }

  actualizarLibro(libro: Libro): Observable<void> {
    const libros = this.cargarLibros();
    const index = libros.findIndex(l => l.id === libro.id);
    if (index !== -1) {
      libros[index] = libro;
      this.guardar(libros);
    }
    return of();
  }

  eliminarLibro(id: number): Observable<void> {
    const libros = this.cargarLibros().filter(l => l.id !== id);
    this.guardar(libros);
    return of();
  }
}
