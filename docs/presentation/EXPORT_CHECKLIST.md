# Checklist de Exportação

## Diagramas ERD

### ERD Completo
- [ ] `presentation/diagrams/full-erd.png` (alta resolução, mínimo 1920x1080)
- [ ] `presentation/diagrams/full-erd.pdf` (para impressão/documentação)

### Diagramas por Módulo
- [ ] `presentation/diagrams/modules/01-users-auth.png`
- [ ] `presentation/diagrams/modules/02-inventory.png`
- [ ] `presentation/diagrams/modules/03-sales.png`
- [ ] `presentation/diagrams/modules/04-finances.png`
- [ ] `presentation/diagrams/modules/05-logistics.png`
- [ ] `presentation/diagrams/modules/06-reports.png`
- [ ] `presentation/diagrams/modules/07-audit.png`

### Arquitetura
- [ ] `presentation/diagrams/architecture-overview.png` (opcional, diagrama de alto nível)

## Documentação Interativa

- [ ] `presentation/docs/schemaspy/index.html` gerado
- [ ] SchemaSpy documentation completa e navegável
- [ ] ER Diagrams disponíveis no SchemaSpy

## Ferramentas para Gerar

### pgAdmin 4
- [ ] Instalado e configurado
- [ ] Conectado ao banco `workconnect_db`
- [ ] ERD tool testado
- [ ] Export funcionando

### DBeaver (Alternativa)
- [ ] Instalado e configurado
- [ ] Conectado ao banco `workconnect_db`
- [ ] ER Diagram testado
- [ ] Export funcionando

### SchemaSpy (Opcional)
- [ ] Java JRE instalado
- [ ] GraphViz instalado (opcional, para diagramas)
- [ ] SchemaSpy JAR baixado
- [ ] PostgreSQL driver baixado
- [ ] Documentação gerada

## Verificação

### Antes de Considerar Completo

- [ ] Todos os diagramas exportados
- [ ] Resolução adequada (mínimo 1920x1080 para PNG)
- [ ] Diagramas legíveis
- [ ] Relacionamentos visíveis
- [ ] Nomes de tabelas claros
- [ ] Documentação HTML funcionando (se SchemaSpy usado)

## Instruções

Para gerar os diagramas, consulte:
- `presentation/scripts/pgadmin-erd-guide.md`
- `presentation/scripts/dbeaver-erd-guide.md`
- `presentation/scripts/schemaspy-setup-guide.md`

## Nota Importante

**Os diagramas devem ser gerados manualmente** após:
1. Banco de dados criado (`presentation/database/setup.sh` ou `setup.bat`)
2. Schema aplicado
3. Ferramenta de visualização configurada

Este checklist serve como guia do que precisa ser gerado.

