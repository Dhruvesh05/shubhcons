
import { BiBuildings } from "react-icons/bi";
import { LiaIndustrySolid } from "react-icons/lia";
import { LuWrench } from "react-icons/lu";
import { LuNotepadText } from "react-icons/lu";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from 'next/link';
import type { Metadata } from "next";
import { SITE_URL, buildUrl } from "@/utils/config";

export const metadata: Metadata = {
  title: "Our Services | Shubh Construction – Civil & Industrial Experts",
  description:
    "Explore the wide range of civil, industrial, and mechanical construction services offered by Shubh Construction. From industrial civil works to project management, we deliver quality, safety, and reliability.",
  keywords: [
    "civil construction services",
    "industrial civil works",
    "industrial mechanical works",
    "commercial construction",
    "construction project management",
    "renovation and remodeling services",
    "Shubh Construction services",
  ],
  alternates: {
    canonical: buildUrl("/services"),
  },
  openGraph: {
    title: "Our Services | Shubh Construction",
    description:
      "Comprehensive civil and industrial construction services delivered by Shubh Construction with expertise and precision.",
    url: buildUrl("/services"),
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shubh Construction Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Shubh Construction",
    description:
      "Discover civil, industrial, mechanical, and project management services by Shubh Construction.",
    images: ["/og-image.png"],
  },
};

const page = () => {
    const services = [
        {
            icon: LiaIndustrySolid,
            title: "Industrial Civil Works",
            description: "Construction of industrial facilities, including factories, warehouses, and manufacturing plants.",
            points: ["Factory Construction", "Warehouse Development", "Infrastructure Projects", "Site Preparation"]
        },
        {
            icon: LiaIndustrySolid,
            title: "Industrial Mechanical Works",
            description:"Installation and maintenance of mechanical systems in industrial settings.",
            points: ["Structural Fabrication", "Piping", "Equipment Installation", "Preventive Maintenance"]
        },
        {
            icon: BiBuildings,
            title: "Commercial Construction",
            description: "Development of office buildings, retail spaces, and industrial facilities with a focus on functionality and design.",
            points: ["Office Buildings", "Retail Spaces", "Warehouses", "Mixed-Use Developments"]
        },
        {
            icon: LuWrench,
            title: "Renovation and Remodeling",
            description: "Upgrading and transforming existing structures to enhance aesthetics, functionality, and value.",
            points: ["Home Renovations", "Commercial Remodels", "Historic Restorations", "Interior Upgrades"]
        },
        {
            icon: LuNotepadText,
            title: "Project Management",
            description: "Comprehensive project oversight from planning to completion, ensuring timely and within-budget delivery.",
            points: ["Planning and Scheduling", "Budget Management", "Quality Control", "Safety Compliance"]
        }
        
    ]
    const ProcessSteps = [
        {
            title: "Consultation",
            description: "Understanding your vision and requirements"
        },
        {
            title: "Planning",
            description: "Detailed project planning and design"
        },
        {
            title: "Execution",
            description: "Professional construction with quality control"
        },
        {
            title: "Delivery",
            description: "Final inspection and handover"
        }
    ];
  return (
    <main className="pt-28">
      {/* Hero Section */}

      <section className="bg-[url('/bg4.webp')] pt-33 pb-25 bg-center bg-cover bg-no-repeat">
        <AnimateOnScroll direction="down" delay={0.2}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Comprehensive civil construction solutions
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Services Section */}
      <section
        className="py-16 md:py-24 bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat"
        aria-labelledby="services-offer-heading"
      >
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="text-center px-2 md:px-35 lg:px-70">
            <h2
              className="text-3xl md:text-4xl text-red-700 font-bold mb-4"
              id="services-offer-heading"
            >
              What We Offer
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mx-auto">
              At Shubh Construction, we specialize in a wide range of civil
              construction services tailored to meet the diverse needs of our
              clients.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="container mx-auto px-4 mt-12 grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8">
          {services.map((service, index) => (
            <AnimateOnScroll
              direction="up"
              delay={0.2 + index * 0.1}
              key={index}
            >
              <div
                key={index}
                className="mx-auto outline-1 outline-red-700 -outline-offset-8 md:min-h-102 md:max-h-102 flex flex-col gap-3 bg-white border border-gray-300 leading-relaxed rounded-lg p-6 mb-8 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <service.icon
                  aria-hidden="true"
                  className="text-red-600 text-6xl bg-red-100 p-4 rounded-md mr-4"
                />
                <h3 className="text-2xl text-red-700 font-bold">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-4">{service.description}</p>
                <ul className="list-disc list-inside text-gray-500 marker:text-red-600">
                  {service.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/*Process Section */}

      <section className="bg-gray-50 p-9 md:px-24 md:py-14">
        <AnimateOnScroll direction="up" delay={0.2}>
          <h2 className="text-3xl md:text-4xl text-red-700 font-bold text-center md:px-14 mb-4">
            Our Process
          </h2>
          <p className="text-gray-500 text-lg text-center max-w-2xl mx-auto">
            A systematic approach to deliver excellence
          </p>
        </AnimateOnScroll>
        <div className="container md:mx-auto mt-8 grid grid-cols-1 gap-4  md:grid-cols-4">
          {ProcessSteps.map((step, index) => (
            <AnimateOnScroll
              direction="up"
              delay={0.2 + index * 0.1}
              key={index}
            >
              <div key={index} className="max-w-3xl mx-auto py-6 text-center">
                <span
                  className="w-16 h-16 mx-auto mb-4 
               flex items-center justify-center 
               rounded-full bg-red-700 
               text-white text-2xl font-bold leading-relaxed"
                >
                  {" "}
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-lg dark:text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/*Get a Quote Section */}
      <section className="text-center bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat py-18 px-4 md:px-30 lg:px-60 lg:py-24">
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="bg-[#1c1f26] text-white py-8 px-8 md:px-14 rounded-2xl md:py-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-lg">
              Let&apos;s discuss how we can bring your construction vision to
              life
            </p>
            <Link
              href="/contact-us"
              className="inline-block mt-8 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 transition-all duration-300 active:scale-95 hover:scale-115"
            >
              Get a Quote
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ConstructionCompany",
            name: "Shubh Construction",
            url: SITE_URL,
            description:
              "Shubh Construction provides civil, industrial, and mechanical construction services with a focus on quality, safety, and timely delivery.",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Construction Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Industrial Civil Works",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Industrial Mechanical Works",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Commercial Construction",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Renovation and Remodeling",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Project Management",
                  },
                },
              ],
            },
          }),
        }}
      />
    </main>
  );
}

export default page