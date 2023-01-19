export interface IOrderDetail {
  id?: number;
  pedido_id: number;
  kit_id: number;
  producto_id: number;
  cantidad: number;
  precio: number;
  subtotal: number;
  cambio: string;
}
