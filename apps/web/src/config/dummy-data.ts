// Dummy data for model predictions and model details

// Predictions for the last 5 days
export const predictions = [
  {
    date: '2025-05-20',
    modelId: 'model-001',
    probabilities: { buy: 0.7, sell: 0.2, hold: 0.1 },
    signal: 1, // Buy
  },
  {
    date: '2025-06-02',
    modelId: 'model-002',
    probabilities: { buy: 0.1, sell: 0.8, hold: 0.1 },
    signal: 1, // Sell
  },
  {
    date: '2025-06-03',
    modelId: 'model-003',
    probabilities: { buy: 0.3, sell: 0.3, hold: 0.4 },
    signal: 0, // Hold
  },
  {
    date: '2025-06-04',
    modelId: 'model-001',
    probabilities: { buy: 0.6, sell: 0.3, hold: 0.1 },
    signal: 1, // Buy
  },
  {
    date: '2025-06-05',
    modelId: 'model-005',
    probabilities: { buy: 0.2, sell: 0.5, hold: 0.3 },
    signal: -1, // Sell
  },
  {
    date: '2025-06-06',
    modelId: 'model-006',
    probabilities: { buy: 0.4, sell: 0.4, hold: 0.2 },
    signal: 0, // Hold
  },
  {
    date: '2025-06-07',
    modelId: 'model-007',
    probabilities: { buy: 0.5, sell: 0.3, hold: 0.2 },
    signal: 1, // Buy
  },
  {
    date: '2025-06-08',
    modelId: 'model-008',
    probabilities: { buy: 0.2, sell: 0.6, hold: 0.2 },
    signal: -1, // Sell
  },
  {
    date: '2025-06-09',
    modelId: 'model-009',
    probabilities: { buy: 0.3, sell: 0.3, hold: 0.4 },
    signal: 0, // Hold
  },
  {
    date: '2025-06-10',
    modelId: 'model-010',
    probabilities: { buy: 0.7, sell: 0.2, hold: 0.1 },
    signal: 1, // Buy
  },
]

// Details of the model
export const modelDetails = {
  modelId: 'model-1',
  market: 'gold',
  lastTrained: '2025-05-30',
  loss: 0.05,
  accuracy: 0.95,
  backtestingResults: {
    totalTrades: 100,
    profitableTrades: 80,
    profitFactor: 1.5,
  },
}


export const backEndLink = 'http://127.0.0.1:5000/'
