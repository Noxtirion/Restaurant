export interface Product {
  name: string;
  price: number;
  description: string;
}

export interface Products {
  id: string;
  dishType: string;
  items: Product[];
}
