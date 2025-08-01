# Path Finder - Career Assessment Platform

A comprehensive career assessment platform built with React, TypeScript, and connected to a Node.js backend API.

## 🚀 Features

- **Career Assessments**: 25+ specialized assessments across different career domains
- **Blog System**: Expert career guidance articles with search and categorization
- **Real-time Analytics**: Assessment statistics and user progress tracking
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui
- **API Integration**: Full backend connectivity for data persistence

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **date-fns** for date formatting
- **Lucide React** for icons

### Backend Integration
- **Node.js/Express** API server
- **MongoDB** with Mongoose ODM
- **JWT Authentication**
- **File Upload** with Multer
- **Email Services** with Nodemailer

## 📡 API Endpoints

### Blog System
- `GET /api/blog/posts/public` - Get published blog posts
- `GET /api/blog/posts/featured` - Get featured posts
- `GET /api/blog/posts/:slug/public` - Get single blog post
- `GET /api/blog/categories` - Get blog categories
- `GET /api/blog/search` - Search blog posts
- `GET /api/blog/category/:category` - Get posts by category

### Assessment System
- `GET /api/assessment/types` - Get all assessment types
- `GET /api/assessment/stats` - Get assessment statistics
- `POST /api/assessment/start` - Start new assessment
- `GET /api/assessment/:id` - Get assessment details
- `POST /api/assessment/:id/answers` - Submit assessment answers
- `PUT /api/assessment/:id/complete` - Complete assessment
- `GET /api/assessment/user/:email` - Get user's assessment history

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `POST /api/subscribers` - Subscribe to newsletter

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd path-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── About.tsx       # About page
│   ├── Blog.tsx        # Blog listing
│   ├── BlogPost.tsx    # Individual blog post
│   ├── Assessments.tsx # Assessment catalog
│   └── Contact.tsx     # Contact form
├── lib/                # Utility libraries
│   ├── api.ts          # API client and types
│   └── utils.ts        # Helper functions
├── hooks/              # Custom React hooks
└── data/               # Static data files
```

## 🔧 API Integration

The frontend connects to the backend API through the `lib/api.ts` file, which provides:

- **Type-safe API calls** with TypeScript interfaces
- **Error handling** and loading states
- **Request/response interceptors**
- **Centralized API configuration**

### Example Usage

```typescript
import { getBlogPosts, startAssessment } from '@/lib/api';

// Fetch blog posts
const { posts, totalPages } = await getBlogPosts({
  page: 1,
  limit: 10,
  category: 'Career Guidance'
});

// Start an assessment
const assessment = await startAssessment({
  name: 'John Doe',
  email: 'john@example.com',
  age: '25 to 34',
  gender: 'male',
  assessmentType: 'full-stack'
});
```

## 🎨 UI Components

The project uses shadcn/ui components for consistent design:

- **Cards** for content containers
- **Buttons** with various styles and states
- **Input fields** with validation
- **Badges** for tags and categories
- **Loading spinners** and error states

## 📊 Assessment Categories

1. **Technology & Programming**
   - Full Stack Development
   - Data Science & AI/ML
   - DevOps Engineering
   - React.js Development

2. **Cloud & Infrastructure**
   - AWS Cloud Architect
   - Google Cloud Platform
   - Multi-Cloud Engineer
   - Microsoft 365

3. **Security & Compliance**
   - Cybersecurity
   - Ethical Hacking
   - ServiceNow

4. **Business & Management**
   - Scrum Master
   - Business Analyst
   - Medical Coding

5. **AI & Emerging Tech**
   - AI/ML
   - Generative AI
   - Blockchain

## 🔐 Authentication

The platform supports:
- **OTP-based admin authentication** for content management
- **User session management** for assessment tracking
- **Secure API endpoints** with JWT tokens

## 📈 Analytics & Tracking

- **Assessment completion rates**
- **User engagement metrics**
- **Blog post view tracking**
- **Performance analytics**

## 🚀 Development Setup

### Backend (Local)
```bash
cd Pf-backend
npm install
npm start
```
Backend will be available at: http://localhost:5000

### Frontend (Local)
```bash
cd path-finder
npm install
npm run dev
```
Frontend will be available at: http://localhost:5173

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
- Email: support@pathfinder.com
- Documentation: [API Docs](http://localhost:5000/)
- Issues: GitHub Issues

---

Built with ❤️ for career development and guidance.