export interface ModelData {
  final_portfolio_value: number
  last_updated: string
  market: string
  max_drawdown_percent: number
  max_drawdown_value: number
  model_name: string
  modelid: string
  net_profit: number
  returns: number
  sharpe_ratio: number
  sqn: number
  total_trades: number
  backtestingMetrics?: {
    sharpeRatio: number
    maxDrawdown: number
    annualizedReturn: number
  }
  dateCreated?: string
  loss?: number
  accuracy?: number
}
