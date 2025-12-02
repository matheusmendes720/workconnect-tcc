# Quick Start: Reverse Engineering
## Guia Rápido - 5 Minutos

---

## ⚡ Processo Rápido

### 1. Criar Banco (2 min)

**Windows:**
```bash
cd presentation\scripts
create-mysql-database.bat
```

**Linux/Mac:**
```bash
cd presentation/scripts
./create-mysql-database.sh
```

### 2. Reverse Engineer (2 min)

1. Abra **MySQL Workbench**
2. Conecte ao servidor
3. **Database → Reverse Engineer** (`Ctrl+R`)
4. Selecione conexão → **Next**
5. Selecione `workconnect_db` → **Next**
6. Marque **Tables** → **Next**
7. **Execute** → **Next** → **Finish**
8. ✅ **Pronto!**

### 3. Salvar (1 min)

1. **File → Save Model**
2. Salvar em: `presentation/erd/mysql-workbench/workconnect-eer.mwb`

---

## ✅ Checklist Rápido

- [ ] Banco criado
- [ ] Reverse engineering executado
- [ ] Modelo salvo
- [ ] Diagrama visualizado

---

## 🆘 Problemas?

Veja: `REVERSE_ENGINEERING_GUIDE.md` (guia completo)

---

**Tempo total: ~5 minutos** ⚡

