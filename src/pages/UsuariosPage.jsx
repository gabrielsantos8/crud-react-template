import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UsuariosPage = () => {
  const columns = [
    {
      accessorKey: 'nome',
      header: 'Nome do Usuario',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('nome')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'E-mail',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'telefone',
      header: 'Telefone',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('telefone')}</div>
      ),
    },
    {
      accessorKey: 'cargo',
      header: 'Cargo',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('cargo')}</div>
      ),
    },
    {
      accessorKey: 'escola',
      header: 'Escola',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('escola')}</div>
      ),
    }
  ];

  const formFields = [
    {
      name: 'nome',
      label: 'Nome do Usuário',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome da Usuário'
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      required: true,
      placeholder: 'Digite o e-mail '
    },
    {
      name: 'telefone',
      label: 'Telefone',
      type: 'text',
      required: true,
      placeholder: 'Digite o Telefone '
    },
    {
      name: 'cargo',
      label: 'Cargo',
      type: 'text',
      required: true,
      placeholder: 'Digite o Cargo'
    },
    {
      name: 'escola',
      label: 'Escola',
      type: 'text',
      required: true,
      placeholder: 'Digite a Escola'
    }
  ];

  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'Usuario': item.nome,
      'Email': item.email,
      'Telefone': item.telefone,
      'Cargo': item.cargo,
      'Escola': item.escola
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Usuários', 14, 22);
    
    const tableColumn = ['Nome', 'Email', 'Telefone', 'Cargo', 'Escola'];
    const tableRows = data.map(item => [
      item.nome,
      item.email,
      item.telefone,
      item.cargo,
      item.escola,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('usuarios.pdf');
  };

  return (
    <CRUDPage
      title="Usuários"
      entityType="usuarios"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Usuários"
      searchPlaceholder="Buscar Usuários..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default UsuariosPage;

