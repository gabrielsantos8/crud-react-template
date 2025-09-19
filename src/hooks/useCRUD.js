import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Mock data para demonstração
const mockData = {
  students: [
    { id: 1, name: 'Ana Silva', email: 'ana@email.com', course: 'Engenharia', status: 'Ativo', createdAt: '2024-01-15' },
    { id: 2, name: 'Carlos Santos', email: 'carlos@email.com', course: 'Medicina', status: 'Ativo', createdAt: '2024-01-20' },
    { id: 3, name: 'Maria Oliveira', email: 'maria@email.com', course: 'Direito', status: 'Inativo', createdAt: '2024-02-01' },
    { id: 4, name: 'João Costa', email: 'joao@email.com', course: 'Psicologia', status: 'Ativo', createdAt: '2024-02-10' },
    { id: 5, name: 'Lucia Ferreira', email: 'lucia@email.com', course: 'Arquitetura', status: 'Ativo', createdAt: '2024-02-15' }
  ],
  teachers: [
    { id: 1, name: 'Dr. Roberto Lima', email: 'roberto@email.com', department: 'Engenharia', specialization: 'Estruturas', status: 'Ativo', createdAt: '2023-08-15' },
    { id: 2, name: 'Dra. Patricia Rocha', email: 'patricia@email.com', department: 'Medicina', specialization: 'Cardiologia', status: 'Ativo', createdAt: '2023-09-01' },
    { id: 3, name: 'Prof. Marcos Alves', email: 'marcos@email.com', department: 'Direito', specialization: 'Civil', status: 'Ativo', createdAt: '2023-10-12' }
  ],
  courses: [
    { id: 1, name: 'Engenharia Civil', code: 'ENG001', duration: '5 anos', credits: 240, status: 'Ativo', createdAt: '2023-01-10' },
    { id: 2, name: 'Medicina', code: 'MED001', duration: '6 anos', credits: 360, status: 'Ativo', createdAt: '2023-01-15' },
    { id: 3, name: 'Direito', code: 'DIR001', duration: '5 anos', credits: 200, status: 'Ativo', createdAt: '2023-01-20' }
  ],
  departments: [
    { id: 1, name: 'Departamento de Engenharia', code: 'DEPT-ENG', head: 'Dr. Roberto Lima', budget: 'R$ 500.000', status: 'Ativo', createdAt: '2023-01-01' },
    { id: 2, name: 'Departamento de Medicina', code: 'DEPT-MED', head: 'Dra. Patricia Rocha', budget: 'R$ 800.000', status: 'Ativo', createdAt: '2023-01-01' },
    { id: 3, name: 'Departamento de Direito', code: 'DEPT-DIR', head: 'Prof. Marcos Alves', budget: 'R$ 300.000', status: 'Ativo', createdAt: '2023-01-01' }
  ]
};

const useCRUD = (entityType) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular carregamento inicial dos dados
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData[entityType] || []);
      setLoading(false);
    }, 500);
  }, [entityType]);

  // Criar novo item
  const create = async (newItem) => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const item = {
        ...newItem,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setData(prev => [...prev, item]);
      toast.success('Item criado com sucesso!');
      return item;
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao criar item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar item existente
  const update = async (id, updatedItem) => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ));
      toast.success('Item atualizado com sucesso!');
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao atualizar item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar item
  const remove = async (id) => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData(prev => prev.filter(item => item.id !== id));
      toast.success('Item removido com sucesso!');
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao remover item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getById = (id) => {
    return data.find(item => item.id === id);
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    getById,
    setData
  };
};

export default useCRUD;

