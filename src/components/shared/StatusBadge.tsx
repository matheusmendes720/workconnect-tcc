'use client'

import { Badge } from '@components/ui/badge'
import { ProductStatus } from '@types/estoque'

interface StatusBadgeProps {
  status: ProductStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeVariants: Record<ProductStatus, string> = {
    [ProductStatus.OK]: "bg-green-600 text-white hover:bg-green-700",
    [ProductStatus.BAIXO]: "bg-yellow-500 text-black hover:bg-yellow-600",
    [ProductStatus.CRITICO]: "bg-orange-500 text-white hover:bg-orange-600",
  };

  const statusLabels: Record<ProductStatus, string> = {
      [ProductStatus.OK]: 'OK',
      [ProductStatus.BAIXO]: 'BAIXO',
      [ProductStatus.CRITICO]: 'CRÍTICO',
  }

  return (
    <Badge className={badgeVariants[status] || "bg-gray-500 text-white"}>
      {statusLabels[status] || status}
    </Badge>
  )
}
