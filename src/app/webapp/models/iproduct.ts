export interface IProduct {
  id: number;
  codigo: string;
  categoria_id: number;
  categoria: string;
  tipo_producto_id: number;
  tipo_producto: string;
  valor_unidad: number;
  unidad_medida_id: number;
  unidad_medida: string;
  abreviatura: string;
  fragancia_id: number;
  fragancia: string;
  precio_publico: number;
  precio_distribuidor: number;
  cantidad: number;
  ventas: number;
  cantidad_real: number;
  stock_minimo: number;
  stock_maximo: number;
  fecha_registro: string;
  estado: string;
}
