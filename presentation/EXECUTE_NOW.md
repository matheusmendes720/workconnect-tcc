# ⚡ EXECUTE AGORA - Guia Rápido
## Comece Aqui para Executar Tudo!

---

## 🚀 PASSO 1: Verificar Pré-requisitos (2 min)

Execute o script de verificação:

```bash
cd presentation\scripts
check-prerequisites.bat
```

**O script verifica:**
- ✅ MySQL Server instalado
- ✅ MySQL Workbench instalado
- ✅ Arquivos necessários

**Se houver problemas, siga as instruções na tela.**

---

## 📋 PASSO 2: Criar Banco de Dados (5 min)

### Opção A: Script Automático (Recomendado)

```bash
cd presentation\scripts
create-mysql-database.bat
```

O script irá:
1. Solicitar credenciais MySQL (usuário e senha)
2. Criar o banco `workconnect_db`
3. Executar todo o schema
4. Inserir dados iniciais

### Opção B: Manual (Se script falhar)

1. Abra MySQL Workbench
2. Conecte ao servidor
3. Abra: `database/schema-mysql.sql`
4. Execute todo o script (Execute → Execute All)

### Verificar Sucesso

No MySQL Workbench, execute:
```sql
USE workconnect_db;
SHOW TABLES;
```

Deve mostrar ~30 tabelas!

---

## 📋 PASSO 3: Reverse Engineering (2 min)

### 3.1. No MySQL Workbench

1. **Database** → **Reverse Engineer...** (ou `Ctrl+R`)
2. Selecione conexão → **Next**
3. Marque `workconnect_db` → **Next**
4. Marque **Tables** → **Next**
5. **Execute** → **Next** → **Finish**

### 3.2. Resultado

🎉 O EER Diagram será aberto automaticamente!

---

## 📋 PASSO 4: Organizar e Salvar (5 min)

1. **Auto-Layout:** Botão direito → Arrange → Auto-Layout
2. **Salvar:** File → Save Model → `presentation/erd/mysql-workbench/workconnect-eer.mwb`
3. **Exportar:** File → Export → Export as PNG → 300 DPI

---

## ✅ CHECKLIST RÁPIDO

- [ ] Pré-requisitos verificados
- [ ] Banco criado
- [ ] Reverse Engineering executado
- [ ] Modelo salvo
- [ ] Diagrama exportado

---

## 🆘 PROBLEMAS?

### MySQL não encontrado?
→ Instale: https://dev.mysql.com/downloads/mysql/
→ Ou XAMPP: https://www.apachefriends.org/

### Script falhou?
→ Execute manualmente via MySQL Workbench
→ Abra `database/schema-mysql.sql` e execute

### Reverse Engineering falhou?
→ Verifique se o banco foi criado
→ Verifique conexão com servidor

---

## 📚 GUIAS COMPLETOS

- **Próximos Passos:** `NEXT_STEPS_EXECUTION.md`
- **Reverse Engineering:** `documentation/guides/REVERSE_ENGINEERING_GUIDE.md`
- **Troubleshooting:** `documentation/guides/troubleshooting-guide.md`

---

## ⏱️ TEMPO TOTAL

- Verificação: 2 min
- Criar banco: 5 min
- Reverse Engineering: 2 min
- Organizar: 5 min

**Total: ~15 minutos!** ⚡

---

**Vamos começar! Execute o PASSO 1 agora!** 🚀

