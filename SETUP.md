# Setup Guide - African Curios Marketplace

## Prerequisites

- Node.js 18+ installed
- Git
- A text editor (VS Code recommended)

## Step-by-Step Setup

### 1. Local Development Setup

```bash
# Clone the repository
git clone https://github.com/ChobeHoldings/african-curios-marketplace.git
cd african-curios-marketplace

# Install dependencies
npm install
```

### 2. Set Up Supabase (Database)

1. Go to [supabase.com](https://supabase.com) and sign up (free tier)
2. Create a new project:
   - Choose a name
   - Set a strong password
   - Select a region closest to you
3. Wait for the project to initialize (2-3 minutes)
4. Go to **Settings → API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Go to **Settings → Database → Connection Pooling**
7. Copy the **Service Role Secret Key** → `SUPABASE_SERVICE_ROLE_KEY`
8. Go to the **SQL Editor**
9. Click **New Query**
10. Copy all content from `sql/init.sql`
11. Paste into the SQL editor and click **Run**

### 3. Set Up Cloudinary (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. Go to **Dashboard**
3. Copy:
   - **Cloud Name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
4. Click on **Account → API Keys**
5. Copy the **API Secret** → `CLOUDINARY_API_SECRET`

### 4. Set Up OpenAI (AI Refinement)

1. Go to [openai.com/api](https://openai.com/api/) and sign up
2. Go to **API keys**
3. Click **Create new secret key**
4. Copy the key → `OPENAI_API_KEY`
5. Add credits to your account (minimum $5)

### 5. Set Up NextAuth (Authentication)

1. Generate a secret:
   ```bash
   openssl rand -base64 32
   ```
2. Copy the output → `NEXTAUTH_SECRET`

### 6. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your credentials
```

Your `.env.local` should look like:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyXxx...
SUPABASE_SERVICE_ROLE_KEY=eyXxx...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=xxxxx
OPENAI_API_KEY=sk-xxx
```

### 7. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing Locally

1. **Home Page**: http://localhost:3000
2. **Sign In**: Click "Get Started" or "Sign In"
3. **Seller Dashboard**: http://localhost:3000/seller/dashboard
4. **Admin Dashboard**: http://localhost:3000/admin/dashboard
5. **Add Product**: http://localhost:3000/seller/products/new

## Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
```

### Option B: Using GitHub (Easier)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your GitHub repository
5. Click **Import**
6. Vercel will auto-detect Next.js
7. Add environment variables:
   - Go to **Settings → Environment Variables**
   - Add all variables from `.env.local`
8. Click **Deploy**

## Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules
npm install
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Supabase connection error
- Check that environment variables are correctly set
- Verify the URL includes "https://"
- Test the connection in the Supabase dashboard

### Image upload failing
- Verify Cloudinary credentials
- Check that you have remaining quota

## Next Steps

1. Create test admin and seller accounts
2. Upload test products
3. Test the approval workflow
4. Configure email notifications (optional)
5. Set up payment processing (optional)

## Support

For help:
- Check the README.md
- Review the code comments
- Open a GitHub issue
