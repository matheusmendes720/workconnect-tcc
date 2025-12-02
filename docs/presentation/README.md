# WorkConnect - Visual Database Presentation Package

## Visão Geral

Este pacote contém todos os materiais necessários para apresentar o modelo de dados do WorkConnect em uma avaliação ao vivo.

## Estrutura de Arquivos

```
presentation/
├── database/
│   ├── setup.sh              # Script de setup do banco (Linux/Mac)
│   ├── setup.bat             # Script de setup do banco (Windows)
│   ├── verify.sql            # Queries de verificação
│   └── demo-queries.sql      # Queries para demonstração
├── diagrams/
│   ├── modules/              # Diagramas por módulo (gerar manualmente)
│   └── full-erd.png          # ERD completo (gerar manualmente)
├── docs/
│   └── schemaspy/            # Documentação HTML interativa (gerar)
├── slides/
│   ├── presentation.md       # Slides da apresentação
│   ├── quick-reference.md    # Referência rápida
│   └── statistics-summary.md # Resumo de estatísticas
├── scripts/
│   ├── pgadmin-erd-guide.md  # Guia pgAdmin 4
│   ├── dbeaver-erd-guide.md  # Guia DBeaver
│   ├── schemaspy-setup-guide.md # Guia SchemaSpy
│   ├── generate-schemaspy-docs.sh # Gerar docs SchemaSpy
│   ├── generate-schemaspy-docs.bat
│   ├── generate-diagrams.sh  # Instruções para diagramas
│   ├── generate-diagrams.bat
│   ├── export-all.sh         # Exportar tudo
│   └── export-all.bat
└── README.md                 # Este arquivo
```

## Quick Start

### 1. Setup do Banco de Dados

**Windows:**
```cmd
cd presentation\database
setup.bat
```

**Linux/Mac:**
```bash
cd presentation/database
chmod +x setup.sh
./setup.sh
```

### 2. Gerar Visualizações

#### Opção A: pgAdmin 4 (Recomendado)

1. Abra pgAdmin 4
2. Conecte ao banco `workconnect_db`
3. Clique com botão direito no banco → **Diagrams** → **Create ER Diagram**
4. Exporte como PNG/PDF
5. Veja guia completo: `scripts/pgadmin-erd-guide.md`

#### Opção B: DBeaver

1. Abra DBeaver
2. Conecte ao banco `workconnect_db`
3. Clique com botão direito no schema `public` → **View Diagram**
4. Exporte como PNG/PDF
5. Veja guia completo: `scripts/dbeaver-erd-guide.md`

#### Opção C: SchemaSpy (Documentação HTML)

**Windows:**
```cmd
cd presentation\scripts
generate-schemaspy-docs.bat
```

**Linux/Mac:**
```bash
cd presentation/scripts
chmod +x generate-schemaspy-docs.sh
./generate-schemaspy-docs.sh
```

Depois, abra: `presentation/docs/schemaspy/index.html`

### 3. Preparar Apresentação

1. Revise os slides: `slides/presentation.md`
2. Consulte referência rápida: `slides/quick-reference.md`
3. Veja estatísticas: `slides/statistics-summary.md`
4. Prepare queries de demo: `database/demo-queries.sql`

## Guias Detalhados

### Para Gerar Diagramas

- **pgAdmin 4**: `scripts/pgadmin-erd-guide.md`
- **DBeaver**: `scripts/dbeaver-erd-guide.md`
- **SchemaSpy**: `scripts/schemaspy-setup-guide.md`

### Para Apresentação

- **Slides**: `slides/presentation.md`
- **Referência Rápida**: `slides/quick-reference.md`
- **Estatísticas**: `slides/statistics-summary.md`

## Checklist de Preparação

### Antes da Apresentação

- [ ] Banco de dados criado e populado
- [ ] ERD completo exportado (PNG/PDF)
- [ ] Diagramas por módulo exportados (7 diagramas)
- [ ] Documentação SchemaSpy gerada
- [ ] Slides revisados
- [ ] Queries de demo testadas
- [ ] pgAdmin 4 ou DBeaver instalado e configurado
- [ ] Conexão ao banco testada

### Durante a Apresentação

- [ ] Mostrar ERD completo
- [ ] Explicar cada módulo
- [ ] Demonstrar integrações
- [ ] Executar queries de demo
- [ ] Mostrar triggers em ação
- [ ] Navegar pelas views
- [ ] Mostrar documentação interativa

## Ferramentas Necessárias

### Obrigatórias

1. **PostgreSQL** 15+ (banco de dados)
2. **pgAdmin 4** OU **DBeaver** (visualização ERD)

### Opcionais (mas recomendadas)

3. **SchemaSpy** (documentação HTML)
4. **Java JRE** (para SchemaSpy)
5. **GraphViz** (para diagramas no SchemaSpy)

## Estatísticas Rápidas

- **30+ Tabelas** em 7 módulos
- **11 Triggers** automatizados
- **15 Views** para dashboards
- **80+ Índices** para performance
- **50+ Foreign Keys** para integridade
- **100% LGPD Compliant**

## Fluxo de Apresentação Sugerido

1. **Introdução** (2 min)
   - Apresentar sistema
   - Mostrar escopo (7 módulos)

2. **Arquitetura** (3 min)
   - Diagrama ER completo
   - Explicar organização

3. **Módulos** (10 min)
   - Detalhar cada módulo
   - Mostrar tabelas principais
   - Explicar relacionamentos

4. **Integrações** (5 min)
   - Como módulos se conectam
   - Fluxo automatizado (exemplo: venda)

5. **Automações** (5 min)
   - Triggers implementados
   - Views para dashboards
   - Performance (índices)

6. **LGPD** (3 min)
   - Conformidade
   - Auditoria
   - Processos implementados

7. **Demo ao Vivo** (5 min)
   - Abrir pgAdmin/DBeaver
   - Mostrar ERD
   - Executar queries
   - Navegar documentação

8. **Q&A** (5 min)
   - Estatísticas
   - Perguntas

**Total: ~40 minutos**

## Troubleshooting

### Banco não conecta
- Verificar PostgreSQL está rodando
- Verificar credenciais
- Testar: `psql -U postgres -d workconnect_db -c "SELECT 1;"`

### ERD não gera
- Verificar banco existe
- Verificar schema aplicado
- Verificar foreign keys estão definidas

### SchemaSpy não funciona
- Verificar Java instalado: `java -version`
- Verificar GraphViz instalado: `dot -V`
- Verificar driver PostgreSQL baixado

## Suporte

Para questões:
- Consulte os guias em `scripts/`
- Veja documentação completa: `doc/diagrama-der-completo.md`
- Verifique queries: `database/verify.sql`

## Próximos Passos

1. **Setup do banco** - Execute `database/setup.sh` ou `setup.bat`
2. **Gerar diagramas** - Use pgAdmin ou DBeaver
3. **Gerar docs** - Execute SchemaSpy
4. **Revisar slides** - Prepare apresentação
5. **Testar demo** - Pratique queries

---

**Boa apresentação! 🚀**

