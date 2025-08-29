# Abnormal File Vault

A full‑stack file management application built with **React** (frontend) and **Django** (backend), designed for **efficient deduplication**, **fast search & filtering**, and a **professional user experience**.

---

## 🚀 Technology Stack

**Backend**
- Django 4.x + Django REST Framework (DRF)
- SQLite (development) — pluggable to other DBs
- `django-filter` for advanced queries
- Gunicorn, WhiteNoise for production serving

**Frontend**
- React 18 + TypeScript
- TanStack Query (React Query) for server state
- Axios for API communication
- Tailwind CSS + Heroicons for styling

**Infrastructure**
- Docker & Docker Compose for containerized development & deployment
- Local file storage with named Docker volumes

---

## 📋 Prerequisites

Install:
- **Docker** (20.10+)
- **Docker Compose** (v2+)
- (Optional) Node.js 18+ and Python 3.9+ for local non‑Docker development

---

## 🛠️ Installation & Setup

### Using Docker (Recommended)

docker-compose up --build

text

---

### Local Development Setup

#### Backend
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
mkdir -p media staticfiles data
python manage.py migrate
python manage.py runserver

text

#### Frontend
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env.local
npm start

text

---

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000  
- **Backend API**: http://localhost:8000/api

---

## 📝 API Overview

### Files
- **GET** `/api/files/` — list with filters & search
- **POST** `/api/files/` — upload (deduplication applied)
- **GET** `/api/files/<id>/` — details
- **DELETE** `/api/files/<id>/` — delete
- **Direct GET** file URL — download

### Storage Stats
- **GET** `/api/files/storage_savings/` — returns potential, actual used, and saved storage in bytes and human‑readable units

---

## 📂 Project Structure

abnormal-file-vault/
├── backend/
│ ├── files/ # Django app: models, views, filters, serializers
│ ├── core/ # Django settings & root URLs
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/
│ ├── src/components/ # FileUpload, FileList, FilterPanel, StorageStats
│ ├── src/services/ # API services
│ ├── src/types/ # TypeScript types
│ ├── Dockerfile
│ └── package.json
└── docker-compose.yml

text

---

## 🔧 Features Implemented

- **File Deduplication**  
  - SHA256 hash check on upload to detect duplicates
  - Stores reference instead of duplicating
  - Tracks storage saved

- **Advanced Search/Filter**  
  - Search by filename  
  - Filter by type, size range, and upload date (exact or range)  
  - Multiple filters can be combined  
  - Validations prevent invalid filter input

- **Scalability & Performance**  
  - Indexed DB fields for queried columns  
  - Efficient queryset filtering  
  - React Query caching & pagination

- **Professional UI**  
  - Dark theme with Abnormal Security brand palette  
  - Responsive, accessible design  
  - Live upload progress  
  - Disabled states during loading  
  - User‑friendly toasts for actions & errors

---

## 🐛 Troubleshooting

**Port Conflicts**
- Change ports in `docker-compose.yml` if 3000/8000 are occupied

**Upload Issues**
- Maximum file size: 10MB
- Ensure `media` directory has correct permissions

**Database Issues**
rm backend/data/db.sqlite3
python manage.py migrate

text

---

## 📦 Submission Notes

- All functional/business requirements are implemented:
  - Deduplication with storage savings stats
  - Search and filtering features
- Code cleaned, no leftover debug prints
- UI matches professional branding and theme
- Dockerized for easy setup and deployment

---

© 2025 – Abnormal File Vault