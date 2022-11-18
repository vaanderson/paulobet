export interface Ranking {
  userId: string
  score: number
  thumb?: any
}

export interface RankingType {
  ranking: Ranking[]
}
