/**
 * Supplier Modal Component
 * Form for creating/editing suppliers
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Supplier, SupplierFormData } from '../../../types/estoque';
import { FormValidator } from '../../../lib/utils/validation';
import { formatCNPJ, formatPhone } from '../../../lib/utils/formatters';

export interface SupplierModalProps {
  isOpen: boolean;
  supplier: Supplier | null;
  onClose: () => void;
  onSave: (data: SupplierFormData) => void;
  className?: string;
}

export function SupplierModal({
  isOpen,
  supplier,
  onClose,
  onSave,
  className = '',
}: SupplierModalProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: '',
    tempo_medio_entrega_dias: 7,
    condicoes_pagamento: '',
    avaliacao: 5.0,
    ativo: true,
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        razao_social: supplier.razao_social,
        nome_fantasia: supplier.nome_fantasia,
        cnpj: supplier.cnpj,
        telefone: supplier.telefone,
        email: supplier.email,
        endereco: supplier.endereco,
        tempo_medio_entrega_dias: supplier.tempo_medio_entrega_dias,
        condicoes_pagamento: supplier.condicoes_pagamento,
        avaliacao: supplier.avaliacao,
        ativo: supplier.ativo,
      });
    } else {
      setFormData({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        telefone: '',
        email: '',
        endereco: '',
        tempo_medio_entrega_dias: 7,
        condicoes_pagamento: '',
        avaliacao: 5.0,
        ativo: true,
      });
    }
  }, [supplier]);

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
          : name === 'cnpj'
          ? formatCNPJ(value)
          : name === 'telefone'
          ? formatPhone(value)
          : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <div className="modal-header">
          <h2>{supplier ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Razão Social *</label>
            <input
              type="text"
              name="razao_social"
              className="form-input"
              value={formData.razao_social}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nome Fantasia *</label>
            <input
              type="text"
              name="nome_fantasia"
              className="form-input"
              value={formData.nome_fantasia}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">CNPJ *</label>
            <input
              type="text"
              name="cnpj"
              className="form-input"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Telefone *</label>
              <input
                type="text"
                name="telefone"
                className="form-input"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Endereço *</label>
            <input
              type="text"
              name="endereco"
              className="form-input"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Tempo Médio de Entrega (dias) *</label>
              <input
                type="number"
                name="tempo_medio_entrega_dias"
                className="form-input"
                value={formData.tempo_medio_entrega_dias}
                onChange={handleChange}
                min={1}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Avaliação *</label>
              <input
                type="number"
                name="avaliacao"
                className="form-input"
                value={formData.avaliacao}
                onChange={handleChange}
                min={0}
                max={5}
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Condições de Pagamento</label>
            <input
              type="text"
              name="condicoes_pagamento"
              className="form-input"
              value={formData.condicoes_pagamento}
              onChange={handleChange}
              placeholder="Ex: 30/60 dias"
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
              <span>Fornecedor ativo</span>
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

