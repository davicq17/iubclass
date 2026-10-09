import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Linea } from '../Linea';

type Rango = 'Gratis' | '$ 3.000' | '--'

@Component({
  imports: [CurrencyPipe],
  selector: 'app-resumen-pedido',
  styleUrl: './resumen-pedido.css',
  templateUrl: './resumen-pedido.html',
})
export class ResumenPedido {

  linea = input.required<Linea[]>();

  quitar = output<string>();

  subTotal = computed(() =>
    this.linea().reduce((suma,p) => suma + p.precio * p.cantidad , 0)
  );


  domicilio = computed(() =>
    this.Domicilio(this.subTotal())
  );

  total = computed (() =>
    this.precioDomicilio(this.domicilio()) + this.subTotal()
  );

  private Domicilio(precio: number): Rango {
    if(precio == 0) return '--';
    return precio >= 20000 ? 'Gratis' : '$ 3.000'
  }

  private precioDomicilio(texto: string){
    return texto == '--' || texto == 'Gratis' ?  0 : 3000;

  }
}
