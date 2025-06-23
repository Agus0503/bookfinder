import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MisLibrosComponent } from './components/pages/mis-libros/mis-libros.component'; 

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path:'mis-libros', component: MisLibrosComponent}    
];
