import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './redux/store';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Error404 from './pages/Error404';
import BlogDetail from './pages/BlogDetail'
import AdminBlogList from './pages/AdminBlogList'
import AdminBlogForm from './pages/AdminBlogForm'
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePassword from './pages/Changepassword';
import Profile from './pages/Profile';

// Wrap EVERYTHING here (most reliable for vite-react-ssg)
const Layout = () => (
  <Provider store={store}>
    <HelmetProvider>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </HelmetProvider>
  </Provider>
);

// Routes (data-router format)
export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error404 />, // better UX
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'profile', element: <Profile /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogDetail /> },
      { path: 'admin/blogs', element: <AdminBlogList /> },
      { path: 'admin/blogs/new', element: <AdminBlogForm /> },
      { path: 'admin/blogs/:id/edit', element: <AdminBlogForm /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Error404 /> },
    ],
  },
];

// Required by vite-react-ssg
export default function App() {
  return null;
}