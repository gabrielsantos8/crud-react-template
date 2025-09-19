import React from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CidadesPage = () => {
  const columns = [
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
    
    const tableColumn = ['Nome', 'UF'];
    const tableRows = data.map(item => [
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

