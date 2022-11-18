export interface Bet {
  userId: string
  matchId: string
  home: number
  visitors: number
  score: number
  date: string
  editable: boolean
  visible: boolean
}

export interface BetType {
  bets: Bet[]
}
