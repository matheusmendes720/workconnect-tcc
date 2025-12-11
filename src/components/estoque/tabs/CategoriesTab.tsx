/**
 * Categories Tab Component
 * Categories management interface
 */

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CategoriesTable } from '../tables/CategoriesTable';
import { CategoryModal } from '../modals/CategoryModal';
import type { Category, CategoryFormData } from '../../../types/estoque';
import { useCategories } from '../../../lib/estoque/hooks/useCategories';

export interface CategoriesTabProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onSave: (data: CategoryFormData, categoryId?: number) => void;
  className?: string;
}

export function CategoriesTab({
  categories,
  onEdit,
  onDelete,
  onSave,
  className = '',
}: CategoriesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { getCategoryPath, filteredCategories, search, setSearch } = useCategories(categories);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData: CategoryFormData) => {
    onSave(formData, editingCategory?.id);
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className={`categories-tab ${className}`}>
      <div className="tab-toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar categorias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-gold" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} />
          Adicionar Categoria
        </button>
      </div>

      <CategoriesTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={onDelete}
        getCategoryPath={getCategoryPath}
      />

      <CategoryModal
        isOpen={isModalOpen}
        category={editingCategory}
        categories={categories}
        getCategoryPath={getCategoryPath}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
