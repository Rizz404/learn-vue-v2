export interface UserProfile {
  name: string
  role: 'admin' | 'guest'
}

export interface CartItem {
  id: number
  name: string
  price: number
}

export interface TodoItem {
  id: string
  title: string
  description: string
  isCompleted: boolean
  createdAt: number
}
