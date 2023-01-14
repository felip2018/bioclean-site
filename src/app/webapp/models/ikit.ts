export interface IKit {
  id: number;
  categoria_id: number;
  nombre: string;
  precio: number;
  fecha_registro?: string;
  estado_registro?: string;
  categoria?: string;
}
