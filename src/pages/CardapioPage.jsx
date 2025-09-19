import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CardapioPage = () => {
  const columns = [
    {
      accessorKey: 'nome',
      header: 'Nome do Usuario',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('nome')}</div>
      ),
    },
    {
      accessorKey: 'receita',
      header: 'Receita',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('receita')}</div>
      ),
    },
    {
      accessorKey: 'periodo',
      header: 'Periodo',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('periodo')}</div>
      ),
    },
    {
      accessorKey: 'cidade',
      header: 'Cidade',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('cidade')}</div>
      ),
    },
  ];

  const formFields = [
    {
      name: 'nome',
      label: 'Nome',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome...'
    },
    {
      name: 'receita',
      label: 'Receita',
      type: 'text',
      required: true,
      placeholder: 'Digite a Receita...'
    },
    {
      name: 'periodo',
      label: 'Periodo',
      type: 'text',
      required: true,
      placeholder: 'Digite o Periodo'
    },
    {
      name: 'cidade',
      label: 'Cidade',
      type: 'text',
      required: true,
      placeholder: 'Digite a Cidade'
    },
  ];

  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'Nome': item.nome,
      'Receita': item.receita,
      'Periodo': item.periodo,
      'Cidade': item.cidade
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cardapio');
    XLSX.writeFile(workbook, 'cardapio.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista Cardapio', 14, 22);
    
    const tableColumn = ['Nome', 'receitas', 'periodo', 'cidade'];
    const tableRows = data.map(item => [
      item.nome,
      item.receitas,
      item.periodo,
      item.cidade,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('cardapio.pdf');
  };

  return (
    <CRUDPage
      title="Cardapio"
      entityType="cardapio"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Cardapio"
      searchPlaceholder="Buscar Cardapio..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default CardapioPage;
