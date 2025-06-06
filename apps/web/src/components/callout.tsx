import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

interface CalloutProps {
  icon?: string
  title?: string
  children?: React.ReactNode
  dashboard?: boolean
}

export function Callout({
  title,
  children,
  icon,
  dashboard,
  ...props
}: CalloutProps) {
  if (dashboard) {
    return (
      <Alert {...props}>
        <div className="flex">
          {icon && <span className="mr-4 text-2xl">{icon}</span>}
          {title && <AlertTitle className="text-2xl">{title}</AlertTitle>}
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
