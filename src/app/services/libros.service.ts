import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LibroComponent } from '../components/libro/libro.component';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private url = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<LibroComponent[]> {
    return this.http.get<LibroComponent[]>('http://localhost:3000/libros');
  }

  getLibros(query: string): Observable<any> {
    return this.http.get<any>(`${this.url}?q=${query}`).pipe(
      map(response =>
        response.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title || 'Título desconocido',
          authors: item.volumeInfo.authors || ['Autor desconocido'],
          description: item.volumeInfo.description || 'Sin descripción',
          image: item.volumeInfo.imageLinks?.thumbnail || ''
        }))
      )
    );
  }

}
