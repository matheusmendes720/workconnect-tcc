# WorkConnect - Documentação

Documentação técnica e estratégica do Sistema de Gestão de Estoque Inteligente para PMEs.

## Visão Geral

Esta documentação é construída com [Docusaurus](https://docusaurus.io/) e inclui:

- **Cluster Estratégia**: BM Canvas, PM Canvas
- **Cluster Técnica**: Arquitetura, Tecnologias, Implementação
- **Diagramas Mermaid**: Visualizações interativas de arquitetura e fluxos

## Estrutura

```
documentation/
├── docs/
│   ├── estrategia/       # Documentação estratégica
│   │   ├── bmc-canvas.mdx
│   │   └── pm-canvas.mdx
│   └── tecnica/          # Documentação técnica
│       ├── intro.mdx
│       ├── arquitetura.mdx
│       └── tecnologias.mdx
├── src/
│   └── pages/           # Homepage customizada
├── static/              # Assets estáticos
└── docusaurus.config.ts # Configuração principal
```

## Comandos

### Desenvolvimento (na raiz do projeto)

```bash
# Iniciar documentação em modo desenvolvimento
npm run docs:dev

# Build da documentação para produção
npm run docs:build

# Servir build localmente
npm run docs:serve
```

### Desenvolvimento (dentro da pasta documentation)

```bash
cd documentation

# Instalar dependências
npm install

# Modo desenvolvimento
npm run start

# Build produção
npm run build

# Servir localmente
npm run serve
```

## Deploy

### Deploy Separado (Recomendado)

Configure no Netlify para apontar para a pasta `documentation/`:

```toml
[build]
  command = "npm run build"
  publish = "build"
```

### Deploy Conjunto (App + Docs)

No Netlify, configure múltiplos sites ou use subdiretórios.

## Tecnologias

- **Framework**: Docusaurus 3.x
- **Linguagem**: TypeScript
- **Diagramas**: Mermaid
- **Estilização**: CSS Modules + Infima

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-documentacao`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona documentação X'`)
4. Push para a branch (`git push origin feature/nova-documentacao`)
5. Abra um Pull Request

## Licença

MIT - WorkConnect Team
