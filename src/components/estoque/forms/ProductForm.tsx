/**
 * Product Form Component
 * Form for adding and editing products
 */

import React, { useState, useEffect } from 'react';
import { Product, Category, Warehouse, ProductFormData } from '../../../types/estoque';

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  warehouses: Warehouse[];
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
}

export function ProductForm({
  product,
  categories,
  warehouses,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    codigo: '',
    nome: '',
    descricao: '',
    categoria_id: 0,
    preco_venda: 0,
    preco_aquisicao: 0,
    quantidade_atual: 0,
    quantidade_minima: 0,
    unidade_medida: 'UN',
    data_validade: null,
    armazem_id: 0,
    status: 'ATIVO',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo,
        nome: product.nome,
        descricao: product.descricao || '',
        categoria_id: product.categoria_id,
        preco_venda: product.preco_venda,
        preco_aquisicao: product.preco_aquisicao || 0,
        quantidade_atual: product.quantidade_atual,
        quantidade_minima: product.quantidade_minima || 0,
        unidade_medida: product.unidade_medida as any,
        data_validade: product.data_validade,
        armazem_id: product.armazem_id || 0,
        status: product.status as any,
      });
    }
  }, [product]);

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
        <label htmlFor="nome">Nome do Produto</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="codigo">Código (SKU)</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group full-width">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoria_id">Categoria</label>
        <select
          id="categoria_id"
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="armazem_id">Armazém</label>
        <select
          id="armazem_id"
          name="armazem_id"
          value={formData.armazem_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="preco_venda">Preço de Venda (R$)</label>
        <input
          type="number"
          id="preco_venda"
          name="preco_venda"
          value={formData.preco_venda}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="preco_aquisicao">Preço de Custo (R$)</label>
        <input
          type="number"
          id="preco_aquisicao"
          name="preco_aquisicao"
          value={formData.preco_aquisicao}
          onChange={handleChange}
          step="0.01"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantidade_atual">Qtd. Atual</label>
        <input
          type="number"
          id="quantidade_atual"
          name="quantidade_atual"
          value={formData.quantidade_atual}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantidade_minima">Qtd. Mínima</label>
        <input
          type="number"
          id="quantidade_minima"
          name="quantidade_minima"
          value={formData.quantidade_minima}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="unidade_medida">Unidade</label>
        <select
          id="unidade_medida"
          name="unidade_medida"
          value={formData.unidade_medida}
          onChange={handleChange}
        >
          <option value="UN">Unidade</option>
          <option value="KG">Quilograma</option>
          <option value="L">Litro</option>
          <option value="M">Metro</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="data_validade">Data de Validade</label>
        <input
          type="date"
          id="data_validade"
          name="data_validade"
          value={
            formData.data_validade
              ? new Date(formData.data_validade).toISOString().split('T')[0]
              : ''
          }
          onChange={handleChange}
        />
      </div>
      <div className="form-footer">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Salvar Produto
        </button>
      </div>
    </form>
  );
}
