'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { SupplierCard } from '@components/shared/SupplierCard'
import { StatusBadge } from '@components/shared/StatusBadge'
import { Product, Supplier, Movement, User, ProductSupplier } from '@types/estoque'
import {
  Truck,
  ShoppingCart,
  FileText
} from 'lucide-react'

interface LogisticsProps {
  products: Product[]
  suppliers: Supplier[]
  movements: Movement[]
  users: User[]
  productSuppliers: ProductSupplier[]
  onGenerateOrder?: (productId: number, quantity: number) => void
}

export function Logistics({ products, suppliers, movements, users, productSuppliers, onGenerateOrder }: LogisticsProps) {
  const criticalProducts = products.filter(p => p.status !== 'OK')

  const getProductName = (productId: number) => {
    return products.find(p => p.id === productId)?.nome || 'Desconhecido'
  }

  const getUserName = (userId: number) => {
    return users.find(u => u.id === userId)?.nome || 'Sistema'
  }

  const getSupplierByProductId = (productId: number) => {
    const productSupplier = productSuppliers.find(ps => ps.produto_id === productId);
    if (productSupplier) {
      return suppliers.find(s => s.id === productSupplier.fornecedor_id);
    }
    return undefined; // No specific supplier found, handle fallback in the UI
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suppliers Section */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Truck className="w-5 h-5 mr-2 text-blue-400" />
              Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map(supplier => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Purchase Orders Section */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-green-400" />
              Ordens de Compra Sugeridas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalProducts.map(product => {
                const suggestedQty = product.quantidade_minima * 2
                const supplier = getSupplierByProductId(product.id);
                return (
                  <div key={product.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{product.nome}</h4>
                      <StatusBadge status={product.status} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Quantidade sugerida:</span>
                        <span className="font-semibold">{suggestedQty} {product.unidade_medida}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Valor estimado:</span>
                        <span className="font-semibold">R$ {(suggestedQty * product.preco_aquisicao).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Entrega prevista:</span>
                        <span className="font-semibold">{supplier?.tempo_medio_entrega_dias ?? 'N/A'} dias</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                      onClick={() => onGenerateOrder?.(product.id, suggestedQty)}
                    >
                      Gerar Ordem de Compra
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement History */}
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-400" />
            Histórico de Movimentações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Data</TableHead>
                <TableHead className="text-gray-300">Produto</TableHead>
                <TableHead className="text-gray-300">Tipo</TableHead>
                <TableHead className="text-gray-300">Quantidade</TableHead>
                <TableHead className="text-gray-300">Documento</TableHead>
                <TableHead className="text-gray-300">Usuário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map(movement => (
                <TableRow key={movement.id} className="border-gray-700">
                  <TableCell className="text-gray-300">{new Date(movement.data_hora).toLocaleDateString()}</TableCell>
                  <TableCell className="text-white">{getProductName(movement.produto_id)}</TableCell>
                  <TableCell>
                    <Badge className={
                      movement.tipo.includes('ENTRADA')
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                    }>
                      {movement.tipo.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-semibold ${
                    movement.tipo.includes('ENTRADA') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {movement.tipo.includes('ENTRADA') ? '+' : '-'}{movement.quantidade}
                  </TableCell>
                  <TableCell className="text-gray-300">{movement.documento_fiscal}</TableCell>
                  <TableCell className="text-gray-300">{getUserName(movement.usuario_id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
