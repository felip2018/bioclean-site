import { IOrder } from "./iorder";
import { IOrderDetail } from "./iorderdetail";

export interface IOrderToSave {
  orden: IOrder;
  productos: IOrderDetail[];
}
