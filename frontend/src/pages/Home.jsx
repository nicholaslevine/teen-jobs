import Header from "../components/Header";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
                <div className="max-w-2xl text-center bg-white shadow-2xl rounded-xl p-12 transform transition duration-500 hover:scale-105">
                    <h1 className="text-5xl font-bold mb-6 text-blue-800 animate-fade-in">
                        Hey, I'm Nicholas
                    </h1>
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                        This project was created to showcase my full-stack development skills, 
                        demonstrating my ability to build comprehensive web applications from 
                        the ground up.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a 
                            href="/projects" 
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                        >
                            View Projects
                        </a>
                        <a 
                            href="/contact" 
                            className="bg-gray-200 text-blue-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300 shadow-md"
                        >
                            Contact Me
                        </a>
                    </div>
                    <div className="mt-10 text-sm text-gray-500">
                        <p>Tech Stack: React · Node.js · Tailwind CSS · Full-Stack Development</p>
                    </div>
                </div>
            </div>
            <footer className="bg-blue-900 text-white py-4 text-center">
                <p>&copy; 2024 Nicholas | Full Stack Developer</p>
            </footer>
        </div>
    )
}

export default Home;