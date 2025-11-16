export const projectsData = [
  {
    slug: "annekaa-heights",
    title: "Annekaa Heights",
    shortDescription: "A comprehensive room booking platform with channel manager integration",
    description:
      "A room booking website that allows users to find and book accommodations easily. Features include user authentication, booking management, and payment processing.",
    image: "/projects/annekaa.png",
    images: ["/projects/annekaa.png", "/projects/annekaa-2.png"],
    liveUrl: "https://annekaaheights.com",
    githubUrl: "#",
    tags: ["React.js", "TypeScript", "MongoDB", "Razorpay", "Tailwind CSS", "Express.js", "Node.js", "Channel Manager"],
    challenge:
      "Building a scalable room booking system that handles real-time availability across multiple booking channels while maintaining data consistency and preventing overbooking.",
    solution:
      "Implemented a channel manager integration with optimistic UI updates, Redis caching for availability checks, and a robust booking queue system to handle concurrent reservations.",
    results: [
      "40% increase in direct bookings",
      "99.9% uptime with zero overbookings",
      "3x faster page load times with optimized caching",
      "Seamless integration with 5+ OTA platforms",
    ],
    features: [
      "Real-time room availability tracking",
      "Multi-channel booking synchronization",
      "Secure payment processing with Razorpay",
      "User authentication and profile management",
      "Admin dashboard for booking management",
      "Automated email notifications",
    ],
    technologies: {
      frontend: ["React.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "MongoDB"],
      integrations: ["Razorpay", "Channel Manager APIs"],
    },
  },
  {
    slug: "chaar-dham",
    title: "Chaar Dham",
    shortDescription: "Pilgrimage platform with real-time booking and donation system",
    description:
      "A website dedicated to the Chaar Dham pilgrimage, providing information about all the temples, puja booking, donation options, and yatra parchi services.",
    image: "/projects/chaardham.png",
    images: ["/projects/chaardham.png", "/projects/chaardham-2.png"],
    liveUrl: "https://chaardham.in",
    githubUrl: "#",
    tags: ["Next.js", "Node.js", "Socket.io", "MongoDB", "Express.js", "Tailwind CSS", "Razorpay"],
    challenge:
      "Creating a platform that handles high-traffic during pilgrimage season while providing real-time puja booking slots and managing complex donation workflows.",
    solution:
      "Leveraged Next.js for server-side rendering, Socket.io for real-time updates, and implemented a scalable microservices architecture to handle peak loads.",
    results: [
      "Handled 50,000+ concurrent users during peak season",
      "Real-time slot updates with <100ms latency",
      "Processed ₹10M+ in donations securely",
      "Mobile-responsive design with 95+ PageSpeed score",
    ],
    features: [
      "Real-time puja booking system",
      "Secure donation processing",
      "Yatra parchi generation and management",
      "Temple information and darshan timings",
      "Live updates via WebSocket",
      "Multi-language support",
    ],
    technologies: {
      frontend: ["Next.js", "Tailwind CSS", "Socket.io Client"],
      backend: ["Node.js", "Express.js", "MongoDB", "Socket.io"],
      integrations: ["Razorpay", "SMS Gateway"],
    },
  },
  {
    slug: "jc-chaudhry-numerology",
    title: "JC Chaudhry Numerology",
    shortDescription: "Interactive numerology platform with visualization and booking system",
    description:
      "A numerology website that provides personalized numerology reports and consultations. Users can book appointments and make payments online.",
    image: "/projects/jcchaudhry.png",
    images: ["/projects/jcchaudhry.png", "/projects/jcchaudhry-2.png"],
    liveUrl: "https://jcchaudhry.com",
    githubUrl: "#",
    tags: ["React", "D3.js", "Express", "MongoDB", "Tailwind CSS", "Razorpay"],
    challenge:
      "Creating an engaging numerology platform with complex data visualizations while ensuring accurate calculations and seamless appointment booking.",
    solution:
      "Built interactive D3.js visualizations for numerology charts, implemented automated report generation with PDF export, and integrated a calendar-based booking system.",
    results: [
      "1,000+ personalized reports generated",
      "Beautiful interactive visualizations with D3.js",
      "Automated appointment scheduling system",
      "90% customer satisfaction rate",
    ],
    features: [
      "Interactive numerology chart visualizations",
      "Personalized PDF report generation",
      "Online consultation booking",
      "Payment gateway integration",
      "User dashboard for reports history",
      "Admin panel for appointment management",
    ],
    technologies: {
      frontend: ["React", "D3.js", "Tailwind CSS"],
      backend: ["Express.js", "MongoDB", "Node.js"],
      integrations: ["Razorpay", "PDF Generation Library"],
    },
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    shortDescription: "Modern portfolio with dark mode and animations",
    description:
      "My personal portfolio website showcasing my projects, skills, and experience. Built with Next.js and Tailwind CSS for a responsive design.",
    image: "/projects/portfolio.png",
    images: ["/projects/portfolio.png", "/projects/portfolio-2.png"],
    liveUrl: "https://mdazkaar.site",
    githubUrl: "https://github.com/mazkar69/next-portfolio",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    challenge:
      "Creating a modern, performant portfolio that stands out while maintaining excellent SEO and accessibility scores.",
    solution:
      "Utilized Next.js 15 App Router for optimal performance, Framer Motion for smooth animations, and implemented comprehensive SEO with structured data.",
    results: [
      "100 PageSpeed Insight score",
      "Fully accessible (WCAG 2.1 AA compliant)",
      "Smooth animations with Framer Motion",
      "Dark mode with system preference support",
    ],
    features: [
      "Server-side rendering with Next.js 15",
      "Responsive design with Tailwind CSS",
      "Dark/Light theme toggle",
      "Smooth scroll animations",
      "Contact form with email integration",
      "Blog section with MDX support",
    ],
    technologies: {
      frontend: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
      animations: ["Framer Motion"],
      ui: ["shadcn/ui", "Radix UI"],
    },
  },
  {
    slug: "shaadi-bazaar",
    title: "Shaadi Bazaar",
    shortDescription: "Wedding planning marketplace platform",
    description:
      "A comprehensive wedding planning platform connecting couples with vendors, managing bookings, and facilitating the entire wedding planning process.",
    image: "/projects/shaadibazaar.png",
    images: ["/projects/shaadibazaar.png", "/projects/shaadibazaar-2.png"],
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Razorpay"],
    challenge:
      "Building a multi-vendor marketplace that handles complex vendor-client interactions, booking management, and secure payment processing.",
    solution:
      "Developed a role-based access system, implemented vendor rating and review functionality, and created an automated booking workflow with payment escrow.",
    results: [
      "200+ registered vendors",
      "500+ successful bookings",
      "Secure escrow payment system",
      "95% customer satisfaction rate",
    ],
    features: [
      "Vendor marketplace with categories",
      "Advanced search and filtering",
      "Booking management system",
      "Rating and review system",
      "Secure payment escrow",
      "Vendor and client dashboards",
    ],
    technologies: {
      frontend: ["Next.js", "Tailwind CSS", "TypeScript"],
      backend: ["Node.js", "Express.js", "MongoDB"],
      integrations: ["Razorpay"],
    },
  },
]
