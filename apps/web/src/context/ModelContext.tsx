'use client'
import React, { createContext, useContext, useState } from 'react'

interface ModelContextProps {
  selectedModel: string
  setSelectedModel: (model: string) => void
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined)

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedModel, setSelectedModel] = useState<string>('model-001')

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  )
}

export const useModelContext = (): ModelContextProps => {
  const context = useContext(ModelContext)
  if (!context) {
    throw new Error('useModelContext must be used within a ModelProvider')
  }
  return context
}
