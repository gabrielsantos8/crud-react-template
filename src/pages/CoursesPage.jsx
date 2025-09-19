import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CoursesPage = () => {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Nome do Curso',
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
      accessorKey: 'duration',
      header: 'Duração',
    },
    {
      accessorKey: 'credits',
      header: 'Créditos',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('credits')}</div>
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
      label: 'Nome do Curso',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome do curso'
    },
    {
      name: 'code',
      label: 'Código do Curso',
      type: 'text',
      required: true,
      placeholder: 'Ex: ENG001'
    },
    {
      name: 'duration',
      label: 'Duração',
      type: 'select',
      required: true,
      placeholder: 'Selecione a duração',
      options: [
        { value: '2 anos', label: '2 anos' },
        { value: '3 anos', label: '3 anos' },
        { value: '4 anos', label: '4 anos' },
        { value: '5 anos', label: '5 anos' },
        { value: '6 anos', label: '6 anos' }
      ]
    },
    {
      name: 'credits',
      label: 'Créditos',
      type: 'number',
      required: true,
      placeholder: 'Digite o número de créditos'
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
      'Nome do Curso': item.name,
      'Código': item.code,
      'Duração': item.duration,
      'Créditos': item.credits,
      'Status': item.status,
      'Data de Criação': new Date(item.createdAt).toLocaleDateString('pt-BR')
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cursos');
    XLSX.writeFile(workbook, 'cursos.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Cursos', 14, 22);
    
    const tableColumn = ['Nome', 'Código', 'Duração', 'Créditos', 'Status'];
    const tableRows = data.map(item => [
      item.name,
      item.code,
      item.duration,
      item.credits.toString(),
      item.status
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('cursos.pdf');
  };

  return (
    <CRUDPage
      title="Cursos"
      entityType="courses"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Curso"
      searchPlaceholder="Buscar cursos..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default CoursesPage;

