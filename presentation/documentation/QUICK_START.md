# WorkConnect - Guia Rápido de Documentação
## Como Usar a Documentação Completa de Modelagem

---

## 🚀 Início Rápido

### 1. Visualizar Documentação

**Documentos Principais:**
- **[Modelo Consolidado](./models/MODELO_COMPLETO_CONSOLIDADO.md)** - Visão geral completa
- **[Modelo Conceitual](./models/MODELO_CONCEITUAL_COMPLETO.md)** - Detalhes conceituais
- **[Modelo Lógico](./models/MODELO_LOGICO_COMPLETO.md)** - Detalhes técnicos

**Diagramas:**
- **[ERD Conceitual](./diagrams/erd-conceitual.md)** - Diagrama visual conceitual
- **[EER Lógico](./diagrams/eer-logico.md)** - Diagrama visual lógico
- **[Casos de Uso](./diagrams/casos-de-uso.md)** - Diagrama de casos de uso

---

### 2. Exportar Diagramas

**Opção 1: Script Automático (Recomendado)**

```bash
# 1. Instalar dependências
cd presentation/scripts
npm install

# 2. Executar script
npm run export
```

**Opção 2: Manual (Mermaid CLI)**

```bash
# Instalar globalmente
npm install -g @mermaid-js/mermaid-cli

# Exportar diagrama específico
mmdc -i diagrama.mmd -o diagrama.png -w 2400 -H 1800
```

**Opção 3: Online (Mermaid Live)**

1. Acesse: https://mermaid.live
2. Cole o código Mermaid
3. Baixe PNG ou SVG

---

## 📚 Estrutura da Documentação

```
presentation/documentation/
├── models/                          # Documentação de modelos
│   ├── README.md                    # Índice
│   ├── MODELO_CONCEITUAL_COMPLETO.md
│   ├── MODELO_LOGICO_COMPLETO.md
│   └── MODELO_COMPLETO_CONSOLIDADO.md
│
└── diagrams/                        # Diagramas Mermaid
    ├── README.md                    # Índice
    ├── erd-conceitual.md           # ERD Conceitual
    ├── eer-logico.md               # EER Lógico
    └── casos-de-uso.md             # Casos de Uso
```

---

## 🎯 Casos de Uso

### Para Apresentações

1. Leia o **Modelo Consolidado** para visão geral
2. Exporte os diagramas para PNG (alta resolução)
3. Use as cores dos módulos para destacar seções

### Para Desenvolvimento

1. Consulte o **Modelo Lógico** para implementação
2. Use o **EER Lógico** para entender relacionamentos
3. Consulte o **Schema SQL** para código

### Para Análise de Negócio

1. Leia o **Modelo Conceitual** para entender o domínio
2. Use o **ERD Conceitual** para visualização
3. Consulte **Casos de Uso** para funcionalidades

---

## 📊 Estatísticas Rápidas

- **30+** Entidades
- **27** Tabelas
- **50+** Relacionamentos
- **100+** Constraints
- **66** Casos de Uso
- **7** Módulos

---

## 🔗 Links Rápidos

- [Modelo Consolidado](./models/MODELO_COMPLETO_CONSOLIDADO.md)
- [ERD Conceitual](./diagrams/erd-conceitual.md)
- [EER Lógico](./diagrams/eer-logico.md)
- [Casos de Uso](./diagrams/casos-de-uso.md)
- [Script de Exportação](../scripts/export-diagrams.js)

---

**Versão:** 1.0.0  
**Data:** 2025-01-12

