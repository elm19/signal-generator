'use client'

import { useModelContext } from '@/context/ModelContext'
import { ChangeEvent } from 'react'

interface ModelSelectorProps {
  models: Array<{ id: string; name: string }>
  className?: string
}

export function ModelSelector({ models, className }: ModelSelectorProps) {
  const { selectedModel, setSelectedModel } = useModelContext()

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value
    setSelectedModel(newModel)
  }

  return (
    <div className={className}>
      <label htmlFor="model-select" className="hidden">
        Select a Model:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={handleModelChange}
        className="border rounded px-2 py-1"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}
