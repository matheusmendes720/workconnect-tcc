/**
 * Product Modal Component
 * Form for creating/editing products
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Product, ProductFormData } from '../../../types/estoque';
import { FormValidator } from '../../../lib/utils/validation';

export interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  categories: Array<{ id: number; nome: string; categoria_pai_id: number | null; ativo: boolean }>;
  warehouses: Array<{ id: number; nome: string; ativo: boolean }>;
  getCategoryPath: (id: number) => string;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  className?: string;
}

export function ProductModal({
  isOpen,
  product,
  categories,
  warehouses,
  getCategoryPath,
  onClose,
  onSave,
  className = '',
}: ProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    codigo: '',
    nome: '',
    descricao: '',
    categoria_id: 0,
    quantidade_atual: 0,
    quantidade_minima: 0,
    quantidade_maxima: 0,
    preco_aquisicao: 0,
    preco_venda: 0,
    unidade_medida: 'UN',
    localizacao_fisica: '',
    armazem_id: 0,
    prazo_validade: null,
    ativo: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo,
        nome: product.nome,
        descricao: product.descricao,
        categoria_id: product.categoria_id,
        quantidade_atual: product.quantidade_atual,
        quantidade_minima: product.quantidade_minima,
        quantidade_maxima: product.quantidade_maxima,
        preco_aquisicao: product.preco_aquisicao,
        preco_venda: product.preco_venda,
        unidade_medida: product.unidade_medida,
        localizacao_fisica: product.localizacao_fisica,
        armazem_id: product.armazem_id,
        prazo_validade: product.prazo_validade,
        ativo: product.ativo,
      });
    } else {
      setFormData({
        codigo: '',
        nome: '',
        descricao: '',
        categoria_id: 0,
        quantidade_atual: 0,
        quantidade_minima: 0,
        quantidade_maxima: 0,
        preco_aquisicao: 0,
        preco_venda: 0,
        unidade_medida: 'UN',
        localizacao_fisica: '',
        armazem_id: warehouses[0]?.id || 0,
        prazo_validade: null,
        ativo: true,
      });
    }
  }, [product, warehouses]);

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
          : type === 'number'
          ? parseFloat(value) || 0
          : type === 'date'
          ? value || null
          : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <div className="modal-header">
          <h2>{product ? 'Editar Produto' : 'Adicionar Produto'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Código *</label>
            <input
              type="text"
              name="codigo"
              className="form-input"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>

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
            <label className="form-label">Categoria *</label>
            <select
              name="categoria_id"
              className="form-select"
              value={formData.categoria_id}
              onChange={handleChange}
              required
            >
              <option value={0}>Selecione...</option>
              {categories
                .filter((c) => c.ativo)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {getCategoryPath(c.id)}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Estoque Mínimo *</label>
              <input
                type="number"
                name="quantidade_minima"
                className="form-input"
                value={formData.quantidade_minima}
                onChange={handleChange}
                min={1}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estoque Máximo *</label>
              <input
                type="number"
                name="quantidade_maxima"
                className="form-input"
                value={formData.quantidade_maxima}
                onChange={handleChange}
                min={1}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Preço de Aquisição *</label>
              <input
                type="number"
                name="preco_aquisicao"
                className="form-input"
                value={formData.preco_aquisicao}
                onChange={handleChange}
                step="0.01"
                min={0}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preço de Venda *</label>
              <input
                type="number"
                name="preco_venda"
                className="form-input"
                value={formData.preco_venda}
                onChange={handleChange}
                step="0.01"
                min={0}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Unidade de Medida *</label>
              <select
                name="unidade_medida"
                className="form-select"
                value={formData.unidade_medida}
                onChange={handleChange}
                required
              >
                <option value="UN">UN (Unidade)</option>
                <option value="KG">KG (Quilograma)</option>
                <option value="L">L (Litro)</option>
                <option value="M">M (Metro)</option>
                <option value="M²">M² (Metro Quadrado)</option>
                <option value="M³">M³ (Metro Cúbico)</option>
                <option value="CX">CX (Caixa)</option>
                <option value="RESMA">RESMA</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Armazém *</label>
              <select
                name="armazem_id"
                className="form-select"
                value={formData.armazem_id}
                onChange={handleChange}
                required
              >
                <option value={0}>Selecione...</option>
                {warehouses
                  .filter((w) => w.ativo)
                  .map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.nome}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Localização Física</label>
            <input
              type="text"
              name="localizacao_fisica"
              className="form-input"
              value={formData.localizacao_fisica}
              onChange={handleChange}
              placeholder="Ex: Prateleira A-01"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prazo de Validade</label>
            <input
              type="date"
              name="prazo_validade"
              className="form-input"
              value={formData.prazo_validade || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="ativo"
                checked={formData.ativo}
                onChange={handleChange}
              />
              <span>Produto ativo</span>
            </label>
          </div>
        </form>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-gold" onClick={() => handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}

