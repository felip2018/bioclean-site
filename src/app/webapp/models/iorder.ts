export interface IOrder {
  id:number;
  persona_id: number;
  localidad_id: number;
  usuario_id: number;
  total: number;
  fecha_entrega: string;
  tipo: string;
  estado_pedido: string;
  fecha_registro?: string;
  estado_registro?: string;
}
