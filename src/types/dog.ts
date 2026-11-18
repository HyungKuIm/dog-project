export interface Dog {
  id: number
  kind: string
  price: number
  image: string
  country: string
  height: number
  weight: number
  content: string
  readcount: number
}

/** POST /api/dogs 요청 본문 (id, readcount는 서버에서 생성) */
export type NewDog = Omit<Dog, 'id' | 'readcount'>
