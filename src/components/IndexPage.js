import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
    return (
        <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
                <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
                    <a href="#" className="text-xl font-bold text-gray-800">AnnounceMate</a>
                    <div className="space-x-4">
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
                        <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
                        <a href="#demo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Demo</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-blue-100 py-20 text-center mt-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">AnnounceMate</h1>
                    <p className="text-lg text-gray-600 mb-8">Your Trusted Partner for Effortless Announcements</p>
                    <a href="#demo" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Get Started</a>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg animated-card transition-transform transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-3">Effortless Announcement Crafting</h3>
                            <p className="text-gray-600">Quickly create stunning announcements with our intuitive rich text editor. AnnounceMate makes message crafting a breeze, so you can focus on delivering your key information without the fuss.</p>
                        </div>
                        {/* Feature Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg animated-card transition-transform transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-3">Targeted & Preview-Ready</h3>
                            <p className="text-gray-600">Choose exactly who sees your announcements—whether it’s faculty, students, or alumni. Preview your messages to ensure they’re spot-on before hitting send, making communication clear and effective.</p>
                        </div>
                        {/* Feature Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg animated-card transition-transform transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-3">Guaranteed Email Delivery</h3>
                            <p className="text-gray-600">Trust our seamless integration with Nodemailer to ensure your announcements land in inboxes reliably. AnnounceMate delivers your messages efficiently, so you can stay connected with your community confidently.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="py-16 bg-gray-200">
    <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Watch Our Demo</h2>
        <div className="flex justify-center">
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/HuqQujky0Bk" 
                title="AnnounceMate Product Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg shadow-lg"
            ></iframe>
        </div>
    </div>
</section>


            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p>&copy; 2024 AnnounceMate. All rights reserved.</p>
                    <p className="mt-2">Contact us at <a href="mailto:support@announcemate.com" className="underline">support@announcemate.com</a></p>
                </div>
            </footer>
        </div>
    );
};

export default IndexPage;
