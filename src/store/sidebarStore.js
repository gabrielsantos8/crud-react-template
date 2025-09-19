import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isCollapsed: false,
  
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  
  setSidebarCollapsed: (collapsed) => set({ isCollapsed: collapsed })
}));

export default useSidebarStore;

