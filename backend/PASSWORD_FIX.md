# FIX: Password có ký tự đặc biệt

## VẤN ĐỀ
Password của bạn: `supabaseDai@123`  
Chứa ký tự `@` - đây là **ký tự đặc biệt** trong URL và cần được encode!

## GIẢI PHÁP

### Option 1: URL Encode Password (KHUYẾN NGHỊ)

Thay thế các ký tự đặc biệt trong password:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `/` → `%2F`
- `:` → `%3A`

**Password CŨ:** `supabaseDai@123`  
**Password MỚI:** `supabaseDai%40123`

**Connection String ĐÚNG:**
```
postgresql://postgres.ohyuqlusgtksyszvfizr:supabaseDai%40123@aws-1-ap-south-1.pooler.supabase.com:6543/postgres
```

### Option 2: Đổi Password Supabase (NẾU MUỐN)

Nếu không muốn encode, đổi password không chứa ký tự đặc biệt:
1. Vào Supabase Dashboard → Settings → Database
2. Click **Reset Database Password**
3. Dùng password đơn giản hơn (chỉ chữ, số, không có `@#%/:`)

## CẬP NHẬT TRONG VERCEL

1. Vào Vercel → Project Settings → Environment Variables
2. Tìm `DATABASE_URL`
3. **Edit** và paste connection string với password đã encode:
   ```
   postgresql://postgres.ohyuqlusgtksyszvfizr:supabaseDai%40123@aws-1-ap-south-1.pooler.supabase.com:6543/postgres
   ```
4. **Save**
5. **Redeploy** project

## TOOL ENCODE PASSWORD

Bạn có thể dùng tool online để encode:
https://www.urlencoder.org/

Nhập: `supabaseDai@123`  
Kết quả: `supabaseDai%40123`
