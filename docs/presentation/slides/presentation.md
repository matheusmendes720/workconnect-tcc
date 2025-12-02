# WorkConnect - Modelo de Dados
## Apresentação para Avaliação

---

## Slide 1: Introdução

### WorkConnect - Sistema de Gestão Empresarial

**Objetivo:**
Sistema completo de gestão para PMEs integrando múltiplos módulos

**Escopo do Modelo de Dados:**
- 7 módulos funcionais
- 30+ tabelas
- Integração completa entre módulos
- Conformidade LGPD

---

## Slide 2: Arquitetura do Sistema

### 7 Módulos Integrados

1. **Usuários & Autenticação** - Gestão de acesso
2. **Inventário (Estoque)** - Gestão de produtos
3. **Vendas** - Gestão de vendas e clientes
4. **Finanças** - Gestão financeira
5. **Logística** - Gestão de pedidos e envios
6. **Relatórios** - Geração de relatórios
7. **Auditoria LGPD** - Conformidade legal

**Características:**
- Modelo normalizado (3NF)
- Integração automática entre módulos
- Triggers para automação
- Views para dashboards

---

## Slide 3: Diagrama ER Completo

### Visão Geral do Modelo

**Estatísticas:**
- **30+ Tabelas** organizadas em 7 módulos
- **50+ Relacionamentos** entre entidades
- **11 Triggers** automatizados
- **15 Views** para dashboards
- **80+ Índices** para performance

**Diagrama ER:**
- Mostrar diagrama completo
- Destacar módulos
- Explicar relacionamentos principais

---

## Slide 4: Módulo 1 - Usuários & Autenticação

### Gestão de Acesso e Segurança

**Tabelas:**
- `perfil` - Perfis de acesso (Admin, Gerente, Operador, Vendedor, Consulta)
- `usuario` - Usuários do sistema com conformidade LGPD
- `sessao` - Sessões ativas

**Características:**
- Controle de acesso por perfil
- Auditoria LGPD completa
- Soft deletes para conformidade

---

## Slide 5: Módulo 2 - Inventário (Estoque)

### Gestão Completa de Produtos

**Tabelas:**
- `categoria` - Categorias hierárquicas
- `produto` - Produtos com controle de níveis
- `fornecedor` - Fornecedores
- `produto_fornecedor` - Relacionamento N:M
- `movimentacao_estoque` - Histórico completo
- `alerta_reposicao` - Alertas automáticos

**Automações:**
- Cálculo automático de status (OK/BAIXO/CRÍTICO)
- Custo médio ponderado automático
- Alertas quando estoque < mínimo

---

## Slide 6: Módulo 3 - Vendas

### Gestão de Vendas e Clientes

**Tabelas:**
- `cliente` - Clientes (PF e PJ)
- `venda` - Vendas realizadas
- `venda_item` - Itens das vendas
- `canal_venda` - Canais (Loja Física, Online, etc.)
- `pagamento` - Pagamentos
- `metodo_pagamento` - Métodos de pagamento

**Integrações:**
- Vendas → Estoque (movimentações automáticas)
- Vendas → Finanças (receitas automáticas)
- Vendas → Logística (pedidos automáticos)

---

## Slide 7: Módulo 4 - Finanças

### Gestão Financeira Completa

**Tabelas:**
- `categoria_financeira` - Categorias hierárquicas
- `conta_financeira` - Contas (Caixa, Banco, Cartão)
- `transacao_financeira` - Transações (Receitas/Despesas)

**Características:**
- Saldo automático das contas
- Integração com vendas (receitas)
- Integração com fornecedores (despesas)
- Fluxo de caixa diário

---

## Slide 8: Módulo 5 - Logística

### Gestão de Pedidos e Envios

**Tabelas:**
- `armazem` - Armazéns
- `pedido` - Pedidos de logística
- `pedido_item` - Itens dos pedidos
- `transportadora` - Transportadoras
- `motorista` - Motoristas
- `rota` - Rotas de entrega
- `envio` - Envios e rastreamento

**Funcionalidades:**
- Status automático baseado em separação
- Rastreamento completo
- Gestão de rotas

---

## Slide 9: Integração entre Módulos

### Fluxo Automatizado

**Exemplo: Venda Completa**

