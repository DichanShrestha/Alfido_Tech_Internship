import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SearchPage from './pages/SearchPage.tsx'
import MovieDetailsPage from './components/MovieDetails.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/movie/:searchQuery',
    element: <SearchPage />
  },
  {
    path: '/movie-details/:movie',
    element: <MovieDetailsPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider 
    router={router}
    fallbackElement="loading..."
    />
  </StrictMode>,
)
