#!/bin/bash

CERT_NAME="_wildcard.gotogether.io.kr+3"

echo "🔐 Setting up mkcert for gotogether.io.kr..."

# 1. mkcert 설치 확인
if ! command -v mkcert &> /dev/null; then
  echo "❌ mkcert가 설치되어 있지 않습니다. 먼저 'brew install mkcert'로 설치해주세요."
  exit 1
fi

# 2. 로컬 CA 설치
echo "📦 로컬 CA 설치 중..."
if ! mkcert -install; then
  echo "❌ mkcert -install 실패. 관리자 권한이 필요할 수 있습니다."
  exit 1
fi

# 3. 인증서 생성 (파일이 없을 때만)
if [[ -f "${CERT_NAME}.pem" && -f "${CERT_NAME}-key.pem" ]]; then
  echo "✅ 인증서가 이미 존재합니다. 새로 생성하지 않습니다."
else
  echo "🔧 인증서가 존재하지 않아 새로 생성합니다..."
  if mkcert gotogether.io.kr "*.gotogether.io.kr" 127.0.0.1 ::1; then
  echo "✅ 인증서 생성 완료: ${CERT_NAME}.pem, ${CERT_NAME}-key.pem"
  else
    echo "❌ 인증서 생성 실패. mkcert 실행 중 오류가 발생했습니다."
    exit 1
  fi
fi
