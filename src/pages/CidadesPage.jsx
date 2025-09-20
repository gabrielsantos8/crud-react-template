import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CidadesPage = () => {
  const columns = [
    {
      accessorKey: 'codIbge',
      header: 'Cód. IBGE',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('codIbge')}</div>
      ),
    },
    {
      accessorKey: 'nome',
      header: 'Nome da Cidade',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('nome')}</div>
      ),
    },
    {
      accessorKey: 'uf',
      header: 'UF',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('uf')}</div>
      ),
    }
  ];

  const formFields = [
    {
      name: 'codIbge',
      label: 'Cód. IBGE',
      type: 'number',
      required: true,
      placeholder: 'Digite o IBGE da cidade'
    },
    {
      name: 'nome',
      label: 'Nome da Cidade',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome da cidade'
    },
    {
      name: 'uf',
      label: 'UF da Cidade',
      type: 'text',
      required: true,
      placeholder: 'Digite a uf da cidade'
    }
  ];

  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'IBGE': item.codIbge,
      'Nome da Cidade': item.nome,
      'UF': item.uf
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cidades');
    XLSX.writeFile(workbook, 'cidades.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Cidades', 14, 22);
    
    const tableColumn = ['IBGE', 'Nome', 'UF'];
    const tableRows = data.map(item => [
      item.codIbge,
      item.nome,
      item.uf
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('cidades.pdf');
  };

  return (
    <CRUDPage
      title="Cidades"
      entityType="cidades"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Nova Cidade"
      searchPlaceholder="Buscar cidades..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default CidadesPage;

