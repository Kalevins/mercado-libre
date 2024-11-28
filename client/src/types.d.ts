type Condition = 'new' | 'used' | 'not_specified'

export interface Items {
  categories: string[]
  items: Item[]
  paging: Paging
}

interface Item {
  id: string
  title: string
  seller: string
  price: Price
  picture: string
  condition: Condition
  free_shipping: boolean
  installments: Installments
}

interface Price {
  currency: string
  amount: number
  decimals: number
  regular_amount: number | null
}

interface Installments {
  quantity: number | null
  amount: number | null
}

interface Paging {
  total: number
  offset: number
  limit: number
}

// -------------------------------

export interface ItemsById {
  item: ItemById
}

interface ItemById extends Omit<Item, 'picture'> {
  pictures: string[]
  sold_quantity: number | null
  description: string
  attributes: Attribute[]
  category_path_from_root: string[]
}

interface Attribute {
  id: string
  name: string
  value_name: string
}
