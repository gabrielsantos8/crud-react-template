import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DataTable from './DataTable';
import FormModal from './FormModal';
import ConfirmDialog from './ConfirmDialog';
import useCRUD from '@/hooks/useCRUD';

const CRUDPage = ({ 
  title,
  entityType,
  columns,
  formFields,
  newButtonLabel = "Novo Item",
  searchPlaceholder = "Buscar...",
  onExportExcel,
  onExportPDF
}) => {
  const { data, loading, create, update, remove } = useCRUD(entityType);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreate = () => {
    setSelectedItem(null);
    setShowFormModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowFormModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowConfirmDialog(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedItem?.id) {
        await update(selectedItem.id, formData);
      } else {
        await create(formData);
      }
      setShowFormModal(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      try {
        await remove(selectedItem.id);
        setShowConfirmDialog(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">
            Gerencie {title.toLowerCase()} do sistema
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* New Item Button */}
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            {newButtonLabel}
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        searchPlaceholder={searchPlaceholder}
      />

      {/* Form Modal */}
      <FormModal
        open={showFormModal}
        onOpenChange={setShowFormModal}
        onSubmit={handleFormSubmit}
        title={selectedItem ? `Editar ${title.slice(0, -1)}` : `Novo ${title.slice(0, -1)}`}
        fields={formFields}
        initialData={selectedItem || {}}
        loading={formLoading}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmDelete}
        title="Confirmar exclusão"
        description={`Tem certeza que deseja excluir "${selectedItem?.nome || 'este item'}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
      />
    </div>
  );
};

export default CRUDPage;

