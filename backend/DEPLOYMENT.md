# Hướng Dẫn Deploy Backend lên Cloudflare Tunnel

Hướng dẫn chi tiết để deploy backend Python lên server và expose qua Cloudflare Tunnel với custom domain.

## 📋 Yêu Cầu

- Python 3.11+
- Docker & Docker Compose (tùy chọn)
- Cloudflare account
- Domain đã trỏ về Cloudflare nameservers

## 🚀 Bước 1: Cài Đặt Cloudflared

### Windows
```powershell
winget install --id Cloudflare.cloudflared
```

### macOS
```bash
brew install cloudflared
```

### Linux
```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

## 🔐 Bước 2: Đăng Nhập Cloudflare

```bash
cloudflared tunnel login
```

Browser sẽ mở ra để bạn authorize. Chọn domain bạn muốn sử dụng.

## 🌐 Bước 3: Tạo Tunnel

```bash
cloudflared tunnel create personal-website-backend
```

Lệnh này sẽ tạo tunnel và credentials file tại:
- Windows: `C:\Users\<username>\.cloudflared\<TUNNEL_ID>.json`
- macOS/Linux: `~/.cloudflared/<TUNNEL_ID>.json`

**Lưu lại TUNNEL_ID** để sử dụng ở bước sau.

## ⚙️ Bước 4: Config Tunnel

Tạo file `cloudflared-config.yml` trong thư mục backend:

```yaml
tunnel: YOUR_TUNNEL_ID_HERE
credentials-file: C:\Users\<username>\.cloudflared\YOUR_TUNNEL_ID_HERE.json

ingress:
  # API endpoint
  - hostname: api.your-domain.com
    service: http://localhost:8000
  # Catch-all rule (required)
  - service: http_status:404
```

**Thay thế:**
- `YOUR_TUNNEL_ID_HERE` = Tunnel ID từ bước 3
- `api.your-domain.com` = Subdomain bạn muốn dùng
- Đường dẫn credentials-file cho đúng

## 📡 Bước 5: Tạo DNS Record

```bash
cloudflared tunnel route dns personal-website-backend api.your-domain.com
```

Hoặc tạo DNS record thủ công trong Cloudflare Dashboard:
- Type: `CNAME`
- Name: `api` (hoặc subdomain bạn chọn)
- Content: `YOUR_TUNNEL_ID.cfargotunnel.com`
- Proxy status: Proxied (orange cloud)

## 🐳 Bước 6A: Deploy với Docker Compose (Khuyến Nghị)

### 1. Tạo file `.env.docker`:
```env
CLOUDFLARE_TUNNEL_TOKEN=your-tunnel-token-here
```

**Lấy Tunnel Token:**
```bash
cloudflared tunnel token personal-website-backend
```

### 2. Update `docker-compose.yml` với tunnel config:
```yaml
version: '3.8'

services:
  backend:
    build: .
    container_name: personal-website-backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
    environment:
      - DEBUG=False
      - ENVIRONMENT=production
      - DATABASE_URL=sqlite+aiosqlite:///./data/app.db
      - FRONTEND_URL=https://your-domain.pages.dev
      - ALLOWED_ORIGINS=https://your-domain.pages.dev,https://your-domain.com
    restart: unless-stopped
    networks:
      - backend-network

  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflare-tunnel
    command: tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    restart: unless-stopped
    networks:
      - backend-network
    depends_on:
      - backend

networks:
  backend-network:
    driver: bridge
```

### 3. Chạy Docker Compose:
```bash
cd backend
docker-compose --env-file .env.docker up -d
```

### 4. Kiểm tra logs:
```bash
docker-compose logs -f
```

## 🔧 Bước 6B: Deploy Trực Tiếp (Không dùng Docker)

### 1. Cài đặt dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Tạo file `.env`:
```env
DEBUG=False
ENVIRONMENT=production
HOST=0.0.0.0
PORT=8000
DATABASE_URL=sqlite+aiosqlite:///./data/app.db
FRONTEND_URL=https://your-domain.pages.dev
ALLOWED_ORIGINS=https://your-domain.pages.dev,https://your-domain.com
```

### 3. Chạy backend trong một terminal:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. Chạy cloudflared trong terminal khác:
```bash
cloudflared tunnel --config cloudflared-config.yml run personal-website-backend
```

## 🔄 Bước 7: Chạy Tunnel như Windows Service (Production)

```powershell
cloudflared service install
cloudflared --config cloudflared-config.yml service install
```

Sau đó start service:
```powershell
net start cloudflared
```

## ✅ Bước 8: Verify Deployment

Test API qua public domain:
```bash
# Health check
curl https://api.your-domain.com/api/health

