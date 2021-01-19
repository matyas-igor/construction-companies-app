export type Company = {
  id: string
  name: string
  speciality: string
  city: string
  logo: string
}

export type Order = 'asc' | 'desc'
export type OrderBy = 'name' | 'city' | 'speciality'
