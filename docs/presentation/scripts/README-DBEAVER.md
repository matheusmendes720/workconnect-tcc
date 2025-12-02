# DBeaver ERD Tools - Quick Reference

## 📁 Arquivos Disponíveis

### Projeto DBeaver
- **`workconnect-dbeaver.dbs`** - Arquivo de projeto DBeaver para importação rápida

### Scripts de Importação
- **`import-dbeaver-project.bat`** - Helper para Windows
- **`import-dbeaver-project.sh`** - Helper para Linux/Mac

### Guias e Documentação
- **`dbeaver-quick-erd.md`** - Guia rápido para gerar ERD
- **`dbeaver-erd-checklist.md`** - Checklist completo
- **`dbeaver-quick-import.md`** - Guia de importação rápida
- **`dbeaver-erd-guide.md`** - Guia completo original

### Scripts SQL
- **`dbeaver-connection-script.sql`** - Script de verificação de conexão

### Helpers
- **`dbeaver-setup-helper.bat`** - Helper de setup completo

---

## 🚀 Quick Start

### Opção 1: Importar Projeto (Rápido)
```bash
cd presentation/scripts
import-dbeaver-project.bat  # ou .sh
```

### Opção 2: Criar Conexão Manual (Mais Simples)
1. Abrir DBeaver
2. Database → New Database Connection
3. PostgreSQL
4. Host: localhost, Port: 5432, Database: workconnect_db
5. Username: postgres, Password: (sua senha)
6. Test Connection → Finish

### Opção 3: Usar Helper
```bash
cd presentation/scripts
dbeaver-setup-helper.bat
```

---

## 📖 Guias por Necessidade

| Necessidade | Arquivo |
|-------------|---------|
| **Importar projeto** | `dbeaver-quick-import.md` |
| **Gerar ERD** | `dbeaver-quick-erd.md` |
| **Checklist completo** | `dbeaver-erd-checklist.md` |
| **Guia detalhado** | `dbeaver-erd-guide.md` |
| **Verificar conexão** | `dbeaver-connection-script.sql` |

---

## ⚡ Fluxo Recomendado

```
1. Importar/Criar Conexão
   → import-dbeaver-project.bat
   → ou criar manualmente

2. Verificar Conexão
   → Executar: dbeaver-connection-script.sql

3. Gerar ERD
   → Seguir: dbeaver-quick-erd.md

4. Exportar Diagramas
   → File → Export Diagram → Image (PNG)
```

---

## 🎯 Configuração Rápida

```
Host: localhost
Port: 5432
Database: workconnect_db
Username: postgres
Password: (sua senha)
```

---

**Tudo pronto para usar! 🚀**

