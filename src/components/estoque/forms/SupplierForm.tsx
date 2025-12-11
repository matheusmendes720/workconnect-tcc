/**
 * Supplier Form Component
 * Form for adding and editing suppliers
 */

import React, { useState, useEffect } from 'react';
import { Supplier, SupplierFormData } from '../../../types/estoque';

interface SupplierFormProps {
  supplier?: Supplier | null;
  onSave: (data: SupplierFormData) => void;
  onCancel: () => void;
}

export function SupplierForm({ supplier, onSave, onCancel }: SupplierFormProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    nome_fantasia: '',
    razao_social: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    status: 'ATIVO',
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        nome_fantasia: supplier.nome_fantasia,
        razao_social: supplier.razao_social,
        cnpj: supplier.cnpj,
        email: supplier.email || '',
        telefone: supplier.telefone || '',
        endereco: supplier.endereco || '',
        status: supplier.status as any,
      });
    }
  }, [supplier]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label htmlFor="nome_fantasia">Nome Fantasia</label>
        <input
          type="text"
          id="nome_fantasia"
          name="nome_fantasia"
          value={formData.nome_fantasia}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="razao_social">Razão Social</label>
        <input
          type="text"
          id="razao_social"
          name="razao_social"
          value={formData.razao_social}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cnpj">CNPJ</label>
        <input
          type="text"
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group full-width">
        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
        />
      </div>
      <div className="form-footer">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Salvar Fornecedor
        </button>
      </div>
    </form>
  );
}
