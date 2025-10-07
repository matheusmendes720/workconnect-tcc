# 📊 Guia de Diagramas - Work Connect
## Sistema de Gestão de Estoque para PMEs

Este diretório contém os diagramas técnicos em formato Mermaid para modelagem do Work Connect, sistema focado em gestão de estoque com conformidade LGPD.

---

## 📁 Arquivos Disponíveis

### 1️⃣ [Diagrama de Classes - Gestão de Estoque](./diagrama-classes-estoque.md)
**Versão:** Core - Focado em Estoque + LGPD

**Conteúdo:**
- ✅ 12 classes essenciais
- ✅ 6 módulos principais
- ✅ Sistema de alertas automáticos
- ✅ Conformidade LGPD integrada
- ✅ Custo médio ponderado
- ✅ Relacionamento com até 3 fornecedores por produto
- ✅ 4 perfis de acesso (Admin, Gerente, Operador, Consulta)

**Ideal para:** 
- Desenvolvimento em React.js/Node.js
- Planejamento de classes e objetos
- Arquitetura de software
- Apresentação técnica do TCC

**🔗 Acesso:** [diagrama-classes-estoque.md](./diagrama-classes-estoque.md)

---

### 2️⃣ [Modelo Conceitual (MER)](./diagrama-mer-conceitual.md)
**Versão:** Conceitual - Estoque + LGPD

**Conteúdo:**
- ✅ 8 entidades principais
- ✅ Relacionamentos e cardinalidades
- ✅ 20 regras de negócio (15 estoque + 5 LGPD)
- ✅ Processos de anonimização
- ✅ Planos de preços (R$ 149/299/599)
- ✅ Métricas de sucesso (ROI 150%)

**Ideal para:**
- Compreensão do modelo de negócio
- Validação com stakeholders
- Planejamento de banco de dados
- Apresentação para clientes PME

**🔗 Acesso:** [diagrama-mer-conceitual.md](./diagrama-mer-conceitual.md)

---

### 3️⃣ [Diagrama DER - Gestão de Estoque](./diagrama-der-estoque.md) ⭐
**Versão:** Físico - PostgreSQL + LGPD

**Conteúdo (~900 linhas):**
- ✅ 10 tabelas completas com tipos SQL
- ✅ 10 scripts CREATE TABLE prontos
- ✅ 4 triggers automáticos (status, alertas, custo, LGPD)
- ✅ 5 views úteis (estoque completo, produtos críticos, etc)
- ✅ 3 stored procedures (movimentação, exportação LGPD, anonimização)
- ✅ 3 jobs automáticos (limpeza, expiração, LGPD)
- ✅ Índices de performance (simples e compostos)
- ✅ Constraints e validações (CHECK, UNIQUE, FK)
- ✅ Scripts de backup e recovery
- ✅ Configurações PostgreSQL (50 usuários)
- ✅ Multi-tenant (isolamento por empresa)
- ✅ Dados de exemplo (seed)

**Ideal para:**
- Implementação do banco de dados
- DBAs e desenvolvedores backend
- Migração de dados Excel
- Otimização de performance

**🔗 Acesso:** [diagrama-der-estoque.md](./diagrama-der-estoque.md)

---

### 4️⃣ [Diagramas de Casos de Uso - Estoque](./diagrama-casos-de-uso-estoque.md)
**Versão:** Completa - 27 Casos de Uso

**Conteúdo (~700 linhas):**
- ✅ 27 casos de uso especificados
- ✅ 5 atores (Admin, Gerente, Operador, Consulta, Sistema)
- ✅ 6 módulos funcionais
- ✅ Especificação detalhada (pré-condições, fluxos, pós-condições)
- ✅ Fluxos alternativos e exceções
- ✅ Relacionamentos (include, extend)
- ✅ Matriz de rastreabilidade
- ✅ 3 casos de uso LGPD (críticos)

**Módulos:**
1. Dashboard (5 casos)
2. Gestão de Produtos (8 casos)
3. Gestão de Fornecedores (4 casos)
4. Movimentações (4 casos)
5. Alertas (2 casos)
6. Relatórios (5 casos)
7. LGPD (3 casos - CRÍTICOS)

**Ideal para:**
- Levantamento de requisitos
- Planejamento de sprints
- Testes de aceitação
- Documentação funcional

**🔗 Acesso:** [diagrama-casos-de-uso-estoque.md](./diagrama-casos-de-uso-estoque.md)

---

### 5️⃣ [Conformidade LGPD](./LGPD-COMPLIANCE.md) ⭐ NOVO
**Versão:** 1.0 - Documentação Legal

**Conteúdo (~900 linhas):**
- ✅ O que é LGPD (lei, definições, penalidades)
- ✅ Dados coletados e bases legais
- ✅ Direitos dos titulares (acesso, portabilidade, exclusão)
- ✅ Implementação técnica:
  - Banco de dados (campos, tabelas)
  - Backend (middleware, controllers)
  - Frontend (componentes React)
