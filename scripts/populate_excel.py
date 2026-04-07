import openpyxl

file_path = r'c:\Users\mathe\code_space\senai\workconnect-tcc\Matheus Mendes Conceição Santana Santos - PoC-Prova de conceito.xlsx'

demanda_text = "DEMANDA: (WorkConnect) O sistema é capaz de realizar a gestão inteligente de estoque para PMEs, integrando painéis analíticos com total conformidade com a LGPD e controles rigorosos de acesso em uma plataforma web responsiva."

requisitos = [
    ["Funcional", "Gestão de Produtos", "O sistema deve permitir o cadastro, edição e exclusão de produtos com controle de quantidade em tempo real.", "Usuário consegue adicionar um novo item e visualizar no dashboard imediatamente.", "Alta", "Core do sistema de estoque."],
    ["Funcional", "Dashboard Analítico", "Exibir gráficos de tendências sazonais e saúde do estoque usando bibliotecas visuais.", "Gráficos renderizam corretamente com dados do banco ao acessar a rota principal.", "Alta", "Requisito chave para tomada de decisão em PMEs."],
    ["Segurança", "Autenticação de Usuários", "Sistema de login protegido com bcrypt para hashing longo de senhas.", "Usuário não autenticado é automaticamente redirecionado para a tela de login; senhas não são lidas em texto limpo.", "Alta", "Essencial para proteção de dados empresariais."],
    ["Conformidade", "LGPD - Consentimento e Exportação", "Módulo de configurações do usuário com aceite de termos de privacidade e exportação de dados em formato JSON.", "Usuário consegue visualizar políticas e baixar seus dados estruturados em arquivo .json.", "Alta", "Diferencial de conformidade do software."],
    ["Interface", "Design Responsivo", "A interface web deve se adaptar a dispositivos móveis e desktops, usando classes utilitárias modernas.", "Elementos da UI como tabelas de estoque não quebram em telas menores (ex: 375px de largura).", "Média", "Foco no uso via mobile por gerentes em movimento."],
    ["Desempenho", "Navegação Client-Side", "Transições fluidas entre abas e seções do estoque sem recarregamento completo da página web.", "Navegar entre 'Overview' e 'Produtos' ocorre de forma quase autônoma e rápida na interface.", "Média", "Uso da arquitetura App Router."],
    ["Funcional", "Alertas de Estoque Baixo", "O sistema deve sinalizar visualmente na interface quando o volume de um produto atinge ou ultrapassa a quantidade mínima.", "Linhas da tabela de produtos apresentam ícones de emergência se a quantidade estiver crítica.", "Alta", "Evita desabastecimento não planejado."],
    ["Desenvolvimento", "Modo Debug de Acesso", "Permitir acesso controlado via parâmetro de URL (?debug=true) para agilizar os testes de componentes.", "Acesso via URL específica permite visualizar o painel salvando o token temporariamente para desenvolvimento.", "Baixa", "Útil apenas nos ambientes de Dev/Homologação."],
    ["Banco de Dados", "Estrutura Relacional Otimizada", "Uso de RDBMS com arquitetura de scripts SQL para triggers que automatizem o cálculo local de totais.", "As consultas à visão 'estoque' operam sem gargalos mesmo com centenas de itens cadastrados.", "Média", "Preparação do MVP para operações em escala."],
    ["Acessibilidade", "Interações por Teclado e Voz", "Uso de componentes semânticos na UI para garantir compatibilidade com navegação de teclado e leitores de tela.", "Modais de exclusão e formulários podem ser operados via 'Tab', 'Space' e 'Enter' adequadamente.", "Média", "Boas práticas globais de usabilidade."],
]

try:
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active
    
    # Unmerge all cells in the sheet to prevent MergedCell read-only errors
    # as the template has arbitrary merged cells throughout.
    ranges = list(sheet.merged_cells.ranges)
    for r in ranges:
        sheet.unmerge_cells(str(r))
            
    # Write the Demanda in cell A2
    sheet['A2'] = demanda_text
    
    # Write the requirements starting from row 4
    start_row = 4
    for i, req in enumerate(requisitos):
        row = start_row + i
        sheet[f'A{row}'] = req[0] # Categoria
        sheet[f'B{row}'] = req[1] # Requisito
        sheet[f'C{row}'] = req[2] # Descrição Detalhada
        sheet[f'D{row}'] = req[3] # Critério de Aceite
        sheet[f'E{row}'] = req[4] # Prioridade
        sheet[f'F{row}'] = req[5] # Observações

    wb.save(file_path)
    print("Excel file successfully populated with PoC details.")
except Exception as e:
    print(f"Failed to write to excel: {e}")
