# 🚀 Deployment Guide - SummitIQ Premium Demo

## Quick Deploy to Vercel (Recommended - Takes 2 minutes)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Sign in**: Use your GitHub account
3. **Import Project**: Click "Add New..." → "Project"
4. **Select Repository**: Choose `ContractPlan-Inc/summitiq`
5. **Select Branch**: Choose `claude/premium-demo-page-jaylim-011CUzPq4Rwx1oRjH9fC6cai`
6. **Deploy**: Click "Deploy" (Vercel auto-detects Next.js)

**Your public URL will be:** `https://summitiq-xxx.vercel.app/jaylim`

### Option 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## Alternative: Deploy to Netlify

1. **Visit Netlify**: Go to [netlify.com](https://netlify.com)
2. **Import**: Click "Add new site" → "Import an existing project"
3. **Select Repository**: Choose your GitHub repo
4. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Deploy**

---

## Environment Variables (if needed later)

No environment variables are currently required. The demo page works out of the box!

---

## Custom Domain Setup (Optional)

After deployment, you can add a custom domain like `jaylim.summitiq.com`:

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### On Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

---

## Local Development

```bash
npm install
npm run dev
```

Visit: http://localhost:3000/jaylim

---

## Production Build Test

```bash
npm run build
npm start
```

---

## What's Deployed?

✅ Premium demo page at `/jaylim`
✅ Fully responsive design
✅ Interactive features (forms, pricing selection)
✅ Modern Monday.com-inspired design
✅ Production-optimized (6.76kB page size)

---

## Support

If you encounter any issues:
- Check build logs in your deployment platform
- Ensure Node.js version is 14.x or higher
- Verify all dependencies are installed

**Ready for production!** 🎉
