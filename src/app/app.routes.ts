import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'mis-libros',
    loadComponent: () => import('./pages/mis-libros/mis-libros/mis-libros.page').then( m => m.MisLibrosComponent)
  },
  {
    path: 'navbar',
    loadComponent: () => import('./components/navbar/navbar/navbar.page').then( m => m.NavbarComponent)
  },
  {
    path: 'lista-libros',
    loadComponent: () => import('./components/lista-libros/lista-libros/lista-libros.page').then( m => m.ListaLibrosComponent)
  },
  {
    path: 'libros',
    loadComponent: () => import('./components/libros/libros/libros.page').then( m => m.LibroComponent)
  },
];
