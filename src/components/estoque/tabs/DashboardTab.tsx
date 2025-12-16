/**
 * Dashboard Tab Component
 * Main dashboard with metrics and charts
 * Enhanced with loading states and error handling
 */

'use client';

import React from 'react';
import { StatusChart } from '../charts/StatusChart';
import { MovementsChart } from '../charts/MovementsChart';
import { ABCChart } from '../charts/ABCChart';
import { CategoryValueChart } from '../charts/CategoryValueChart';
import { TurnoverChart } from '../charts/TurnoverChart';
import { SupplierChart } from '../charts/SupplierChart';
import { ProjectionChart } from '../charts/ProjectionChart';
import type { StockData, BusinessInsights, DashboardMetrics } from '../../../types/estoque';
import { formatCurrency } from '../../../lib/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

export interface DashboardTabProps {
  data: StockData;
  metrics: DashboardMetrics;
  insights: BusinessInsights | null;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

export const DashboardTab = React.memo(function DashboardTab({ 
  data, 
  metrics, 
  insights, 
  className = '',
  isLoading = false,
  error = null
}: DashboardTabProps) {
  if (isLoading) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-4 h-80">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`dashboard-tab ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar o dashboard</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className={`dashboard-tab ${className} flex items-center justify-center h-64`}>
        <p className="text-muted-foreground">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className={`dashboard-tab ${className}`}>
      {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-500/10 mr-3">
                  <i className="fas fa-box text-green-500"></i>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Produtos</p>
                  <p className="text-2xl font-semibold">{metrics.totalProdutos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-500/10 mr-3">
                  <i className="fas fa-exclamation-triangle text-yellow-500"></i>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Produtos Críticos</p>
                  <p className="text-2xl font-semibold text-yellow-500">{metrics.produtosCriticos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-500/10 mr-3">
                  <i className="fas fa-dollar-sign text-blue-500"></i>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total Estoque</p>
                  <p className="text-2xl font-semibold">{formatCurrency(metrics.valorTotalEstoque)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-500/10 mr-3">
                  <i className="fas fa-bell text-red-500"></i>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alertas Pendentes</p>
                  <p className="text-2xl font-semibold text-red-500">{metrics.alertasPendentes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <StatusChart products={data.produtos} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <MovementsChart movements={data.movimentacoes} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise ABC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ABCChart abcAnalysis={insights.abcAnalysis} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <CategoryValueChart categoryDistribution={insights.categoryDistribution} />
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1">
          <TurnoverChart 
            turnoverRates={insights.turnoverRates}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance de Fornecedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <SupplierChart supplierPerformance={insights.supplierPerformance} />
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1 lg:col-span-2">
          <ProjectionChart 
            projections={insights.projection}
            isLoading={isLoading}
            error={error}
            daysToProject={30}
          />
        </div>
      </div>
    </div>
  );
});

