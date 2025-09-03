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
  firstName: string
  companyName: string
  streetAddress: string
  apartment: string
  townCity: string
  phoneNumber: string
  emailAddress: string
  saveInfo: boolean
}