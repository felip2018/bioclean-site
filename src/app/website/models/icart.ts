import { ICustomer } from "./icustomer";
import { IProductCart } from "./iproduct-cart";

export interface ICart {
  products: IProductCart[];
  total: number;
  customer: ICustomer;
}
