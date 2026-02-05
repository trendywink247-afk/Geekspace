function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} Geekspace. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <a
              href="#"
              className="text-sm text-gray-600 transition-colors hover:text-primary-500"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 transition-colors hover:text-primary-500"
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
