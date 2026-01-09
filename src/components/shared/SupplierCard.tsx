'use client'

import { Card, CardContent } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { Supplier } from '@types/estoque'
import { Star, Mail, Phone } from 'lucide-react'

interface SupplierCardProps {
  supplier: Supplier
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="bg-gray-900/50 rounded-lg border border-gray-700 text-white">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{supplier.nome_fantasia}</h3>
          <Badge className="bg-blue-500 text-white">{supplier.tempo_medio_entrega_dias} dias</Badge>
        </div>
        <div className="text-gray-400 mt-2 space-y-1 text-sm">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <span>{supplier.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span>{supplier.telefone}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span>Avaliação: {supplier.avaliacao}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
