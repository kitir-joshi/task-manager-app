# 🚀 Deployment Guide

This guide will help you deploy your Task Management Application to various platforms.

## 📋 Prerequisites

- Git repository (GitHub, GitLab, etc.)
- Node.js 18+ installed locally
- MongoDB Atlas account (for cloud database)

## 🎯 Option 1: Deploy to Railway (Recommended)

Railway is perfect for full-stack applications with automatic deployments.

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Set up MongoDB Atlas**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free cluster
   - Get your connection string

### Step 2: Deploy to Railway

1. **Go to [Railway](https://railway.app)** and sign up with GitHub
2. **Click "New Project"** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Add environment variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=https://your-app-name.railway.app
   ```
5. **Deploy!** Railway will automatically build and deploy your app

### Step 3: Access Your App

- Your app will be available at: `https://your-app-name.railway.app`
- Railway provides automatic HTTPS and custom domains

---

## 🌐 Option 2: Deploy to Render

Render offers free hosting for full-stack applications.

### Step 1: Prepare for Render

1. **Create a `render.yaml` file**:
   ```yaml
   services:
     - type: web
       name: task-manager-api
       env: node
       buildCommand: npm run build
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           sync: false
         - key: CLIENT_URL
           value: https://your-app-name.onrender.com
   ```

2. **Push to GitHub**

### Step 2: Deploy to Render

1. **Go to [Render](https://render.com)** and sign up
2. **Click "New +"** → "Web Service"
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: task-manager-api
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. **Add environment variables** (same as Railway)
6. **Deploy!**

---

## ☁️ Option 3: Deploy to Vercel (Frontend) + Railway (Backend)

Split deployment for better performance.

### Frontend (Vercel)

1. **Go to [Vercel](https://vercel.com)** and sign up
2. **Import your GitHub repository**
3. **Configure build settings**:
   - **Framework Preset**: Create React App
   - **Build Command**: `cd client && npm run build`
   - **Output Directory**: `client/build`
4. **Add environment variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
5. **Deploy!**

### Backend (Railway)

Follow the Railway deployment steps above, but only deploy the `server` folder.

---

## 🐳 Option 4: Deploy with Docker

### Local Docker Deployment

```bash
# Build the image
docker build -t task-manager .

# Run the container
docker run -p 3000:3000 -p 5000:5000 \
  -e MONGODB_URI=your_mongodb_uri \
  -e JWT_SECRET=your_jwt_secret \
  task-manager
```

### Docker on Cloud Platforms

#### Railway with Docker

1. **Push your code with Dockerfile**
2. **Railway will automatically detect and use Docker**
3. **Add environment variables**
4. **Deploy!**

#### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/task-manager

# Deploy to Cloud Run
gcloud run deploy task-manager \
  --image gcr.io/YOUR_PROJECT_ID/task-manager \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔧 Environment Variables

Set these environment variables in your deployment platform:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=https://your-app-domain.com
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create a free cluster** at [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create a database user**
3. **Get your connection string**
4. **Add to environment variables**

### Local MongoDB (Development only)

```bash
# Install MongoDB locally
# Use connection string: mongodb://localhost:27017/task-manager
```

---

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**:
   - Check Node.js version (use 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database connection fails**:
   - Verify MongoDB URI is correct
   - Check network access in MongoDB Atlas
   - Ensure database user has proper permissions

3. **CORS errors**:
   - Update `CLIENT_URL` environment variable
   - Check CORS configuration in server

4. **Port issues**:
   - Railway/Render automatically assign ports
   - Use `process.env.PORT` in your code

### Debug Commands

```bash
# Check build locally
npm run build

# Test server locally
npm start

# Check Docker build
docker build -t task-manager .
```

---

## 📊 Monitoring & Maintenance

### Health Checks

Your app includes a health check endpoint:
- **URL**: `/api/health`
- **Response**: `{ "status": "OK", "timestamp": "..." }`

### Logs

- **Railway**: View logs in the dashboard
- **Render**: Check logs in the service dashboard
- **Vercel**: View function logs in the dashboard

### Updates

1. **Make changes to your code**
2. **Commit and push to GitHub**
3. **Platform will automatically redeploy**

---

## 🎉 Success!

Once deployed, your app will be available at your platform's URL. You can:

1. **Register a new account**
2. **Create and manage tasks**
3. **Invite team members**
4. **Use all features of your task manager**

## 📞 Support

If you encounter issues:

1. **Check the logs** in your deployment platform
2. **Verify environment variables**
3. **Test locally first**
4. **Check the platform's documentation**

---

**Happy Deploying! 🚀**
