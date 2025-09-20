import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useRef, useState } from 'react';
import { getCidades } from '@/api';

const BairrosPage = () => {
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
      header: 'Nome da Bairro',
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
    }
  ];

  const formFields = [
    {
      name: 'nome',
      label: 'Nome da Bairro',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome da bairro',
    },
    {
      name: 'id_cidade',
      label: 'Cidade da Bairro',
      type: 'select',
      required: true,
      placeholder: 'Selecione a cidade',
      options: cidadeOptions,
    }
  ];

  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'Nome da Bairro': item.nome,
      'Cidade': item.cidade
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bairros');
    XLSX.writeFile(workbook, 'bairros.xlsx');
  };

  const handleExportPDF = (data) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Lista de Bairros', 14, 22);
    
    const tableColumn = ['Nome', 'Cidade'];
    const tableRows = data.map(item => [
      item.nome,
      item.cidade
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('bairros.pdf');
  };

  return (
    <CRUDPage
      title="Bairros"
      entityType="bairros"
      columns={columns}
      formFields={formFields}
      newButtonLabel="Novo Bairro"
      searchPlaceholder="Buscar bairros..."
      onExportExcel={handleExportExcel}
      onExportPDF={handleExportPDF}
    />
  );
};

export default BairrosPage;

