# Các Bước Tiếp Theo - Backend Đã Deploy Thành Công

## ✅ HOÀN THÀNH
- [x] Backend API đã deploy thành công trên Vercel
- [x] Database đã kết nối với Supabase (PostgreSQL)
- [x] Tables đã được tạo trong Supabase

---

## 🚀 BƯỚC TIẾP THEO

### 1. Cập nhật Frontend để sử dụng Backend API

#### A. Update Environment Variable

Mở file `.env.local` trong **root directory** của project:

```env
# EmailJS (đang dùng)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Backend API (THÊM MỚI)
NEXT_PUBLIC_API_URL=https://personal-website-vercel-three.vercel.app
```

#### B. Tạo API Client

Tạo file `src/lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  // Contact Form
  async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const response = await fetch(`${API_URL}/api/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    
    return response.json();
  },

  // Newsletter
  async subscribeNewsletter(email: string) {
    const response = await fetch(`${API_URL}/api/newsletter/subscribe/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter');
    }
    
    return response.json();
  },

  // Health Check
  async checkHealth() {
    const response = await fetch(`${API_URL}/api/health`);
    return response.json();
  },
};
```

#### C. Update Contact Form Component

Tìm component Contact Form và update để sử dụng backend:

```typescript
import { api } from '@/lib/api';

// Trong handleSubmit function:
try {
  setLoading(true);
  
  // Gọi backend API thay vì EmailJS
  const result = await api.submitContact({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  });
  
  setStatus({ type: 'success', message: 'Message sent successfully!' });
  setFormData({ name: '', email: '', subject: '', message: '' });
} catch (error) {
  console.error('Error:', error);
  setStatus({ type: 'error', message: 'Failed to send message' });
} finally {
  setLoading(false);
}
```

#### D. Update Newsletter Component

```typescript
import { api } from '@/lib/api';

// Trong handleSubmit:
try {
  await api.subscribeNewsletter(email);
  setMessage('Successfully subscribed!');
  setEmail('');
} catch (error) {
  setMessage('Subscription failed. Please try again.');
}
```

---

### 2. Test Local

```bash
# Run frontend
npm run dev

# Test:
# 1. Điền contact form và submit
# 2. Subscribe newsletter
# 3. Check Supabase để xem data đã được lưu
```

---

### 3. Verify Data trong Supabase

1. Vào Supabase Dashboard
2. Chọn project
3. Vào **Table Editor**
4. Kiểm tra tables:
   - `contacts` - có dữ liệu từ contact form
   - `newsletters` - có email subscriptions

---

### 4. Deploy Frontend

```bash
# Build và test production build
npm run build
npm start

# Nếu OK, push lên GitHub (Vercel sẽ auto-deploy)
git add .
git commit -m "Connect frontend to backend API"
git push origin main
```

---

### 5. Test Production

Sau khi frontend deploy:
1. Mở website production
2. Test contact form
3. Test newsletter subscription
4. Kiểm tra Supabase để verify data

---

## 🔍 DEBUG

Nếu có lỗi CORS:
1. Kiểm tra `ALLOWED_ORIGINS` trong Vercel Environment Variables
2. Phải include frontend URL: `https://your-frontend.vercel.app`

Nếu có lỗi 500:
1. Check Vercel Function logs
2. Verify `DATABASE_URL` đúng format

---

## 📊 MONITORING

### Check Backend Health
```
https://personal-website-vercel-three.vercel.app/api/health
```

Response mong đợi:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected"
}
```

### Check API Docs (Local only)
```
http://localhost:8000/api/docs
```

---

## 🎯 HOÀN TẤT

Sau khi làm xong các bước trên:
- ✅ Backend API hoạt động trên Vercel
- ✅ Database lưu trữ trên Supabase
- ✅ Frontend kết nối với Backend
- ✅ Contact form và Newsletter hoạt động
- ✅ Data được lưu vào database

**Chúc mừng! Bạn đã hoàn thành việc deploy full-stack application lên Vercel! 🎉**
