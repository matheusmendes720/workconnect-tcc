# WorkConnect - Modelo Conceitual Completo
## Documentação Completa do Modelo de Dados Conceitual

---

## Índice

1. [Introdução ao Modelo Conceitual](#introdução-ao-modelo-conceitual)
2. [Entidades e Atributos](#entidades-e-atributos)
3. [Relacionamentos e Cardinalidades](#relacionamentos-e-cardinalidades)
4. [Regras de Negócio](#regras-de-negócio)
5. [Normalização](#normalização)

---

## Introdução ao Modelo Conceitual

### O que é Modelagem Conceitual?

A **modelagem conceitual** é a primeira fase do processo de modelagem de dados, onde representamos o mundo real de forma abstrata, sem nos preocuparmos com detalhes de implementação técnica. O modelo conceitual descreve **O QUE** o sistema precisa armazenar, não **COMO** será armazenado.

### Objetivos e Princípios

**Objetivos:**
- Capturar os requisitos de negócio de forma clara e compreensível
- Identificar todas as entidades importantes do domínio
- Definir relacionamentos entre entidades
- Documentar regras de negócio essenciais
- Servir como base para o modelo lógico e físico

**Princípios:**
- **Simplicidade:** Foco no essencial, sem detalhes técnicos
- **Clareza:** Linguagem próxima ao domínio de negócio
- **Completude:** Cobertura de todos os aspectos relevantes
- **Independência:** Não depende de tecnologia específica

### Abordagem do WorkConnect

O WorkConnect utiliza uma abordagem **orientada a módulos**, organizando o modelo conceitual em 7 módulos funcionais:

1. **Usuários & Autenticação** - Gestão de usuários, perfis e sessões
2. **Inventário (Estoque)** - Gestão de produtos, categorias e movimentações
3. **Vendas** - Gestão de clientes, vendas e pagamentos
4. **Finanças** - Gestão de contas e transações financeiras
5. **Logística** - Gestão de pedidos, envios e rotas
6. **Relatórios** - Geração e gestão de relatórios
7. **Auditoria LGPD** - Conformidade com a Lei Geral de Proteção de Dados

---

## Entidades e Atributos

### Módulo 1: Usuários & Autenticação

#### Entidade: PERFIL (Profile/Role)

**Descrição:** Representa os perfis de acesso do sistema, definindo níveis de permissão e responsabilidades dos usuários.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome do perfil (ADMINISTRADOR, GERENTE, OPERADOR, CONSULTA, VENDEDOR)
- **descricao** (Descrição) - Descrição detalhada do perfil e suas responsabilidades
- **permissoes** (Permissões) - Estrutura JSON contendo permissões específicas
- **data_criacao** (Data de Criação) - Timestamp de criação do perfil

**Regras de Negócio:**
- Nome do perfil deve ser um dos valores pré-definidos
- Cada perfil possui permissões específicas definidas em formato JSON
- Perfis não podem ser excluídos se houver usuários associados

---

#### Entidade: USUARIO (User)

**Descrição:** Representa os usuários do sistema, incluindo informações pessoais e conformidade com LGPD.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome completo do usuário
- **email** (Email) - Endereço de email único e validado
- **hash_senha** (Hash da Senha) - Senha criptografada (SHA-256 ou bcrypt)
- **telefone** (Telefone) - Número de telefone (opcional)
- **foto_perfil** (Foto de Perfil) - URL da foto de perfil (opcional)
- **perfil_id** (Referência ao Perfil) - Relacionamento com PERFIL
- **ativo** (Status Ativo) - Indica se o usuário está ativo no sistema
- **consentimento_lgpd** (Consentimento LGPD) - Indica se o usuário consentiu com o tratamento de dados
- **data_consentimento** (Data de Consentimento) - Data em que o consentimento foi dado
- **data_exclusao_solicitada** (Data de Solicitação de Exclusão) - Data em que foi solicitada a exclusão de dados
- **data_criacao** (Data de Criação) - Timestamp de criação do usuário
- **ultimo_acesso** (Último Acesso) - Timestamp do último acesso ao sistema

**Regras de Negócio:**
- Email deve ser único e em formato válido
- Senha nunca é armazenada em texto plano, apenas hash
- Consentimento LGPD deve ter data associada se consentimento foi dado
- Usuário deve pertencer a exatamente um perfil
- Dados podem ser anonimizados, mas não deletados (para auditoria)

---

#### Entidade: SESSAO (Session)

**Descrição:** Representa as sessões de autenticação dos usuários no sistema.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **usuario_id** (Referência ao Usuário) - Relacionamento com USUARIO
- **token** (Token de Sessão) - Token único de autenticação
- **ip_address** (Endereço IP) - IP de origem da sessão
- **user_agent** (User Agent) - Informações do navegador/cliente
- **data_criacao** (Data de Criação) - Timestamp de criação da sessão
- **data_expiracao** (Data de Expiração) - Timestamp de expiração da sessão
- **ativo** (Status Ativo) - Indica se a sessão está ativa

**Regras de Negócio:**
- Token de sessão deve ser único
- Sessão deve ter data de expiração definida
- Múltiplas sessões simultâneas são permitidas por usuário
- Sessões são excluídas quando o usuário é excluído (CASCADE)

---

### Módulo 2: Inventário (Estoque)

#### Entidade: CATEGORIA (Category)

**Descrição:** Representa categorias hierárquicas de produtos, permitindo organização em árvore.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome da categoria
- **descricao** (Descrição) - Descrição da categoria
- **categoria_pai_id** (Referência à Categoria Pai) - Relacionamento hierárquico (opcional)
- **ativo** (Status Ativo) - Indica se a categoria está ativa
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Categorias podem ter categorias pai (estrutura hierárquica)
- Categoria não pode ser pai de si mesma (sem referências circulares)
- Categoria pai não pode ser excluída se houver categorias filhas

---

#### Entidade: PRODUTO (Product)

**Descrição:** Representa produtos no estoque com controle completo de níveis e preços.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **codigo** (Código) - Código único do produto
- **nome** (Nome) - Nome do produto
- **descricao** (Descrição) - Descrição detalhada
- **categoria_id** (Referência à Categoria) - Relacionamento com CATEGORIA
- **quantidade_atual** (Quantidade Atual) - Quantidade disponível no estoque
- **quantidade_minima** (Quantidade Mínima) - Nível mínimo de estoque
- **quantidade_maxima** (Quantidade Máxima) - Nível máximo de estoque
- **preco_aquisicao** (Preço de Aquisição) - Preço de compra
- **preco_venda** (Preço de Venda) - Preço de venda (opcional)
- **custo_medio_ponderado** (Custo Médio Ponderado) - Custo médio calculado automaticamente
- **unidade_medida** (Unidade de Medida) - UN, KG, L, M, etc.
- **prazo_validade** (Prazo de Validade) - Data de validade (opcional)
- **localizacao_fisica** (Localização Física) - Localização no armazém
- **armazem_id** (Referência ao Armazém) - Relacionamento com ARMAZEM (opcional)
- **status** (Status) - OK, BAIXO, CRITICO (calculado automaticamente)
- **ativo** (Status Ativo) - Indica se o produto está ativo
- **data_cadastro** (Data de Cadastro) - Timestamp de cadastro
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Código do produto deve ser único
- Quantidade atual não pode ser negativa
- Quantidade máxima deve ser maior que quantidade mínima
- Preço de venda deve ser maior ou igual ao preço de aquisição
- Status é calculado automaticamente baseado nos níveis de estoque
- Custo médio ponderado é calculado automaticamente a cada entrada

---

#### Entidade: FORNECEDOR (Supplier)

**Descrição:** Representa fornecedores de produtos.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **razao_social** (Razão Social) - Nome legal da empresa
- **nome_fantasia** (Nome Fantasia) - Nome comercial (opcional)
- **cnpj** (CNPJ) - CNPJ único e validado
- **telefone** (Telefone) - Número de telefone
- **email** (Email) - Email validado
- **endereco** (Endereço) - Endereço completo
- **cidade** (Cidade) - Cidade
- **estado** (Estado) - Estado (UF)
- **cep** (CEP) - Código postal
- **tempo_medio_entrega_dias** (Tempo Médio de Entrega) - Dias médios para entrega
- **condicoes_pagamento** (Condições de Pagamento) - Termos de pagamento
- **avaliacao** (Avaliação) - Nota de 0 a 5
- **ativo** (Status Ativo) - Indica se o fornecedor está ativo
- **data_cadastro** (Data de Cadastro) - Timestamp de cadastro

**Regras de Negócio:**
- CNPJ deve ser único e em formato válido
- Email deve ser em formato válido se fornecido
- Tempo médio de entrega deve ser positivo

---

#### Entidade: PRODUTO_FORNECEDOR (Product-Supplier Relationship)

**Descrição:** Representa o relacionamento muitos-para-muitos entre produtos e fornecedores.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **produto_id** (Referência ao Produto) - Relacionamento com PRODUTO
- **fornecedor_id** (Referência ao Fornecedor) - Relacionamento com FORNECEDOR
- **preco_atual** (Preço Atual) - Preço atual oferecido pelo fornecedor
- **prazo_entrega_dias** (Prazo de Entrega) - Dias para entrega
- **prioridade** (Prioridade) - 1=Principal, 2=Secundário, 3=Backup
- **data_vinculo** (Data de Vínculo) - Data de criação do relacionamento
- **data_ultima_atualizacao** (Data de Última Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Combinação produto-fornecedor deve ser única
- Prioridade deve estar entre 1 e 3
- Preço e prazo de entrega devem ser positivos

---

#### Entidade: MOVIMENTACAO_ESTOQUE (Stock Movement)

**Descrição:** Representa o histórico completo de todas as movimentações de estoque.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **produto_id** (Referência ao Produto) - Relacionamento com PRODUTO
- **usuario_id** (Referência ao Usuário) - Usuário que realizou a movimentação
- **tipo** (Tipo) - ENTRADA_COMPRA, ENTRADA_DEVOLUCAO, SAIDA_VENDA, SAIDA_PERDA, TRANSFERENCIA, AJUSTE_INVENTARIO
- **quantidade** (Quantidade) - Quantidade movimentada (sempre positiva)
- **preco_unitario** (Preço Unitário) - Preço unitário (opcional)
- **documento_fiscal** (Documento Fiscal) - Número do documento fiscal
- **observacao** (Observação) - Observações sobre a movimentação
- **local_origem** (Local de Origem) - Local de origem (para transferências)
- **local_destino** (Local de Destino) - Local de destino (para transferências)
- **venda_id** (Referência à Venda) - Relacionamento com VENDA (opcional)
- **data_hora** (Data e Hora) - Timestamp da movimentação

**Regras de Negócio:**
- Quantidade deve ser sempre positiva
- Movimentações de ajuste devem ter observação com pelo menos 10 caracteres
- Tipo determina se aumenta ou diminui o estoque
- Todas as movimentações devem ser registradas com usuário responsável

---

#### Entidade: ALERTA_REPOSICAO (Restocking Alert)

**Descrição:** Representa alertas automáticos quando o estoque está abaixo do mínimo.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **produto_id** (Referência ao Produto) - Relacionamento com PRODUTO
- **data_alerta** (Data do Alerta) - Timestamp do alerta
- **quantidade_sugerida** (Quantidade Sugerida) - Quantidade sugerida para reposição
- **prioridade** (Prioridade) - BAIXA, MEDIA, ALTA, URGENTE
- **visualizado** (Visualizado) - Indica se o alerta foi visualizado
- **data_visualizacao** (Data de Visualização) - Timestamp de visualização (opcional)
- **data_resolucao** (Data de Resolução) - Timestamp de resolução (opcional)
- **observacao** (Observação) - Observações sobre o alerta

**Regras de Negócio:**
- Quantidade sugerida deve ser positiva
- Data de visualização deve ser definida se alerta foi visualizado
- Alertas são gerados automaticamente quando estoque cai abaixo do mínimo
- Prioridade é calculada automaticamente baseada no nível de estoque

---

#### Entidade: ARMAZEM (Warehouse)

**Descrição:** Representa armazéns e locais de armazenamento.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome do armazém
- **descricao** (Descrição) - Descrição do armazém
- **endereco** (Endereço) - Endereço completo
- **cidade** (Cidade) - Cidade
- **estado** (Estado) - Estado (UF)
- **cep** (CEP) - Código postal
- **capacidade** (Capacidade) - Capacidade total (opcional)
- **capacidade_atual** (Capacidade Atual) - Capacidade utilizada (calculada)
- **responsavel_id** (Referência ao Responsável) - Relacionamento com USUARIO (opcional)
- **ativo** (Status Ativo) - Indica se o armazém está ativo
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Capacidade atual não pode exceder capacidade total
- Capacidade atual é calculada automaticamente
- Responsável é opcional

---

### Módulo 3: Vendas

#### Entidade: CLIENTE (Customer)

**Descrição:** Representa clientes (pessoas físicas e jurídicas).

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome do cliente
- **tipo** (Tipo) - FISICA (Pessoa Física) ou JURIDICA (Pessoa Jurídica)
- **cpf** (CPF) - CPF para pessoas físicas (validado)
- **cnpj** (CNPJ) - CNPJ para pessoas jurídicas (validado)
- **email** (Email) - Email validado
- **telefone** (Telefone) - Número de telefone
- **celular** (Celular) - Número de celular
- **endereco** (Endereço) - Endereço completo
- **cidade** (Cidade) - Cidade
- **estado** (Estado) - Estado (UF)
- **cep** (CEP) - Código postal
- **data_nascimento** (Data de Nascimento) - Data de nascimento (opcional)
- **observacoes** (Observações) - Observações sobre o cliente
- **ativo** (Status Ativo) - Indica se o cliente está ativo
- **data_cadastro** (Data de Cadastro) - Timestamp de cadastro
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Clientes físicos devem ter CPF
- Clientes jurídicos devem ter CNPJ
- CPF e CNPJ devem estar em formato válido
- Email deve ser em formato válido se fornecido

---

#### Entidade: CANAL_VENDA (Sales Channel)

**Descrição:** Representa os canais de venda disponíveis.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome único do canal
- **descricao** (Descrição) - Descrição do canal
- **tipo** (Tipo) - LOJA_FISICA, ONLINE, TELEFONE, OUTRO
- **ativo** (Status Ativo) - Indica se o canal está ativo
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Nome do canal deve ser único
- Tipo deve ser um dos valores pré-definidos

---

#### Entidade: VENDA (Sale)

**Descrição:** Representa transações de venda.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **numero_venda** (Número da Venda) - Número único da venda
- **cliente_id** (Referência ao Cliente) - Relacionamento com CLIENTE (opcional)
- **usuario_id** (Referência ao Usuário) - Vendedor responsável
- **canal_venda_id** (Referência ao Canal de Venda) - Relacionamento com CANAL_VENDA
- **data_venda** (Data da Venda) - Timestamp da venda
- **data_entrega** (Data de Entrega) - Data prevista de entrega (opcional)
- **subtotal** (Subtotal) - Subtotal da venda
- **desconto** (Desconto) - Valor do desconto
- **acrescimo** (Acréscimo) - Valor de acréscimo
- **total** (Total) - Total calculado: subtotal - desconto + acréscimo
- **status** (Status) - PENDENTE, CONFIRMADA, EM_PREPARACAO, ENVIADA, ENTREGUE, CANCELADA
- **observacoes** (Observações) - Observações sobre a venda
- **data_criacao** (Data de Criação) - Timestamp de criação
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Número da venda deve ser único
- Total deve ser igual a subtotal - desconto + acréscimo
- Todos os valores monetários devem ser não-negativos
- Status deve ser um dos valores pré-definidos
- Cliente é opcional (vendas anônimas permitidas)

---

#### Entidade: VENDA_ITEM (Sale Item)

**Descrição:** Representa itens individuais em cada venda.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **venda_id** (Referência à Venda) - Relacionamento com VENDA
- **produto_id** (Referência ao Produto) - Relacionamento com PRODUTO
- **quantidade** (Quantidade) - Quantidade vendida (deve ser positiva)
- **preco_unitario** (Preço Unitário) - Preço unitário (não-negativo)
- **desconto** (Desconto) - Desconto no item (não-negativo)
- **total_item** (Total do Item) - Total calculado: (quantidade × preco_unitario) - desconto
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Quantidade deve ser positiva
- Total do item deve ser igual a (quantidade × preco_unitario) - desconto
- Todos os valores monetários devem ser não-negativos

---

#### Entidade: METODO_PAGAMENTO (Payment Method)

**Descrição:** Representa os métodos de pagamento disponíveis.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome único do método
- **descricao** (Descrição) - Descrição do método
- **tipo** (Tipo) - DINHEIRO, CARTAO_CREDITO, CARTAO_DEBITO, PIX, BOLETO, TRANSFERENCIA, OUTRO
- **ativo** (Status Ativo) - Indica se o método está ativo
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Nome do método deve ser único
- Tipo deve ser um dos valores pré-definidos

---

#### Entidade: PAGAMENTO (Payment)

**Descrição:** Representa pagamentos realizados para vendas.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **venda_id** (Referência à Venda) - Relacionamento com VENDA
- **metodo_pagamento_id** (Referência ao Método de Pagamento) - Relacionamento com METODO_PAGAMENTO
- **valor** (Valor) - Valor do pagamento (deve ser positivo)
- **data_pagamento** (Data do Pagamento) - Timestamp do pagamento
- **data_vencimento** (Data de Vencimento) - Data de vencimento (opcional)
- **status** (Status) - PENDENTE, PAGO, CANCELADO, ESTORNADO
- **codigo_transacao** (Código da Transação) - Código da transação
- **observacoes** (Observações) - Observações sobre o pagamento
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Valor do pagamento deve ser positivo
- Status deve ser um dos valores pré-definidos
- Múltiplos pagamentos são permitidos por venda

---

### Módulo 4: Finanças

#### Entidade: CATEGORIA_FINANCEIRA (Financial Category)

**Descrição:** Representa categorias hierárquicas para transações financeiras.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome da categoria
- **descricao** (Descrição) - Descrição da categoria
- **tipo** (Tipo) - RECEITA (Revenue) ou DESPESA (Expense)
- **categoria_pai_id** (Referência à Categoria Pai) - Relacionamento hierárquico (opcional)
- **ativo** (Status Ativo) - Indica se a categoria está ativa
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Tipo deve ser RECEITA ou DESPESA
- Categorias podem ter categorias pai (estrutura hierárquica)
- Categoria não pode ser pai de si mesma

---

#### Entidade: CONTA_FINANCEIRA (Financial Account)

**Descrição:** Representa contas financeiras (caixa, banco, cartão).

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome da conta
- **descricao** (Descrição) - Descrição da conta
- **tipo** (Tipo) - CAIXA, BANCO, CARTAO, OUTRO
- **banco** (Banco) - Nome do banco (opcional)
- **agencia** (Agência) - Número da agência (opcional)
- **conta** (Conta) - Número da conta (opcional)
- **saldo_inicial** (Saldo Inicial) - Saldo inicial da conta
- **saldo_atual** (Saldo Atual) - Saldo atual (atualizado automaticamente)
- **ativo** (Status Ativo) - Indica se a conta está ativa
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Tipo deve ser um dos valores pré-definidos
- Saldo atual é atualizado automaticamente por triggers
- Apenas transações confirmadas (PAGO) afetam o saldo

---

#### Entidade: TRANSACAO_FINANCEIRA (Financial Transaction)

**Descrição:** Representa transações financeiras (receitas e despesas).

**Atributos:**
- **id** (Identificador) - Chave primária única
- **conta_financeira_id** (Referência à Conta Financeira) - Relacionamento com CONTA_FINANCEIRA
- **categoria_financeira_id** (Referência à Categoria Financeira) - Relacionamento com CATEGORIA_FINANCEIRA
- **tipo** (Tipo) - RECEITA ou DESPESA
- **descricao** (Descrição) - Descrição da transação
- **valor** (Valor) - Valor da transação (deve ser positivo)
- **data_transacao** (Data da Transação) - Data da transação
- **data_vencimento** (Data de Vencimento) - Data de vencimento (opcional)
- **data_pagamento** (Data de Pagamento) - Data de pagamento (opcional)
- **status** (Status) - PENDENTE, PAGO, VENCIDO, CANCELADO
- **venda_id** (Referência à Venda) - Relacionamento com VENDA (opcional)
- **fornecedor_id** (Referência ao Fornecedor) - Relacionamento com FORNECEDOR (opcional)
- **observacoes** (Observações) - Observações sobre a transação
- **usuario_id** (Referência ao Usuário) - Usuário que criou a transação
- **data_criacao** (Data de Criação) - Timestamp de criação
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Tipo deve ser RECEITA ou DESPESA
- Valor deve ser positivo
- Data de vencimento deve ser maior ou igual à data da transação
- Status deve ser um dos valores pré-definidos
- Transações de receita podem ser vinculadas a vendas
- Transações de despesa podem ser vinculadas a fornecedores

---

### Módulo 5: Logística

#### Entidade: TRANSPORTADORA (Carrier)

**Descrição:** Representa transportadoras para envios.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **razao_social** (Razão Social) - Nome legal da empresa
- **nome_fantasia** (Nome Fantasia) - Nome comercial (opcional)
- **cnpj** (CNPJ) - CNPJ único e validado
- **telefone** (Telefone) - Número de telefone
- **email** (Email) - Email
- **endereco** (Endereço) - Endereço completo
- **cidade** (Cidade) - Cidade
- **estado** (Estado) - Estado (UF)
- **cep** (CEP) - Código postal
- **ativo** (Status Ativo) - Indica se a transportadora está ativa
- **data_cadastro** (Data de Cadastro) - Timestamp de cadastro

**Regras de Negócio:**
- CNPJ deve ser único e em formato válido

---

#### Entidade: MOTORISTA (Driver)

**Descrição:** Representa motoristas para entregas.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome do motorista
- **cpf** (CPF) - CPF único e validado
- **cnh** (CNH) - Número da carteira de habilitação
- **telefone** (Telefone) - Número de telefone
- **email** (Email) - Email
- **ativo** (Status Ativo) - Indica se o motorista está ativo
- **data_cadastro** (Data de Cadastro) - Timestamp de cadastro

**Regras de Negócio:**
- CPF deve ser único e em formato válido

---

#### Entidade: PEDIDO (Order)

**Descrição:** Representa pedidos logísticos para atendimento.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **numero_pedido** (Número do Pedido) - Número único do pedido
- **venda_id** (Referência à Venda) - Relacionamento com VENDA (opcional)
- **cliente_id** (Referência ao Cliente) - Relacionamento com CLIENTE
- **armazem_id** (Referência ao Armazém) - Relacionamento com ARMAZEM
- **status** (Status) - PENDENTE, SEPARACAO, EMPACOTAMENTO, ENVIADO, EM_TRANSITO, ENTREGUE, CANCELADO
- **prioridade** (Prioridade) - BAIXA, NORMAL, ALTA, URGENTE
- **data_pedido** (Data do Pedido) - Timestamp do pedido
- **data_previsao_entrega** (Data de Previsão de Entrega) - Data prevista de entrega (opcional)
- **observacoes** (Observações) - Observações sobre o pedido
- **usuario_id** (Referência ao Usuário) - Usuário que criou o pedido
- **data_criacao** (Data de Criação) - Timestamp de criação
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Número do pedido deve ser único
- Status deve ser um dos valores pré-definidos
- Prioridade deve ser um dos valores pré-definidos
- Pedido pode estar vinculado a uma venda (opcional)

---

#### Entidade: PEDIDO_ITEM (Order Item)

**Descrição:** Representa itens individuais em cada pedido.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **pedido_id** (Referência ao Pedido) - Relacionamento com PEDIDO
- **produto_id** (Referência ao Produto) - Relacionamento com PRODUTO
- **quantidade** (Quantidade) - Quantidade solicitada (deve ser positiva)
- **quantidade_separada** (Quantidade Separada) - Quantidade já separada (não-negativa)
- **observacoes** (Observações) - Observações sobre o item
- **data_criacao** (Data de Criação) - Timestamp de criação

**Regras de Negócio:**
- Quantidade deve ser positiva
- Quantidade separada não pode exceder quantidade total
- Pedido não pode ser enviado até que todos os itens estejam separados

---

#### Entidade: ROTA (Route)

**Descrição:** Representa rotas de entrega.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **nome** (Nome) - Nome da rota
- **descricao** (Descrição) - Descrição da rota
- **motorista_id** (Referência ao Motorista) - Relacionamento com MOTORISTA
- **data_rota** (Data da Rota) - Data da rota
- **status** (Status) - AGENDADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA
- **total_paradas** (Total de Paradas) - Número total de paradas
- **paradas_concluidas** (Paradas Concluídas) - Número de paradas concluídas
- **observacoes** (Observações) - Observações sobre a rota
- **data_criacao** (Data de Criação) - Timestamp de criação
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Status deve ser um dos valores pré-definidos
- Paradas concluídas não podem exceder total de paradas
- Rota deve ter exatamente um motorista

---

#### Entidade: ENVIO (Shipment)

**Descrição:** Representa envios e rastreamento.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **pedido_id** (Referência ao Pedido) - Relacionamento com PEDIDO
- **transportadora_id** (Referência à Transportadora) - Relacionamento com TRANSPORTADORA (opcional)
- **rota_id** (Referência à Rota) - Relacionamento com ROTA (opcional)
- **codigo_rastreamento** (Código de Rastreamento) - Código de rastreamento
- **status** (Status) - PENDENTE, COLETADO, EM_TRANSITO, ENTREGUE, DEVOLVIDO, EXTRAVIADO
- **data_envio** (Data de Envio) - Data de envio (opcional)
- **data_previsao_entrega** (Data de Previsão de Entrega) - Data prevista de entrega (opcional)
- **data_entrega** (Data de Entrega) - Data de entrega (opcional)
- **observacoes** (Observações) - Observações sobre o envio
- **data_criacao** (Data de Criação) - Timestamp de criação
- **data_atualizacao** (Data de Atualização) - Timestamp da última atualização

**Regras de Negócio:**
- Status deve ser um dos valores pré-definidos
- Um pedido pode ter um envio
- Envio pode usar transportadora (opcional)
- Envio pode seguir uma rota (opcional)

---

### Módulo 6: Relatórios

#### Entidade: RELATORIO (Report)

**Descrição:** Representa relatórios gerados pelo sistema.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **usuario_id** (Referência ao Usuário) - Usuário que gerou o relatório
- **titulo** (Título) - Título do relatório
- **tipo** (Tipo) - ESTOQUE_GERAL, MOVIMENTACAO, PRODUTOS_CRITICOS, CONSUMO_PERIODO, FORNECEDORES, VENDAS, FINANCEIRO, LOGISTICA, CLIENTES
- **periodo_inicio** (Período Início) - Data de início do período
- **periodo_fim** (Período Fim) - Data de fim do período
- **formato** (Formato) - PDF, XLSX, CSV, JSON
- **caminho_arquivo** (Caminho do Arquivo) - Caminho do arquivo gerado (opcional)
- **parametros** (Parâmetros) - Parâmetros em formato JSON
- **data_geracao** (Data de Geração) - Timestamp de geração
- **data_expiracao** (Data de Expiração) - Timestamp de expiração

**Regras de Negócio:**
- Data de fim do período deve ser maior ou igual à data de início
- Tipo deve ser um dos valores pré-definidos
- Formato deve ser um dos valores pré-definidos
- Relatórios expiram após 12 meses

---

### Módulo 7: Auditoria LGPD

#### Entidade: AUDITORIA_LGPD (LGPD Audit)

**Descrição:** Representa o registro de auditoria para conformidade com LGPD.

**Atributos:**
- **id** (Identificador) - Chave primária única
- **usuario_id** (Referência ao Usuário) - Usuário relacionado à ação
- **acao** (Ação) - ACESSO_DADOS, EXPORTACAO_DADOS, EXCLUSAO_DADOS, ANONIMIZACAO, CONSENTIMENTO
- **data_hora** (Data e Hora) - Timestamp da ação
- **ip_origem** (IP de Origem) - Endereço IP de origem
- **dados_acessados** (Dados Acessados) - Dados que foram acessados
- **justificativa** (Justificativa) - Justificativa da ação (opcional)

**Regras de Negócio:**
- Ação deve ser um dos valores pré-definidos
- Todas as ações devem ser registradas com timestamp e IP
- Registros de auditoria não podem ser excluídos

---

## Relacionamentos e Cardinalidades

### Tipos de Relacionamento

#### One-to-One (1:1)
Um registro de uma entidade relaciona-se com exatamente um registro de outra entidade.

**Exemplos:**
- VENDA → PEDIDO (opcional) - Uma venda pode gerar um pedido logístico
- PEDIDO → ENVIO - Um pedido tem um envio

#### One-to-Many (1:N)
Um registro de uma entidade relaciona-se com muitos registros de outra entidade.

**Exemplos:**
- PERFIL → USUARIO - Um perfil pode ter muitos usuários
- PRODUTO → MOVIMENTACAO_ESTOQUE - Um produto pode ter muitas movimentações
- VENDA → VENDA_ITEM - Uma venda pode ter muitos itens

#### Many-to-Many (N:M)
Muitos registros de uma entidade relacionam-se com muitos registros de outra entidade.

**Exemplos:**
- PRODUTO ↔ FORNECEDOR - Um produto pode ser fornecido por muitos fornecedores, um fornecedor pode fornecer muitos produtos
- Implementado via tabela de junção: PRODUTO_FORNECEDOR

#### Self-Referencing (Hierárquico)
Uma entidade relaciona-se consigo mesma, criando uma estrutura hierárquica.

**Exemplos:**
- CATEGORIA → CATEGORIA - Categorias podem ter subcategorias
- CATEGORIA_FINANCEIRA → CATEGORIA_FINANCEIRA - Categorias financeiras podem ter subcategorias

---

### Relacionamentos por Módulo

#### Módulo 1: Usuários & Autenticação

**PERFIL → USUARIO (1:N)**
- Um perfil pode ter muitos usuários
- Cada usuário pertence a exatamente um perfil
- Ação: RESTRICT (perfil não pode ser excluído se houver usuários)

**USUARIO → SESSAO (1:N)**
- Um usuário pode ter muitas sessões
- Cada sessão pertence a exatamente um usuário
- Ação: CASCADE (sessões são excluídas quando usuário é excluído)

---

#### Módulo 2: Inventário

**CATEGORIA → CATEGORIA (Self-Referencing, 1:N)**
- Uma categoria pode ter muitas subcategorias
- Cada categoria pode ter uma categoria pai (opcional)
- Ação: RESTRICT (categoria pai não pode ser excluída se houver filhas)

**CATEGORIA → PRODUTO (1:N)**
- Uma categoria pode ter muitos produtos
- Cada produto pertence a exatamente uma categoria
- Ação: RESTRICT (categoria não pode ser excluída se houver produtos)

**PRODUTO ↔ FORNECEDOR (N:M)**
- Um produto pode ser fornecido por muitos fornecedores
- Um fornecedor pode fornecer muitos produtos
- Implementado via: PRODUTO_FORNECEDOR
- Ação produto: CASCADE (relacionamentos excluídos quando produto é excluído)
- Ação fornecedor: RESTRICT (fornecedor não pode ser excluído se houver produtos vinculados)

**PRODUTO → MOVIMENTACAO_ESTOQUE (1:N)**
- Um produto pode ter muitas movimentações
- Cada movimentação relaciona-se a exatamente um produto
- Ação: RESTRICT (produto não pode ser excluído se houver movimentações)

**PRODUTO → ALERTA_REPOSICAO (1:N)**
- Um produto pode ter muitos alertas
- Cada alerta relaciona-se a exatamente um produto
- Ação: CASCADE (alertas excluídos quando produto é excluído)

**USUARIO → MOVIMENTACAO_ESTOQUE (1:N)**
- Um usuário pode criar muitas movimentações
- Cada movimentação é criada por exatamente um usuário
- Ação: RESTRICT (usuário não pode ser excluído se houver movimentações)

**ARMAZEM → PRODUTO (1:N)**
- Um armazém pode armazenar muitos produtos
- Cada produto pode estar em um armazém (opcional)
- Ação: SET NULL (armazém do produto é definido como NULL se armazém for excluído)

---

#### Módulo 3: Vendas

**CLIENTE → VENDA (1:N)**
- Um cliente pode fazer muitas vendas
- Cada venda pode pertencer a um cliente (opcional - vendas anônimas)
- Ação: SET NULL (cliente da venda é definido como NULL se cliente for excluído)

**USUARIO → VENDA (1:N)**
- Um usuário (vendedor) pode criar muitas vendas
- Cada venda é criada por exatamente um usuário
- Ação: RESTRICT (usuário não pode ser excluído se houver vendas)

**CANAL_VENDA → VENDA (1:N)**
- Um canal pode ter muitas vendas
- Cada venda usa exatamente um canal
- Ação: RESTRICT (canal não pode ser excluído se houver vendas)

**VENDA → VENDA_ITEM (1:N)**
- Uma venda pode ter muitos itens
- Cada item pertence a exatamente uma venda
- Ação: CASCADE (itens excluídos quando venda é excluída)

**PRODUTO → VENDA_ITEM (1:N)**
- Um produto pode aparecer em muitos itens de venda
- Cada item referencia exatamente um produto
- Ação: RESTRICT (produto não pode ser excluído se houver itens de venda)

**VENDA → PAGAMENTO (1:N)**
- Uma venda pode ter muitos pagamentos
- Cada pagamento pertence a exatamente uma venda
- Ação: CASCADE (pagamentos excluídos quando venda é excluída)

**METODO_PAGAMENTO → PAGAMENTO (1:N)**
- Um método pode ser usado em muitos pagamentos
- Cada pagamento usa exatamente um método
- Ação: RESTRICT (método não pode ser excluído se houver pagamentos)

**VENDA → MOVIMENTACAO_ESTOQUE (1:1 opcional)**
- Uma venda pode gerar uma movimentação de estoque (quando confirmada)
- Ação: SET NULL (movimentação mantém referência mesmo se venda for excluída)

---

#### Módulo 4: Finanças

**CATEGORIA_FINANCEIRA → CATEGORIA_FINANCEIRA (Self-Referencing, 1:N)**
- Uma categoria pode ter muitas subcategorias
- Cada categoria pode ter uma categoria pai (opcional)
- Ação: RESTRICT (categoria pai não pode ser excluída se houver filhas)

**CONTA_FINANCEIRA → TRANSACAO_FINANCEIRA (1:N)**
- Uma conta pode ter muitas transações
- Cada transação pertence a exatamente uma conta
- Ação: RESTRICT (conta não pode ser excluída se houver transações)

**CATEGORIA_FINANCEIRA → TRANSACAO_FINANCEIRA (1:N)**
- Uma categoria pode ter muitas transações
- Cada transação pertence a exatamente uma categoria
- Ação: RESTRICT (categoria não pode ser excluída se houver transações)

**VENDA → TRANSACAO_FINANCEIRA (1:1 opcional)**
- Uma venda pode gerar uma transação de receita (quando pagamento confirmado)
- Ação: SET NULL (transação mantém referência mesmo se venda for excluída)

**FORNECEDOR → TRANSACAO_FINANCEIRA (1:N)**
- Um fornecedor pode ter muitas transações de despesa
- Cada transação pode estar vinculada a um fornecedor (opcional)
- Ação: SET NULL (fornecedor da transação é definido como NULL se fornecedor for excluído)

**USUARIO → TRANSACAO_FINANCEIRA (1:N)**
- Um usuário pode criar muitas transações
- Cada transação é criada por exatamente um usuário
- Ação: RESTRICT (usuário não pode ser excluído se houver transações)

---

#### Módulo 5: Logística

**ARMAZEM → PEDIDO (1:N)**
- Um armazém pode atender muitos pedidos
- Cada pedido é atendido por exatamente um armazém
- Ação: RESTRICT (armazém não pode ser excluído se houver pedidos)

**CLIENTE → PEDIDO (1:N)**
- Um cliente pode ter muitos pedidos
- Cada pedido pertence a exatamente um cliente
- Ação: RESTRICT (cliente não pode ser excluído se houver pedidos)

**PEDIDO → PEDIDO_ITEM (1:N)**
- Um pedido pode ter muitos itens
- Cada item pertence a exatamente um pedido
- Ação: CASCADE (itens excluídos quando pedido é excluído)

**PRODUTO → PEDIDO_ITEM (1:N)**
- Um produto pode aparecer em muitos itens de pedido
- Cada item referencia exatamente um produto
- Ação: RESTRICT (produto não pode ser excluído se houver itens de pedido)

**PEDIDO → ENVIO (1:1)**
- Um pedido tem um envio
- Cada envio pertence a exatamente um pedido
- Ação: RESTRICT (pedido não pode ser excluído se houver envio)

**TRANSPORTADORA → ENVIO (1:N)**
- Uma transportadora pode fazer muitos envios
- Cada envio pode usar uma transportadora (opcional)
- Ação: SET NULL (transportadora do envio é definida como NULL se transportadora for excluída)

**ROTA → ENVIO (1:N)**
- Uma rota pode incluir muitos envios
- Cada envio pode seguir uma rota (opcional)
- Ação: SET NULL (rota do envio é definida como NULL se rota for excluída)

**MOTORISTA → ROTA (1:N)**
- Um motorista pode dirigir muitas rotas
- Cada rota é dirigida por exatamente um motorista
- Ação: RESTRICT (motorista não pode ser excluído se houver rotas)

**USUARIO → PEDIDO (1:N)**
- Um usuário pode criar muitos pedidos
- Cada pedido é criado por exatamente um usuário
- Ação: RESTRICT (usuário não pode ser excluído se houver pedidos)

**USUARIO → ARMAZEM (1:1 opcional)**
- Um usuário pode gerenciar um armazém
- Cada armazém pode ter um responsável (opcional)
- Ação: SET NULL (responsável do armazém é definido como NULL se usuário for excluído)

---

#### Módulo 6: Relatórios

**USUARIO → RELATORIO (1:N)**
- Um usuário pode gerar muitos relatórios
- Cada relatório é gerado por exatamente um usuário
- Ação: RESTRICT (usuário não pode ser excluído se houver relatórios)

---

#### Módulo 7: Auditoria

**USUARIO → AUDITORIA_LGPD (1:N)**
- Um usuário pode ter muitos registros de auditoria
- Cada registro relaciona-se a exatamente um usuário
- Ação: RESTRICT (usuário não pode ser excluído se houver registros de auditoria)

---

## Regras de Negócio

### Regras de Integridade

#### Integridade Referencial
- **RESTRICT:** Impede exclusão de registro pai se houver registros filhos
  - Usado em: Perfis, Categorias, Produtos, Clientes, Usuários, etc.
- **CASCADE:** Exclui registros filhos quando registro pai é excluído
  - Usado em: Sessões, Itens de Venda, Itens de Pedido, Alertas
- **SET NULL:** Define chave estrangeira como NULL quando registro pai é excluído
  - Usado em: Relacionamentos opcionais (Cliente em Venda, Armazém em Produto)

#### Integridade de Dados
- Valores únicos: Email, CPF, CNPJ, Código de Produto, Número de Venda
- Valores não-nulos: Campos obrigatórios definidos em cada entidade
- Validação de formato: Email, CPF, CNPJ devem estar em formato válido

---

### Regras de Validação

#### Validação de Formato
- **Email:** Formato padrão de email (exemplo@dominio.com)
- **CPF:** Formato XXX.XXX.XXX-XX
- **CNPJ:** Formato XX.XXX.XXX/XXXX-XX
- **Telefone:** Formato flexível (XX) XXXXX-XXXX ou (XX) XXXX-XXXX

#### Validação de Intervalo
- **Quantidades:** Devem ser positivas (quantidade > 0)
- **Preços:** Devem ser não-negativos (preço >= 0)
- **Avaliações:** Devem estar entre 0 e 5
- **Prioridades:** Devem estar entre 1 e 3 (para produto-fornecedor)

#### Validação de Enumeração
- **Status:** Valores pré-definidos (OK, BAIXO, CRITICO para produtos)
- **Tipos:** Valores pré-definidos (FISICA, JURIDICA para clientes)
- **Ações:** Valores pré-definidos (ACESSO_DADOS, EXPORTACAO_DADOS, etc. para auditoria)

---

### Regras de Conformidade LGPD

#### Consentimento
- Consentimento deve ser explícito e registrado com data
- Usuário pode retirar consentimento a qualquer momento
- Retirada de consentimento deve ser registrada

#### Acesso a Dados
- Todos os acessos a dados pessoais devem ser registrados
- Registro inclui: usuário, ação, timestamp, IP de origem
- Dados acessados devem ser documentados

#### Exportação de Dados
- Exportação de dados pessoais deve ser registrada
- Usuário pode solicitar exportação de seus dados
- Exportação deve incluir justificativa

#### Exclusão de Dados
- Solicitações de exclusão devem ser registradas
- Dados são anonimizados, não deletados (para auditoria)
- Anonimização ocorre após 90 dias da solicitação

#### Auditoria
- Todos os registros de auditoria são imutáveis
- Registros não podem ser excluídos
- Registros devem ser mantidos por período legal

---

## Normalização

### Formas Normais Aplicadas

#### Primeira Forma Normal (1FN)
**Objetivo:** Eliminar grupos repetitivos e garantir atomicidade dos dados.

**Aplicação:**
- Todos os atributos são atômicos (não compostos)
- Não há grupos repetitivos
- Cada atributo contém apenas um valor

**Exemplo:**
- Endereço é dividido em: endereco, cidade, estado, cep (não um único campo)
- Telefone e celular são campos separados (não uma lista)

---

#### Segunda Forma Normal (2FN)
**Objetivo:** Eliminar dependências parciais (atributos dependem apenas de parte da chave primária).

**Aplicação:**
- Todas as tabelas estão em 2FN
- Tabelas de junção (PRODUTO_FORNECEDOR) têm chave primária composta
- Atributos dependem da chave primária completa

**Exemplo:**
- PRODUTO_FORNECEDOR: chave primária (produto_id, fornecedor_id)
- Atributos como preco_atual dependem de ambos os componentes da chave

---

#### Terceira Forma Normal (3FN)
**Objetivo:** Eliminar dependências transitivas (atributos dependem de outros atributos não-chave).

**Aplicação:**
- Maioria das tabelas está em 3FN
- Dependências transitivas foram eliminadas
- Cada atributo não-chave depende apenas da chave primária

**Exemplo:**
- PRODUTO não armazena nome da categoria diretamente, apenas categoria_id
- VENDA não armazena nome do cliente diretamente, apenas cliente_id

---

### Decisões de Desnormalização

#### Desnormalização Controlada

Algumas desnormalizações foram aplicadas por razões de performance e usabilidade:

**1. Campos Calculados Mantidos:**
- **PRODUTO.status:** Calculado automaticamente, mas armazenado para performance
- **PRODUTO.custo_medio_ponderado:** Calculado automaticamente, mas armazenado para consultas rápidas
- **CONTA_FINANCEIRA.saldo_atual:** Calculado automaticamente, mas armazenado para performance

**Justificativa:** Evita recálculos constantes em consultas frequentes, melhorando performance.

**2. Campos Redundantes para Auditoria:**
- **MOVIMENTACAO_ESTOQUE.venda_id:** Mantém referência mesmo se venda for excluída (SET NULL)
- **TRANSACAO_FINANCEIRA.venda_id:** Mantém referência para rastreabilidade

**Justificativa:** Preserva histórico mesmo quando registros relacionados são excluídos.

**3. Campos de Timestamp Duplicados:**
- **data_criacao** e **data_atualizacao** em várias tabelas

**Justificativa:** Facilita auditoria e rastreabilidade, padrão comum em sistemas modernos.

---

### Considerações de Normalização

#### Normalização vs Performance

O modelo busca um equilíbrio entre normalização e performance:

- **Normalização Alta:** Reduz redundância, facilita manutenção
- **Desnormalização Controlada:** Melhora performance em consultas frequentes
- **Índices Estratégicos:** Compensam custos de joins em consultas complexas

#### Manutenibilidade

- Estrutura normalizada facilita alterações
- Dependências claras facilitam refatoração
- Documentação completa facilita compreensão

---

## Resumo do Modelo Conceitual

### Estatísticas

- **Total de Entidades:** 30+
- **Total de Módulos:** 7
- **Total de Relacionamentos:** 50+
- **Tipos de Relacionamento:**
  - One-to-Many (1:N): 40+
  - Many-to-Many (N:M): 1 (via tabela de junção)
  - One-to-One (1:1): 5
  - Self-Referencing: 2

### Características Principais

1. **Modularidade:** Organização clara por módulos funcionais
2. **Integridade:** Regras rigorosas de integridade referencial
3. **Auditoria:** Rastreabilidade completa de ações
4. **LGPD:** Conformidade com Lei Geral de Proteção de Dados
5. **Flexibilidade:** Estrutura hierárquica para categorias
6. **Performance:** Desnormalização controlada onde necessário

### Próximos Passos

O modelo conceitual serve como base para:
1. **Modelo Lógico:** Especificação técnica de tabelas e constraints
2. **Modelo Físico:** Implementação no banco de dados MySQL
3. **Documentação de API:** Especificação de endpoints
4. **Documentação de Aplicação:** Guias de uso e manutenção

---

**Versão:** 1.0.0  
**Data:** 2025-01-12  
**Autor:** WorkConnect Development Team







