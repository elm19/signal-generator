'use client'

import { useModelContext } from '@/context/ModelContext'
import { ModelData } from '@/types/ModelData'
import { ChangeEvent, useEffect } from 'react'

interface ModelSelectorProps {
  models: Array<ModelData>
  className?: string
}

export function ModelSelector({ models, className }: ModelSelectorProps) {
  const { selectedModel, setSelectedModel } = useModelContext()
  console.log('Available models:', models)

  useEffect(() => {
    if (models.length > 0 && models[0]?.modelid) {
      setSelectedModel(models[0].modelid)
    }
  }, [models])

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newModelId = event.target.value

    setSelectedModel(newModelId)
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
          <option key={model.modelid} value={model.modelid}>
            {model.model_name}
          </option>
        ))}
      </select>
    </div>
  )
}
