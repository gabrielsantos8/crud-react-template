import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentsPage = () => {
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
      accessorKey: 'course',
      header: 'Curso',
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
      name: 'course',
      label: 'Curso',
      type: 'select',
      required: true,
      placeholder: 'Selecione o curso',
      options: [
        { value: 'Engenharia', label: 'Engenharia' },
        { value: 'Medicina', label: 'Medicina' },
        { value: 'Direito', label: 'Direito' },
        { value: 'Psicologia', label: 'Psicologia' },
        { value: 'Arquitetura', label: 'Arquitetura' }
      ]
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
      'Curso': item.course,
      'Status': item.status,
      'Data de Criação': new Date(item.createdAt).toLocaleDateString('pt-BR')
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudantes');
    XLSX.writeFile(workbook, 'estudantes.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Estudantes', 14, 22);
    
    const tableColumn = ['Nome', 'Email', 'Curso', 'Status', 'Data de Criação'];
    const tableRows = data.map(item => [
      item.name,
      item.email,
      item.course,
      item.status,
      new Date(item.createdAt).toLocaleDateString('pt-BR')
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('estudantes.pdf');
  };

  return (
    <CRUDPage
      title="Estudantes"
      entityType="students"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Estudante"
      searchPlaceholder="Buscar estudantes..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default StudentsPage;

