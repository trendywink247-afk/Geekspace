import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary-600">Geekspace</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary-500 ${
                isActive ? 'text-primary-600' : 'text-gray-600'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary-500 ${
                isActive ? 'text-primary-600' : 'text-gray-600'
              }`
            }
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
