import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DepartmentsPage = () => {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Nome do Departamento',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'code',
      header: 'Código',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('code')}</div>
      ),
    },
    {
      accessorKey: 'head',
      header: 'Chefe do Departamento',
    },
    {
      accessorKey: 'budget',
      header: 'Orçamento',
      cell: ({ row }) => (
        <div className="font-medium text-green-600">{row.getValue('budget')}</div>
      ),
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
      label: 'Nome do Departamento',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome do departamento'
    },
    {
      name: 'code',
      label: 'Código do Departamento',
      type: 'text',
      required: true,
      placeholder: 'Ex: DEPT-ENG'
    },
    {
      name: 'head',
      label: 'Chefe do Departamento',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome do chefe'
    },
    {
      name: 'budget',
      label: 'Orçamento',
      type: 'text',
      required: true,
      placeholder: 'Ex: R$ 500.000'
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
      'Nome do Departamento': item.name,
      'Código': item.code,
      'Chefe': item.head,
      'Orçamento': item.budget,
      'Status': item.status,
      'Data de Criação': new Date(item.createdAt).toLocaleDateString('pt-BR')
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Departamentos');
    XLSX.writeFile(workbook, 'departamentos.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Departamentos', 14, 22);
    
    const tableColumn = ['Nome', 'Código', 'Chefe', 'Orçamento', 'Status'];
    const tableRows = data.map(item => [
      item.name,
      item.code,
      item.head,
      item.budget,
      item.status
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('departamentos.pdf');
  };

  return (
    <CRUDPage
      title="Departamentos"
      entityType="departments"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Departamento"
      searchPlaceholder="Buscar departamentos..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default DepartmentsPage;

