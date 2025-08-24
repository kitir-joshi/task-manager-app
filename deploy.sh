#!/bin/bash

echo "🚀 Task Manager Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Task Manager Full Stack App"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update .env with your actual values"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the application
echo "🔨 Building the application..."
npm run build

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Update .env file with your MongoDB URI and JWT secret"
echo "2. Push to GitHub: git remote add origin YOUR_REPO_URL && git push -u origin main"
echo "3. Choose a deployment platform:"
echo "   - Railway (recommended): https://railway.app"
echo "   - Render: https://render.com"
echo "   - Vercel: https://vercel.com"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
