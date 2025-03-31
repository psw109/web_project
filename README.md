# Web Project

Django와 React를 사용한 웹 프로젝트입니다.

## 기술 스택

### Backend

- Python 3.9+
- Django 4.2.20
- Django REST Framework 3.15.2
- django-cors-headers 4.7.0
- SQLite (개발)

### Frontend

- React 19.0.0
- TypeScript
- react-router-dom 7.4.0
- axios 1.8.4
- Vite

## 설치 및 실행

### Backend 설정

```bash
# backend 디렉토리로 이동
cd backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 필요한 패키지 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
python manage.py migrate

# 서버 실행
python manage.py runserver
```

### Frontend 설정

```bash
# frontend 디렉토리로 이동
cd frontend

# 필요한 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```
