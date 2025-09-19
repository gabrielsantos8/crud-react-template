# GEMA - Gestão Escolar de Merenda e Alimentos 

Um sistema CRUD moderno e elegante construído com React, featuring design liquid glass, sistema de abas e funcionalidades completas de gerenciamento de dados.

## 🚀 Características

### Design e UI/UX
- **Liquid Glass Design**: Efeitos de vidro líquido com blur e transparência
- **Tema Claro/Escuro**: Alternância suave entre temas com paleta personalizada
- **Animações Suaves**: Transições e micro-interações elegantes
- **Responsivo**: Design adaptável para desktop e mobile

### Funcionalidades
- **Sistema de Abas**: Navegação por abas com instância única por tela
- **Menu Colapsável**: Sidebar com sub-menus expansíveis
- **CRUD Completo**: Criar, ler, atualizar e deletar registros
- **Filtros e Busca**: Sistema de filtros por coluna e busca global
- **Exportação**: Exportar dados para Excel e PDF
- **Notificações**: Sistema de toast para feedback do usuário

### Entidades Gerenciadas
- **Estudantes**: Gerenciamento completo de estudantes
- **Professores**: Controle de professores e especializações
- **Cursos**: Administração de cursos e créditos
- **Departamentos**: Gestão de departamentos e orçamentos

## 🎨 Paleta de Cores

### Tema Claro
- **Primária**: #067dff (Azul vibrante)
- **Fundo**: #edf9ff (Azul muito claro)
- **Cards**: rgba(255, 255, 255, 0.7) com efeito glass

### Tema Escuro
- **Primária**: #3b82f6 (Azul suave)
- **Fundo**: #18181B (Cinza escuro)
- **Cards**: rgba(14, 44, 93, 0.7) com efeito glass

## 🛠️ Tecnologias Utilizadas

- **React 19**: Framework principal
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Styling e design system
- **Shadcn/UI**: Componentes UI modernos
- **Zustand**: Gerenciamento de estado
- **TanStack Table**: Tabelas avançadas com filtros
- **Lucide React**: Ícones modernos
- **React Hot Toast**: Sistema de notificações
- **XLSX**: Exportação para Excel
- **jsPDF**: Exportação para PDF
- **Framer Motion**: Animações (pré-instalado)

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd crud-system

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### Configuração
O arquivo `.env` contém as configurações da API:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
VITE_API_STUDENTS=/students
VITE_API_TEACHERS=/teachers
VITE_API_COURSES=/courses
VITE_API_DEPARTMENTS=/departments
```

## 🎯 Funcionalidades Detalhadas

### Sistema de Navegação
- **Menu Colapsável**: Sidebar que pode ser recolhida mostrando apenas ícones
- **Sub-menus**: Menus expansíveis com animações suaves
- **Sistema de Abas**: Cada tela abre em uma nova aba, sem duplicatas
- **Instância Única**: Não permite múltiplas instâncias da mesma tela

### Operações CRUD
- **Criação**: Modal com formulário validado para novos registros
- **Leitura**: Tabela com paginação, filtros e busca
- **Atualização**: Modal pré-preenchido para edição
- **Exclusão**: Modal de confirmação com aviso

### Tabela Avançada
- **Ordenação**: Clique nos cabeçalhos para ordenar
- **Filtros**: Busca global e filtros por coluna
- **Paginação**: Navegação por páginas com controles
- **Ações Contextuais**: Menu dropdown para cada linha

### Exportação
- **Excel**: Exportação completa dos dados filtrados
- **PDF**: Geração de relatório em PDF com formatação

## 🎨 Customização

### Cores
As cores podem ser customizadas no arquivo `src/App.css` nas variáveis CSS:

```css
:root {
  --primary: #067dff;
  --background: #edf9ff;
  /* ... outras variáveis */
}

.dark {
  --primary: #3b82f6;
  --background: #18181B;
  /* ... outras variáveis */
}
```

### Efeitos Glass
Os efeitos liquid glass são aplicados através das classes:
- `.glass-effect`: Efeito principal com blur
- `.glass-card`: Cards com efeito glass e hover

## 📱 Responsividade

A aplicação é totalmente responsiva com:
- **Desktop**: Layout completo com sidebar expandida
- **Tablet**: Sidebar colapsável automática
- **Mobile**: Menu overlay e tabelas scrolláveis

## 🔧 Desenvolvimento

### Adicionando Nova Entidade
1. Criar página em `src/pages/`
2. Definir colunas e campos do formulário
3. Adicionar ao menu em `Sidebar.jsx`
4. Registrar no `componentMap` em `TabSystem.jsx`

### Customizando Componentes
Todos os componentes são modulares e podem ser facilmente customizados ou estendidos.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugestões e melhorias.

---

Desenvolvido com ❤️ usando React e tecnologias modernas.