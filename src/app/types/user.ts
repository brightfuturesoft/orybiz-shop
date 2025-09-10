
export interface AuthUser {
  _id: string;
  full_name: string;
  email: string;
  workspace_id?: string | null;
  phone_number?:string
}
