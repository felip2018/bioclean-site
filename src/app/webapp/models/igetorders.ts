export interface IGetOrders {
  id: number;
  persona_id: number;
  usuario_id: number;
  abreviatura: string;
  numero_documento: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  direccion: string;
  nombre_conjunto: string;
  barrio: string | null;
  localidad: string | null;
  total: number;
  fecha_entrega: string;
  tipo: string;
  estado_pedido: string;
  estado_registro: string;
  color: string;
}
