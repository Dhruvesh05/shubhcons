import React from 'react'
import { PhoneCall } from "lucide-react";
const CallButton = () => {
  return (
    <a
      href="tel:+919601940724"
      aria-label="Call us"
      title="Call us"
      className="fixed md:bottom-10 bottom-4 md:left-10 left-4 z-50 rounded-full bg-green-600 p-3 hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-green-700"
    >
      <PhoneCall className="w-5 h-5 text-white stroke-[3]" />
    </a>
  );
}

export default CallButton