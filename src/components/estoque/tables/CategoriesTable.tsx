/**
 * Categories Table Component
 * Displays categories with hierarchical structure
 */

'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import type { Category } from '../../../types/estoque';

export interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  getCategoryPath: (id: number) => string;
  className?: string;
}

export function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  getCategoryPath,
  className = '',
}: CategoriesTableProps) {
  const rootCategories = categories.filter((c) => !c.categoria_pai_id);

  const getChildren = (parentId: number): Category[] => {
    return categories.filter((c) => c.categoria_pai_id === parentId);
  };

  const renderCategoryRow = (category: Category, level: number = 0) => {
    const children = getChildren(category.id);
    const hasChildren = children.length > 0;

    return (
      <React.Fragment key={category.id}>
        <tr className={!category.ativo ? 'inactive' : ''} style={{ paddingLeft: `${level * 20}px` }}>
          <td style={{ paddingLeft: `${level * 20}px` }}>
            <FontAwesomeIcon icon={hasChildren ? faFolderOpen : faFolder} />
            <span style={{ marginLeft: '8px' }}>{category.nome}</span>
          </td>
          <td>{getCategoryPath(category.id)}</td>
          <td>{category.descricao || '-'}</td>
          <td>
            <span className={`status-badge ${category.ativo ? 'status-ok' : 'status-critico'}`}>
              {category.ativo ? 'Ativo' : 'Inativo'}
            </span>
          </td>
          <td>
            <div className="table-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(category)}
                aria-label="Editar"
                title="Editar"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(category.id)}
                aria-label="Excluir"
                title="Excluir"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </td>
        </tr>
        {hasChildren && children.map((child) => renderCategoryRow(child, level + 1))}
      </React.Fragment>
    );
  };

  if (categories.length === 0) {
    return (
      <div className={`table-container ${className}`}>
        <div className="table-empty">
          <p>Nenhuma categoria encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Caminho</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rootCategories.map((category) => renderCategoryRow(category))}
        </tbody>
      </table>
    </div>
  );
}

