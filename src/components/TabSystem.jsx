import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTabStore from '@/store/tabStore';

// Importar as páginas específicas
import StudentsPage from '@/pages/StudentsPage';
import TeachersPage from '@/pages/TeachersPage';
import CoursesPage from '@/pages/CoursesPage';
import EscolasPage from '@/pages/EscolasPage';
import CidadesPage from '@/pages/CidadesPage';
import BairrosPage from '@/pages/BairrosPage';
import UsuariosPage from '@/pages/UsuariosPage';
import CardapioPage from '@/pages/CardapioPage';
import DepartmentsPage from '@/pages/DepartmentsPage';

const Dashboard = () => (
  <div className="p-6 animate-fade-in">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p className="text-muted-foreground">Bem-vindo ao painel de controle!</p>
    <p className="text-muted-foreground">Em breve mais informações.</p>

  </div>
);

const componentMap = {
  Dashboard,
  Cidades: CidadesPage,
  Escolas: EscolasPage,
  Bairros: BairrosPage,
  Usuarios: UsuariosPage,
  Cardapio: CardapioPage
};

const TabSystem = () => {
  const { tabs, activeTab, removeTab, setActiveTab } = useTabStore();

  if (tabs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center">
        <img
        src="/logo_gema_completo.png"
        alt="Logo GEMA"
        className="mx-auto mb-4 w-48 max-w-full"
        draggable={false}
        />
        <h2 className="text-xl font-semibold text-muted-foreground mb-2">
        Nenhuma aba aberta
        </h2>
        <p className="text-muted-foreground">
        Selecione um item do menu para começar
        </p>
      </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Tab Headers */}
        <div className="border-b border-border glass-effect">
          <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <div key={tab.id} className="flex items-center animate-scale-in">
                  <TabsTrigger
                    value={tab.id}
                    className={`h-12 px-4 rounded-t-md border-b-2
                    ${activeTab === tab.id
                        ? 'border-primary bg-white/70 shadow-md'
                        : 'border-transparent bg-transparent hover:bg-muted/40'}
                    transition-all duration-300 font-medium relative group
                  `}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-1 mr-2 opacity-60 group-hover:opacity-100 hover:bg-red-100 hover:text-destructive transition-all duration-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTab(tab.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </TabsTrigger>
                </div>
              );
            })}
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          {tabs.map((tab) => {
            const Component = componentMap[tab.component];
            return (
              <TabsContent key={tab.id} value={tab.id} className="h-full m-0 animate-fade-in">
                {Component ? <Component /> : (
                  <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">{tab.label}</h1>
                    <p className="text-muted-foreground">Componente não encontrado: {tab.component}</p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default TabSystem;

