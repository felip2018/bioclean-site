import { IKit } from "./ikit";

interface IKitProducts {
  kit_id: number;
  tipo_producto_id: number;
  valor_unidad: number;
  unidad_medida_id: number;
}

export interface IKitWithProducts {
  kit: IKit;
  products: IKitProducts[];
}
