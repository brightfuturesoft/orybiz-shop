export type BrandType = {
  _id: string;
  brand: string;
  code: string;
  description: string;
  discount: number;
  status: "active" | "inactive"; 
  updatedAt: string; 
  delete: boolean;
  createAt: string; 
  workspace_id: string;
  created_by: string;
};