# Submit contact
curl -X POST https://api.your-domain.com/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing production API"
  }'
```

## 🔐 Bước 9: Update Frontend Config

Update file `.env.local` trong frontend project:

```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

Rebuild frontend:
```bash
npm run build
```

Deploy frontend lên Cloudflare Pages và test lại contact form.

## 🛠️ Troubleshooting

### Tunnel không kết nối
```bash
# Check tunnel status
cloudflared tunnel info personal-website-backend

# Check tunnel list
cloudflared tunnel list
```

### Backend không start
```bash
# Check logs
docker-compose logs backend

# Test locally first
uvicorn app.main:app --reload
```

### CORS errors
Đảm bảo `ALLOWED_ORIGINS` trong backend `.env` bao gồm frontend domain.

### Database issues
```bash
# Check database file permissions
ls -la data/

# Recreate database
rm -f data/app.db
# Restart backend để auto-create
```

## 📊 Monitoring

View real-time tunnel traffic trong Cloudflare Dashboard:
1. Zero Trust → Access → Tunnels
2. Click vào tunnel name
3. Xem metrics và logs

## 🔒 Security Best Practices

1. **Disable Debug Mode** trong production
2. **Change API_SECRET_KEY** trong `.env`
3. **Enable Rate Limiting** (có thể dùng Cloudflare Rate Limiting)
4. **Setup Authentication** cho admin endpoints
5. **Regular Backups** của database
6. **Monitor Logs** thường xuyên

## 📝 Maintenance

### Update Backend Code
```bash
# Pull latest code
git pull

# Restart services
docker-compose restart backend
```

### View Logs
```bash
# Backend logs
docker-compose logs -f backend

# Tunnel logs
docker-compose logs -f cloudflared
```

### Backup Database
```bash
# Stop backend temporarily
docker-compose stop backend

# Copy database
cp data/app.db data/app.db.backup.$(date +%Y%m%d)

# Restart
docker-compose start backend
```

## 🎉 Done!

Your backend is now deployed and accessible at:
- API: `https://api.your-domain.com`
- Docs: `https://api.your-domain.com/api/docs` (nếu DEBUG=True)
- Health: `https://api.your-domain.com/api/health`

Frontend có thể call API qua domain này với SSL/HTTPS tự động từ Cloudflare!

---

## 🚀 Option 2: Deploy to Vercel (Recommended)

Deploying to Vercel is easier and doesn't require managing a server or tunnel.

### Prerequisites
1.  **GitHub Account**: Your code must be on GitHub.
2.  **Vercel Account**: Linked to your GitHub.
3.  **Supabase Account**: For the PostgreSQL database.

### Step 1: Setup Supabase Database
1.  Create a new project on [Supabase](https://supabase.com/).
2.  Go to **Project Settings** -> **Database**.
3.  Under **Connection String**, select **URI**.
4.  Copy the connection string. It looks like:
    `postgresql://postgres.your-ref:password@aws-0-region.pooler.supabase.com:6543/postgres`
    *Note: Use port 6543 for Transaction Mode (recommended for serverless) or 5432 for Session Mode.*

### Step 2: Configure Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** -> **Project**.
2.  Import your GitHub repository.
3.  In **Configure Project**:
    - **Framework Preset**: Other (or leave default).
    - **Root Directory**: `backend` (Important! Select the backend folder).
    - **Environment Variables**: Add the following:
        - `DATABASE_URL`: Your Supabase connection string (replace `[YOUR-PASSWORD]` with actual password).
        - `API_SECRET_KEY`: A random secret string.
        - `DEBUG`: `False`
        - `ALLOWED_ORIGINS`: `https://your-frontend.vercel.app,http://localhost:3000`
4.  Click **Deploy**.

### Step 3: Verify
Vercel will build and deploy your API.
- Visit `https://your-project.vercel.app/docs` to see the API documentation.
- Update your Frontend environment variable `NEXT_PUBLIC_API_URL` to point to this new URL.
