"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

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

interface WorkspaceContextType {
  data: AppDataType | null;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [workspaceData, setWorkspaceData] = useState<AppDataType | null>(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const host = window.location.host; 
      const res = await fetch(`http://localhost:5005/api/v1/auth/check-workspace?unique_id=${host}`);
      const json = await res.json();
      setWorkspaceData(json.data);
    };
    fetchWorkspace();
  }, []);

  return (
    <WorkspaceContext.Provider value={{ data: workspaceData }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
};
