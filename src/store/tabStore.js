import { create } from 'zustand';

const useTabStore = create((set, get) => ({
  tabs: [],
  activeTab: null,
  
  addTab: (tab) => {
    const { tabs } = get();
    const existingTab = tabs.find(t => t.id === tab.id);
    
    if (existingTab) {
      // Se a aba já existe, apenas ativa ela
      set({ activeTab: tab.id });
    } else {
      // Adiciona nova aba e ativa ela
      set({ 
        tabs: [...tabs, tab],
        activeTab: tab.id 
      });
    }
  },
  
  removeTab: (tabId) => {
    const { tabs, activeTab } = get();
    const newTabs = tabs.filter(t => t.id !== tabId);
    
    let newActiveTab = activeTab;
    if (activeTab === tabId) {
      // Se a aba ativa foi removida, ativa a última aba ou null se não há abas
      newActiveTab = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
    }
    
    set({ 
      tabs: newTabs,
      activeTab: newActiveTab 
    });
  },
  
  setActiveTab: (tabId) => {
    set({ activeTab: tabId });
  },
  
  clearTabs: () => {
    set({ tabs: [], activeTab: null });
  }
}));

export default useTabStore;

