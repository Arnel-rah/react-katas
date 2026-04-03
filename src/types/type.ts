export type NatureType = string

export type Character = {
  id: number
  name: string
  images: string[]
  nature_type: NatureType[]
  personal?: {
    affiliation?: string | string[]
  }
  rank?: {
    ninjaRank?: Record<string, string>
  }
}

export type ApiResponse = {
  characters: Character[]
}
