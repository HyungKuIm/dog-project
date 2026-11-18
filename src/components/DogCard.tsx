import { useNavigate } from 'react-router'
import type { Dog } from '../types/dog'

interface Props {
  dog: Dog
  onDelete: (dog: Dog) => void
  deleting?: boolean
}

function DogCard({ dog, onDelete, deleting = false }: Props) {
  const navigate = useNavigate()
  // 카드 클릭 → 수정 화면 (이미 가진 정보를 state 로 넘겨 재조회 생략)
  const goUpdate = () => navigate(`/dog/update/${dog.id}`, { state: { dog } })

  return (
    <li
      className="dog-card clickable"
      role="link"
      tabIndex={0}
      onClick={goUpdate}
      onKeyDown={(e) => {
        if (e.key === 'Enter') goUpdate()
      }}
    >
      <div className="dog-thumb">
        <img src={`/images/${dog.image}`} alt={dog.kind} loading="lazy" />
      </div>
      <div className="dog-body">
        <div className="dog-head">
          <h3>{dog.kind}</h3>
          <span className="dog-country">{dog.country}</span>
        </div>
        <p className="dog-content">{dog.content}</p>
        <dl className="dog-spec">
          <div>
            <dt>키</dt>
            <dd>{dog.height}cm</dd>
          </div>
          <div>
            <dt>몸무게</dt>
            <dd>{dog.weight}kg</dd>
          </div>
          <div>
            <dt>조회</dt>
            <dd>{dog.readcount}</dd>
          </div>
        </dl>
        <div className="dog-foot">
          <strong className="dog-price">{dog.price.toLocaleString()}원</strong>
          {/* 버튼 클릭이 카드 클릭(수정 이동)으로 번지지 않도록 막음 */}
          <div className="dog-actions" onKeyDown={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="delete-btn"
              disabled={deleting}
              onClick={(e) => {
                e.stopPropagation()
                onDelete(dog)
              }}
            >
              {deleting ? '삭제 중...' : '삭제'}
            </button>
            <button
              type="button"
              className="cart-btn"
              onClick={(e) => e.stopPropagation()}
            >
              장바구니
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default DogCard
