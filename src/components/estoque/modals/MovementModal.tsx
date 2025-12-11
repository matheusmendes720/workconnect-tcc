/**
 * Movement Modal Component
 * Form for creating/editing movements
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Movement, Product, User, MovementType, MovementFormData } from '../../../types/estoque';
import { MovementType as MovementTypeEnum } from '../../../types/estoque';
import { FormValidator } from '../../../lib/utils/validation';

// MovementFormData is imported from types

export interface MovementModalProps {
  isOpen: boolean;
  movement: Movement | null;
  products: Product[];
  users: User[];
  onClose: () => void;
  onSave: (data: MovementFormData & { usuario_id: number }) => void;
  className?: string;
}

export function MovementModal({
  isOpen,
  movement,
  products,
  users,
  onClose,
  onSave,
  className = '',
}: MovementModalProps) {
  const [formData, setFormData] = useState<MovementFormData & { usuario_id: number }>({
    produto_id: 0,
    usuario_id: users[0]?.id || 0,
    tipo: MovementTypeEnum.ENTRADA_COMPRA,
    quantidade: 0,
    preco_unitario: undefined,
    documento_fiscal: undefined,
    observacao: undefined,
    local_origem: undefined,
    local_destino: undefined,
  });

  useEffect(() => {
    if (movement) {
      setFormData({
        produto_id: movement.produto_id,
        usuario_id: movement.usuario_id,
        tipo: movement.tipo,
        quantidade: movement.quantidade,
        preco_unitario: movement.preco_unitario || undefined,
        documento_fiscal: movement.documento_fiscal || undefined,
        observacao: movement.observacao || undefined,
        local_origem: movement.local_origem || undefined,
        local_destino: movement.local_destino || undefined,
      });
    } else {
      setFormData({
        produto_id: products[0]?.id || 0,
        usuario_id: users[0]?.id || 0,
        tipo: MovementTypeEnum.ENTRADA_COMPRA,
        quantidade: 0,
        preco_unitario: undefined,
        documento_fiscal: undefined,
        observacao: undefined,
        local_origem: undefined,
        local_destino: undefined,
      });
    }
  }, [movement, products, users]);

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'produto_id' || name === 'usuario_id' || name === 'quantidade'
          ? Number(value)
          : name === 'preco_unitario'
          ? value === '' ? undefined : Number(value)
          : value === ''
          ? undefined
          : value,
    }));
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      tipo: e.target.value as MovementType,
    }));
  };

  const showTransferFields = formData.tipo === MovementTypeEnum.TRANSFERENCIA;
  const showPriceField =
    formData.tipo === MovementTypeEnum.ENTRADA_COMPRA ||
    formData.tipo === MovementTypeEnum.ENTRADA_DEVOLUCAO;

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${className}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{movement ? 'Editar Movimentação' : 'Nova Movimentação'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="produto_id">
                Produto *
              </label>
              <select
                id="produto_id"
                name="produto_id"
                className="form-select"
                value={formData.produto_id}
                onChange={handleChange}
                required
              >
                <option value={0}>Selecione um produto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.codigo} - {product.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="tipo">
                Tipo *
              </label>
              <select
                id="tipo"
                name="tipo"
                className="form-select"
                value={formData.tipo}
                onChange={handleTipoChange}
                required
              >
                <option value={MovementTypeEnum.ENTRADA_COMPRA}>Entrada - Compra</option>
                <option value={MovementTypeEnum.ENTRADA_DEVOLUCAO}>Entrada - Devolução</option>
                <option value={MovementTypeEnum.SAIDA_VENDA}>Saída - Venda</option>
                <option value={MovementTypeEnum.SAIDA_PERDA}>Saída - Perda</option>
                <option value={MovementTypeEnum.TRANSFERENCIA}>Transferência</option>
                <option value={MovementTypeEnum.AJUSTE_INVENTARIO}>Ajuste de Inventário</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="quantidade">
                Quantidade *
              </label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                className="form-input"
                value={formData.quantidade}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {showPriceField && (
              <div className="form-group">
                <label className="form-label" htmlFor="preco_unitario">
                  Preço Unitário
                </label>
                <input
                  type="number"
                  id="preco_unitario"
                  name="preco_unitario"
                  className="form-input"
                  value={formData.preco_unitario ?? ''}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="usuario_id">
                Usuário *
              </label>
              <select
                id="usuario_id"
                name="usuario_id"
                className="form-select"
                value={formData.usuario_id}
                onChange={handleChange}
                required
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showTransferFields && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="local_origem">
                  Local de Origem
                </label>
                <input
                  type="text"
                  id="local_origem"
                  name="local_origem"
                  className="form-input"
                  value={formData.local_origem ?? ''}
                  onChange={handleChange}
                  placeholder="Ex: Prateleira A-01"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="local_destino">
                  Local de Destino
                </label>
                <input
                  type="text"
                  id="local_destino"
                  name="local_destino"
                  className="form-input"
                  value={formData.local_destino ?? ''}
                  onChange={handleChange}
                  placeholder="Ex: Prateleira A-05"
                />
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="documento_fiscal">
                Documento Fiscal
              </label>
              <input
                type="text"
                id="documento_fiscal"
                name="documento_fiscal"
                className="form-input"
                value={formData.documento_fiscal ?? ''}
                onChange={handleChange}
                placeholder="Ex: NF-12345"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="observacao">
              Observação
            </label>
            <textarea
              id="observacao"
              name="observacao"
              className="form-textarea"
              value={formData.observacao ?? ''}
              onChange={handleChange}
              rows={3}
              placeholder="Observações adicionais..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-gold">
              {movement ? 'Atualizar' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

