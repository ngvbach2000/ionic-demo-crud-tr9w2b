export interface Product {
  id: string;
  name: string | undefined;
  image: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
  description?: string | undefined;
  importedDate?: string | undefined;
  color?: string | undefined;
  category?: string | undefined;
  isNew?: boolean;
}
