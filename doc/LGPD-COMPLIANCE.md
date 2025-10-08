# 🔒 Conformidade LGPD - Work Connect
## Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)

📍 **Navegação:**
🏠 [README Principal](../README.md) | 📚 [Índice Diagramas](./INDEX-DIAGRAMAS.md) | 📖 [Tutorial](../TUTORIAL_CONTRIBUICAO_COMPLETO.md)

---

**Documento:** Conformidade Legal Obrigatória  
**Versão:** 1.0  
**Data:** 2025  
**Status:** ✅ Implementado no Sistema

---

## 📋 Índice

- [O que é LGPD](#-o-que-é-lgpd)
- [Por que é Importante](#-por-que-é-importante)
- [Dados Coletados](#-dados-coletados-pelo-work-connect)
- [Bases Legais](#-bases-legais-do-tratamento)
- [Direitos dos Titulares](#-direitos-dos-titulares)
- [Implementação Técnica](#-implementação-técnica)
- [Processos e Procedimentos](#-processos-e-procedimentos)
- [Auditoria e Logs](#-auditoria-e-logs)
- [Retenção de Dados](#-retenção-de-dados)
- [Segurança da Informação](#-segurança-da-informação)
- [Responsabilidades](#-responsabilidades)
- [Incidentes e Violações](#-incidentes-e-violações)

---

## 📖 O que é LGPD?

A **Lei Geral de Proteção de Dados Pessoais (LGPD)** - Lei nº 13.709/2018 - é a legislação brasileira que regula o tratamento de dados pessoais por organizações públicas e privadas.

### Definições Importantes

**Dado Pessoal:**
Informação relacionada a pessoa natural identificada ou identificável.  
*Exemplos no Work Connect:* Nome, email, telefone, CPF

**Titular:**
Pessoa natural a quem se referem os dados pessoais.  
*No Work Connect:* Usuários do sistema

**Tratamento:**
Toda operação realizada com dados pessoais.  
*Exemplos:* Coleta, armazenamento, consulta, modificação, compartilhamento, eliminação

**Controlador:**
Quem toma decisões sobre o tratamento de dados.  
*No Work Connect:* A empresa que utiliza o sistema

**Operador:**
Quem realiza o tratamento em nome do controlador.  
*No Work Connect:* O sistema Work Connect (desenvolvido pelo time do TCC)

---

## ⚖️ Por que é Importante?

### Penalidades por Não Conformidade

| Infração | Penalidade |
|----------|------------|
| Tratamento sem consentimento | Até 2% do faturamento (limite R$ 50 milhões) |
| Não atender direito do titular | Advertência, multa ou bloqueio |
| Vazamento de dados | Multas severas + responsabilização civil |
| Falta de segurança | Advertência, suspensão ou multa |

### Impacto Reputacional

- 🚫 Perda de confiança dos clientes
- 📉 Redução de vendas e receita
- ⚖️ Processos judiciais
- 📰 Exposição negativa na mídia

### Vantagem Competitiva

- ✅ Diferencial no mercado (muitos concorrentes não são conformes)
- ✅ Confiança dos clientes PMEs
- ✅ Segurança jurídica para o projeto
- ✅ Requisito para contratos corporativos

---

## 📊 Dados Coletados pelo Work Connect

### Dados Pessoais de Usuários

| Dado | Obrigatório | Finalidade | Base Legal |
|------|-------------|------------|------------|
| **Nome completo** | ✅ Sim | Identificação no sistema | Consentimento |
| **Email** | ✅ Sim | Login e comunicação | Consentimento |
| **Senha (hash)** | ✅ Sim | Autenticação | Consentimento |
| **Telefone** | ❌ Não | Contato para alertas | Consentimento |
| **Foto de perfil** | ❌ Não | Personalização da interface | Consentimento |
| **IP de acesso** | ✅ Sim | Segurança e auditoria | Legítimo interesse |
| **Histórico de ações** | ✅ Sim | Auditoria de movimentações | Legítimo interesse |

### Dados NÃO Pessoais (Não regulados pela LGPD)

- Dados de produtos (código, nome, quantidade)
- Dados de categorias
- Dados de fornecedores (CNPJ, razão social - pessoa jurídica)
- Movimentações de estoque (quantidades, datas)
- Relatórios gerados

> **Nota:** Mesmo não sendo dados pessoais, esses dados pertencem à empresa cliente e são protegidos por confidencialidade contratual.

### Dados Sensíveis

❌ **O Work Connect NÃO coleta dados sensíveis** como:
- Origem racial ou étnica
- Convicção religiosa
- Opinião política
- Filiação sindical
- Dados de saúde
- Vida sexual
- Dados genéticos ou biométricos

---

## ⚖️ Bases Legais do Tratamento

### Consentimento (Artigo 7º, I)

**Quando aplicado:**
- Cadastro de nome, email, senha
- Envio de notificações por email
- Armazenamento de foto de perfil

**Como é obtido:**
- Termo de consentimento no primeiro acesso
- Checkboxes específicos por finalidade
- Registro de data/hora do consentimento
- Possibilidade de revogação a qualquer momento

**Implementação:**
```javascript
// Tela de primeiro login
<Form>
  <Checkbox required>
    Eu li e aceito os Termos de Uso
  </Checkbox>
  <Checkbox required>
    Autorizo o tratamento dos meus dados pessoais 
    conforme Política de Privacidade
  </Checkbox>
  <Button>Aceitar e Continuar</Button>
</Form>

// Backend registra
await Usuario.update({
  consentimento_lgpd: true,
  data_consentimento: new Date()
}, { where: { id: userId }});
```

### Legítimo Interesse (Artigo 7º, IX)

**Quando aplicado:**
- Registro de IP para segurança
- Logs de acesso para auditoria
- Histórico de movimentações para integridade do estoque

**Justificativa:**
- Prevenção de fraudes
- Segurança do sistema
- Integridade dos dados empresariais
- Auditoria fiscal e contábil

**Testes de Proporcionalidade:**
1. **Necessidade:** Dados são essenciais para operação segura
2. **Adequação:** Dados usados apenas para finalidade declarada
3. **Proporcionalidade:** Mínimo necessário de dados

---

## 🔐 Direitos dos Titulares (Artigos 18 e 19)

### 1. Direito de Confirmação e Acesso

**O titular pode:**
- ✅ Confirmar que seus dados estão sendo tratados
- ✅ Acessar todos os dados armazenados sobre ele

**Implementação no Work Connect:**
```
Menu: Configurações > Meus Dados
Exibe: Nome, Email, Telefone, Perfil, Data de criação, Último acesso
```

**Caso de Uso:** UC702 parcial

---

### 2. Direito à Portabilidade

**O titular pode:**
- ✅ Receber seus dados em formato estruturado e legível por máquina
- ✅ Transmitir para outro sistema

**Implementação no Work Connect:**
```
Menu: Configurações > Meus Dados > Exportar Dados
Formato: JSON estruturado
Conteúdo: Todos os dados pessoais + histórico
Prazo: Disponibilizado em até 15 dias (geralmente imediato)
```

**Caso de Uso:** UC702 (Exportar Meus Dados Pessoais)

**Exemplo de Arquivo Gerado:**
```json
{
  "export_date": "2025-01-20T14:30:00Z",
  "user_id": 123,
  "personal_data": {
    "name": "João Silva",
    "email": "joao@empresa.com",
    "phone": "(11) 98765-4321",
    "created_at": "2024-12-01T10:00:00Z",
    "last_access": "2025-01-20T09:15:00Z",
    "profile": "OPERADOR"
  },
  "activity_history": [
    {
      "date": "2025-01-15T11:00:00Z",
      "action": "Registrou entrada de Parafuso M5",
      "quantity": 100
    }
  ],
  "access_logs": [
    {
      "timestamp": "2025-01-20T09:15:00Z",
      "ip": "192.168.1.100",
      "action": "LOGIN"
    }
  ]
}
```

---

### 3. Direito à Correção

**O titular pode:**
- ✅ Solicitar correção de dados incompletos ou desatualizados

**Implementação:**
```
Menu: Configurações > Meus Dados > Editar
Permite: Alterar nome, telefone, foto
Não permite: Alterar email (usado como login - requer suporte)
```

---

### 4. Direito à Eliminação (Esquecimento)

**O titular pode:**
- ✅ Solicitar eliminação de dados desnecessários ou tratados em desconformidade
- ✅ Revogar consentimento

**Implementação no Work Connect:**

**Processo de 90 Dias:**
```
Dia 0: Usuário solicita exclusão
   └─> data_exclusao_solicitada = 2025-01-20
   └─> Sistema envia email de confirmação
   └─> Usuário pode cancelar a qualquer momento

Dia 1-89: Período de carência
   └─> Usuário ainda pode acessar normalmente
   └─> Pode cancelar solicitação a qualquer momento

Dia 90: Anonimização automática (04:00 AM)
   └─> Job executa sp_anonimizar_usuario()
   └─> nome → "Usuário Anônimo #123"
   └─> email → "anonimo_123@sistema.local"
   └─> telefone → NULL
   └─> foto_perfil → NULL
   └─> hash_senha → NULL
   └─> ativo → FALSE
   └─> Histórico de movimentações PRESERVADO
```

**Por que 90 dias?**
- Permite cancelamento se arrependimento
- Atende exigência legal de "prazo razoável"
- Preserva integridade do histórico de estoque

**Caso de Uso:** UC703 (Solicitar Exclusão de Dados)

---

### 5. Direito à Informação

**O titular pode:**
- ✅ Saber com quem seus dados são compartilhados
- ✅ Conhecer a finalidade do tratamento

**Implementação:**
```
Documento: Política de Privacidade (acessível no login)
Menu: Configurações > Privacidade e Dados

Informa:
- Dados coletados e finalidades
- Não há compartilhamento com terceiros
- Dados ficam no servidor da empresa cliente
- Backup em cloud com criptografia
```

---

## 🛠️ Implementação Técnica

### Banco de Dados

#### Campos LGPD na Tabela Usuario

```sql
CREATE TABLE usuario (
    -- ... campos normais ...
    
    -- Campos LGPD
    consentimento_lgpd BOOLEAN DEFAULT FALSE,
    data_consentimento TIMESTAMP,
    data_exclusao_solicitada TIMESTAMP,
    
    CONSTRAINT chk_consentimento CHECK (
        (consentimento_lgpd = TRUE AND data_consentimento IS NOT NULL) OR
        (consentimento_lgpd = FALSE)
    )
);
```

#### Tabela de Auditoria

```sql
CREATE TABLE auditoria_lgpd (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    acao VARCHAR(50) NOT NULL, -- ACESSO, EXPORTACAO, EXCLUSAO, etc
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_origem VARCHAR(45) NOT NULL,
    dados_acessados TEXT,
    justificativa TEXT
);

-- Retenção mínima: 6 meses
CREATE INDEX idx_auditoria_data ON auditoria_lgpd(data_hora);
```

**Referência:** [Tabela AUDITORIA_LGPD](./diagrama-der-estoque.md#10-tabela-auditoria_lgpd)

---

### Backend (Node.js)

#### Middleware de Auditoria

```javascript
// middleware/lgpdAudit.js
const auditarAcaoLGPD = async (req, res, next) => {
  // Intercepta rotas que acessam dados pessoais
  if (req.path.includes('/usuarios') || req.path.includes('/perfil')) {
    await AuditoriaLGPD.create({
      usuario_id: req.user.id,
      acao: 'ACESSO_DADOS',
      data_hora: new Date(),
      ip_origem: req.ip,
      dados_acessados: req.path
    });
  }
  next();
};

module.exports = auditarAcaoLGPD;
```

#### Controlador de Exportação

```javascript
// controllers/lgpdController.js
const exportarDadosUsuario = async (req, res) => {
  const userId = req.user.id;
  
  // Coletar todos os dados
  const usuario = await Usuario.findByPk(userId, {
    attributes: ['id', 'nome', 'email', 'telefone', 'data_criacao']
  });
  
  const movimentacoes = await MovimentacaoEstoque.findAll({
    where: { usuario_id: userId },
    include: [Produto]
  });
  
  const logsAcesso = await AuditoriaLGPD.findAll({
    where: { usuario_id: userId },
    order: [['data_hora', 'DESC']],
    limit: 100
  });
  
  // Gerar JSON
  const dadosCompletos = {
    export_date: new Date(),
    user_id: userId,
    personal_data: usuario,
    activity_history: movimentacoes,
    access_logs: logsAcesso
  };
  
  // Registrar exportação
  await AuditoriaLGPD.create({
    usuario_id: userId,
    acao: 'EXPORTACAO_DADOS',
    ip_origem: req.ip,
    dados_acessados: 'Exportação completa de dados pessoais'
  });
  
  // Enviar email com link de download
  await enviarEmailExportacao(usuario.email, dadosCompletos);
  
  res.json({ 
    success: true, 
    message: 'Exportação solicitada. Verifique seu email.' 
  });
};
```

#### Processo de Anonimização

```javascript
// jobs/lgpdJobs.js
const anonimizarUsuariosPendentes = async () => {
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 90);
  
  // Buscar usuários com exclusão solicitada há mais de 90 dias
  const usuariosPendentes = await Usuario.findAll({
    where: {
      data_exclusao_solicitada: {
        [Op.lte]: dataLimite
      },
      ativo: true
    }
  });
  
  for (const usuario of usuariosPendentes) {
    // Anonimizar
    await usuario.update({
      nome: `Usuário Anônimo #${usuario.id}`,
      email: `anonimo_${usuario.id}@sistema.local`,
      telefone: null,
      foto_perfil: null,
      hash_senha: null,
      ativo: false
    });
    
    // Registrar anonimização
    await AuditoriaLGPD.create({
      usuario_id: usuario.id,
      acao: 'ANONIMIZACAO',
      ip_origem: '::1',
      dados_acessados: 'Dados pessoais anonimizados conforme LGPD'
    });
    
    // Enviar email de confirmação
    // (para email antigo antes de anonimizar)
    await enviarEmailConfirmacaoExclusao(usuario.email);
    
    console.log(`Usuário #${usuario.id} anonimizado com sucesso`);
  }
  
  console.log(`${usuariosPendentes.length} usuários anonimizados`);
};

// Executar diariamente às 04:00
cron.schedule('0 4 * * *', anonimizarUsuariosPendentes);
```

---

### Frontend (React)

#### Componente de Consentimento

```jsx
// components/ConsentimentoLGPD.jsx
import React, { useState } from 'react';

const ConsentimentoLGPD = ({ onAccept }) => {
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [aceitouDados, setAceitouDados] = useState(false);
  
  const handleSubmit = async () => {
    if (!aceitouTermos || !aceitouDados) {
      alert('É necessário aceitar ambos os termos');
      return;
    }
    
    // Registrar consentimento
    await api.post('/lgpd/consentimento', {
      consentimento: true,
      data_consentimento: new Date()
    });
    
    onAccept();
  };
  
  return (
    <Modal title="Termos de Uso e Privacidade" size="large">
      <div className="termos-content">
        <h3>Termo de Consentimento LGPD</h3>
        <p>
          O Work Connect coleta e trata seus dados pessoais 
          (nome, email, telefone) para permitir o uso do sistema 
          de gestão de estoque.
        </p>
        
        <h4>Dados Coletados:</h4>
        <ul>
          <li>Nome completo - para identificação</li>
          <li>Email - para login e comunicação</li>
          <li>Telefone (opcional) - para alertas</li>
          <li>IP de acesso - para segurança</li>
        </ul>
        
        <h4>Seus Direitos:</h4>
        <ul>
          <li>Acessar seus dados a qualquer momento</li>
          <li>Exportar seus dados em formato JSON</li>
          <li>Solicitar correção de dados incorretos</li>
          <li>Solicitar exclusão dos seus dados</li>
          <li>Revogar este consentimento</li>
        </ul>
        
        <Checkbox 
          checked={aceitouTermos}
          onChange={(e) => setAceitouTermos(e.target.checked)}
        >
          Li e aceito os Termos de Uso
        </Checkbox>
        
        <Checkbox 
          checked={aceitouDados}
          onChange={(e) => setAceitouDados(e.target.checked)}
        >
          Autorizo o tratamento dos meus dados pessoais 
          conforme descrito acima
        </Checkbox>
      </div>
      
      <Button 
        type="primary" 
        disabled={!aceitouTermos || !aceitouDados}
        onClick={handleSubmit}
      >
        Aceitar e Continuar
      </Button>
      
      <Button type="text" onClick={() => window.location.href = '/logout'}>
        Não Aceito (Sair)
      </Button>
    </Modal>
  );
};
```

#### Página de Exportação de Dados

```jsx
// pages/ExportarDados.jsx
const ExportarDados = () => {
  const [loading, setLoading] = useState(false);
  
  const handleExportar = async () => {
    // Confirmar identidade
    const senha = await solicitarSenha();
    
    setLoading(true);
    
    try {
      const response = await api.post('/lgpd/exportar-dados', { senha });
      
      message.success(
        'Exportação solicitada! Você receberá um email com o link de download.'
      );
      
      // Registrar na auditoria local
      console.log('Dados exportados:', new Date());
      
    } catch (error) {
      message.error('Erro ao exportar dados: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card title="Exportar Meus Dados (LGPD)">
      <Alert 
        type="info" 
        message="Direito à Portabilidade"
        description="Você tem o direito de receber uma cópia de todos os seus dados pessoais armazenados no sistema."
      />
      
      <Divider />
      
      <p>O arquivo incluirá:</p>
      <ul>
        <li>Seus dados cadastrais</li>
        <li>Histórico de movimentações que você registrou</li>
        <li>Logs de acesso ao sistema</li>
      </ul>
      
      <Button 
        type="primary" 
        icon={<DownloadOutlined />}
        loading={loading}
        onClick={handleExportar}
      >
        Exportar Meus Dados
      </Button>
    </Card>
  );
};
```

---

## 📝 Processos e Procedimentos

### Processo 1: Coleta de Consentimento

**Quando:** Primeiro acesso do usuário  
**Responsável:** Sistema (automático)  
**Duração:** 2-3 minutos

**Passos:**
1. Usuário cria conta ou é cadastrado por admin
2. No primeiro login, sistema detecta: `consentimento_lgpd = FALSE`
3. Sistema exibe modal de consentimento (bloqueia acesso)
4. Usuário lê termos e marca checkboxes
5. Usuário clica em "Aceitar"
6. Sistema registra:
   ```sql
   UPDATE usuario 
   SET consentimento_lgpd = TRUE, 
       data_consentimento = CURRENT_TIMESTAMP
   WHERE id = ?;
   
   INSERT INTO auditoria_lgpd (usuario_id, acao, ip_origem)
   VALUES (?, 'CONSENTIMENTO', ?);
   ```
7. Sistema libera acesso ao sistema

---

### Processo 2: Exportação de Dados

**Quando:** Solicitado pelo usuário  
**Responsável:** Sistema  
**Prazo:** Até 15 dias (geralmente imediato)

**Passos:**
1. Usuário solicita exportação
2. Sistema valida identidade (senha ou 2FA)
3. Sistema consulta dados:
   ```sql
   SELECT sp_exportar_dados_usuario(usuario_id);
   ```
4. Sistema gera JSON estruturado
5. Sistema envia email:
   ```
   Assunto: Seus dados pessoais - Work Connect
   Corpo: 
     Conforme solicitado, seus dados estão disponíveis para download:
     Link: https://sistema.com/download/xyz123 (expira em 48h)
   ```
6. Sistema registra auditoria
7. Após 48h, sistema exclui arquivo temporário

---

### Processo 3: Exclusão/Anonimização

**Quando:** Solicitado pelo usuário  
**Responsável:** Sistema + Job Automático  
**Prazo:** 90 dias

**Passos:**
1. Usuário solicita exclusão (UC703)
2. Sistema registra data_exclusao_solicitada
3. Sistema envia email:
   ```
   Sua solicitação de exclusão foi registrada.
   Data de anonimização: 20/04/2025
   Para cancelar, acesse: Configurações > Privacidade
   ```
4. Durante 90 dias:
   - Usuário continua com acesso normal
   - Pode cancelar a qualquer momento
5. No dia 90, job automático (04:00 AM):
   ```javascript
   await anonimizarUsuariosPendentes();
   ```
6. Sistema anonimiza dados:
   - Dados pessoais → valores genéricos
   - Histórico → preservado
   - Auditoria → registrada
7. Sistema envia email final:
   ```
   Seus dados foram anonimizados conforme solicitado.
   Você não poderá mais acessar o sistema com esta conta.
   ```

---

## 📊 Auditoria e Logs

### O que é Auditado

**Ações Registradas:**

| Ação | Quando | Dados Registrados |
|------|--------|-------------------|
| **CONSENTIMENTO** | Aceite de termos | user_id, data/hora, IP |
| **ACESSO_DADOS** | Visualização de dados pessoais | user_id, dados acessados, IP |
| **EXPORTACAO_DADOS** | Solicitação de exportação | user_id, data/hora, IP |
| **EXCLUSAO_DADOS** | Solicitação de exclusão | user_id, data solicitação |
| **ANONIMIZACAO** | Anonimização executada | user_id, data execução |

### Retenção de Logs

- **Logs LGPD:** 6 meses mínimo (Art. 37, §2º)
- **Logs de sistema:** 12 meses
- **Backup de logs:** 2 anos (archive)

### Consulta de Auditoria

**SQL:**
```sql
-- Auditoria de um usuário
SELECT 
    acao,
    data_hora,
    ip_origem,
    dados_acessados
FROM auditoria_lgpd
WHERE usuario_id = 123
ORDER BY data_hora DESC;

-- Estatísticas gerais
SELECT 
    acao,
    COUNT(*) as total,
    COUNT(DISTINCT usuario_id) as usuarios_unicos
FROM auditoria_lgpd
WHERE data_hora >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY acao;
```

---

## ⏰ Retenção de Dados

### Políticas de Retenção

| Tipo de Dado | Retenção | Após o Período |
|--------------|----------|----------------|
| **Dados cadastrais** | Enquanto usuário ativo | Anonimização |
| **Logs de auditoria LGPD** | 6 meses | Exclusão |
| **Logs de sistema** | 12 meses | Archive |
| **Histórico de movimentações** | Indefinido | Anonimizado (usuário) |
| **Relatórios gerados** | 12 meses | Exclusão automática |
| **Backups** | 30 dias (online) | 1 ano (archive) |

### Job de Limpeza

```sql
-- Executar mensalmente
CREATE OR REPLACE FUNCTION job_limpar_dados_expirados()
RETURNS void AS $$
BEGIN
    -- Limpar logs LGPD > 6 meses
    DELETE FROM auditoria_lgpd
    WHERE data_hora < CURRENT_TIMESTAMP - INTERVAL '6 months';
    
    -- Limpar relatórios expirados
    DELETE FROM relatorio
    WHERE data_expiracao < CURRENT_DATE;
    
    RAISE NOTICE 'Limpeza de dados expirados concluída';
END;
$$ LANGUAGE plpgsql;
```

---

## 🔐 Segurança da Informação

### Medidas Técnicas Implementadas

#### 1. Criptografia

**Em Trânsito:**
- ✅ HTTPS/TLS 1.3 obrigatório
- ✅ Certificado SSL válido (Let's Encrypt)
- ✅ HSTS (HTTP Strict Transport Security)

**Em Repouso:**
- ✅ Senhas: SHA-256 + salt (bcrypt)
- ✅ Banco de dados: PostgreSQL encryption at rest
- ✅ Backups: Criptografados com AES-256

**Código:**
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12;

// Hash de senha
const hashSenha = await bcrypt.hash(senha, saltRounds);

// Validação
const valida = await bcrypt.compare(senhaDigitada, hashArmazenado);
```

#### 2. Controle de Acesso

**Autenticação:**
- OAuth 2.0 com tokens JWT
- Sessões com timeout (30 minutos de inatividade)
- 2FA opcional para administradores

**Autorização:**
- Baseada em perfis (RBAC)
- Validação em backend (não confiar em frontend)
- Princípio do menor privilégio

**Código:**
```javascript
// middleware/auth.js
const verificarPermissao = (permissaoRequerida) => {
  return async (req, res, next) => {
    const perfil = await Perfil.findByPk(req.user.perfil_id);
    
    if (perfil.permissoes[permissaoRequerida] !== true) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    next();
  };
};

// Uso nas rotas
router.post('/produtos', 
  autenticar, 
  verificarPermissao('criar_produto'), 
  criarProduto
);
```

#### 3. Proteção contra Ataques

**Implementado:**
- ✅ Rate limiting (100 req/min por IP)
- ✅ Proteção CSRF
- ✅ Sanitização de inputs (XSS prevention)
- ✅ Prepared statements (SQL injection prevention)
- ✅ Validação de tipos (TypeScript)

**Código:**
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // 100 requests
  message: 'Muitas requisições. Tente novamente em 1 minuto.'
});

app.use('/api/', limiter);

// Sanitização
const validator = require('validator');

const nome = validator.escape(req.body.nome);
const email = validator.normalizeEmail(req.body.email);
```

---

## 👥 Responsabilidades

### Controlador (Empresa Cliente)

**Responsável por:**
- Definir finalidades do tratamento
- Garantir conformidade legal
- Responder a solicitações dos titulares
- Notificar ANPD em caso de incidente
- Manter política de privacidade atualizada

### Operador (Work Connect / Desenvolvedores TCC)

**Responsável por:**
- Implementar medidas de segurança
- Seguir instruções do controlador
- Manter sistema conforme LGPD
- Notificar controlador sobre incidentes
- Auditar acessos e tratamentos

### Encarregado de Dados (DPO)

**Recomendação:**
- Empresa cliente deve designar DPO
- Ponto de contato: dpo@empresa.com
- Responsável por interface com ANPD

---

## 🚨 Incidentes e Violações

### Definição de Incidente

Qualquer evento que:
- Acesso não autorizado a dados pessoais
- Vazamento/exposição de dados
- Modificação não autorizada
- Perda de dados
- Indisponibilidade prolongada

### Procedimento em Caso de Incidente

**Prazo:** Notificar ANPD em até 2 dias úteis (incidentes graves)

**Passos:**
1. **Detecção:**
   - Logs do sistema
   - Alertas de monitoramento
   - Reporte de usuário

2. **Contenção:**
   - Isolar sistemas afetados
   - Revogar tokens comprometidos
   - Bloquear IPs suspeitos

3. **Investigação:**
   - Identificar causa raiz
   - Extensão do vazamento
   - Dados afetados

4. **Notificação:**
   - ANPD (se grave)
   - Titulares afetados
   - Controlador (empresa)

5. **Remediação:**
   - Corrigir vulnerabilidade
   - Restaurar dados (se perda)
   - Implementar prevenções

6. **Documentação:**
   - Relatório completo do incidente
   - Medidas tomadas
   - Lições aprendidas

### Modelo de Email de Notificação

```
Assunto: URGENTE - Incidente de Segurança - Work Connect

Prezado(a) [Nome],

Informamos que em [data], detectamos [descrição do incidente].

DADOS AFETADOS:
- [Listar tipos de dados]

MEDIDAS TOMADAS:
- [Listar ações de contenção]

SEUS DIREITOS:
- Você pode solicitar exclusão dos seus dados
- Você pode revogar o consentimento
- Você pode entrar em contato: dpo@empresa.com

Pedimos desculpas pelo ocorrido e reiteramos nosso compromisso 
com a segurança dos seus dados.

Atenciosamente,
Equipe Work Connect
```

---

## 📚 Documentação Obrigatória

### 1. Política de Privacidade

**Conteúdo mínimo:**
- Dados coletados e finalidades
- Bases legais do tratamento
- Compartilhamento com terceiros (se houver)
- Direitos dos titulares
- Como exercer direitos
- Contato do encarregado (DPO)
- Prazo de retenção
- Medidas de segurança

**Localização no sistema:**
- Link no rodapé de todas as páginas
- Acessível antes do login
- Arquivo: `/docs/politica-privacidade.md`

### 2. Termo de Consentimento

**Características:**
- Linguagem clara e acessível
- Específico por finalidade
- Destacado e de fácil visualização
- Registrado com data/hora

### 3. Relatório de Impacto (RIPD)

**Quando necessário:**
- Tratamento de alto risco
- Grande volume de dados
- Dados sensíveis (não aplicável ao Work Connect)

**Status:** Não obrigatório para este projeto (baixo risco)

### 4. Registro de Operações de Tratamento

**Conteúdo:**
- Todas as operações realizadas
- Categorias de dados
- Finalidades
- Compartilhamentos
- Medidas de segurança

**Implementação:**
- Tabela `auditoria_lgpd`
- Relatórios automáticos mensais

---

## ✅ Checklist de Conformidade

### Antes do Deploy

- [ ] Política de Privacidade publicada
- [ ] Termo de Consentimento implementado
- [ ] Tabela de auditoria criada
- [ ] Funções de exportação funcionando
- [ ] Processo de anonimização testado
- [ ] HTTPS configurado
- [ ] Criptografia de senhas ativa
- [ ] Rate limiting implementado
- [ ] Backup automático configurado
- [ ] Logs de segurança ativos

### Manutenção Contínua

- [ ] Review mensal de logs de auditoria
- [ ] Teste trimestral de exportação de dados
- [ ] Teste semestral de processo de anonimização
- [ ] Atualização anual da Política de Privacidade
- [ ] Treinamento anual da equipe sobre LGPD

---

## 📞 Contatos LGPD

### Para Usuários (Titulares)

**Exercer Direitos:**
- Email: privacidade@workconnect.com
- Telefone: (11) 1234-5678
- Formulário: dentro do sistema (Configurações > Privacidade)

**Prazo de Resposta:** Até 15 dias

### Para Autoridade (ANPD)

**Notificar Incidentes:**
- Portal da ANPD: https://www.gov.br/anpd
- Email: comunicacao@anpd.gov.br
- Prazo: 2 dias úteis (incidentes relevantes)

---

## 🎓 Referências Legais

- [Lei nº 13.709/2018 (LGPD)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Guia ANPD para Pequenos Negócios](https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/guia-lgpd-para-pequenos-negocios)
- [Resolução CD/ANPD nº 2/2022](https://www.in.gov.br/web/dou/-/resolucao-cd/anpd-n-2-de-27-de-janeiro-de-2022-376562019) (Agentes de Tratamento)

---

<div align="center">

**Work Connect está em conformidade com a LGPD**

**Desenvolvido com responsabilidade e segurança jurídica**

**SENAI - TCC 2024-2025**

</div>

---

**Documento gerado para:** Work Connect - Sistema de Gestão de Estoque  
**Data:** 2025  
**Tipo:** Documentação de Conformidade LGPD  
**Versão:** 1.0  
**Autores:** Patrick Lima, Rafael Bastos, Lucas Lima, Rodrigo Neri, Matheus Santos  
**Revisão Jurídica:** Recomendada antes do deploy em produção

