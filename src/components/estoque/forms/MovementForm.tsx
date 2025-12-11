/**
 * Movement Form Component
 * Form for registering stock movements
 */

import React, { useState } from 'react';
import { Product, MovementFormData } from '../../../types/estoque';

interface MovementFormProps {
  products: Product[];
  onSave: (data: MovementFormData) => void;
  onCancel: () => void;
}

export function MovementForm({ products, onSave, onCancel }: MovementFormProps) {
  const [formData, setFormData] = useState<MovementFormData>({
    produto_id: 0,
    tipo: 'ENTRADA',
    quantidade: 1,
    observacao: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantidade' || name === 'produto_id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group full-width">
        <label htmlFor="produto_id">Produto</label>
        <select
          id="produto_id"
          name="produto_id"
          value={formData.produto_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um produto...</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo de Movimentação</label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="ENTRADA">Entrada</option>
          <option value="SAIDA">Saída</option>
          <option value="AJUSTE">Ajuste</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantidade">Quantidade</label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div className="form-group full-width">
        <label htmlFor="observacao">Observação</label>
        <textarea
          id="observacao"
          name="observacao"
          value={formData.observacao}
          onChange={handleChange}
        />
      </div>
      <div className="form-footer">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Registrar Movimentação
        </button>
      </div>
    </form>
  );
}
