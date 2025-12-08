import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors',
          'placeholder:text-gray-400',
          'focus:border-cnec-blue focus:outline-none focus:ring-2 focus:ring-cnec-blue/20',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          'resize-y',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
