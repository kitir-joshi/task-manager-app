# Task Manager - Full Stack Web Application

A modern, feature-rich task management application built with React, Node.js, TypeScript, and MongoDB. Perfect for teams to collaborate on projects and manage tasks efficiently.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - Secure JWT-based authentication with role-based access control
- **Task Management** - Create, edit, delete, and organize tasks with status tracking
- **Real-time Updates** - Live task updates using WebSocket connections
- **Advanced Filtering** - Filter tasks by status, priority, assignee, and search functionality
- **Task Comments** - Collaborative commenting system for task discussions
- **Priority Levels** - Multiple priority levels (Low, Medium, High, Urgent)
- **Due Date Management** - Set and track task deadlines with overdue notifications
- **User Profiles** - Manage user profiles and preferences
- **Admin Panel** - User management and system administration (Admin only)

### Technical Features
- **Responsive Design** - Mobile-first design that works on all devices
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Type Safety** - Full TypeScript implementation for better development experience
- **Real-time Collaboration** - WebSocket integration for live updates
- **RESTful API** - Well-structured API with proper error handling
- **Security** - JWT authentication, input validation, and rate limiting
- **Performance** - Optimized queries, caching, and efficient data loading

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Socket.IO** - Real-time communication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MongoDB Atlas** - Cloud database (optional)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Docker (optional)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-fullstack
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB Express: http://localhost:8081 (admin/password123)

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-fullstack
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # Start MongoDB service
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/task-manager

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### MongoDB Setup

#### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `task-manager`

#### MongoDB Atlas (Cloud)
1. Create MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🚀 Deployment

### Docker Deployment

1. **Build and run with Docker**
   ```bash
   docker build -t task-manager .
   docker run -p 5000:5000 task-manager
   ```

2. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Cloud Deployment

#### Heroku
1. Create Heroku app
2. Add MongoDB addon
3. Set environment variables
4. Deploy with Git

#### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

#### Vercel + Railway
- Frontend: Deploy to Vercel
- Backend: Deploy to Railway
- Database: MongoDB Atlas

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your-production-jwt-secret-key
CLIENT_URL=https://your-domain.com
```

## 📱 Usage

### Getting Started

1. **Register/Login** - Create an account or login with existing credentials
2. **Create Tasks** - Add new tasks with title, description, and assignee
3. **Manage Tasks** - Update status, priority, and add comments
4. **Track Progress** - Monitor task completion and deadlines
5. **Collaborate** - Work with team members on shared tasks

### User Roles

- **User** - Create and manage assigned tasks
- **Admin** - Full system access including user management

### Task Management

- **Status**: Todo → In Progress → Review → Completed
- **Priority**: Low, Medium, High, Urgent
- **Features**: Comments, attachments, due dates, tags

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers
- Role-based access control

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Task Endpoints
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/comments` - Add comment
- `GET /api/tasks/stats/overview` - Get task statistics

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/tasks` - Get user's tasks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🎯 Roadmap

- [ ] Email notifications
- [ ] File uploads
- [ ] Task templates
- [ ] Time tracking
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Webhook integrations

---

**Built with ❤️ using modern web technologies**
