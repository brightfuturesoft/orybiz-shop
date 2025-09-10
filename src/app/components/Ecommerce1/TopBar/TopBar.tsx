import { useWorkspaceStore } from '@/store/workspaceStore';
import React from 'react';

const TopBar: React.FC = () => {
  const workspace = useWorkspaceStore((state) => state.workspace);
  return (
    <div className="w-full h-[48px] bg-black flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
      <p className="text-white text-center text-sm sm:text-base md:text-base lg:text-base truncate md:truncate-none">
      {workspace?.top_bar_notice}
      </p>
    </div>
  );
};

export default TopBar;
