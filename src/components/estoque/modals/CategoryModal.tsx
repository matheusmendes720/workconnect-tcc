/**
 * Category Modal Component
 * Form for creating/editing categories
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Category, CategoryFormData } from '../../../types/estoque';
import { FormValidator } from '../../../lib/utils/validation';

export interface CategoryModalProps {
  isOpen: boolean;
  category: Category | null;
  categories: Category[];
  getCategoryPath: (id: number) => string;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  className?: string;
}

export function CategoryModal({
  isOpen,
  category,
  categories,
  getCategoryPath,
  onClose,
  onSave,
  className = '',
}: CategoryModalProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    nome: '',
    descricao: '',
    categoria_pai_id: null,
    ativo: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        nome: category.nome,
        descricao: category.descricao,
        categoria_pai_id: category.categoria_pai_id,
        ativo: category.ativo,
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        categoria_pai_id: null,
        ativo: true,
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (FormValidator.validateForm(form)) {
      onSave(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'categoria_pai_id'
          ? value === '' || value === '0'
            ? null
            : parseInt(value)
          : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <div className="modal-header">
          <h2>{category ? 'Editar Categoria' : 'Adicionar Categoria'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Nome *</label>
            <input
              type="text"
              name="nome"
              className="form-input"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="descricao"
              className="form-textarea"
              rows={3}
              value={formData.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Categoria Pai</label>
            <select
              name="categoria_pai_id"
              className="form-select"
              value={formData.categoria_pai_id || ''}
              onChange={handleChange}
            >
              <option value="">Nenhuma (Categoria Raiz)</option>
              {categories
                .filter((c) => c.ativo && c.id !== category?.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {getCategoryPath(c.id)}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="ativo"
                checked={formData.ativo}
                onChange={handleChange}
              />
              <span>Categoria ativa</span>
            </label>
          </div>
        </form>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-gold" type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}

