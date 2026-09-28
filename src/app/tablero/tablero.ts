import { Component, computed, signal } from '@angular/core';


interface Producto {
  nombre: string;
  categoria: String;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.html',
})
export class Tablero {
  
  vendedor = signal('Don Efraín');

  filtro = signal('');
  categoria = signal("Todas");

  productos = signal<Producto[]>([
    { nombre: 'Mango', categoria:'Frutas', precio: 1800, cantidad: 12 },
    { nombre: 'Guayaba', categoria:'Frutas', precio: 1200, cantidad: 0 },
    { nombre: 'Patilla', categoria:'Frutas', precio: 6500, cantidad: 2 },
    { nombre: 'Tomate', categoria:'Verduras', precio: 3200, cantidad: 9 },
    { nombre: 'Cebolla', categoria:'Verduras', precio: 2800, cantidad: 1 },
    { nombre: 'Ahuyama', categoria:'Verduras', precio: 4500, cantidad: 0 },
  ]);


  total = computed(() =>
    this.productos().reduce((suma, p) => suma + p.precio * p.cantidad, 0),
  );

  
  unidades = computed(() =>
    this.productos().reduce((suma, p) => suma + p.cantidad, 0),
  );

  agotados = computed(() =>
    this.productos().reduce((acumulador, p) => p.cantidad === 0 ? acumulador + 1 : acumulador, 0),
  );

  stockdown = computed (() =>
    this.productos().reduce((acumulador, p) => 
      p.cantidad >= 1 && p.cantidad <=2 ? acumulador + 1 : acumulador, 0),
  );


 ordenados = computed(() =>[... this.productos()].sort((a,b) => 
  (b.precio * b.cantidad) - (a.precio * a.cantidad)
));

productoCaro = computed(() =>
    this.productos().reduce((p, caro) => 
      p.precio > caro.precio ? p : caro
    ),
  );
  
  visibles = computed(() => {
    const texto = this.filtro().toLowerCase().trim();
    const categoria = this.categoria();
    return this.ordenados().filter((p) => { 
      const fil = p.nombre.toLowerCase().includes(texto);
      const ctg = categoria === "Todas" || p.categoria === categoria;

      return fil && ctg;
    });
  });

  
  vender(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) =>
        p.nombre === nombre && p.cantidad > 0
          ? { ...p, cantidad: p.cantidad - 1 }  
          : p,
      ),
    );
    
  }

  venderLote(nombre: string){
    this.productos.update((lista) =>
      lista.map((p) =>
        p.nombre === nombre && p.cantidad > 0 
          ? { ...p, cantidad: 0}
          : p,
      ),
    );
  }

  reabastecer(nombre: string) {
    this.productos.update((lista) =>
      lista.map((p) => (p.nombre === nombre ? { ...p, cantidad: p.cantidad + 10 } : p)),
    );
  }

  
  onFiltrar(e: Event) {
    const caja = e.target as HTMLInputElement;
    this.filtro.set(caja.value);
  }

  
  limpiarFiltro() {
    this.filtro.set('');
  }
}
