"use client";
import React, { useState, useRef } from "react";
import AnimateOnScroll from "../../components/AnimateOnScroll";
import { CheckCircle2 } from 'lucide-react';
import { buildApiUrl } from "@/utils/config";



const JobApp = [
  {
    title: "Full Name",
    name: "fullname",
    example: "Dev Talpada",
  },
  {
    title: "Email Address",
    name: "email",
    example: "example@gmail.com",
  },
  {
    title: "Mobile No.",
    name: "mobile",
    example: "+912323232323",
  },
  {
    title: "Total Years of Experience",
    name: "total_experience",
    example: "10",
  },
  {
    title: "Currently Working At",
    name: "current_employer",
    example: "XYZ Construction",
  }
];

const Page = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(buildApiUrl("/api/job-application"), {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("Application sent successfully!");
        setError("");
        form.reset();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to send application");
      }
    } catch (err) {
      setError("Failed to send application");
    }
  };

  return (
    <main className="pt-28">
      {/* Hero Section */}
      <section className="bg-[url('/bg4.webp')] pt-33 pb-25 bg-center bg-cover bg-no-repeat">
        <AnimateOnScroll direction="down" delay={0.2}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Careers at Shubh Construction
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl">
              Build your career with Shubh Construction in Gujarat.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      <section className="py-14 bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat px-4 md:py-18 md:px-12 space-y-12 grid grid-cols-1 md:grid-cols-2 md:gap-12">
        {/* Left Content */}
        <AnimateOnScroll direction="right" delay={0.2}>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-red-700">
              Build Your Career With Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At{" "}
              <span className="font-semibold text-gray-900">
                Shubh Construction
              </span>
              , we are hiring civil engineers, supervisors, and project managers
              for ongoing industrial and commercial construction projects in
              Bharuch, Gujarat.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-4">
                <CheckCircle2 className="text-red-700" /> Work on large-scale
                projects
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-red-700" /> Growth-focused
                environment
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-red-700" /> Experienced leadership
                & team
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-red-700" /> Competitive
                compensation
              </li>
            </ul>
          </div>
          <section className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-red-700 md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div>
              <strong className="text-gray-900">
                Do you offer construction jobs in Bharuch?
              </strong>
              <br />
              <p className="text-gray-600 mt-2">
                Yes, we hire for multiple on-site roles in Bharuch, Gujarat.
              </p>
            </div>
            <div>
              <strong className="text-gray-900">How can I apply?</strong>
              <br />
              <p className="text-gray-600 mt-2">
                Fill out the form and upload your resume.
              </p>
            </div>
          </section>
          <p className="text-sm text-gray-600 mt-6">
            Job Location: Gujarat, India
          </p>
        </AnimateOnScroll>

        {/* Form */}
        <AnimateOnScroll direction="left" delay={0.6}>
          <form
            ref={formRef}
            encType="multipart/form-data"
            className="space-y-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="text-2xl md:text-3xl font-bold text-red-700">
              Apply Here
            </h2>
            {JobApp.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label
                  htmlFor={item.name}
                  className="text-sm font-bold text-gray-700"
                >
                  {item.title}
                </label>
                <input
                  type={
                    item.name === "email"
                      ? "email"
                      : item.name === "mobile"
                        ? "tel"
                        : item.name === "total_experience"
                          ? "number"
                          : "text"
                  }
                  id={item.name}
                  name={item.name}
                  placeholder={item.example}
                  className="border text-gray-900 focus:border-2 border-black rounded-md px-4 py-2
                             focus:border-red-700 focus:outline-none
                             transition-colors duration-300"
                  required
                />
              </div>
            ))}
            <div className="md:flex md:justify-between md:gap-5 max-md:flex-row space-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700">
                  Position
                </label>
                <select
                  name="position"
                  className="border border-black text-gray-900 rounded-md px-6 py-2
                             focus:border-red-700 transition-colors duration-300"
                  required
                >
                  <option value="Senior Engineer">Senior Engineer</option>
                  <option value="Junior Engineer">Junior Engineer</option>
                  <option value="Quality Engineer">Quality Engineer</option>
                  <option value="Safety Engineer">Safety Engineer</option>
                  <option value="Billing Engineer">Billing Engineer</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Junior Supervisor">Junior Supervisor</option>
                  <option value="Civil Supervisor">Civil Supervisor</option>
                  <option value="Safety Supervisor">Safety Supervisor</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Fitter">Fitter</option>
                  <option value="Welder">Welder</option>
                  <option value="Helper">Helper</option>
                  <option value="Electrician">Electrician</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <label className="text-sm font-bold text-gray-700">
                  Your Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="w-full border border-black rounded-md px-4 py-2
                             focus:border-red-700 focus:outline-none
                             file:mr-3 file:py-2 file:px-4
                             file:border-0 file:rounded-md
                             file:bg-red-700 file:text-white
                             hover:file:bg-red-800"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white w-full bg-red-600 active:scale-95 hover:bg-red-700 hover:scale-105 transition-all duration-300 px-4 py-2 rounded-xl"
            >
              Submit Your Application
            </button>
            {message && (
              <div className="text-green-600 font-semibold text-center mt-2">
                {message}
              </div>
            )}
            {error && (
              <div className="text-red-600 font-semibold text-center mt-2">
                {error}
              </div>
            )}
          </form>
        </AnimateOnScroll>
      </section>
    </main>
  );
};

export default Page;
