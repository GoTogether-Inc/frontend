#!/bin/bash

CERT_NAME="_wildcard.gotogether.io.kr"

echo "🔐 Setting up mkcert for gotogether.io.kr..."

# 1. mkcert 설치 확인
if ! command -v mkcert &> /dev/null; then
  echo "❌ mkcert가 설치되어 있지 않습니다. 먼저 'brew install mkcert'로 설치해주세요."
  exit 1
fi

# 2. 로컬 CA 설치
mkcert -install

# 3. 인증서 생성 (파일이 없을 때만)
if [[ -f "${CERT_NAME}.pem" && -f "${CERT_NAME}-key.pem" ]]; then
  echo "✅ 인증서가 이미 존재합니다. 새로 생성하지 않습니다."
else
  mkcert "*.gotogether.io.kr" 127.0.0.1 ::1
  echo "✅ 인증서 생성 완료: ${CERT_NAME}.pem, ${CERT_NAME}-key.pem"
fi
