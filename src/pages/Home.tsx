function Home() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to{' '}
          <span className="text-primary-600">Geekspace</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your modern frontend application built with React, TypeScript, and Tailwind CSS.
          Start building something amazing today.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="btn-primary"
          >
            Get Started
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600"
          >
            Learn more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900">Fast Development</h3>
          <p className="mt-2 text-gray-600">
            Powered by Vite for lightning-fast hot module replacement and builds.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900">Type Safe</h3>
          <p className="mt-2 text-gray-600">
            Built with TypeScript for better developer experience and fewer bugs.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900">Beautiful UI</h3>
          <p className="mt-2 text-gray-600">
            Styled with Tailwind CSS for rapid, responsive design.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
