import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-500">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
