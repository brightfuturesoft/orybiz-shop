export interface Manufacturer {
  label: string;
  value: number;
  key: string;
}

export interface Brand {
  label: string;
  value: string;
  key: string;
}

export interface Color {
  label: string;
  value: string;
  key: string;
}

export interface Size {
  label: string;
  value: string;
  key: string;
}

export interface AttributeSet {
  label: string;
  value: number;
  key: string;
}

export interface Category {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  item_type: string;
  item_name: string;
  item_description: string;
  item_long_description: string;
  is_returnable: boolean;
  sku: string;
  unit: string;
  manufacturer: Manufacturer;
  brand: Brand;
  color: Color;
  size: Size;
  is_purchasable: boolean;
  purchasing_price: number;
  purchasing_account: string;
  purchasing_vat: string;
  is_saleable: boolean;
  selling_price: string;
  item_weight: string;
  sales_account: string;
  selling_vat: string;
  selling_discount: string;
  attribute_sets: AttributeSet;
  categories: Category[];
  is_track_inventory: boolean;
  stock_quantites: string;
  low_stock: string;
  is_serialized: boolean;
  is_manage_batch: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments: any[]; 
  status: string;
  code: string;
  updatedAt: string;
  delete: boolean;
  createAt: string;
  workspace_id: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
