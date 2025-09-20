import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import {getData, postData, updateData, deleteData} from '../api';


const useCRUD = (entityType) => {
  const didRun = useRef(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    getAll(entityType)
    console.log('Carregando dados para', entityType);
  }, [entityType]);

  const getAll = async (entityType) => {
    setLoading(true);
    try {
      var dados = await getData(entityType);
      setData(dados.data || []);
      dados.data.length <= 0 && toast.success('Nenhum dado encontrado!');
      return dados;
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao carregar dados!');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Criar novo item
  const create = async (newItem) => {
    setLoading(true);
    try {
      const item = {
        ...newItem,
        createdAt: new Date().toISOString().split('T')[0]
      };
      await postData(entityType, item);
      await getAll(entityType);
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
      console.log("ID no useCRUD:", id);
      await updateData(entityType, id, updatedItem);
      await getAll(entityType);
      toast.success('Item atualizado com sucesso!');
    } catch (err) {
      setError(err.message);
      toast.error('Erro ao atualizar item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await deleteData(entityType, id);
      await getAll(entityType);
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

