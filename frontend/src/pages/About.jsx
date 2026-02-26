export default function About() {
  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About MyBlog</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            MyBlog is a modern, secure and scalable blogging platform built
            using the MERN stack. It allows users to create, manage and share
            their thoughts seamlessly.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Secure Authentication
            </h3>
            <p className="text-gray-600 text-sm">
              JWT-based authentication system ensuring safe and protected user
              access.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Blog Management
            </h3>
            <p className="text-gray-600 text-sm">
              Create, edit and delete blogs with full authorization control.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Responsive Design
            </h3>
            <p className="text-gray-600 text-sm">
              Fully responsive UI built using Tailwind CSS for seamless
              experience.
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white p-8 rounded-lg shadow mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Technology Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-100 py-4 rounded">MongoDB</div>
            <div className="bg-gray-100 py-4 rounded">Express.js</div>
            <div className="bg-gray-100 py-4 rounded">React.js</div>
            <div className="bg-gray-100 py-4 rounded">Node.js</div>
            <div className="bg-gray-100 py-4 rounded">JWT Auth</div>
            <div className="bg-gray-100 py-4 rounded">Tailwind CSS</div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Developed By</h2>
          <p className="text-gray-600">
            Tushar Shinde – Full Stack MERN Developer 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
