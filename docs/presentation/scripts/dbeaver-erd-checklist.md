# DBeaver ERD - Checklist de Geração

## ✅ Checklist Completo para Gerar ERD no DBeaver

### Pré-requisitos
- [ ] DBeaver instalado
- [ ] PostgreSQL rodando
- [ ] Banco `workconnect_db` criado
- [ ] Schema aplicado (schema.sql, triggers.sql, views.sql)

### Conexão
- [ ] DBeaver aberto
- [ ] Nova conexão PostgreSQL criada
- [ ] Conexão testada com sucesso
- [ ] Banco `workconnect_db` visível no navigator

### ERD Completo
- [ ] ERD criado (clique direito em `public` → View Diagram)
- [ ] Todas as 30+ tabelas visíveis
- [ ] Relacionamentos (foreign keys) visíveis
- [ ] Layout organizado (auto ou manual)
- [ ] Exportado como PNG (alta resolução)
- [ ] Exportado como PDF (opcional)
- [ ] Salvo em: `presentation/diagrams/full-erd.png`

### Diagramas por Módulo

#### Módulo 1: Users & Authentication
- [ ] ERD criado com apenas 3 tabelas
- [ ] Tabelas: perfil, usuario, sessao
- [ ] Exportado: `presentation/diagrams/modules/01-users-auth.png`

#### Módulo 2: Inventory
- [ ] ERD criado com 6 tabelas
- [ ] Tabelas: categoria, produto, fornecedor, produto_fornecedor, movimentacao_estoque, alerta_reposicao
- [ ] Exportado: `presentation/diagrams/modules/02-inventory.png`

#### Módulo 3: Sales
- [ ] ERD criado com 6 tabelas
- [ ] Tabelas: cliente, venda, venda_item, canal_venda, pagamento, metodo_pagamento
- [ ] Exportado: `presentation/diagrams/modules/03-sales.png`

#### Módulo 4: Finances
- [ ] ERD criado com 3 tabelas
- [ ] Tabelas: categoria_financeira, conta_financeira, transacao_financeira
- [ ] Exportado: `presentation/diagrams/modules/04-finances.png`

#### Módulo 5: Logistics
- [ ] ERD criado com 7 tabelas
- [ ] Tabelas: armazem, pedido, pedido_item, transportadora, motorista, rota, envio
- [ ] Exportado: `presentation/diagrams/modules/05-logistics.png`

#### Módulo 6: Reports
- [ ] ERD criado com 1 tabela
- [ ] Tabela: relatorio
- [ ] Exportado: `presentation/diagrams/modules/06-reports.png`

#### Módulo 7: Audit
- [ ] ERD criado com 1 tabela
- [ ] Tabela: auditoria_lgpd
- [ ] Exportado: `presentation/diagrams/modules/07-audit.png`

### Qualidade
- [ ] Todos os diagramas em alta resolução (mínimo 1920x1080)
- [ ] Nomes de tabelas legíveis
- [ ] Relacionamentos claros
- [ ] Cores consistentes (se aplicado)
- [ ] Layout organizado e limpo

### Verificação Final
- [ ] Todos os arquivos salvos nos locais corretos
- [ ] Nomes de arquivos corretos
- [ ] Diagramas abertos e verificados
- [ ] Prontos para usar na apresentação

---

## 📊 Estatísticas Esperadas

- **ERD Completo**: 30+ tabelas, 50+ relacionamentos
- **Diagramas de Módulos**: 7 arquivos PNG
- **Tempo Total**: ~25-30 minutos

---

## 🎯 Próximos Passos Após Gerar ERD

1. ✅ Verificar qualidade dos diagramas
2. ✅ Adicionar aos slides de apresentação
3. ✅ Preparar para demonstração ao vivo
4. ✅ Ter backup (screenshots) caso necessário

---

**Status**: ⏳ Aguardando execução

