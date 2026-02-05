function About() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          About Geekspace
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Geekspace is a modern frontend application template designed to help developers
          get started quickly with a robust, scalable architecture.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">Our Stack</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
              <li>React 18 with TypeScript</li>
              <li>Vite for fast development and builds</li>
              <li>React Router for navigation</li>
              <li>Tailwind CSS for styling</li>
              <li>ESLint and Prettier for code quality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Project Structure</h2>
            <p className="mt-4 text-gray-600">
              The project follows a clean, organized structure with separate directories
              for components, pages, hooks, utilities, and more. This makes it easy to
              scale and maintain as your application grows.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
