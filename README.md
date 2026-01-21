# Asset Management Admin Dashboard

A production-ready React admin dashboard for managing digital assets. Built with React 19, Vite, Redux Toolkit, and Tailwind CSS.

---

## 📋 Quick Start

### Installation

```bash
npm install
npm run dev
```

### Login Credentials

- **Email:** admin@example.com
- **Password:** 12345678 (mock) or your real backend credentials

### Access Dashboard

- **URL:** http://localhost:5173
- **Login Page:** http://localhost:5173/admin/login
- **Dashboard:** http://localhost:5173/admin/dashboard

---

## 🔧 API Configuration

### Switch Between Real and Mock API

**Use Real API (Production):**

```javascript
// src/Api/axiosInstance.js
export const USE_MOCK_DATA = false;
const API_BASE_URL = "https://asset-api.shelaigor.com/api";
```

**Use Mock API (Development):**

```javascript
// src/Api/axiosInstance.js
export const USE_MOCK_DATA = true;
```

---

## 📁 Project Structure

```
src/
├── Api/
│   ├── axiosInstance.js        # API configuration
│   ├── endpoints.js            # API endpoints
│   ├── mockAPIService.js       # Mock data service
│
├── Redux/
│   ├── Slice/
│   │   ├── authSlice.js        # Authentication state
│   │   ├── crudSlices.js       # CRUD operations
│   │   ├── settingsSlice.js    # Settings state
│   │
│   ├── Store/
│   │   └── store.js            # Redux store configuration
│
├── Components/
│   ├── ProtectedRoute.jsx       # Auth guard for routes
│   ├── AuthInitializer.jsx      # Auth state initialization
│   ├── Admin/
│   │   └── AdminLayout.jsx      # Admin layout wrapper
│
├── Pages/
│   ├── Admin/
│   │   ├── Login.jsx            # Login page
│   │   ├── Dashboard.jsx        # Dashboard page
│   │   ├── Products.jsx
│   │   ├── Categories.jsx
│   │   └── ... (16 admin pages total)
│
├── Layout/                       # Reusable UI components
├── Data/
│   └── mockData.js              # Mock data for testing
│
└── main.jsx                      # App entry point
```

---

## 🔐 Authentication Flow

1. **User enters credentials** → Login page
2. **API validates credentials** → Real or mock API
3. **Token returned** → Stored in Redux + localStorage
4. **Automatic redirect** → To /admin/dashboard
5. **ProtectedRoute checks token** → Allows access to admin pages
6. **Token sent with requests** → All subsequent API calls

### Files Involved

- `src/Pages/Admin/Login.jsx` - Login component
- `src/Redux/Slice/authSlice.js` - Auth state management
- `src/Components/ProtectedRoute.jsx` - Route protection
- `src/Components/AuthInitializer.jsx` - Auth initialization

---

## 🛠️ Admin Pages (16 Total)

| Page            | Route                    | Feature            |
| --------------- | ------------------------ | ------------------ |
| Dashboard       | `/admin/dashboard`       | Stats & overview   |
| Products        | `/admin/products`        | CRUD + file upload |
| Categories      | `/admin/categories`      | CRUD               |
| Pages           | `/admin/pages`           | CRUD               |
| Banners         | `/admin/banners`         | CRUD + file upload |
| Careers         | `/admin/careers`         | CRUD               |
| Components      | `/admin/components`      | CRUD               |
| Menu            | `/admin/menu`            | CRUD               |
| Content         | `/admin/content`         | CRUD               |
| Profile         | `/admin/profile`         | User profile       |
| Settings        | `/admin/settings`        | System settings    |
| Change Password | `/admin/change-password` | Security           |

---

## 📡 API Endpoints

All endpoints require authentication token:

```
Authorization: Bearer {token}
```

### Main Endpoints

```
POST   /login                              # User login
GET    /logout                             # User logout
GET    /user                               # Get current user

GET/POST/PUT/DELETE   /admin/product/*     # Products
GET/POST/PUT/DELETE   /admin/category/*    # Categories
GET/POST/PUT/DELETE   /admin/page/*        # Pages
GET/POST/PUT/DELETE   /admin/banner/*      # Banners
GET/POST/PUT/DELETE   /admin/career/*      # Careers
GET/POST/PUT/DELETE   /admin/component/*   # Components
GET/POST/PUT/DELETE   /admin/menu/*        # Menus
GET/POST/PUT/DELETE   /admin/content/*     # Content
... and more (23 total modules)
```

---

## ✨ Key Features

✅ **JWT Authentication** - Secure token-based login  
✅ **Session Persistence** - Auth state survives page refresh  
✅ **Protected Routes** - Admin pages require authentication  
✅ **File Uploads** - Multipart form data support  
✅ **CRUD Operations** - Create, Read, Update, Delete  
✅ **Real-time Data** - Redux state management  
✅ **Responsive Design** - Tailwind CSS + Material Design  
✅ **Error Handling** - Comprehensive error messages  
✅ **Mock Data** - Test without backend

---

## 🚀 Build & Deploy

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## 📦 Tech Stack

- **React** 19.1.1
- **Vite** 7.2.2
- **Redux Toolkit** - State management
- **React Router** v6 - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

---

## 🔗 Links

- **Frontend:** http://localhost:5173
- **API:** https://asset-api.shelaigor.com/api
- **Login:** http://localhost:5173/admin/login

---

## 📝 Important Notes

- Mock data enabled by default
- Switch `USE_MOCK_DATA` in `src/Api/axiosInstance.js` for real API
- JWT tokens automatically included in all requests
- Check browser console for detailed logs

---

**Status:** ✅ Production-Ready  
**Last Updated:** January 22, 2026
