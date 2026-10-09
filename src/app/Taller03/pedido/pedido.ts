import { TarjetaProducto } from '../tarjeta-producto/tarjeta-producto';
import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ResumenPedido } from '../resumen-pedido/resumen-pedido';
import { Producto } from '../producto';
import { Linea } from '../Linea';

@Component({
  imports: [ DatePipe, TarjetaProducto, ResumenPedido],
  selector: 'app-pedido',
  styleUrl: './pedido.css',
  templateUrl: './pedido.html',
})
export class Pedido {
  private readonly iniciales: Producto[] = [
    {nombre: 'Mango', precio: 1800, existencias: 3},
    {nombre: 'Aguacate', precio: 4500, existencias: 2},
    {nombre: 'Limón', precio: 650, existencias: 10},
    {nombre: 'Queso costeño', precio: 12000, existencias: 1},
  ]

  productos = signal<Producto[]>(this.iniciales);
  pedido = signal<Linea[]>([]);

  vendedor = signal('Don Efraín');
  hoy = new Date()
  

  resumenPedido(nombre: string){
    this.productos.update((lista) =>
      lista.map((p) => 
      p.nombre === nombre && p.existencias > 0 
        ? {...p, existencias: p.existencias -1} : p
      ),
    );
    this.pedido.update((lista) => {
      const existe = lista.some((linea) => linea.nombre === nombre);
      
      if( existe) { 
        return lista.map((linea) =>
        linea.nombre === nombre ? {...linea, cantidad: linea.cantidad +1} : linea
      ); 
      }else{
        const producto = this.productos().find((item) => item.nombre === nombre);  
        return [...lista, {nombre:nombre, precio: producto?.precio ||0 , cantidad: 1 }]
      }
    }); 
  }
}
