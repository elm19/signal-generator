import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

interface CalloutProps {
  icon?: string
  title?: string
  children?: React.ReactNode
  href?: string
  dashboard?: boolean
}

export function Callout({
  title,
  children,
  icon,
  dashboard,
  href = '/dashboard',
  ...props
}: CalloutProps) {
  if (dashboard) {
    return (
      <Alert {...props}>
        <div className="flex">
          {icon && <span className="mr-4 text-2xl">{icon}</span>}
          {title && (
            <Link href={href}>
              <AlertTitle className="text-2xl">{title}</AlertTitle>
            </Link>
          )}
        </div>
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    )
  }
  return (
    <Alert {...props}>
      {icon && <span className="mr-4 text-2xl">{icon}</span>}

      {title && <AlertTitle>{title}</AlertTitle>}

      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
