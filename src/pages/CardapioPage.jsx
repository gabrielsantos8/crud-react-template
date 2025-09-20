import React, { useEffect, useRef, useState } from 'react';
import { getCidades } from '@/api';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CardapioPage = () => {

  const [cidadeOptions, setCidadeOptions] = useState([]);
    const didRun = useRef(false);
    useEffect(() => {
      if (didRun.current) return;
      didRun.current = true;
      const fetchCidades = async () => {
        const cidades = await getCidades();
        console.log(cidades);
        const cidadesArray = Array.isArray(cidades.data) ? cidades.data : [];
        setCidadeOptions(
          cidadesArray.map(cidade => ({
            label: cidade.nome,
            value: String(cidade.id) 
          }))
        );
      };
      console.log(cidadeOptions);
      fetchCidades();
    }, []);

  const columns = [
    {
      accessorKey: 'nome',
      header: 'Nome',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('nome')}</div>
      ),
    },
    {
      accessorKey: 'item',
      header: 'Itens',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('item')}</div>
      ),
    },
    {
      accessorKey: 'data',
      header: 'Data',
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue('data')}</div>
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
      name: 'item',
      label: 'Items',
      type: 'text',
      required: true,
      placeholder: 'Digite os Itens...'
    },
    {
      name: 'data',
      label: 'Data',
      type: 'date',
      required: true,
      placeholder: 'Selecione a Data'
    },
    {
      name: 'id_cidade',
      label: 'Cidade',
      type: 'select',
      required: true,
      placeholder: 'Selecione a cidade',
      options: cidadeOptions,
    }
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
      item.items,
      item.data,
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
      entityType="cardapios"
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
