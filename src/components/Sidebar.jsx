import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Users,
  School, 
  PlusCircle,
  GraduationCap, 
  BookOpen, 
  Building,
  Building2,
  Home,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ThemeToggle from './ThemeToggle';
import useSidebarStore from '@/store/sidebarStore';
import useTabStore from '@/store/tabStore';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    component: 'Dashboard'
  },
  {
    id: 'cadastro',
    label: 'Cadastro',
    icon: PlusCircle,
    children: [
      {
        id: 'cidades',
        label: 'Cidades',
        icon: Building2,
        component: 'Cidades'
      },
      {
        id: 'bairros',
        label: 'Bairros',
        icon: Building,
        component: 'Bairros'
      },
      {
        id: 'escolas',
        label: 'Escolas',
        icon: School,
        component: 'Escolas'
      },
    ]
  }
];

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const { addTab } = useTabStore();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleMenuClick = (item) => {
    if (item.component) {
      addTab({
        id: item.id,
        label: item.label,
        component: item.component,
        icon: item.icon
      });
    }
  };

  const renderMenuItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id];

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start h-10 px-3 hover:glass-card ${
                isCollapsed ? 'px-2' : ''
              } ${level > 0 ? 'ml-4' : ''}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="ml-3 text-sm">{item.label}</span>
                  <div className="ml-auto">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 animate-slide-up">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={`w-full justify-start h-10 px-3 hover:glass-card ${
          isCollapsed ? 'px-2' : ''
        } ${level > 0 ? 'ml-4' : ''}`}
        onClick={() => handleMenuClick(item)}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!isCollapsed && <span className="ml-3 text-sm">{item.label}</span>}
      </Button>
    );
  };

  return (
    <div className={`glass-effect border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-24' : 'w-64'
    } flex flex-col h-screen animate-fade-in`}>
      <div className="p-4 border-b border-border">{isCollapsed && (
          <div className="flex justify-center mt-2">
            <img src="/loguinho.png" alt="Logo GEMA" className="h-8 w-auto" />
          </div>
        )}
        <div className="flex items-center justify-between">
          {isCollapsed && (
          <div className="flex justify-center mt-2 mb-4">
            <img src="/loguinho.png" alt="Logo GEMA" className="h-8 w-auto" />
          </div>
        )}
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img src="/logo_gema.png" alt="Logo GEMA" className="h-8 w-auto" />
              <h2 className="text-lg font-semibold text-foreground"></h2>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-4 border-b border-border bg-background z-20 relative"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                João Silva
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Administrador
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <>
            <Separator className="my-3" />
            <Button
              variant="ghost"
              className="w-full justify-start h-9 px-2 text-muted-foreground hover:text-foreground hover:glass-card"
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-3 text-sm">Sair</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

