"use client";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import React, { useRef, useState } from 'react'
import { FiPhone } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import Link from 'next/link';
import emailjs from '@emailjs/browser';


const ContactDetails= [
  {
    icon: FiPhone,
    title: "Phone",
    value: "+919106286479 +919879227811",
    link: "tel:+919601940724"
  },
  {
    icon: MdMailOutline,
    title: "Email",
    value: "J.talpada@shubhconstructions.com",
    link:"mailto:J.talpada@shubhconstructions.com"
  },
  {
    icon: SlLocationPin ,
    title: "Office Address",
    value: "Office No. C-408, Narayan Luxuria, Umraj, Bharuch, Gujarat, 392001",
    link:"https://www.google.com/maps/place/Narayan+Luxuria+Apartments/@21.7271201,72.9824738,17z/data=!4m6!3m5!1s0x395f89fcb679fb4d:0xab516380da2eac86!8m2!3d21.7271201!4d72.9824738!16s%2Fg%2F12hmyyb35?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    icon: MdOutlineWatchLater,
    title: "Business Hours",
    value: "Monday - Saturday: 9:00 AM - 6:00 PM Sunday: Closed",
    link: "#"
  }
]

const Page = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const form = formRef.current;
    if (!form) return;
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSuccess("Message sent successfully!");
      form.reset();
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28">
      {/* Hero Section */}
      <section className="bg-[url('/bg4.webp')] pt-33 pb-25 bg-center bg-cover bg-no-repeat">
        <AnimateOnScroll direction="down" delay={0.2}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Get in touch with us
            </p>
          </div>
        </AnimateOnScroll>
      </section>
      {/* Send a Message and Contact Info */}
      <section className="py-14 bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat px-4 md:py-18 md:px-12 space-y-12 grid grid-cols-1 md:grid-cols-2 md:gap-12">
        <AnimateOnScroll direction="right" delay={0.4}>
          <form
            className="flex flex-col gap-6"
            ref={formRef}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <h2 className="text-3xl text-red-700 font-bold">
              Send us a Message
            </h2>
            <address className="not-italic grid gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">
                  Full Name
                </label>
                <input
                  suppressHydrationWarning
                  type="text"
                  name="name"
                  placeholder="Enter your Full Name"
                  className="border focus:border-2 text-gray-900 border-black rounded-md px-4 py-2 focus:border-red-700 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              {/* Email Address */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@gmail.com"
                  className="border focus:border-2 text-gray-900 border-black rounded-md px-4 py-2 focus:border-red-700 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 12345 67890"
                  className="border focus:border-2 text-gray-900 border-black rounded-md px-4 py-2 focus:border-red-700 focus:outline-none transition-colors duration-300"
                />
              </div>
              {/* Your Message */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your Message....."
                  className="border focus:border-2 text-gray-900 border-black rounded-md px-4 py-2 focus:border-red-700 focus:outline-none transition-colors duration-300 resize-none"
                  rows={6}
                  required
                />
              </div>
            </address>
            {success && (
              <div className="text-green-600 font-semibold">{success}</div>
            )}
            {error && <div className="text-red-600 font-semibold">{error}</div>}
            <button
              type="submit"
              className="text-white bg-red-600 active:scale-95 hover:bg-red-700 hover:scale-105 transition-all duration-300 px-4 py-2 rounded-xl disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </AnimateOnScroll>
        <AnimateOnScroll direction="left" delay={0.6}>
          <div className="flex flex-col gap-6 ">
            <h2 className="text-3xl text-red-700 font-bold">Get in Touch</h2>
            <h2 className="text-gray-500">
              We believe every successful project begins with clear
              communication—get in touch and let’s discuss your vision.
            </h2>
            {ContactDetails.map((detail, index) => {
              const Content = (
                <>
                  <detail.icon className="text-5xl p-3 shrink-0 text-red-700 bg-red-200 rounded-lg hover:scale-115 transition-all duration-300" />

                  <div>
                    <h3 className="font-bold dark:text-gray-900 mb-1">
                      {detail.title}
                    </h3>

                    {detail.title === "Phone" ? (
                      <>
                        <p className="text-gray-500">
                          <a href="tel:+919601940724">+91 96019 40724</a>
                        </p>
                        <p className="text-gray-500">
                          <a href="tel:+919879227811">+91 98792 27811</a>
                        </p>
                      </>
                    ) : (
                      <p
                        className={`text-gray-500 ${
                          index === 0 ? "pr-25 md:pr-50" : ""
                        }`}
                      >
                        {detail.value}
                      </p>
                    )}
                  </div>
                </>
              );

              // Phone: NO Link
              if (detail.title === "Phone") {
                return (
                  <div className="flex gap-4 pr-15 md:pr-40" key={index}>
                    {Content}
                  </div>
                );
              }

              // Others: use Link
              return (
                <Link
                  href={detail.link}
                  rel="noopener noreferrer"
                  className="flex gap-4 pr-15 md:pr-40"
                  target="_blank"
                  key={index}
                >
                  {Content}
                </Link>
              );
            })}
          </div>
          <div className="h-100 rounded-2xl overflow-hidden mt-6 hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.489012345678!2d72.9799144!3d21.7271201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f89fcb679fb4d%3A0xab516380da2eac86!2sNarayan%20Luxuria%20Apartments!5e0!3m2!1sen!2sin!4v1702123456789"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnimateOnScroll>
      </section>
      {/*Ready to Build */}
      <section className="bg-gray-50 text-center py-14 px-6 flex flex-col gap-4">
        <AnimateOnScroll direction="up" delay={0.2}>
          <h2 className="font-bold text-3xl dark:text-gray-900">
            Ready to Build?
          </h2>
          <p className="text-gray-500 text-lg">
            Get in touch with our experienced construction team and bring your
            ideas to life with confidence and precision.
          </p>
        </AnimateOnScroll>
      </section>
    </main>
  );
}

export default Page