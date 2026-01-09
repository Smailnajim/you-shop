export class CreateProduitDto {
  name: string;
  prix: number;
  quantity: number;
  quantityAlert?: number;
  visible?: boolean;
  SKU?: string[];
  category: string;
}
