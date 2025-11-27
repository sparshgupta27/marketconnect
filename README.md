# MarketConnect 🛒

**A B2B Marketplace Platform - College Project**

MarketConnect is a simplified B2B platform that connects suppliers and vendors for efficient supply chain management. This is a college/academic project demonstrating full-stack web development skills.

---

## 🌟 Features

### For Suppliers 🏭

- **Dashboard Management**: View and manage products
- **Product Management**: Add, edit, and delete products
- **Order Management**: Handle incoming orders from vendors
- **Profile Management**: Set up business profile

### For Vendors 🏪

- **Browse Products**: Discover products from multiple suppliers
- **Place Orders**: Create and track orders
- **Order History**: View past orders and their status
- **Profile Management**: Manage vendor profile

### Technical Features ✨

- **Authentication**: Firebase-based user login/signup
- **Responsive Design**: Works on desktop and mobile
- **REST API**: Express.js backend with SQLite database

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (simple, no setup required)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd MarketConnect-main
```

### 2. Backend Setup

```bash
cd Backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 📁 Project Structure

```
MarketConnect-main/
├── Backend/
│   ├── server.js          # Express server setup
│   ├── routes/             # API routes
│   │   ├── vendor.js
│   │   ├── supplier.js
│   │   ├── product.js
│   │   ├── productGroup.js
│   │   └── order.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── App.tsx         # Main app component
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── contexts/       # React contexts
    │   ├── hooks/          # Custom hooks
    │   ├── lib/            # Utilities
    │   └── services/       # API services
    └── package.json
```

---

## 🔑 Key Concepts Demonstrated

1. **Full-Stack Development**: React frontend + Node.js backend
2. **RESTful API Design**: CRUD operations for products, orders
3. **Authentication**: Firebase authentication integration
4. **State Management**: React Query for server state
5. **Modern UI**: Tailwind CSS with component library
6. **Database Operations**: SQLite with Express.js
7. **TypeScript**: Type-safe frontend development

---

## 👥 User Roles

| Role     | Description                                          |
| -------- | ---------------------------------------------------- |
| Supplier | Creates products, manages inventory, fulfills orders |
| Vendor   | Browses products, places orders, tracks deliveries   |

---

## 📝 API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/vendors   | Get all vendors   |
| POST   | /api/vendors   | Create vendor     |
| GET    | /api/suppliers | Get all suppliers |
| POST   | /api/suppliers | Create supplier   |
| GET    | /api/products  | Get all products  |
| POST   | /api/products  | Create product    |
| GET    | /api/orders    | Get all orders    |
| POST   | /api/orders    | Create order      |

---

## 🎓 Learning Outcomes

This project demonstrates:

- Building a complete full-stack application
- Implementing user authentication
- Creating RESTful APIs
- Managing application state
- Responsive web design
- Database design and operations

---

## 📄 License

This project is created for educational purposes.
