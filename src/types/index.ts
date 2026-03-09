export interface UserProfile {
  name: string
  role: 'admin' | 'guest'
}

export interface CartItem {
  id: number
  name: string
  price: number
}