1. **Venda criada** → `venda` + `venda_item`
2. **Venda confirmada** → Trigger cria `movimentacao_estoque` (saída)
3. **Estoque atualizado** → Trigger atualiza `produto.quantidade_atual`
4. **Status recalculado** → Trigger atualiza `produto.status`
5. **Pagamento confirmado** → Trigger cria `transacao_financeira` (receita)
6. **Saldo atualizado** → Trigger atualiza `conta_financeira.saldo_atual`
7. **Pedido gerado** → `pedido` + `pedido_item` para logística

**Resultado:** Processo completamente automatizado!

---

## Slide 10: Automações (Triggers)

### 11 Triggers Implementados

1. **Atualizar Status do Produto** - Calcula OK/BAIXO/CRÍTICO
2. **Gerar Alerta de Reposição** - Quando estoque < mínimo
3. **Calcular Custo Médio** - Custo médio ponderado
4. **Atualizar Quantidade** - Ao registrar movimentação
5. **Atualizar Total da Venda** - Recalcula ao modificar itens
6. **Criar Movimentação de Venda** - Ao confirmar venda
7. **Criar Transação de Pagamento** - Ao confirmar pagamento
8. **Atualizar Saldo da Conta** - Com transações
9. **Atualizar Capacidade do Armazém** - Recalcula capacidade
10. **Atualizar Status do Pedido** - Baseado em separação
11. **Auditoria LGPD** - Registra ações sobre dados pessoais

---

## Slide 11: Performance e Otimização

### Views e Índices

**15 Views para Dashboards:**
- `vw_estoque_completo` - Estoque completo
- `vw_produtos_criticos` - Produtos que precisam atenção
- `vw_vendas_resumo` - Resumo de vendas
- `vw_fluxo_caixa_diario` - Fluxo de caixa
- `vw_dashboard_geral` - Métricas gerais
- E mais 10 views especializadas...

**80+ Índices:**
- Foreign keys indexados
- Colunas frequentemente consultadas
- Índices compostos para queries complexas
- Índices GIN para busca full-text

---

## Slide 12: Conformidade LGPD

### Auditoria e Conformidade Legal

**Implementações:**
- ✅ Consentimento explícito obrigatório
- ✅ Auditoria completa de ações
- ✅ Exportação de dados pessoais
- ✅ Anonimização (não exclusão)
- ✅ Direito ao esquecimento
- ✅ Retenção de logs (6 meses mínimo)

**Tabelas:**
- `auditoria_lgpd` - Registro de todas as ações
- Campos LGPD em `usuario` - Consentimento e exclusão

---

## Slide 13: Normalização

### Modelo em 3NF

**Características:**
- Sem redundâncias
- Integridade referencial completa
- Foreign keys bem definidas
- Constraints para validação
- Soft deletes para histórico

**Exemplo:**
- Produto não armazena nome da categoria (usa FK)
- Venda não armazena dados do cliente (usa FK)
- Transações não duplicam dados de vendas

---

## Slide 14: Estatísticas do Modelo

### Números do Sistema

| Métrica | Quantidade |
|---------|-----------|
| **Tabelas** | 30+ |
| **Views** | 15 |
| **Triggers** | 11 |
| **Funções** | 11 |
| **Índices** | 80+ |
| **Foreign Keys** | 50+ |
| **Constraints** | 100+ |
| **Módulos** | 7 |

---

## Slide 15: Demonstração ao Vivo

### Próximos Passos

1. **Abrir pgAdmin 4 / DBeaver**
2. **Conectar ao banco `workconnect_db`**
3. **Mostrar ERD completo**
4. **Executar queries de demonstração**
5. **Mostrar triggers em ação**
6. **Navegar pelas views**

**Queries de Demo:**
- Verificar estatísticas
- Mostrar produtos críticos
- Demonstrar integração entre módulos
- Mostrar views do dashboard

---

## Slide 16: Conclusão

### Modelo de Dados Completo

**Destaques:**
- ✅ Modelo completo e integrado
- ✅ Automações implementadas
- ✅ Performance otimizada
- ✅ Conformidade LGPD
- ✅ Escalável e extensível

**Arquivos Entregues:**
- Schema SQL completo
- Triggers e funções
- Views para dashboards
- Documentação completa
- Scripts de setup

**Pronto para implementação!**

---

## Slide 17: Q&A

### Perguntas e Respostas

**Estatísticas Rápidas:**
- 30+ tabelas
- 7 módulos
- 11 triggers
- 15 views
- 80+ índices

**Documentação:**
- `doc/diagrama-der-completo.md`
- `database/README.md`
- `presentation/README.md`

**Obrigado!**

