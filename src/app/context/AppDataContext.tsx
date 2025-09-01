'use client';
import React, { createContext, useContext } from 'react';

export interface AppDataType {
  _id: string;
  name: string;
  terms: string;
  description: string;
  unique_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  permissions: string[];
  address_info: Record<string, string>;
  basic_info: Record<string, string>;
  contact_info: {
    official_email: string;
    support_email: string;
    phone_number: string[];
    fax_number: string;
  };
  social_info: Record<string, string>;
  domain_info: Record<string, string>;
  message_info: Record<string, boolean>;
}

interface AppDataContextType {
  data: AppDataType | null;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);
export const AppDataProvider = ({
  value,
  children,
}: {
  value: AppDataType;
  children: React.ReactNode;
}) => {
  return (
    <AppDataContext.Provider value={{ data: value }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};
