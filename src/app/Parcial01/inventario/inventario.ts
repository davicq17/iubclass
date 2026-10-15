import { Component, computed, signal } from '@angular/core';
import { FichaProducto } from '../ficha-producto/ficha-producto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Producto } from '../producto';
@Component({
  imports: [FichaProducto, CurrencyPipe, DatePipe],
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
})
export class Inventario {
  private readonly iniciales: Producto[] = [
      {nombre: 'Teclado', precio: 38000, existencias: 6},
      {nombre: 'Ratón', precio: 22000, existencias: 0},
      {nombre: 'Cable HDMI', precio: 15000, existencias: 2},
      {nombre: 'Cable de red', precio: 6500, existencias: 12},
    ];

    estudiante = signal('David Carrillo');
    hoy = new Date()
  
  productos = signal<Producto[]>(this.iniciales);

  vTotal = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio* p.existencias, 0),
  );

  unidades = computed(() =>
    this.productos().reduce((suma, u) => suma + u.existencias, 0 ),
  );

  agotados = computed(() =>
    this.productos().reduce((acumulador, p) => p.existencias === 0 ? acumulador + 1 : acumulador, 0),
  );

  retirarProducto(nombre: string){

    this.productos.update((lista) =>
      lista.map((p) =>
        p.nombre === nombre ? {...p, existencias: p.existencias - 1 } : p
      ),
    );
  }

}
