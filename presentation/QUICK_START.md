# Quick Start - Visual Presentation Setup

## 🚀 Setup Rápido (5 minutos)

### Passo 1: Criar Banco de Dados

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

### Passo 2: Gerar Visualizações

#### Opção A: pgAdmin 4 (Mais Rápido)

1. Abra **pgAdmin 4**
2. Conecte ao banco `workconnect_db`
3. Clique com botão direito no banco → **Diagrams** → **Create ER Diagram**
4. Exporte como PNG: Clique com botão direito → **Export as Image**
5. Salve em: `presentation/diagrams/full-erd.png`

**Tempo:** ~2 minutos

#### Opção B: DBeaver

1. Abra **DBeaver**
2. Conecte ao banco `workconnect_db`
3. Clique com botão direito no schema `public` → **View Diagram**
4. **File** → **Export Diagram** → **Image** → **PNG**
5. Salve em: `presentation/diagrams/full-erd.png`

**Tempo:** ~3 minutos

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

**Tempo:** ~5 minutos (incluindo download)

### Passo 3: Preparar Apresentação

1. Abra: `presentation/slides/presentation.md`
2. Revise os slides
3. Consulte: `presentation/PRESENTATION_GUIDE.md` para roteiro

**Tempo:** ~10 minutos

## ✅ Checklist Mínimo

Para apresentação básica, você precisa:

- [x] Banco de dados criado
- [ ] ERD completo exportado (PNG)
- [ ] pgAdmin ou DBeaver configurado
- [ ] Slides revisados
- [ ] Queries de demo testadas

## 📊 O Que Mostrar

### Mínimo Essencial

1. **ERD Completo** - Mostrar todas as tabelas
2. **Módulos** - Explicar os 7 módulos
3. **Integração** - Mostrar como módulos se conectam
4. **Triggers** - Explicar automações
5. **LGPD** - Mostrar conformidade

### Ideal (se tiver tempo)

6. **Queries ao vivo** - Executar queries de demo
7. **Views** - Mostrar dashboards
8. **Documentação interativa** - Navegar SchemaSpy

## 🎯 Estatísticas para Mencionar

- **30+ tabelas** em 7 módulos
- **11 triggers** automatizados
- **15 views** para dashboards
- **80+ índices** para performance
- **100% LGPD compliant**

## 📁 Arquivos Importantes

- **Slides:** `presentation/slides/presentation.md`
- **Guia completo:** `presentation/PRESENTATION_GUIDE.md`
- **Referência rápida:** `presentation/slides/quick-reference.md`
- **Queries demo:** `presentation/database/demo-queries.sql`
- **Estatísticas:** `presentation/slides/statistics-summary.md`

## ⚡ Se Tiver Pouco Tempo

**Foco em:**
1. ERD completo (mostrar visualmente)
2. Explicar 7 módulos
3. Mostrar 1 exemplo de integração
4. Mencionar triggers e LGPD

**Tempo total:** ~15 minutos de preparação + 20 minutos de apresentação

## 🆘 Problemas?

**Banco não conecta:**
- Verificar PostgreSQL está rodando
- Verificar credenciais

**ERD não gera:**
- Verificar banco existe
- Verificar schema aplicado

**Ferramenta não abre:**
- Usar diagramas exportados como backup
- Mostrar PDFs/imagens

## 📞 Ajuda Rápida

- **Setup:** `presentation/database/README.md`
- **Guia pgAdmin:** `presentation/scripts/pgadmin-erd-guide.md`
- **Guia DBeaver:** `presentation/scripts/dbeaver-erd-guide.md`
- **Guia completo:** `presentation/README.md`

---

**Boa apresentação! 🎉**

