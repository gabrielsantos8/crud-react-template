import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TeachersPage = () => {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'department',
      header: 'Departamento',
    },
    {
      accessorKey: 'specialization',
      header: 'Especialização',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return (
          <Badge variant={status === 'Ativo' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Data de Criação',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return date.toLocaleDateString('pt-BR');
      },
    },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Nome Completo',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome completo'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Digite o email'
    },
    {
      name: 'department',
      label: 'Departamento',
      type: 'select',
      required: true,
      placeholder: 'Selecione o departamento',
      options: [
        { value: 'Engenharia', label: 'Engenharia' },
        { value: 'Medicina', label: 'Medicina' },
        { value: 'Direito', label: 'Direito' },
        { value: 'Psicologia', label: 'Psicologia' },
        { value: 'Arquitetura', label: 'Arquitetura' }
      ]
    },
    {
      name: 'specialization',
      label: 'Especialização',
      type: 'text',
      required: true,
      placeholder: 'Digite a especialização'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'Ativo',
      options: [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Inativo', label: 'Inativo' }
      ]
    }
  ];

  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'Nome': item.name,
      'Email': item.email,
      'Departamento': item.department,
      'Especialização': item.specialization,
      'Status': item.status,
      'Data de Criação': new Date(item.createdAt).toLocaleDateString('pt-BR')
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Professores');
    XLSX.writeFile(workbook, 'professores.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Professores', 14, 22);
    
    const tableColumn = ['Nome', 'Email', 'Departamento', 'Especialização', 'Status'];
    const tableRows = data.map(item => [
      item.name,
      item.email,
      item.department,
      item.specialization,
      item.status
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('professores.pdf');
  };

  return (
    <CRUDPage
      title="Professores"
      entityType="teachers"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Professor"
      searchPlaceholder="Buscar professores..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default TeachersPage;

