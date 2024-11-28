type Condition = 'new' | 'used' | 'not_specified'

// -------------------------------

export interface ItemsDTO {
  filters: Filter[] | []
  results: Result[] | []
  paging: Paging
}

interface Filter {
  id: string
  values: Value[]
}

interface Value {
  name: string
}

interface Result {
  id: string
  title: string
  seller: Seller
  currency_id: string
  price: number
  original_price: number | null
  thumbnail: string
  condition: Condition
  shipping: Shipping
  installments: Installments
}

interface Seller {
  nickname: string
}

interface Shipping {
  free_shipping: boolean
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

export interface ItemsByIdDTO {
  seller_id: number
  category_id: string
  id: string
  title: string
  currency_id: string
  price: number
  original_price: number | null
  pictures: Picture[]
  condition: Condition
  shipping: Shipping
  sold_quantity: number
  installments: Installments
  attributes: Attribute[]
}

interface Attribute {
  id: string
  name: string
  value_name: string
}

interface Picture {
  url: string
}

// -------------------------------

export interface DescriptionByIdDTO {
  plain_text: string
}

// -------------------------------

export interface CategoryByIdDTO {
  path_from_root: PathFromRoot[]
}

interface PathFromRoot {
  name: string
}

// -------------------------------

export interface UserByIdDTO {
  nickname: string
}

// -------------------------------

export interface ItemsProps {
  query: string
  offset: number
}

// -------------------------------

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