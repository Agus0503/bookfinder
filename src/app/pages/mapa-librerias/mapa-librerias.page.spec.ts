import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaLibreriasPage } from './mapa-librerias.page';

describe('MapaLibreriasPage', () => {
  let component: MapaLibreriasPage;
  let fixture: ComponentFixture<MapaLibreriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLibreriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
