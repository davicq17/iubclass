import {Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stock'})
export class StockPipe implements PipeTransform {
    transform(cantidad: number): String {
        if(cantidad === 0) return 'sin existencias';
        if(cantidad === 1) return '1 unidad';
        return `${cantidad} unidades`;
    }
}