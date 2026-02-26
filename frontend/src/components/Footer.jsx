export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 mt-8">
      <div
        className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row 
                      justify-between items-center text-sm"
      >
        <p>© {new Date().getFullYear()} MyBlog</p>

        <p className="mt-2 sm:mt-0">Built with ❤️ using MERN Stack</p>
      </div>
    </footer>
  );
}
