export interface IProductToSave {
  id?:number;
  codigo: string;
  categoria_id: number;
  tipo_producto_id: number;
  unidad_medida_id: number;
  fragancia_id: number;
  precio_kit: number;
  precio_publico: number;
  precio_distribuidor: number;
  cantidad: number;
  ventas: number;
  cantidad_real: number;
  stock_minimo: number;
  stock_maximo: number;
}
