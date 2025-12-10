/**
 * TypeScript Type Definitions for Stock Management System
 * Comprehensive types for all entities and data structures
 */

// ============================================
// ENUMS
// ============================================

export enum UserProfile {
  ADMINISTRADOR = 'ADMINISTRADOR',
  GERENTE = 'GERENTE',
  OPERADOR = 'OPERADOR',
  CONSULTA = 'CONSULTA',
}

export enum ProductStatus {
  OK = 'OK',
  BAIXO = 'BAIXO',
  CRITICO = 'CRITICO',
}

export enum MovementType {
  ENTRADA_COMPRA = 'ENTRADA_COMPRA',
  SAIDA_VENDA = 'SAIDA_VENDA',
  SAIDA_PERDA = 'SAIDA_PERDA',
  AJUSTE_INVENTARIO = 'AJUSTE_INVENTARIO',
  TRANSFERENCIA = 'TRANSFERENCIA',
}

export enum AlertPriority {
  URGENTE = 'URGENTE',
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA',
}

// ============================================
// CORE ENTITIES
// ============================================

export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: UserProfile;
}

export interface Category {
  id: number;
  nome: string;
  descricao: string;
  categoria_pai_id: number | null;
  ativo: boolean;
  data_criacao: string;
}

export interface Warehouse {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  capacidade: number;
  capacidade_atual: number;
  responsavel_id: number;
  ativo: boolean;
  data_criacao: string;
}

export interface Supplier {
  id: number;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  tempo_medio_entrega_dias: number;
  condicoes_pagamento: string;
  avaliacao: number;
  ativo: boolean;
  data_cadastro: string;
}

export interface Product {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  categoria_id: number;
  quantidade_atual: number;
  quantidade_minima: number;
  quantidade_maxima: number;
  preco_aquisicao: number;
  preco_venda: number;
  custo_medio_ponderado: number;
  unidade_medida: string;
  localizacao_fisica: string;
  armazem_id: number;
  prazo_validade: string | null;
  status: ProductStatus;
  ativo: boolean;
  data_cadastro: string;
  data_atualizacao: string;
}

export interface ProductSupplier {
  id: number;
  produto_id: number;
  fornecedor_id: number;
  preco_atual: number;
  prazo_entrega_dias: number;
  prioridade: number;
}

export interface Movement {
  id: number;
  produto_id: number;
  usuario_id: number;
  tipo: MovementType;
  quantidade: number;
  preco_unitario: number | null;
  documento_fiscal: string | null;
  observacao: string | null;
  local_origem: string | null;
  local_destino: string | null;
  venda_id?: number | null;
  data_hora: string;
}

export interface Alert {
  id: number;
  produto_id: number;
  data_alerta: string;
  quantidade_sugerida: number;
  prioridade: AlertPriority;
  visualizado: boolean;
  data_visualizacao: string | null;
  data_resolucao: string | null;
  observacao: string | null;
}

// ============================================
// DATA STRUCTURES
// ============================================

export interface StockData {
  produtos: Product[];
  categorias: Category[];
  fornecedores: Supplier[];
  movimentacoes: Movement[];
  alertas: Alert[];
  produto_fornecedor: ProductSupplier[];
  armazens: Warehouse[];
  usuarios: User[];
}

export interface MockDataEstoque extends StockData {
  // Helper functions
  getProdutoById(id: number): Product | undefined;
  getCategoriaById(id: number): Category | undefined;
  getFornecedorById(id: number): Supplier | undefined;
  getUsuarioById(id: number): User | undefined;
  getAlertasByProdutoId(produtoId: number): Alert[];
  getMovimentacoesByProdutoId(produtoId: number): Movement[];
  getFornecedoresByProdutoId(produtoId: number): Array<Supplier & {
    preco_atual: number;
    prazo_entrega_dias: number;
    prioridade: number;
  }>;
  getCategoriaPath(categoriaId: number): string;
  calcularStatus(quantidadeAtual: number, quantidadeMinima: number): ProductStatus;
  getDashboardMetrics(): DashboardMetrics;
  getArmazemById(id: number): Warehouse | undefined;
  getProdutosByArmazemId(armazemId: number): Product[];
  getArmazemUtilization(armazemId: number): WarehouseUtilization | null;
  getProdutosExpirando(dias?: number): Product[];
  getSupplierPerformance(fornecedorId: number): SupplierPerformance | null;
}

// ============================================
// DASHBOARD & ANALYTICS
// ============================================

export interface DashboardMetrics {
  totalProdutos: number;
  produtosCriticos: number;
  produtosBaixos: number;
  produtosOk: number;
  valorTotalEstoque: number;
  categoriasAtivas: number;
  alertasPendentes: number;
}

export interface WarehouseUtilization {
  armazem: Warehouse;
  quantidadeTotal: number;
  valorTotal: number;
  capacidadeUtilizada: number;
  capacidadeDisponivel: number;
  percentualUtilizado: number;
}

export interface SupplierPerformance {
  fornecedor: Supplier;
  totalCompras: number;
  valorTotal: number;
  prazoMedioEntrega: number;
  avaliacao: number;
  produtosFornecidos: number;
}

// ============================================
// CHART DATA TYPES
// ============================================

export interface ABCAnalysisItem {
  produto: Product;
  valorTotal: number;
  percentual: number;
  classificacao: 'A' | 'B' | 'C';
}

export interface ABCAnalysis {
  items: ABCAnalysisItem[];
  totalValue: number;
  categoryA: ABCAnalysisItem[];
  categoryB: ABCAnalysisItem[];
  categoryC: ABCAnalysisItem[];
}

