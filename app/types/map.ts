export type LatLongItem = {
  lat: number
  long: number
}

export type MapPoint = {
  id: string
  label: string
  description?: string | null
} & LatLongItem
