import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import CRUDPage from '@/components/CRUDPage';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {getData} from '@/api';

const EscolasPage = () => {
  const didRun = useRef(false);

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    getCidades();
  }, []);

  const getCidades = async () => {
    if (didRun.current) return;
    didRun.current = true;
    try {
      var dados = await getData('cidades');
      setCidades(dados.data || []);
      return dados;
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao carregar cidades!');
      throw err;
    }
  };

  const getBairros = async (id_cidade) => {
    try {
      var dados = await getData('bairros');
      setBairros(dados.data || []);
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao carregar bairros!');
      throw err;
    }
  };

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
      name: 'id_cidade',
      label: 'Cidade',
      type: 'select',
      required: true,
      placeholder: 'Selecione a cidade da escola',
      options: cidades,
      labelField: 'nome',
      valueField: 'id',
      callback: (value) => getBairros(value)
    },
    {
      name: 'id_bairro',
      label: 'Bairro',
      type: 'select',
      required: true,
      placeholder: 'Selecione o bairro da escola',
      options: bairros,
      labelField: 'nome',
      valueField: 'id'
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
      item.nome,
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

