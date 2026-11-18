import { useNavigate } from 'react-router'
import DogForm from '../components/DogForm'
import type { NewDog } from '../types/dog'

function DogAdd() {
  const navigate = useNavigate()

  const handleSubmit = async (body: NewDog) => {
    const res = await fetch('/api/dogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    navigate('/') // 등록 성공 → 목록으로
  }

  return (
    <DogForm
      title="개 추가"
      submitLabel="등록"
      submittingLabel="등록 중..."
      errorPrefix="등록에 실패했습니다"
      onSubmit={handleSubmit}
    />
  )
}

export default DogAdd
