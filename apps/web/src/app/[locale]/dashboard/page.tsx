import { useLocale } from 'next-intl'

export default function NewPage() {
  const locale = useLocale()

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">New Page</h1>
      <p className="text-muted-foreground">
        This is a placeholder for the new page. Content will be added soon.
      </p>
    </main>
  )
}
