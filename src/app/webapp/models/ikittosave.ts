import { IKit } from "./ikit";

interface IProductKit {
  kit_id?: number;
  tipo_producto_id: number;
  unidad_medida_id: number;
}

export interface IKitToSave {
  kit: IKit;
  products: IProductKit[];
}
