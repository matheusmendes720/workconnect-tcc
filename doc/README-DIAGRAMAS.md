# 📊 Diagramas de Classes - WorkConnect

Este diretório contém os diagramas de classes UML em formato Mermaid para modelagem do banco de dados do sistema WorkConnect.

---

## 📁 Arquivos Disponíveis

### 1️⃣ [diagrama-classes-completo.md](./diagrama-classes-completo.md)
**Versão Técnica Completa e Robusta**

Diagrama completo baseado nas especificações do projeto, incluindo:
- ✅ Sistema completo de RFID e Código de Barras
- ✅ Módulo de Manutenção e Ordens de Serviço
- ✅ Sistema de Alertas Automáticos
- ✅ Controle avançado de movimentação
- ✅ Múltiplos locais de estoque
- ✅ Sistema de permissões granulares
- ✅ Rastreabilidade completa

**Ideal para:** Implementação completa do sistema conforme especificações técnicas.

### 2️⃣ [diagrama-classes-simplificado.md](./diagrama-classes-simplificado.md)
**Versão Simplificada e Compreensível**

Diagrama simplificado baseado no contexto atual da aplicação web:
- ✅ Estrutura alinhada com as telas HTML existentes
- ✅ Funcionalidades core: Dashboard, Finanças, Vendas, Estoque
- ✅ Entrada manual de dados (sem RFID)
- ✅ Estrutura básica e clara
- ✅ Fácil compreensão

**Ideal para:** MVP, prototipagem rápida, apresentações e desenvolvimento incremental.

---

## 🔍 Como Visualizar os Diagramas

### Opção 1: GitHub (Recomendado)
O GitHub renderiza automaticamente diagramas Mermaid em arquivos `.md`:
1. Abra o arquivo desejado diretamente no GitHub
2. O diagrama será renderizado automaticamente

### Opção 2: Visual Studio Code
1. Instale a extensão [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
2. Abra o arquivo `.md`
3. Pressione `Ctrl+Shift+V` (ou `Cmd+Shift+V` no Mac) para preview

### Opção 3: Mermaid Live Editor
1. Acesse [https://mermaid.live/](https://mermaid.live/)
2. Copie o código Mermaid do diagrama
3. Cole no editor online
4. Visualize e exporte (PNG, SVG, PDF)

### Opção 4: Ferramentas de Diagramação
- **Draw.io**: Importe via "Insert > Advanced > Mermaid"
- **Notion**: Cole o código em bloco Mermaid
- **Obsidian**: Suporte nativo para Mermaid

---

## 🎯 Quando Usar Cada Versão

### Use o Diagrama COMPLETO quando:
- ✅ Iniciar o desenvolvimento do sistema completo
- ✅ Necessitar de funcionalidades RFID/Código de Barras
- ✅ Implementar sistema de manutenção e ordens de serviço
- ✅ Precisar de rastreabilidade completa
- ✅ Desenvolver para ambiente industrial/almoxarifado

### Use o Diagrama SIMPLIFICADO quando:
- ✅ Criar MVP ou protótipo inicial
- ✅ Apresentar o sistema para stakeholders não-técnicos
- ✅ Desenvolver incrementalmente (começar simples)
- ✅ Focar apenas em vendas e finanças básicas
- ✅ Trabalhar com equipe pequena ou iniciante

---

## 🔄 Migração entre Versões

### De Simplificado → Completo
O diagrama simplificado é um **subconjunto** do completo. Para migrar:
1. Mantenha todas as tabelas/classes existentes
2. Adicione as novas tabelas conforme necessário
3. Implemente os módulos avançados gradualmente
4. Não há perda de dados, apenas adição de funcionalidades

### Abordagem Recomendada
```
Fase 1: Implementar versão SIMPLIFICADA (MVP)
  ↓
Fase 2: Testar com usuários reais
  ↓
Fase 3: Coletar feedback e requisitos
  ↓
Fase 4: Migrar gradualmente para versão COMPLETA
  ↓
Fase 5: Adicionar RFID, Serviços, Alertas, etc.
```

---

## 📋 Comparativo Rápido

| Funcionalidade | Simplificado | Completo |
|---|:---:|:---:|
| **Usuários e Login** | ✅ | ✅ |
| **Dashboard** | ✅ | ✅ |
| **Estoque Básico** | ✅ | ✅ |
| **Vendas** | ✅ | ✅ |
| **Finanças** | ✅ | ✅ |
| **Relatórios Básicos** | ✅ | ✅ |
| **RFID/Código de Barras** | ❌ | ✅ |
| **Ordens de Serviço** | ❌ | ✅ |
| **Alertas Automáticos** | ❌ | ✅ |
| **Múltiplos Locais** | ❌ | ✅ |
| **Permissões Avançadas** | ❌ | ✅ |
| **Rastreamento Completo** | ❌ | ✅ |
| **Histórico de Leituras** | ❌ | ✅ |

---

## 🛠️ Implementação no Banco de Dados

### SQL a partir dos Diagramas

Ambos os diagramas podem ser traduzidos para SQL. Exemplo:

#### Da Classe Produto para Tabela SQL:
```sql
CREATE TABLE produtos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0,
    quantidade_minima INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_codigo (codigo),
    INDEX idx_status (status)
);
```

### ORMs Recomendados
- **Java**: Hibernate, JPA
- **Python**: SQLAlchemy, Django ORM
- **Node.js**: Sequelize, TypeORM, Prisma
- **PHP**: Eloquent (Laravel), Doctrine
- **C#**: Entity Framework

---

## 📚 Documentação Relacionada

- [Requisitos do Projeto](./Requisitos%20principais%20do%20projeto.txt)
- [Cenário Fictício](./Cenário%20Fictício.docx)
- [Projeto de Apresentação](./Projeto%20De%20Apresentaçao%20de%20Lucas.docx)

---

## 🤝 Contribuindo

Para sugerir melhorias nos diagramas:
1. Analise o contexto (simplificado vs completo)
2. Mantenha consistência com os padrões UML
3. Use nomenclatura em português (PT-BR)
4. Documente as mudanças

---

## 📄 Licença

Documentação do projeto WorkConnect - Sistema de Gestão Empresarial  
© 2025 - Todos os direitos reservados

---

## 🎨 Legenda de Símbolos

- `+` = Público (public)
- `-` = Privado (private)
- `#` = Protegido (protected)
- `*` = Muitos (cardinalidade)
- `1` = Um (cardinalidade)
- `0..1` = Zero ou um (opcional)

---

**Última atualização:** Outubro 2025  
**Versão dos Diagramas:** 1.0

