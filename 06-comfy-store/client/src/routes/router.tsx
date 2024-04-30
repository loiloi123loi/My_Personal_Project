import { createBrowserRouter } from 'react-router-dom'
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomeLayout,
  LandingPage,
  LoginPage,
  OrdersPage,
  ProductsPage,
  RegisterPage
} from '~/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/products',
        element: <ProductsPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/products/:id',
        element: <ProductsPage />,
        errorElement: <ErrorPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      {
        path: 'orders',
        element: <OrdersPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  }
])
