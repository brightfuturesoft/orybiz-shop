'use client';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';

export interface Workspace {
  id: string;
  name: string;
  description?: string;
}

const fetchWorkspaces = async (): Promise<Workspace[]> => {
  const { data } = await axiosInstance.get('/workspaces'); 
  return data;
};

export const useWorkspaces = () => {
  return useQuery<Workspace[], Error>({
    queryKey: ['workspaces'],
    queryFn: fetchWorkspaces,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