- ✅ Processos detalhados:
  - Coleta de consentimento
  - Exportação de dados (JSON)
  - Exclusão/Anonimização (90 dias)
- ✅ Auditoria e logs (6 meses retenção)
- ✅ Segurança (criptografia, controle de acesso)
- ✅ Procedimento de incidentes
- ✅ Checklist de conformidade

**Importância:** 🔴 CRÍTICA - Requisito legal obrigatório

**Ideal para:**
- Compliance e jurídico
- Auditoria de conformidade
- Apresentação para clientes
- Documentação oficial do TCC

**🔗 Acesso:** [LGPD-COMPLIANCE.md](./LGPD-COMPLIANCE.md)

---

## 🔍 Como Visualizar os Diagramas

### Opção 1: GitHub (Recomendado) ⭐
O GitHub renderiza automaticamente diagramas Mermaid em arquivos `.md`:
1. Abra qualquer arquivo `.md` no GitHub
2. Role até o diagrama
3. Será renderizado automaticamente e interativo

**Vantagens:**
- Sem instalação
- Links clicáveis funcionam
- Compartilhamento fácil

### Opção 2: Visual Studio Code
1. Instale extensão: [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
2. Abra o arquivo `.md`
3. Pressione `Ctrl+Shift+V` (Win/Linux) ou `Cmd+Shift+V` (Mac)

**Vantagens:**
- Edição e preview simultâneos
- Integrado ao editor

### Opção 3: Mermaid Live Editor
1. Acesse [https://mermaid.live/](https://mermaid.live/)
2. Copie o código Mermaid do diagrama
3. Cole no editor
4. Visualize e exporte (PNG, SVG, PDF)

**Vantagens:**
- Exportação em múltiplos formatos
- Edição online
- Sem instalação

### Opção 4: Obsidian
- Suporte nativo a Mermaid
- Ótimo para documentação interligada
- [obsidian.md](https://obsidian.md)

---

## 🎯 Quando Usar Cada Diagrama

### Use o Diagrama de CLASSES quando:
- ✅ Planejar estrutura de código (React/Node.js)
- ✅ Definir objetos e métodos
- ✅ Entender relacionamentos entre classes
- ✅ Documentar arquitetura OOP

### Use o MER CONCEITUAL quando:
- ✅ Apresentar modelo de negócio
- ✅ Validar requisitos com cliente
- ✅ Entender regras de negócio
- ✅ Planejar banco de dados (alto nível)

### Use o DER FÍSICO quando:
- ✅ Implementar banco PostgreSQL
- ✅ Criar tabelas e índices
- ✅ Configurar triggers e procedures
- ✅ Otimizar performance de queries
- ✅ Migrar dados de Excel

### Use os CASOS DE USO quando:
- ✅ Levantar requisitos funcionais
- ✅ Planejar desenvolvimento (sprints)
- ✅ Criar testes de aceitação
- ✅ Documentar funcionalidades
- ✅ Apresentar para usuários finais

### Use o documento LGPD quando:
- ✅ Implementar conformidade legal
- ✅ Responder auditoria
- ✅ Treinar equipe
- ✅ Apresentar para jurídico/compliance
- ✅ Deploy em produção

---

## 📋 Comparativo: Escopo Real vs Imaginado

| Funcionalidade | Versão 1.0 (Antiga) | Versão 2.0 (Real) |
|---|:---:|:---:|
| **Gestão de Estoque** | ✅ | ✅ |
| **Produtos e Categorias** | ✅ | ✅ |
| **Fornecedores** | ✅ | ✅ |
| **Movimentações** | ✅ | ✅ |
| **Alertas Automáticos** | ✅ | ✅ |
| **Relatórios (PDF/Excel/CSV)** | Apenas CSV | ✅ Todos |
| **LGPD** | ❌ | ✅ Obrigatório |
| **Sistema RFID** | ✅ | ❌ (QR futuro) |
| **Ordens de Serviço** | ✅ | ❌ Removido |
| **Vendas Complexas** | ✅ | ❌ Simplificado |
| **Finanças Avançadas** | ✅ | ❌ Simplificado |
| **Multi-local** | ✅ | ❌ Simplificado |
| **Público** | Indústrias | ✅ PMEs |
| **Stack** | HTML/CSS/JS | ✅ React/Node/PostgreSQL |

---

## 🛠️ Implementação no Banco de Dados

### Sequência de Implementação

**Passo 1:** Criar banco
```sql
CREATE DATABASE workconnect_db
    WITH ENCODING='UTF8'
         LC_COLLATE='pt_BR.UTF-8'
         LC_CTYPE='pt_BR.UTF-8'
         TEMPLATE=template0;
```

**Passo 2:** Executar scripts de criação (ordem)
1. perfil
2. usuario
3. categoria
4. produto
5. fornecedor
6. produto_fornecedor
7. movimentacao_estoque
8. alerta_reposicao
9. relatorio
10. auditoria_lgpd

**Passo 3:** Criar triggers (4)
1. fn_atualizar_status_produto
2. fn_gerar_alerta_reposicao
3. fn_calcular_custo_medio
4. fn_auditar_lgpd

**Passo 4:** Criar views (5)
1. vw_estoque_completo
2. vw_produtos_criticos
3. vw_movimentacoes_mes
4. vw_dashboard_alertas
5. vw_analise_fornecedores

**Passo 5:** Criar procedures (3)
1. sp_registrar_movimentacao
2. sp_exportar_dados_usuario
3. sp_anonimizar_usuario

**Passo 6:** Inserir dados de exemplo (seed)

**Passo 7:** Configurar jobs automáticos (3)
1. job_limpar_alertas_antigos (diário 02:00)
2. job_expirar_relatorios (diário 03:00)
3. job_anonimizar_usuarios (diário 04:00)

### ORMs Recomendados

| Linguagem | ORM | Características |
|-----------|-----|-----------------|
| **Node.js** ⭐ | Sequelize | Migrations, validações, hooks |
| JavaScript | TypeORM | TypeScript, decorators |
| JavaScript | Prisma | Type-safe, migrações automáticas |
| Python | SQLAlchemy | Maduro, completo |
| Python | Django ORM | Admin pronto |
| PHP | Eloquent (Laravel) | Simples, eloquente |
| Java | Hibernate/JPA | Padrão enterprise |

**Recomendação para o TCC:** **Sequelize** (mesma linguagem frontend/backend)

---

## 📚 Documentação Relacionada

### Documentos do TCC

- [Requisitos do Projeto](./Requisitos%20principais%20do%20projeto.txt) - Especificações originais
- [Projeto de Apresentação](./Projeto%20De%20Apresentaçao%20(2).pdf) - PDF oficial do TCC
- [Cenário Fictício](./Cenário%20Fictício.docx) - Contexto de uso

### Documentos Root

- [README.md](../README.md) - Apresentação do projeto
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guia de contribuição
- [ROADMAP.md](../ROADMAP.md) - Planejamento de desenvolvimento
- [INDEX-DIAGRAMAS.md](./INDEX-DIAGRAMAS.md) - Índice centralizador

---

## 🤝 Contribuindo

Para sugerir melhorias nos diagramas:

1. Analise o diagrama atual
2. Verifique alinhamento com escopo do TCC (PDF oficial)
3. Mantenha foco em **gestão de estoque**
4. Use nomenclatura em **português (PT-BR)**
5. Mantenha conformidade **LGPD**
6. Abra Issue ou PR no GitHub
7. Siga [CONTRIBUTING.md](../CONTRIBUTING.md)

### Padrões a Seguir

- ✅ Nomenclatura PT-BR consistente
- ✅ Sintaxe Mermaid válida
- ✅ Comentários explicativos
- ✅ Organização modular por seções
- ✅ Links internos clicáveis
- ✅ Exemplos práticos
- ✅ Referências cruzadas entre documentos

---

## 📄 Licença

Documentação do projeto Work Connect - Sistema de Gestão de Estoque  
© 2025 - SENAI - TCC  
Licença MIT

---

## 🎨 Legenda de Símbolos

### UML (Classes)
- `+` = Público (public)
- `-` = Privado (private)
- `#` = Protegido (protected)
- `*` = Muitos (cardinalidade)
- `1` = Um (cardinalidade)
- `0..1` = Zero ou um (opcional)

### MER/DER (Banco de Dados)
- `PK` = Primary Key (chave primária)
- `FK` = Foreign Key (chave estrangeira)
- `||--||` = Relacionamento 1:1
- `||--o{` = Relacionamento 1:N
- `}o--o{` = Relacionamento N:M

---

## 👥 Autores do TCC

1. Patrick Lima de Santana
2. Rafael Nascimento De Oliveira Bastos
3. Antonio Lucas da Silva da Conceição Lima
4. Rodrigo Santos de Oliveira Riquelme Damasceno Neri
5. Matheus Mendes Conceição Santana Santos

**Instituição:** SENAI - Curso Técnico em Desenvolvimento de Sistemas  
**Período:** 2024-2025

---

<div align="center">

**Documentação Técnica Completa**

**Work Connect - Gestão de Estoque para PMEs**

[🏠 README](../README.md) · [📚 Índice](./INDEX-DIAGRAMAS.md) · [🔒 LGPD](./LGPD-COMPLIANCE.md)

</div>

---

**Última atualização:** Janeiro 2025  
**Versão:** 2.0 - Refatorado para Escopo Real
