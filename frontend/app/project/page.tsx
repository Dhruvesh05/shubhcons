import AnimateOnScroll from "@/components/AnimateOnScroll";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildUrl } from "@/utils/config";

export const metadata: Metadata = {
  title: "Our Projects | Shubh Construction – Civil & Industrial Works",
  description:
    "Explore completed civil and industrial construction projects by Shubh Construction. From water-retaining structures to turnkey infrastructure projects, delivered with quality, safety, and precision.",
  keywords: [
    "Shubh Construction projects",
    "civil construction projects",
    "industrial construction portfolio",
    "ETP STP construction projects",
    "water retaining structures",
    "construction company projects",
  ],
  alternates: {
    canonical: buildUrl("/project"),
  },
  openGraph: {
    title: "Our Projects | Shubh Construction",
    description:
      "A showcase of completed civil and industrial construction projects delivered by Shubh Construction with excellence.",
    url: buildUrl("/project"),
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shubh Construction Projects Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | Shubh Construction",
    description:
      "View our portfolio of civil and industrial construction projects delivered with quality and reliability.",
    images: ["/og-image.png"],
  },
};

const ExpInfo = [
  {
    title: "Completed Projects",
    value: "70+",
  },
  {
    title: "Years of Experience",
    value: "7+",
  },
  {
    title: "Satisfied Clients",
    value: "90+",
  },
  {
    title: "Timely Deliveries",
    value: "91%",
  },
];
const Certificates = [
  {
    image: "/projects_photo/C1.jpg",
    alt: "ISO 9001-2015 Certificate for Quality Management Systems",
  },
];
const page = () => {
  return (
    <main className="pt-28">
      {/* Hero Section */}
      <section className="bg-[url('/bg4.webp')] pt-33 pb-25 bg-center bg-cover bg-no-repeat">
        <AnimateOnScroll direction="down" delay={0.2}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Projects
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              A showcase of quality construction
            </p>
          </div>
        </AnimateOnScroll>
      </section>
      {/*Experience Info Section*/}
      <section className="grid grid-cols-2 bg-gray-50 md:grid-cols-4 md:px-15 lg:px-40">
        {ExpInfo.map((item, index) => (
          <AnimateOnScroll
            direction="up"
            delay={0.2 + (index + 1) * 0.1}
            key={index}
          >
            <div
              key={index}
              className="container mx-auto px-4 py-10 text-center hover:scale-115 transition-all duration-400"
            >
              <h2 className="text-4xl font-extrabold text-red-700 mb-2">
                {item.value}
              </h2>
              <p className="text-gray-400 text-md">{item.title}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </section>
      {/* Projects Gallery Section */}
      <section className="bg-[url('/bgc.jpg')] bg-top bg-repeat">
        <AnimateOnScroll direction="up" delay={0.3}>
          <div className="text-center px-8 pt-16 md:pt-24 space-y-3">
            <h2
              className="text-3xl md:text-4xl text-red-700 font-bold"
              id="featured-projects-heading"
            >
              Featured Projects
            </h2>
            <p className="text-gray-500 md:px-40 lg:px-70 leading-relaxed text-lg">
              Explore our portfolio of successful construction projects
              delivered with excellence
            </p>
          </div>
        </AnimateOnScroll>
        <div>
          <ProjectCard />
        </div>
        <AnimateOnScroll direction="up" delay={0.3}>
          <div className="text-center px-8 py-6 space-y-3">
            <h2
              className="text-3xl md:text-4xl text-red-700 font-bold"
              id="certificates-heading"
            >
              Our Certificates
            </h2>
            <p className="text-gray-500 md:px-40 lg:px-70 leading-relaxed text-lg">
              We take pride in our certifications that reflect our commitment to
              quality and excellence in construction
            </p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="up" delay={0.3}>
          {Certificates.map((cert, index) => (
            <div key={index} className="flex justify-center pb-10">
              <div className="relative w-full max-w-md aspect-3/2">
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  fill
                  className="object-cover rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </AnimateOnScroll>
      </section>
      {/*Get in Touch*/}
      <section className="bg-gray-50 px-8 py-16 text-center space-y-3">
        <AnimateOnScroll direction="up" delay={0.2}>
          <h2 className="text-3xl font-bold md:text-4xl dark:text-gray-900 md:mb-4">
            Start Your Project With Us
          </h2>
          <p className="text-lg leading-relaxed text-gray-500 lg:mb-0">
            Ready to build something extraordinary? Contact us for a free
            consultation and quote.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-red-600 text-white mt-5 px-8 py-3 text-lg rounded-xl shadow-xl
        hover:scale-115 hover:shadow-3xl hover:bg-red-700 transition-all active:scale-95 duration-300"
          >
            Get in Touch
          </Link>
        </AnimateOnScroll>
      </section>
    </main>
  );
};

export default page;
