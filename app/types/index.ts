import { z } from 'zod'

export const SearchSchema = z.object({
  q: z
    .string('Search query is required.')
    .trim()
    .min(1, 'You must enter a search term.'),
})

export type SearchSchema = z.infer<typeof SearchSchema>

export type NominatimResult = {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  class: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  boundingbox: string[]
}
