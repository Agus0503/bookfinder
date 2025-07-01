import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Libro } from '../models/libros.models';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private url = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }  

  getLibros(query: string): Observable<Libro[]> {
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
