export interface Products {
  id: string;
  dishType: string;
  imageSrc: string;
  items: Product[];
}
export interface Product {
  name: string;
  price: number;
  description: string;
}
export interface Offer {
  id: string;
  dishType: string;
  imageSrc: string;
}
export interface GuestOrder {
  guest: ProductOrder[];
}
export interface ProductOrder {
  dishType: string;
  order: SingleOrder;
  id: string;
}
export interface SingleOrder {
  name: string;
  price: number;
}
export interface OrderPerUserArray {
  id: string;
  menu: ProductOrder[];
}
export interface Gallery {
  id: string;
  imageSrc: string;
  authorSrc: string;
  authorName: string;
  siteUrl: string;
}
