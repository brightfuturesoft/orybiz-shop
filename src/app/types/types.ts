export interface TWorkSpace {
  _id: string;
  name: string;
  image: string;
  terms: string;
  description: string;
  unique_id: string;
  created_at: string;
  updated_at: string;
  top_bar_notice: string;
  is_active: boolean;
  permissions: string[];
  address_info: {
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address: string;
  };
  basic_info: {
    name: string;
    legal_name: string;
    registration_number: string;
    vat_number: string;
    industry: string;
    description: string;
  };
  contact_info: {
    official_email: string;
    support_email: string;
    phone_number: string[];
  };
  social_info: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    whatsapp: string;
  };
  domain_info: {
    domain: string;
    subdomain: string;
  };
  message_info: {
    message_chat: boolean;
    whatsapp: boolean;
    messenger: boolean;
    phone_number: boolean;
  };
}



export interface CategoryType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  _id: string;
  name: string;
  workspace_id: string;
  is_active: boolean;
}


export interface Category {
  _id: string;
  name: string;
  parentId?: string;
  level: number;
  children?: Category[];
  image?: string;
  code?: string;
  description?: string;
  status?: string;
  path?: string;
  workspace_id?: string;
  created_by?: string;
}


export interface Banner {
  _id: string;
  workspace_id: string;
  image_url: string;
}


export interface Address {
  _id: string;            
  user_id: string;       
  type: "shipping" | "billing";  
  full_name: string;     
  street: string;        
  city: string;          
  state?: string;        
  postal_code?: string; 
  country?: string;     
  phone: string;         
}