export interface TurnoverRate {
  produto: Product;
  taxaRotatividade: number;
  diasRotatividade: number;
}

export interface CategoryDistribution {
  categoria: Category;
  valorTotal: number;
  quantidadeProdutos: number;
  percentual: number;
}

export interface SupplierPerformanceData {
  fornecedor: Supplier;
  totalCompras: number;
  valorTotal: number;
  prazoMedioEntrega: number;
  avaliacao: number;
}

export interface WeeklyActivityData {
  day: string;
  hour: number;
  count: number;
  type: MovementType;
}

export interface StockProjection {
  produto: Product;
  data: string;
  quantidadeProjetada: number;
  tendencia: 'CRESCENTE' | 'DECRESCENTE' | 'ESTAVEL';
}

export interface MarginAnalysis {
  categoria: Category;
  receitaTotal: number;
  custoTotal: number;
  margemLucro: number;
  percentualMargem: number;
}

export interface CostEvolution {
  data: string;
  custoMedio: number;
  quantidade: number;
}

export interface StockAging {
  produto: Product;
  diasEmEstoque: number;
  categoria: 'NOVO' | 'MODERADO' | 'ANTIGO' | 'MUITO_ANTIGO';
}

export interface LocationHeatmap {
  localizacao: string;
  quantidade: number;
  valor: number;
  produtos: Product[];
}

export interface ExpirationTimeline {
  data: string;
  produtos: Product[];
  quantidade: number;
  criticidade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';
}

export interface BusinessInsights {
  abcAnalysis: ABCAnalysis;
  turnoverRates: TurnoverRate[];
  supplierPerformance: SupplierPerformanceData[];
  categoryDistribution: CategoryDistribution[];
  trends: {
    entradas: number[];
    saidas: number[];
    labels: string[];
  };
  projection: StockProjection[];
  weeklyHeatmap: WeeklyActivityData[];
  criticalAnalysis: {
    produtosCriticos: Product[];
    alertasUrgentes: Alert[];
  };
  marginAnalysis?: MarginAnalysis[];
  costEvolution?: CostEvolution[];
  warehouseUtilization?: WarehouseUtilization[];
  stockAging?: StockAging[];
  locationHeatmap?: LocationHeatmap[];
  expirationTimeline?: ExpirationTimeline[];
}

// ============================================
// FILTERS & SEARCH
// ============================================

export interface ProductFilters {
  search?: string;
  categoria_id?: number;
  status?: ProductStatus;
  armazem_id?: number;
  fornecedor_id?: number;
  expirando?: boolean;
  vencidos?: boolean;
  quantidade_minima?: number;
  quantidade_maxima?: number;
}

export interface FilterState {
  produtos?: ProductFilters;
  categorias?: {
    search?: string;
    ativo?: boolean;
  };
  fornecedores?: {
    search?: string;
    ativo?: boolean;
  };
  movimentacoes?: {
    tipo?: MovementType;
    produto_id?: number;
    data_inicio?: string;
    data_fim?: string;
  };
  alertas?: {
    prioridade?: AlertPriority;
    visualizado?: boolean;
  };
}

// ============================================
// FORMS
// ============================================

export interface ProductFormData {
  codigo: string;
  nome: string;
  descricao: string;
  categoria_id: number;
  quantidade_atual: number;
  quantidade_minima: number;
  quantidade_maxima: number;
  preco_aquisicao: number;
  preco_venda: number;
  unidade_medida: string;
  localizacao_fisica: string;
  armazem_id: number;
  prazo_validade: string | null;
  ativo: boolean;
}

export interface CategoryFormData {
  nome: string;
  descricao: string;
  categoria_pai_id: number | null;
  ativo: boolean;
}

export interface SupplierFormData {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  tempo_medio_entrega_dias: number;
  condicoes_pagamento: string;
  avaliacao: number;
  ativo: boolean;
}

export interface WarehouseFormData {
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  capacidade: number;
  responsavel_id: number;
  ativo: boolean;
}

export interface MovementFormData {
  produto_id: number;
  tipo: MovementType;
  quantidade: number;
  preco_unitario?: number;
  documento_fiscal?: string;
  observacao?: string;
  local_origem?: string;
  local_destino?: string;
}

// ============================================
// BULK OPERATIONS
// ============================================

export interface BulkOperation {
  type: 'STATUS' | 'TRANSFER' | 'CATEGORY' | 'EXPORT';
  productIds: number[];
  data?: {
    status?: ProductStatus;
    armazem_id?: number;
    categoria_id?: number;
  };
}

// ============================================
// REPORTS
// ============================================

export enum ReportType {
  STOCK = 'STOCK',
  MOVEMENTS = 'MOVEMENTS',
  CRITICAL_PRODUCTS = 'CRITICAL_PRODUCTS',
  SUPPLIERS = 'SUPPLIERS',
  WAREHOUSES = 'WAREHOUSES',
  EXPIRATIONS = 'EXPIRATIONS',
  COSTS = 'COSTS',
  TURNOVER = 'TURNOVER',
  ABC = 'ABC',
  CUSTOM = 'CUSTOM',
}

export interface ReportConfig {
  type: ReportType;
  filters: FilterState;
  columns?: string[];
  dateRange?: {
    inicio: string;
    fim: string;
  };
  format?: 'CSV' | 'JSON' | 'EXCEL' | 'PDF';
}

// ============================================
// NOTIFICATIONS
// ============================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ============================================
// UI STATE
// ============================================

export interface TabState {
  activeTab: string;
  tabs: string[];
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
}

export interface ChartState {
  dateRange: {
    inicio: string;
    fim: string;
  };
  period: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'CUSTOM';
  comparisonMode: boolean;
}

