import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-cnec-blue text-white',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-success-light text-success',
        warning: 'bg-warning-light text-warning',
        error: 'bg-error-light text-error',
        outline: 'border border-gray-300 text-gray-700',
        blue: 'bg-cnec-blue-light text-cnec-blue',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
