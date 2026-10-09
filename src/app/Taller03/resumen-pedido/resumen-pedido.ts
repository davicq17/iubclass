import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Linea } from '../Linea';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-resumen-pedido',
  styleUrl: './resumen-pedido.css',
  templateUrl: './resumen-pedido.html',
})
export class ResumenPedido {

  linea = input.required<Linea[]>();

  quitar = output<string>();
}
