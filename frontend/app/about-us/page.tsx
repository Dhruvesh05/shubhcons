import AnimateOnScroll from "@/components/AnimateOnScroll";
import Image from "next/image";
import { FiTarget } from "react-icons/fi";
import { IoEyeOutline, IoRibbonOutline } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import type { Metadata } from "next";
import { buildUrl } from "@/utils/config";

export const metadata: Metadata = {
  title: "About Shubh Construction | Trusted Civil Contractors Since 2017",
  description:
    "Learn about Shubh Construction, a trusted civil construction company established in 2017. We specialize in industrial water-retaining structures, ETP, STP, and turnkey civil projects with a strong focus on quality, safety, and reliability.",
  keywords: [
    "Shubh Construction",
    "civil construction company",
    "industrial construction",
    "ETP STP construction",
    "water retaining structures",
    "construction company in India",
    "civil contractors",
  ],
  alternates: {
    canonical: buildUrl("/about-us"),
  },
  openGraph: {
    title: "About Shubh Construction | Civil Construction Experts",
    description:
      "Discover Shubh Construction’s mission, vision, and core values. Delivering quality civil and industrial construction projects since 2017.",
    url: buildUrl("/about-us"),
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shubh Construction – Civil Construction Company",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shubh Construction",
    description:
      "Trusted civil construction company delivering industrial and infrastructure projects since 2017.",
    images: ["/og-image.png"],
  },
};

const AboutUsInfo = [
  {
    icon: FiTarget,
    title: "Our Mission",
    content:
      "Our approach sets us apart from other construction companies. We treat every project with passion and dedication, aiming to create unique and meaningful results within your budget. Backed by extensive construction experience, our team builds with intelligence, precision, and humility—regardless of the size or nature of the project.",
  },
  {
    icon: IoEyeOutline,
    title: "Our Vision",
    content:
      "At Shubh Construction, our vision is driven by pragmatism, teamwork, trust, and accountability. These core values are deeply integrated into our work culture and guide every decision we make, ensuring reliable execution and long-lasting client relationships.",
  },
];

const CoreValues = [
  {
    title: "Quality",
    description:
      "We never compromise on the quality of materials or workmanship in any project.",
  },
  {
    title: "Integrity",
    description:
      "Transparent communication and honest business practices in all our dealings.",
  },
  {
    title: "Safety",
    description:
      "Safety of our workers and clients is our top priority on every site.",
  },
  {
    title: "Reliability",
    description:
      "Delivering projects on time and within budget, keeping our commitments.",
  },
  {
    title: "Innovation",
    description:
      "Embracing modern techniques and technologies to improve our services.",
  },
  {
    title: "Excellence",
    description:
      "Striving for excellence in every aspect of construction and client service.",
  },
];

const Page = () => {
  return (
    <main className="pt-28">
      {/* Hero Section */}
      <section className="bg-[url('/bg4.webp')] pt-33 pb-25 bg-center bg-cover bg-no-repeat ">
        <AnimateOnScroll direction="down" delay={0.2}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Building excellence in construction since 2017
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* History Section */}
      <section
        className="py-16 md:py-24 bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat"
        aria-labelledby="history-heading"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll direction="left" delay={0.2}>
            <div className="space-y-6">
              <h2
                className="text-3xl md:text-4xl text-red-700 font-bold"
                id="history-heading"
              >
                Our History
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Shubh Construction was founded in 2017 by Mr. Bharat Talpada.
                Since its establishment, the company has been actively involved
                in industrial water-retaining structure works, including ETP,
                STP, water tanks, and other water-retaining structures.
              </p>
              <p className="text-gray-500 leading-relaxed">
                In addition, the company undertakes both Greenfield and
                Brownfield projects, steadily growing into a comprehensive civil
                construction organization with a strong reputation for quality
                and safety.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right" delay={0.2}>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src="/projects_photo/Abbott Canola Work.png"
                alt="Industrial construction project completed by Shubh Construction"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 md:py-19 lg:px-14">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-4 lg:gap-8">
          {AboutUsInfo.map((section, index) => (
            <AnimateOnScroll
              direction="up"
              delay={0.2 + index * 0.1}
              key={index}
            >
              <div
                key={section.title}
                className="bg-white md:min-h-105 lg:min-h-90 min-h-12 p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300
                outline-2 outline-red-700 -outline-offset-8"
              >
                <section.icon
                  aria-hidden="true"
                  className="text-red-700 text-5xl mb-4 bg-red-200 p-3 rounded-md"
                />
                <h3 className="text-2xl text-red-700 font-bold mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat">
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl text-red-700 md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-500 text-lg mb-12">
              The principles that guide everything we do
            </p>
          </div>
        </AnimateOnScroll>
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {CoreValues.map((value, index) => (
              <AnimateOnScroll
                direction="up"
                delay={0.2 + index * 0.1}
                key={index}
              >
                <div
                  key={value.title}
                  className="flex flex-col text-center items-center gap-4 transition-transform duration-300 hover:scale-105"
                >
                  <TiTickOutline
                    aria-hidden="true"
                    className="text-red-700 text-5xl bg-red-200 p-3 rounded-full"
                  />
                  <h3 className="text-xl text-red-700 font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="bg-gray-50 py-16">
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <IoRibbonOutline className="text-red-700 text-6xl mx-auto mb-4 md:text-7xl bg-red-200 p-4 rounded-full" />
            <h2 className="text-3xl text-red-700 font-bold mb-4">
              Certified & Experienced
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Our team holds all necessary licenses and certifications required
              for civil construction work. We strictly follow industry standards
              and best practices in every project.
            </p>
          </div>
        </AnimateOnScroll>
      </section>
    </main>
  );
};

export default Page;
