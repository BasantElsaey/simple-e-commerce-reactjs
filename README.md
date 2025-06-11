## MyShop - A Simple E-Commerce React App

![MyShop Banner](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)

Welcome to **MyShop**, a modern, feature-packed e-commerce platform built with cutting-edge technologies like **React.js**, **Vite**, and **Tailwind CSS**. Designed to deliver a seamless shopping experience, MyShop empowers users to explore a wide range of products, manage their carts and wishlists, and create custom orders with ease. Admins can effortlessly manage products and navigation menus through a sleek dashboard, while a mock API powered by **JSON Server** ensures smooth data handling.

Whether you're a shopper looking for the latest deals or an admin managing a thriving store, MyShop offers a responsive, intuitive, and visually stunning interface that works flawlessly across all devices. Dive in and discover the future of online shopping! 🛍️

## Table of Contents

- [About MyShop](#about-myshop)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About MyShop

MyShop is a full-stack e-commerce web application crafted to provide an exceptional online shopping experience. Built with **React.js** and styled with **Tailwind CSS** and **DaisyUI**, it combines performance, scalability, and a modern aesthetic. The app supports user authentication, product browsing with advanced filtering, cart and wishlist management, custom order creation, and a powerful admin dashboard for managing products and navigation.

The backend leverages **JSON Server** as a mock API, simulating a real-world database for products, users, orders, and menu items. With features like theme toggling, pagination, and a dynamic category chart powered by **Chart.js**, MyShop is both user-friendly and admin-ready, making it perfect for learning, prototyping, or even production use.

## Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | Secure login, signup, and profile management with form validation using Formik and Yup. |
| 🛍️ **Product Browsing** | Browse products with search, category filters, and sorting (price, rating). |
| 🛒 **Cart Management** | Add/remove items, view cart summary with dynamic shipping and total calculations. |
| ❤️ **Wishlist** | Save favorite products and move them to the cart with one click. |
| 📦 **Custom Orders** | Create and edit orders by selecting cart items with customizable quantities. |
| 📊 **Category Chart** | Visualize product distribution by category using an interactive bar chart. |
| 🖥️ **Admin Dashboard** | Add, edit, or delete products and customize navigation menus (admin-only). |
| 🌗 **Theme Toggle** | Switch between light and dark themes for a personalized experience. |
| 📢 **Toast Notifications** | Real-time feedback for actions like adding to cart or updating profiles. |
| 📄 **Pagination** | Efficient product listing with paginated results. |
| 📸 **Carousel** | Showcase promotions or featured products in a responsive carousel. |
| 📱 **Responsive Design** | Optimized for desktop, tablet, and mobile devices. |

## Technologies Used

### Frontend
- ⚛️ **React.js** (v18.x) - Component-based UI library
- 🚀 **Vite** (v5.x) - Lightning-fast build tool
- 🎨 **Tailwind CSS** (v3.x) - Utility-first CSS framework
- 🌼 **DaisyUI** (v4.x) - Tailwind CSS component library
- 🧭 **React Router** (v6.x) - Declarative routing
- 📡 **Axios** (v1.x) - Promise-based HTTP client
- 🔔 **React Toastify** (v10.x) - Notification system
- 📝 **Formik & Yup** - Form handling and validation
- 📊 **Chart.js & react-chartjs-2** - Data visualization
- 🖼️ **react-responsive-carousel** - Responsive carousel
- 🧰 **lucide-react** - Icon library
- 🔑 **uuid** - Unique ID generation

### Backend
- 📚 **JSON Server** (v0.x) - Mock REST API

### Tools
- 🟢 **Node.js** (v18.x recommended) - JavaScript runtime
- 📦 **npm** (v10.x) - Package manager
- ✅ **ESLint** - Code linting
- 🎨 **PostCSS & Autoprefixer** - CSS processing

## Getting Started

### Prerequisites
- **Node.js** (v18.x or higher, preferably LTS)
- **npm** (v10.x or higher)
- A modern web browser (e.g., Chrome, Firefox)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/BasantElsaey/simple-e-commerce-reactjs.git
   cd vite-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## Project Structure

The project is structured as follows:

```bash
|── node_modules
├── public
│   ├── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets
│   │   ├── react.svg
│   ├── components
│   │   ├── Admin
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminMenu.jsx
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   ├── CartItems.jsx
│   │   ├── Footer.jsx
│   │   ├── About.jsx
│   │   ├── CategoryChart.jsx
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── Orders.jsx
│   │   ├── Wishlist.jsx
│   │   ├── ProductDetails.jsx
│   ├── index.css
│   ├── index.jsx
│   └── utils
│       ├── debounce.js
|── package-lock.json
├── package.json
├── index.html
├── .gitignore
├── .eslint.config.js
├── vite.config.js
└── README.md
```
- public/: Static assets like favicon.

- c/components/: Reusable React components.

- .json: Mock database for JSON Server.

- App.jsx: Main app with routing.

- ilwind.config.js: Tailwind CSS and 
- DaisyUI configuration.

## 📱 How to Use

1. Explore Products:

- Visit the homepage (/) to browse featured products.

- Use the search bar, category filter, or sort options (price, rating) to find products.

- Click "View Details" to see product info or add to cart/wishlist.

2. Manage Cart:

- Navigate to /cart/items to view and edit cart items.

- Proceed to /cart/summary to review subtotal, shipping, and place the order.

3. Create Orders:

- Go to /orders to create custom orders from cart items.

- Edit orders if logged in as the order owner.


4. Admin Features:

- Log in with an admin account (e.g., email: admin@example.com, password: admin123).

- Access /admin to manage products or /admin/menu to customize navigation.


5. Profile Management:

- Update user details (username, password) at /profile.

6. Toggle Theme:

- Use the theme toggle button in the navbar to switch between light and dark modes.


## Screenshots
- Home Page
[![Home.png](https://i.postimg.cc/5yv1zNYv/Home.png)](https://postimg.cc/wR6S8zkT)

- Cart Page
[![Cart.png](https://i.postimg.cc/mD1Gx2Sq/Cart.png)](https://postimg.cc/JD8FZ8vc)

- Wishlist Page
[![wish.png](https://i.postimg.cc/6qsxBJjQ/wish.png)](https://postimg.cc/JDQ2QgWw)

- Profile
[![Profile.png](https://i.postimg.cc/d0Xz9cK9/Profile.png)](https://postimg.cc/p9fG27r9)

- Admin Dashboard
[![Admin-dash.png](https://i.postimg.cc/h4VHVYZ9/Admin-dash.png)](https://postimg.cc/QVx43f3t)


## License 🌟

This project is licensed under the [MIT License](LICENSE)

## Created By 🌟

[**Basant Elsaey**](https://github.com/BasantElsaey) 

## Acknowledgments 🌟

- **React.js**: [React](https://reactjs.org/)
- **Vite**: [Vite](https://vitejs.dev/)
- **Tailwind CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **DaisyUI**: [DaisyUI](https://daisyui.com/)
- **JSON Server**: [JSON Server](https://github.com/typicode/json-server)
- **Formik**: [Formik](https://formik.org/)
- **Yup**: [Yup](https://github.com/jquense/yup)
- **Chart.js**: [Chart.js](https://www.chartjs.org/)
- **React Router**: [React Router](https://reactrouter.com/)
- **Axios**: [Axios](https://github.com/axios/axios)
- **React Toastify**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **react-responsive-carousel**: [react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel)
- **lucide-react**: [lucide-react](https://lucide.dev/)
- **uuid**: [uuid](https://github.com/uuidjs/uuid)
- **Node.js**: [Node.js](https://nodejs.org/)
- **npm**: [npm](https://www.npmjs.com/)
- **ESLint**: [ESLint](https://eslint.org/)
- **PostCSS**: [PostCSS](https://postcss.org/)
- **Autoprefixer**: [Autoprefixer](https://autoprefixer.github.io/)

#### Thank You for Visiting! 🌟
