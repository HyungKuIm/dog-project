import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import type { NewDog } from '../types/dog'

// public/images 에 미리 저장된 이미지 (직접 입력도 가능)
const IMAGE_OPTIONS = [
  'bulldog.jpg',
  'husky.jpg',
  'jindo.jpg',
  'puddle.jpg',
  'pug.jpg',
  'shepherd.jpg',
  'siba.jpg',
]

type FormState = Record<keyof NewDog, string>

const emptyForm: FormState = {
  kind: '',
  price: '',
  image: '',
  country: '',
  height: '',
  weight: '',
  content: '',
}

function toFormState(dog: NewDog): FormState {
  return {
    kind: dog.kind,
    price: String(dog.price),
    image: dog.image,
    country: dog.country,
    height: String(dog.height),
    weight: String(dog.weight),
    content: dog.content ?? '',
  }
}

interface Props {
  title: string
  /** 수정 시 기존 값 */
  initialValue?: NewDog
  submitLabel: string
  submittingLabel: string
  errorPrefix: string
  /** 실패 시 throw 하면 에러 메시지를 표시 */
  onSubmit: (body: NewDog) => Promise<void>
}

function DogForm({
  title,
  initialValue,
  submitLabel,
  submittingLabel,
  errorPrefix,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<FormState>(() =>
    initialValue ? toFormState(initialValue) : emptyForm,
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const body: NewDog = {
      kind: form.kind.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      country: form.country.trim(),
      height: Number(form.height),
      weight: Number(form.weight),
      content: form.content.trim(),
    }

    setSubmitting(true)
    try {
      await onSubmit(body)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setSubmitting(false)
    }
  }

  const preview = form.image.trim()

  return (
    <section className="dog-form-wrap">
      <h2>{title}</h2>

      <form className="dog-form" onSubmit={handleSubmit}>
        <div className="dog-form-preview">
          {preview ? (
            <img src={`/images/${preview}`} alt="미리보기" />
          ) : (
            <span>이미지 미리보기</span>
          )}
        </div>

        <div className="dog-form-fields">
          <label>
            품종
            <input name="kind" value={form.kind} onChange={handleChange} required />
          </label>
          <label>
            가격
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            이미지 파일명
            <input
              name="image"
              list="image-options"
              placeholder="예: jindo.jpg"
              value={form.image}
              onChange={handleChange}
              required
            />
            <datalist id="image-options">
              {IMAGE_OPTIONS.map((img) => (
                <option key={img} value={img} />
              ))}
            </datalist>
          </label>
          <label>
            원산지
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </label>
          <div className="row">
            <label>
              키 (cm)
              <input
                name="height"
                type="number"
                min="0"
                step="0.1"
                value={form.height}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              몸무게 (kg)
              <input
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={form.weight}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label>
            설명
            <textarea
              name="content"
              rows={3}
              value={form.content}
              onChange={handleChange}
            />
          </label>

          {error && (
            <p className="status error">
              {errorPrefix}: {error}
            </p>
          )}

          <div className="actions">
            <Link to="/" className="btn btn-ghost">
              취소
            </Link>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? submittingLabel : submitLabel}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default DogForm
