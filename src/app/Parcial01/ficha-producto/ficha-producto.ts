import { Component, input, output, computed } from '@angular/core';
import { Producto } from '../producto';
import { CurrencyPipe } from '@angular/common';

type Rango = 'agotado' | 'bajo' | 'disponible';
@Component({
  imports: [CurrencyPipe],
  selector: 'app-ficha-producto',
  styleUrl: './ficha-producto.css',
  templateUrl: './ficha-producto.html',
})
export class FichaProducto {
  producto = input.required<Producto>();

  visible = computed (() => {
    const p = this.producto();
    
    return {
      ...p,
      estado: this.estadosDe(p.existencias)
    };
  });
  private estadosDe(cantidad: number): Rango {
    if (cantidad == 0) return 'agotado';
    return  cantidad >= 3 ? 'disponible' : 'bajo';

  }

  retirar = output<string>();

  disabled = computed( () => this.producto().existencias === 0);
}
