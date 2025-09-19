import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EscolasPage = () => {
  const columns = [
    {
      accessorKey: 'nome',
      header: 'Nome da Escola',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('nome')}</div>
      ),
    },
    {
      accessorKey: 'cidade',
      header: 'Cidade',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('cidade')}</div>
      ),
    },
    {
      accessorKey: 'bairro',
      header: 'Bairro',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('bairro')}</div>
      ),
    }
  ];

  const formFields = [
    {
      name: 'nome',
      label: 'Nome da Escola',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome da escola'
    },
    {
      name: 'cidade',
      label: 'Cidade da Escola',
      type: 'text',
      required: true,
      placeholder: 'Ex: ENG001'
    },
    {
      name: 'bairro',
      label: 'Bairro',
      type: 'number',
      required: true,
      placeholder: 'Digite o número de créditos'
    }
  ];

  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'Nome da Escola': item.nome,
      'Cidade': item.cidade,
      'Bairro': item.bairro
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Escolas');
    XLSX.writeFile(workbook, 'escolas.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Escolas', 14, 22);
    
    const tableColumn = ['Nome', 'Cidade', 'Bairro'];
    const tableRows = data.map(item => [
      item.name,
      item.cidade,
      item.bairro
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('escolas.pdf');
  };

  return (
    <CRUDPage
      title="Escolas"
      entityType="escolas"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Nova Escola"
      searchPlaceholder="Buscar escolas..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default EscolasPage;

