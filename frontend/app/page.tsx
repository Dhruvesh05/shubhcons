import React from "react";
import HomeCarousel from "@/components/HomeCarousel";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";

export const metadata: Metadata = {
  title: "Shubh Construction | Trusted Civil & Industrial Construction Company",
  description:
    "Shubh Construction is a trusted civil and industrial construction company delivering quality projects including factories, warehouses, commercial buildings, and infrastructure works across India.",
  keywords: [
    "Shubh Construction",
    "civil construction company",
    "industrial construction",
    "commercial buildings",
    "construction company in India",
    "industrial contractors",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Shubh Construction | Civil & Industrial Experts",
    description:
      "Delivering excellence in civil and industrial construction with quality, safety, and timely delivery.",
    url: SITE_URL,
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shubh Construction – Civil & Industrial Construction Company",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubh Construction",
    description:
      "Trusted civil and industrial construction company delivering quality infrastructure projects.",
    images: ["/og-image.png"],
  },
};
import {
  Building2,
  Factory,
  Wrench,
  Users,
  Building,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ClientCarousel from "@/components/ClientCarousel";
const ExpInfo = [
  {
    icon: Building,
    title: "Projects Completed",
    value: "70+",
  },
  {
    icon: Users,
    title: "Years of Experience",
    value: "7+",
  },
  {
    icon: Award,
    title: "Satisfied Clients",
    value: "90+",
  },
  {
    icon: Clock,
    title: "Timely Deliveries",
    value: "91%",
  },
];
const HomeServices = [
  {
    icon: Factory,
    title: "Industrial Projects",
    description:
      "Warehouses, factories, and industrial facilities built to last.",
  },
  {
    icon: Building2,
    title: "Commercial Buildings",
    description:
      "Office spaces, retail centers, and commercial properties designed for success.",
  },
  {
    icon: Users,
    title: "Project Management",
    description:
      "End-to-end project management services ensuring your construction project stays on schedule and within budget.",
  },
  {
    icon: Wrench,
    title: "Renovations",
    description:
      "Expert renovation and remodeling services to transform your space.",
  },
];
const features = [
  "Experienced team of qualified engineers and skilled workers",
  "Quality materials and modern construction techniques",
  "Transparent pricing with no hidden costs",
  "Timely project completion within agreed deadlines",
  "Comprehensive project management from start to finish",
  "Safety-first approach on all construction sites",
];
const page = () => {
  return (
    <main>
      <HomeCarousel />
      {/* */}

      <section
        className="py-14 bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat"
        aria-labelledby="services-heading"
      >
        <AnimateOnScroll direction="up" delay={0.2}>
          <div className="text-center">
            <h2
              className="text-3xl text-red-700 md:text-4xl font-semibold py-4"
              id="services-heading"
            >
              Our Services
            </h2>
            <p className="text-lg text-gray-500 px-2 md:mb-4">
              Comprehensive construction solutions tailored to meet your unique
              requirements
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 gap-8 md:gap-4 lg:grid-cols-4 px-4 py-6 md:grid-cols-2">
          {HomeServices.map((item, index) => (
            <AnimateOnScroll
              direction="up"
              delay={0.4 + index * 0.1}
              key={index}
            >
              <div
                className="py-12 outline outline-red-700 -outline-offset-8 md:min-h-96 lg:min-h-78 bg-white border shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-gray-200 rounded-xl px-6 flex flex-col gap-4"
                key={index}
              >
                <item.icon className="p-3 h-14 w-14 text-red-700 rounded-lg bg-red-100" />
                <p className="font-bold text-gray-900 text-xl">{item.title}</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll direction="down" delay={0.3}>
          <div className=" flex items-center justify-center">
            <Link
              href="/services"
              className="text-center mt-6 shadow-xl text-gray-900 border border-red-700 bg-white px-6 py-2 rounded-lg active:scale-95 hover:scale-105 hover:shadow-xl hover:bg-red-700 hover:text-white transition-all duration-400"
            >
              View All Services
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      {/*Exp, num of Projects */}
      <section
        className="grid grid-cols-2 space-y-8 md:grid-cols-4 bg-[#1c1f26] py-16 "
        aria-label="Company achievements"
      >
        {ExpInfo.map((item, index) => (
          <AnimateOnScroll
            direction="down"
            delay={0.4 + index * 0.2}
            key={index}
          >
            <div
              className="flex flex-col gap-3 text-center items-center"
              key={index}
            >
              <item.icon className="text-red-700 h-16 w-16 p-4 bg-red-700/30 rounded-full" />
              <p className="text-white font-semibold text-4xl md:text-5xl">
                {item.value}
              </p>
              <p className="text-gray-400">{item.title}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </section>

      <ClientCarousel />

      <section className="bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat grid grid-cols-1 md:grid-cols-2 gap-10 px-4 py-16 md:py-24">
        <AnimateOnScroll direction="right" delay={0.6}>
          <div className=" space-y-6">
            <h2 className="font-bold text-3xl text-red-700 md:text-4xl ">
              Why Choose Us
            </h2>
            <p className="text-gray-500 text-lg">
              With over 15 years of experience in the construction industry, we
              have established ourselves as a trusted name in civil
              construction. Our commitment to quality, safety, and customer
              satisfaction sets us apart.
            </p>
            {features.map((item, index) => (
              <div className="flex flex-row gap-3" key={index}>
                <CheckCircle2 className="text-red-700" />
                <p className="dark:text-gray-900">{item}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="left" delay={0.4}>
          <div className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <Image
              src="/staff.jpeg"
              alt="Construction team of Shubh Construction working on a project site in Gujarat"
              width={800}
              height={600}
              className="object-cover h-full w-full"
              priority
            />
          </div>
        </AnimateOnScroll>
      </section>
    </main>
  );
};

export default page;
