# EmailJS Setup Guide

## Overview
This guide will help you configure EmailJS to enable email sending directly from the contact form.

## Prerequisites
- A Gmail account
- Access to https://www.emailjs.com/

---

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **"Sign Up"** (or **"Get Started"**)
3. Sign up with:
   - Email + Password, OR
   - Google Account (recommended for Gmail users)
4. Verify your email if required

---

## Step 2: Add Email Service

1. After logging in, click **"Email Services"** in the sidebar
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. Click **"Connect Account"**
5. Authorize EmailJS to access your Gmail
6. **Save your Service ID** - it looks like: `service_abc123`

---

## Step 3: Create Email Template

1. Click **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Set up the template:

### Template Name
```
Contact Form Submission
```

### Subject Line
```
Liên hệ mới từ {{from_name}}
```

### Email Content (Body)
```
Bạn có tin nhắn mới từ website:

Tên: {{from_name}}
Email: {{from_email}}
Số điện thoại: {{phone}}
Chủ đề: {{subject}}

Nội dung:
{{message}}

---
Gửi từ form liên hệ trên website daidataly.online
```

### To Email
```
trantuandai2508@gmail.com
```

4. Click **"Save"**
5. **Save your Template ID** - it looks like: `template_xyz789`

---

## Step 4: Get Public Key

1. Click your **profile icon** in top right
2. Go to **"Account"** → **"General"**
3. Find **"Public Key"** section
4. **Copy the Public Key** - it looks like: `AbC123XyZ`

---

## Step 5: Configure Your Website

Create or update the `.env.local` file in your project root:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AbC123XyZ
```

**Replace with your actual values from steps above!**

---

## Step 6: Restart Development Server

After updating `.env.local`, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Testing

1. Open your website at http://localhost:4000
2. Navigate to the **Contact** section
3. Fill out the form with test data:
   - Name: `Test User`
   - Email: `test@example.com`
   - Số điện thoại: `0123456789`
   - Subject: `Test Message`
   - Message: `This is a test message from EmailJS`
4. Click **"Gửi Tin Nhắn"**
5. You should see a success message
6. Check your inbox at `trantuandai2508@gmail.com`

---

## Free Tier Limits

EmailJS Free Tier includes:
- ✅ 200 emails/month
- ✅ No credit card required
- ✅ All features included

If you need more emails, you can upgrade to a paid plan.

---

## Troubleshooting

### Error: "EmailJS chưa được cấu hình"
**Solution:** Make sure all three environment variables are set in `.env.local` and restart the dev server.

### Error: "Failed to send email"
**Possible causes:**
1. Invalid Service ID, Template ID, or Public Key
2. Gmail service not properly connected
3. Template variables don't match (check template settings)

**Solution:** Double-check all IDs in EmailJS dashboard and `.env.local`

### Emails not arriving
**Check:**
1. Spam/Junk folder
2. "To Email" in template settings
3. EmailJS dashboard → "Logs" to see delivery status

---

## Template Variables Reference

These variables are sent from the contact form to EmailJS:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Sender's name | John Doe |
| `{{from_email}}` | Sender's email | john@example.com |
| `{{phone}}` | Sender's phone number | 0123456789 |
| `{{subject}}` | Message subject | Project Inquiry |
| `{{message}}` | Message content | I'd like to discuss... |
| `{{to_email}}` | Recipient email | trantuandai2508@gmail.com |

---

## Environment Variables

Add these to your `.env.local` file:

```env
# Get from: Email Services → Your Service → Service ID
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx

# Get from: Email Templates → Your Template → Template ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx

# Get from: Account → General → Public Key
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

---

## Security Notes

✅ **Safe to use in frontend**
- EmailJS Public Key is designed to be used in client-side code
- No sensitive credentials exposed
- Rate limiting prevents abuse

✅ **Best practices**
- Keep your EmailJS account password secure
- Monitor usage in EmailJS dashboard
- Set up email notifications for quota warnings

---

## Next Steps

Once configured:
1. ✅ Users can send messages directly from your website
2. ✅ Emails arrive at `trantuandai2508@gmail.com`
3. ✅ No backend server needed for email functionality
4. ✅ Works on static hosting (Cloudflare Pages, Vercel, Netlify)

**Happy emailing! 📧**
