import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DogCard from '../components/DogCard'
import type { Dog } from '../types/dog'

function DogList() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (dog: Dog) => {
    if (!window.confirm(`'${dog.kind}'을(를) 삭제하시겠습니까?`)) return

    setDeletingId(dog.id)
    try {
      const res = await fetch(`/api/dogs/${dog.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setDogs((prev) => prev.filter((d) => d.id !== dog.id)) // 목록에서 제거
    } catch (err) {
      window.alert(
        `삭제에 실패했습니다: ${err instanceof Error ? err.message : String(err)}`,
      )
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/dogs', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Dog[]>
      })
      .then(setDogs)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : String(err))
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return (
    <>
      <div className="toolbar">
        <span className="count">
          {!loading && !error && `총 ${dogs.length}마리`}
        </span>
        <Link to="/dog/add" className="btn">
          + 개 추가
        </Link>
      </div>

      {loading && <p className="status">불러오는 중...</p>}
      {error && (
        <p className="status error">목록을 불러오지 못했습니다: {error}</p>
      )}
      {!loading && !error && dogs.length === 0 && (
        <p className="status">등록된 강아지가 없습니다.</p>
      )}
      {dogs.length > 0 && (
        <ul className="dog-grid">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onDelete={handleDelete}
              deleting={deletingId === dog.id}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default DogList
