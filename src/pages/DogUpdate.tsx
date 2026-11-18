import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import DogForm from '../components/DogForm'
import type { Dog, NewDog } from '../types/dog'

function DogUpdate() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  // 목록에서 카드 클릭으로 들어오면 state 로 개 정보가 넘어옴
  const passed = (useLocation().state as { dog?: Dog } | null)?.dog
  const initial = passed && String(passed.id) === id ? passed : null

  const [dog, setDog] = useState<Dog | null>(initial)
  const [error, setError] = useState<string | null>(null)

  // 주소를 직접 입력했거나 새로고침한 경우 서버에서 조회
  useEffect(() => {
    if (dog) return
    const controller = new AbortController()

    fetch(`/api/dogs/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Dog>
      })
      .then(setDog)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : String(err))
      })

    return () => controller.abort()
  }, [id, dog])

  const handleSubmit = async (body: NewDog) => {
    const res = await fetch(`/api/dogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    navigate('/') // 수정 성공 → 목록으로
  }

  if (error) {
    return (
      <>
        <p className="status error">강아지 정보를 불러오지 못했습니다: {error}</p>
        <p className="status">
          <Link to="/" className="btn btn-ghost">
            목록으로
          </Link>
        </p>
      </>
    )
  }

  if (!dog) return <p className="status">불러오는 중...</p>

  return (
    <DogForm
      key={dog.id}
      title="개 수정"
      initialValue={dog}
      submitLabel="수정"
      submittingLabel="수정 중..."
      errorPrefix="수정에 실패했습니다"
      onSubmit={handleSubmit}
    />
  )
}

export default DogUpdate
