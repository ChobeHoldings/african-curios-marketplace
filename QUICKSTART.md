# Quick Start Guide - African Curios Marketplace

## 🚀 Deploy in 10 Minutes

Your marketplace is fully configured! Here's how to go live:

### Step 1: Set Up Database (5 minutes)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `nlkhekjczsiubwxjcusv`
3. Click **SQL Editor** → **New Query**
4. Copy the SQL schema from `sql/init.sql` in your repo
5. Paste into Supabase SQL Editor and click **Run**

### Step 2: Test Locally (3 minutes)

```bash
# Clone and install
git clone https://github.com/ChobeHoldings/african-curios-marketplace.git
cd african-curios-marketplace
npm install

# Start dev server
npm run dev
```

Visit: **http://localhost:3000**

### Step 3: Deploy to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. **Environment Variables** → Add all from `.env.local`
5. Click **Deploy**

Your site will be live at: `https://your-project.vercel.app` ✅

---

## 📖 Features Ready to Use

### 🏠 **Home Page** (`/`)
- Landing page with features
- Sign in/Sign up buttons
- Call-to-action

### 👤 **Seller Dashboard** (`/seller/dashboard`)
- View all your products
- See pending and published items
- Add new products

### ➕ **Add Product** (`/seller/products/new`)
- Upload product image to Cloudinary
- Add title, description, category
- Set price and currency
- Submit for admin review

### 👨‍💼 **Admin Dashboard** (`/admin/dashboard`)
- View all pending products
- Statistics (pending, approved, rejected)
- Manage approvals

### ✅ **Product Review** (`/admin/products/[id]/review`)
- View product details
- **Use AI to refine description** (✨ Refine with AI button)
- Add admin notes
- Approve or Reject

---

## 🎯 Testing Locally

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Create seller account
4. Upload test product (with image from Cloudinary)
5. Login as admin
6. Go to Admin Dashboard
7. Click product to review
8. Click "✨ Refine with AI" to improve description
9. Approve product

---

## 🛠️ Complete Tech Stack

| Component | Service | Cost |
|-----------|---------|------|
| **Database** | Supabase PostgreSQL | FREE (500MB) |
| **Images** | Cloudinary | FREE (25GB/month) |
| **AI Refinement** | OpenAI GPT-3.5 | ~$0.01 per refinement |
| **Hosting** | Vercel | FREE |
| **Frontend** | Next.js 14 | FREE |
| **Authentication** | NextAuth.js | FREE |
| **Styling** | Tailwind CSS | FREE |

**Total Monthly Cost**: ~$5-10 (minimal OpenAI usage)

---

## 📝 Environment Variables Configured

All variables are ready in `.env.local`:
- ✅ Supabase credentials
- ✅ Cloudinary credentials & URL
- ✅ **OpenAI API key (ACTIVE)**
- ✅ NextAuth secret

---

## 🚀 Next Steps

1. **Run locally first** to test everything works
2. **Set up Supabase database** by running SQL schema
3. **Deploy to Vercel** (connect your GitHub repo)
4. **Share your live link!**

---

## 📞 Troubleshooting

**"Module not found" error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 in use:**
```bash
npm run dev -- -p 3001
```

**Supabase connection issues:**
- Verify `.env.local` variables
- Check Supabase URL includes "https://"
- Test in Supabase dashboard

**Image upload failing:**
- Verify Cloudinary credentials
- Check you have remaining quota

**AI Refinement not working:**
- Verify OpenAI API key is set in `.env.local`
- Check you have credits on OpenAI account
- Restart dev server after updating `.env.local`

---

## ✨ You're Ready to Launch! 🎉

**Repository**: https://github.com/ChobeHoldings/african-curios-marketplace

All code is production-ready. Everything is configured and waiting to go live!
