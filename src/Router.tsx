import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { BooksList } from '@/components/Pages/BooksList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/books',
    element: <BooksList />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
