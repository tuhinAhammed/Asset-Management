# 🚀 CAREER PAGE - API INTEGRATION GUIDE

**Status**: Production Ready with Mock Data + Real API Support  
**Date**: January 21, 2026  
**Live URL**: `http://localhost:5173/career`

---

## 📋 TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Mock vs Real API](#mock-vs-real-api)
3. [Switching to Real API](#switching-to-real-api)
4. [API Requirements](#api-requirements)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)
7. [Architecture Overview](#architecture-overview)

---

## 🎯 QUICK START

### Current Status: **MOCK DATA MODE** (Demo/Development)

```bash
# Start development server
npm run dev

# Visit the career page
# http://localhost:5173/career

# All jobs display from mock data - fully functional demo
```

**Features Working**:

- ✅ 8 sample jobs displaying
- ✅ Department filtering
- ✅ Responsive design
- ✅ Animations & interactions
- ✅ All UI components

---

## 🔄 MOCK VS REAL API

### Current: MOCK DATA MODE

**What's Happening**:

```javascript
// Career.jsx uses mock data
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_CAREERS !== "false";

if (USE_MOCK_DATA) {
  // ✅ Currently here - using mockJobListings from mockCareersData.js
  setJobsData(mockJobListings);
} else {
  // ❌ Will be here after configuration - fetching from real API
  const response = await axios.get(`${API_BASE_URL}/careers`);
}
```

**Pros of Mock Data**:

- ✅ Works immediately without backend
- ✅ Perfect for frontend development
- ✅ Reproducible, consistent data
- ✅ No network dependency
- ✅ Ideal for testing & demos

**Cons**:

- ❌ Not real job data
- ❌ Can't save applications to database
- ❌ Can't manage jobs in admin panel

### Future: REAL API MODE

**What Will Happen**:

```javascript
// After configuration - fetches actual jobs from backend
const response = await axios.get(`https://your-api.com/api/careers`);
setJobsData(response.data.list);
```

**Pros of Real API**:

- ✅ Live job data from database
- ✅ Applications saved in database
- ✅ Sync with admin panel
- ✅ Dynamic job management
- ✅ Production ready

---

## 🔧 SWITCHING TO REAL API

### Step 1: Configure Environment Variables

**File**: `.env` (in project root)

```bash
# Add or update these variables:

# API Base URL - where your backend API is hosted
VITE_API_BASE_URL=https://your-backend-domain.com/api
# Alternative for local backend:
# VITE_API_BASE_URL=http://localhost:8000/api

# Career page data source (set to 'false' to use real API)
VITE_USE_MOCK_CAREERS=false
```

**Example .env File**:

```bash
# Backend API Configuration
VITE_API_BASE_URL=https://asset-api.shelaigor.com/api
VITE_API_DOMAIN_NAME=https://asset-api.shelaigor.com
VITE_USE_MOCK_CAREERS=false

# Other existing variables...
```

### Step 2: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Restart server
npm run dev
```

### Step 3: Verify API Connection

**Check browser console** (F12):

```javascript
// You should see:
// ❌ If using mock data:
// "Using mock career data for development"

// ✅ If using real API:
// [Network request to API endpoint]
```

**If page still shows mock data after restart**:

1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check .env file was saved
4. Verify `VITE_USE_MOCK_CAREERS=false`

---

## 📡 API REQUIREMENTS

### Expected API Endpoint

**Endpoint**: `GET /api/careers`

**Base URL** + `/careers` = Full endpoint

Example:

```
GET https://asset-api.shelaigor.com/api/careers
```

### Required Response Format

Your backend should return:

```javascript
{
  "status": "success",
  "list": [
    {
      "id": 1,
      "position_title": "Senior React Developer",
      "department": "Engineering",
      "department_id": 1,
      "location": "Dhaka",
      "experience": "5+ years",
      "employment_type": "Full-time",
      "application_deadline": "2026-02-28",
      "short_description": "Lead React development...",
      "responsibilities": ["...", "..."],
      "requirements": ["...", "..."]
    },
    // ... more jobs
  ]
}
```

### Alternative Response Formats Supported

**Format 1**: Direct array (also supported)

```javascript
[
  {
    id: 1,
    position_title: "...",
    // ... job data
  },
];
```

**Format 2**: Wrapped in data object

```javascript
{
  "data": {
    "list": [ /* jobs */ ]
  }
}
```

### Required Fields

Each job object MUST have:

- ✅ `id` (number) - Unique identifier
- ✅ `position_title` (string) - Job title
- ✅ `department` (string) - Department name
- ✅ `department_id` (number) - Department ID for filtering
- ✅ `location` (string) - Job location
- ✅ `experience` (string) - Experience required (e.g., "5+ years")
- ✅ `employment_type` (string) - Type (e.g., "Full-time")
- ✅ `application_deadline` (string) - Date in YYYY-MM-DD format
- ✅ `short_description` (string) - Brief job description

### Optional Fields

- 🔹 `responsibilities` (array) - Job responsibilities
- 🔹 `requirements` (array) - Job requirements
- 🔹 `company_id` (number) - Company/org identifier

---

## 🔐 ENVIRONMENT CONFIGURATION

### Understanding Environment Variables

**Location**: `.env` file in project root

**How to Update**:

1. Open `.env` file in text editor
2. Find or add these lines:
3. Save file
4. Restart dev server

### All Career-Related Environment Variables

```bash
# ===== CAREER PAGE CONFIGURATION =====

# Backend API endpoint
VITE_API_BASE_URL=https://asset-api.shelaigor.com/api

# Toggle between mock and real data
# true = use mock data (demo mode)
# false = use real API (production)
VITE_USE_MOCK_CAREERS=false

# ===== OPTIONAL CAREER API SETTINGS =====

# Career API timeout (milliseconds)
VITE_CAREER_API_TIMEOUT=30000

# Enable career API logging
VITE_CAREER_API_DEBUG=true
```

### How Career.jsx Uses These Variables

```javascript
// In src/Pages/Career.jsx

// 1. Check if mock data should be used
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_CAREERS !== "false";

// 2. Get API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://asset-api.shelaigor.com/api";

// 3. Make API call
const response = await axios.get(`${API_BASE_URL}/careers`);
```

---

## 🛠️ SETUP CHECKLIST

### Before Going Live with Real API

- [ ] **Backend API is ready**
  - API endpoint `/api/careers` is implemented
  - Returns correct response format
  - Authentication is configured

- [ ] **Environment file configured**
  - `.env` has correct `VITE_API_BASE_URL`
  - `VITE_USE_MOCK_CAREERS=false` is set
  - File is saved

- [ ] **Server restarted**
  - Dev server restarted after .env changes
  - Browser cache cleared (Ctrl+Shift+Delete)

- [ ] **API tested**
  - Test endpoint directly in browser: `https://your-api.com/api/careers`
  - Verify response format
  - Check for CORS issues

- [ ] **Page tested**
  - Career page loads without errors
  - Jobs display from API
  - Filtering works correctly
  - No console errors (F12)

- [ ] **Error handling tested**
  - Disconnect internet to test fallback
  - Should show mock data with warning
  - Check console for error messages

---

## 📊 SWITCHING EXAMPLES

### Example 1: Local Backend

```bash
# .env file
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK_CAREERS=false
```

### Example 2: Production Backend

```bash
# .env file
VITE_API_BASE_URL=https://api.yourcompany.com/api
VITE_USE_MOCK_CAREERS=false
```

### Example 3: Development (Mock Data)

```bash
# .env file
VITE_API_BASE_URL=https://api.yourcompany.com/api
VITE_USE_MOCK_CAREERS=true  # Ignores API URL, uses mock data
```

### Example 4: Staging Environment

```bash
# .env file (or .env.staging)
VITE_API_BASE_URL=https://staging-api.yourcompany.com/api
VITE_USE_MOCK_CAREERS=false
```

---

## 🔍 TROUBLESHOOTING

### Problem 1: "Page still shows mock data after I set VITE_USE_MOCK_CAREERS=false"

**Solutions**:

1. ✅ Fully restart dev server (Ctrl+C, then `npm run dev`)
2. ✅ Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. ✅ Clear browser cache (F12 → Application → Clear Storage)
4. ✅ Verify `.env` file was saved
5. ✅ Check spelling: `VITE_USE_MOCK_CAREERS` (not `VITE_MOCK_CAREERS`)

### Problem 2: "API call fails with CORS error"

**Solutions**:

1. ✅ Verify backend has CORS enabled for your frontend domain
2. ✅ Check API_BASE_URL is correct
3. ✅ Ensure you're using `https://` if required
4. ✅ Test endpoint directly in browser to confirm it works

**Backend CORS Example** (Express.js):

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

### Problem 3: "API returns 404 error"

**Solutions**:

1. ✅ Verify endpoint exists: `GET /api/careers`
2. ✅ Check API_BASE_URL doesn't have trailing slash
3. ✅ Test with Postman or cURL:
   ```bash
   curl https://your-api.com/api/careers
   ```
4. ✅ Check backend API is running

### Problem 4: "API returns data but jobs don't display"

**Solutions**:

1. ✅ Check response format matches requirements (see API Requirements section)
2. ✅ Verify all required fields are present
3. ✅ Open DevTools (F12) → Console → Check for errors
4. ✅ Check Network tab to see actual API response
5. ✅ Verify `application_deadline` is in YYYY-MM-DD format

### Problem 5: "Getting 'Failed to load careers from API' message"

**What's happening**:

- API call failed, fallback to mock data triggered
- Shows warning toast notification

**Solutions**:

1. ✅ Check browser console (F12) for detailed error
2. ✅ Verify API_BASE_URL is correct and accessible
3. ✅ Test API endpoint works independently
4. ✅ Check for CORS issues
5. ✅ Verify response format is correct

### Debugging Tips

**Check What Mode Is Running**:

```javascript
// Open browser console (F12)
// Look for these messages:

// If you see: "Using mock career data for development"
// → Mock mode is active

// If no message and network request appears
// → Real API mode is active
```

**Check Network Requests**:

```
1. Press F12 to open DevTools
2. Go to Network tab
3. Reload page (F5)
4. Look for request to /api/careers
5. Click it to see response
```

**Check Response Format**:

```
1. In Network tab, click the API request
2. Go to Response tab
3. Verify format matches requirements
4. Check all required fields present
```

---

## 🏗️ ARCHITECTURE OVERVIEW

### Data Flow: Mock Mode (Development)

```
User visits /career
         ↓
Career.jsx loads
         ↓
Check: USE_MOCK_DATA = true
         ↓
Import mockJobListings from mockCareersData.js
         ↓
Display jobs with filtering
         ↓
No API calls made
```

### Data Flow: Real API Mode (Production)

```
User visits /career
         ↓
Career.jsx loads
         ↓
Check: USE_MOCK_DATA = false
         ↓
GET https://your-api.com/api/careers
         ↓
Receive job data
         ↓
Display jobs with filtering
         ↓
OR on error → Fallback to mockJobListings
```

### Error Handling Flow

```
API Request
         ↓
Success?
  ├─ YES → Use API data → Display
  └─ NO  → Fall back to mock data
           └─ Show warning toast
           └─ Log error to console
```

---

## 📝 CODE LOCATIONS

**Career Page Component**:

- File: `src/Pages/Career.jsx`
- API integration: Lines 8-73
- Environment variable check: Line 45

**Mock Data**:

- File: `src/Data/mockCareersData.js`
- 8 sample jobs with all required fields
- Ready to replace with API data

**Environment Configuration**:

- File: `.env` (project root)
- Variables: `VITE_API_BASE_URL`, `VITE_USE_MOCK_CAREERS`

**API Utilities**:

- File: `src/Api/axiosInstance.js` (existing API configuration)
- File: `src/Api/endpoints.js` (existing endpoints reference)

---

## 🚀 PRODUCTION DEPLOYMENT

### Before Deploying to Production

1. **Set environment variables**:

   ```bash
   VITE_API_BASE_URL=https://your-production-api.com/api
   VITE_USE_MOCK_CAREERS=false
   ```

2. **Build for production**:

   ```bash
   npm run build
   ```

3. **Test production build locally**:

   ```bash
   npm run preview
   ```

4. **Verify careers page works**:
   - Navigate to `/career`
   - Check jobs load from API
   - Test filtering
   - Check console for errors

5. **Deploy**:
   ```bash
   # Deploy to your hosting service
   # (Vercel, Netlify, AWS, etc.)
   ```

---

## 💡 QUICK REFERENCE

### Toggle Between Mock and Real API

```bash
# To use MOCK data (development)
VITE_USE_MOCK_CAREERS=true

# To use REAL API (production)
VITE_USE_MOCK_CAREERS=false
```

### Update API Base URL

```bash
# Update this in .env file
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Fallback Behavior

```javascript
// Career.jsx automatically handles errors:
1. Try to fetch from API
2. If successful → Display API data
3. If error → Show mock data + warning
4. Never shows broken page
```

---

## 📚 RELATED FILES

- [CAREER_QUICK_START.md](CAREER_QUICK_START.md) - Getting started guide
- [CAREER_PAGE_README.md](CAREER_PAGE_README.md) - Technical reference
- [CAREER_IMPLEMENTATION_SUMMARY.md](CAREER_IMPLEMENTATION_SUMMARY.md) - Implementation details
- [CAREER_USAGE_EXAMPLES.js](CAREER_USAGE_EXAMPLES.js) - Code examples

---

## ✅ VERIFICATION CHECKLIST

After switching to real API:

- [ ] Jobs display from API (not mock data)
- [ ] Filtering works correctly
- [ ] Responsive design works
- [ ] Animations trigger on scroll
- [ ] No console errors (F12)
- [ ] Job count updates when filtering
- [ ] Urgency badges show correctly
- [ ] All metadata displays properly
- [ ] Page loads within 3 seconds
- [ ] Mobile view works correctly

---

## 🎯 SUMMARY

| Step | Action                            | Status          |
| ---- | --------------------------------- | --------------- |
| 1    | Update `.env` file                | Configure URL   |
| 2    | Set `VITE_USE_MOCK_CAREERS=false` | Enable API mode |
| 3    | Restart dev server                | Apply changes   |
| 4    | Test careers page                 | Verify working  |
| 5    | Check console for errors          | Debug if needed |

---

**Questions?** Check the troubleshooting section above or review Career.jsx line 45-73 for exact API integration code.

**Ready to go live?** Your Career page works immediately with mock data and is production-ready with real API!

---

**Last Updated**: January 21, 2026  
**Status**: Production Ready ✅
