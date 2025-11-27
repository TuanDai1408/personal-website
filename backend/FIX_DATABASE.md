# FIX HOÀN CHỈNH: Kết nối Database trong Vercel

## VẤN ĐỀ HIỆN TẠI
Lỗi: `[Errno 16] Device or resource busy` khi kết nối database trên Vercel.

## NGUYÊN NHÂN
Bạn đang dùng **SAI loại connection string** từ Supabase. Serverless environments (Vercel/Lambda) **BẮT BUỘC** phải dùng **Connection Pooler**, không phải Direct Connection.

---

## GIẢI PHÁP 1: Sử dụng Supabase Pooler (KHUYẾN NGHỊ)

### Bước 1: Lấy Connection String ĐÚNG từ Supabase

1. Đăng nhập [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Đi đến **Settings** → **Database**
4. Tìm phần **Connection String**
5. Chọn tab **Transaction** (hoặc **Session**)
6. Copy connection string có **port 6543** (Transaction mode - BẮT BUỘC!)

Connection string phải có dạng:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-xx-xxxx.pooler.supabase.com:6543/postgres
```

**QUAN TRỌNG:**
- ✅ Port **6543** = Transaction mode (cho serverless)
- ❌ Port **5432** = Direct connection (KHÔNG dùng cho serverless!)

### Bước 2: Update Environment Variable trong Vercel

1. Đi đến [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project **personal-website**
3. Đi đến **Settings** → **Environment Variables**
4. Tìm biến `DATABASE_URL`
5. **Thay thế** giá trị cũ bằng connection string từ Bước 1
6. Nhớ thay `[YOUR-PASSWORD]` bằng password thực của bạn
7. Click **Save**
8. Redeploy project (Vercel sẽ tự động redeploy, hoặc vào **Deployments** → **Redeploy**)

---

## GIẢI PHÁP 2: Sử dụng pg8000 (Backup)

Nếu Giải pháp 1 không work, thử driver khác:

### Cập nhật requirements.txt
```txt
# Database
sqlalchemy==2.0.36
aiosqlite==0.20.0
pg8000==1.31.2
```

### Cập nhật app/config.py
```python
@field_validator("database_url", mode="before")
@classmethod
def parse_database_url(cls, v: str) -> str:
    if v and v.startswith("postgresql://"):
        return v.replace("postgresql://", "postgresql+pg8000://", 1)
    return v
```

---

## KIỂM TRA SAU KHI FIX

1. **Đợi deployment hoàn tất** (khoảng 1-2 phút)
2. **Test health endpoint:**
   ```
   https://personal-website-9usm.vercel.app/api/health
   ```
   
3. **Kết quả mong đợi:**
   ```json
   {
     "status": "healthy",
     "version": "1.0.0",
     "database": "connected"
   }
   ```

---

## CHECKLIST

- [ ] Đã lấy connection string từ Supabase (Tab **Transaction**, port **6543**)
- [ ] Đã thay password vào connection string
- [ ] Đã cập nhật `DATABASE_URL` trong Vercel Environment Variables
- [ ] Đã redeploy project
- [ ] Đã test `/api/health` và thấy `"database": "connected"`

---

## NẾU VẪN LỖI

Gửi cho tôi:
1. Connection string của bạn (CHE password)
2. Screenshot của Environment Variables trong Vercel
3. Screenshot lỗi mới nhất từ `/api/health`
