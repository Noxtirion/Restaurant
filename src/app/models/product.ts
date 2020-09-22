export interface Product {
  name: string;
  price: number;
  description: string;
}

export interface Products {
  id: string;
  dishType: string;
  imageSrc: string;
  items: Product[];
}

export interface Offer {
  id: string;
  dishType: string;
  imageSrc: string;
}
