import { Component, input, computed, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../producto';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-tarjeta-producto',
  styleUrl: './tarjeta-producto.css',
  templateUrl: './tarjeta-producto.html',
})
export class TarjetaProducto {

  producto = input.required<Producto>();

  disabled = computed( () => this.producto().existencias === 0);

  n = computed (() => this.producto().existencias )

  agregar = output<string>();
}
