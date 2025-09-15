export interface CartItem {
  _id: string
  item_name: string
  selling_price: string
  attachments?: string[]
  quantity: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface BillingDetails {
  full_name: string
  company_name: string
  street_address: string
  apartment: string
  town_city: string
  phone_number: string
  email_address: string

}