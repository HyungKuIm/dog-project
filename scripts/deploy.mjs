// dist/ 빌드 결과를 Spring Boot 프로젝트(demo-dog)의 정적 리소스 폴더로 복사한다.
// 사용: npm run deploy  (빌드 + 복사)
import { cpSync, existsSync, rmSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'dist')
const dest = resolve(root, '../demo-dog/src/main/resources/static')

if (!existsSync(src)) {
  console.error(`[deploy] 빌드 결과가 없습니다: ${src}  (먼저 npm run build)`)
  process.exit(1)
}
if (!existsSync(resolve(dest, '../..'))) {
  console.error(`[deploy] 대상 프로젝트를 찾을 수 없습니다: ${dest}`)
  process.exit(1)
}

// 이전 빌드의 해시 파일(assets/index-xxxx.js 등)이 쌓이지 않도록 비우고 복사
rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
cpSync(src, dest, { recursive: true })

console.log(`[deploy] ${src} -> ${dest} 복사 완료`)
