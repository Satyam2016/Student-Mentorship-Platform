import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  Lock,
  MessageSquare,
  PieChart,
  Search,
  Target,
  Video,
  Mail,
} from 'lucide-react';

function LandingPage() {
  const navigate=useNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 z-40 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">SMP</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#why-smp" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Why SMP
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              How It Works
            </a>
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 hidden sm:inline-block">
              Sign In
            </a>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={navigate('/login')}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full  py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-50">
         
          <div className="container mx-auto px-4 md:px-6  flex justify-items-center w-10/12">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                  Connect. Learn. Grow.
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empowering Students Through Mentorship
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    The Student Mentorship Platform (SMP) is a dynamic space where students and mentors come together to
                    exchange knowledge, receive personalized guidance, and accelerate academic and professional growth.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  navigate="/login" >
                    Get Started
                  </button>
                  <button className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  href="#why-smp">
                    Learn More
                  </button>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=550&h=550"
                alt="Student Mentorship Platform"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width={550}
                height={550}
              />
            </div>
          </div>
         
        </section>

        {/* Why SMP Section */}
        <section id="why-smp" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                  Why SMP?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits of Our Platform</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Discover why students and mentors choose our platform for their growth journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Benefits Cards */}
              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-50 p-3">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Find the Right Mentor</h3>
                <p className="text-gray-600">
                  Smart matching algorithm connects students with experienced mentors.
                </p>
              </div>

              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-50 p-3">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Seamless Communication</h3>
                <p className="text-gray-600">
                  Real-time chat and video conferencing for effective interactions.
                </p>
              </div>

              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-50 p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Effortless Scheduling</h3>
                <p className="text-gray-600">Integrated calendar to book and manage mentorship sessions.</p>
              </div>

              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-50 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Resource Sharing</h3>
                <p className="text-gray-600">Easily access study materials, guides, and expert insights.</p>
              </div>

              <div className="flex flex-col items-start space-y-4 rounded-lg border p-6 shadow-sm md:col-span-2 lg:col-span-1">
                <div className="rounded-full bg-blue-50 p-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Feedback & Ratings</h3>
                <p className="text-gray-600">Continuous improvement with structured feedback.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Steps to Get Started</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Our platform makes it easy to connect with mentors and start your growth journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Steps */}
              {[
                {
                  title: "Sign Up & Create Your Profile",
                  description: "Register as a Student or Mentor and personalize your profile with your skills, interests, and goals."
                },
                {
                  title: "Get Matched with a Mentor",
                  description: "Our AI-powered algorithm suggests the best mentors based on your preferences and learning needs."
                },
                {
                  title: "Schedule & Connect",
                  description: "Book one-on-one sessions, join discussions, and engage through chat or video calls."
                },
                {
                  title: "Track Your Growth",
                  description: "Monitor your progress with personalized feedback and mentorship insights."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-center text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Powerful Tools for Effective Mentorship
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Our platform offers everything you need for a successful mentorship experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Features */}
              {[
                {
                  icon: <Target className="h-5 w-5 text-blue-600" />,
                  title: "Smart Matching Algorithm",
                  description: "Connect with the right mentor based on skills and interests."
                },
                {
                  icon: <Calendar className="h-5 w-5 text-blue-600" />,
                  title: "Integrated Scheduling",
                  description: "Sync with Google Calendar for hassle-free booking."
                },
                {
                  icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
                  title: "Real-Time Communication",
                  description: "Secure messaging & video calls powered by Zoom/Teams."
                },
                {
                  icon: <Lock className="h-5 w-5 text-blue-600" />,
                  title: "Data Security & Privacy",
                  description: "End-to-end encrypted communication & role-based access."
                },
                {
                  icon: <PieChart className="h-5 w-5 text-blue-600" />,
                  title: "Admin Dashboard",
                  description: "Manage users, track analytics, and optimize platform experience."
                },
                {
                  icon: <Video className="h-5 w-5 text-blue-600" />,
                  title: "Video Sessions",
                  description: "High-quality video conferencing for face-to-face mentorship."
                }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center space-x-2">
                    {feature.icon}
                    <h3 className="font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join SMP Today!</h2>
                <p className="max-w-[600px] md:text-xl">
                  Start your journey with expert mentorship and unlock your full potential.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  Get Started
                </button>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <Mail className="h-5 w-5" />
                <p className="text-sm">
                  Need help? Contact us:{" "}
                  <a href="mailto:support@smp.com" className="underline">
                    support@smp.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">SMP</span>
              </div>
              <p className="text-sm text-gray-600">Empowering students through mentorship since 2023.</p>
            </div>
            {[
              {
                title: "Platform",
                links: ["For Students", "For Mentors", "For Institutions", "Pricing"]
              },
              {
                title: "Resources",
                links: ["Blog", "Success Stories", "Support Center", "FAQ"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"]
              }
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-sm font-medium">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t pt-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Student Mentorship Platform. All rights reserved.
              </p>
              <div className="flex gap-4">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((link, index) => (
                  <a key={index} href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;