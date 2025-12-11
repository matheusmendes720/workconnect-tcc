/**
 * Warehouse Modal Component
 * Form for creating/editing warehouses
 */

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Warehouse, WarehouseFormData, User } from '../../../types/estoque';
import { FormValidator } from '../../../lib/utils/validation';

export interface WarehouseModalProps {
  isOpen: boolean;
  warehouse: Warehouse | null;
  users: User[];
  onClose: () => void;
  onSave: (data: WarehouseFormData) => void;
  className?: string;
}

export function WarehouseModal({
  isOpen,
  warehouse,
  users,
  onClose,
  onSave,
  className = '',
}: WarehouseModalProps) {
  const [formData, setFormData] = useState<WarehouseFormData>({
    nome: '',
    descricao: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    capacidade: 0,
    responsavel_id: users[0]?.id || 0,
    ativo: true,
  });

  useEffect(() => {
    if (warehouse) {
      setFormData({
        nome: warehouse.nome,
        descricao: warehouse.descricao || '',
        endereco: warehouse.endereco,
        cidade: warehouse.cidade,
        estado: warehouse.estado,
        cep: warehouse.cep || '',
        capacidade: warehouse.capacidade,
        responsavel_id: warehouse.responsavel_id || users[0]?.id || 0,
        ativo: warehouse.ativo,
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        capacidade: 0,
        responsavel_id: users[0]?.id || 0,
        ativo: true,
      });
    }
  }, [warehouse, users]);

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
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'capacidade' || name === 'responsavel_id'
          ? Number(value)
          : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${className}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{warehouse ? 'Editar Armazém' : 'Novo Armazém'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="nome">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="form-input"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="capacidade">
                Capacidade *
              </label>
              <input
                type="number"
                id="capacidade"
                name="capacidade"
                className="form-input"
                value={formData.capacidade}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              className="form-textarea"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="endereco">
                Endereço *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                className="form-input"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cidade">
                Cidade *
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                className="form-input"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="estado">
                Estado *
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                className="form-input"
                value={formData.estado}
                onChange={handleChange}
                maxLength={2}
                placeholder="SP"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cep">
                CEP
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                className="form-input"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="responsavel_id">
                Responsável
              </label>
              <select
                id="responsavel_id"
                name="responsavel_id"
                className="form-select"
                value={formData.responsavel_id}
                onChange={handleChange}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleChange}
                />
                <span>Ativo</span>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-gold">
              {warehouse ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





