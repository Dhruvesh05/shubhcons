import AnimateOnScroll from "./AnimateOnScroll";import Image from "next/image";
export default function ClientsCarousel() {

 const clients = [
  { id: 1, name: "Abbott", logo: "abbot_logo.webp" },
  { id: 2, name: "Aditya Birla Group", logo: "aditya_birla.webp" },
  { id: 3, name: "Atvantic Finechem", logo: "atvantic.webp" },
  { id: 4, name: "Birla Cellulose", logo: "birla_cellulose.webp" },
  { id: 5, name: "Godrej", logo: "godrej.webp" },
  { id: 6, name: "Reliance", logo: "reliance.webp" },
  { id: 7, name: "Daramic", logo: "Daramic.webp" },
  { id: 8, name: "DCM shriram", logo: "dcm_shriram.webp" },
{ id: 9, name: "Detox India", logo: "detox_india.webp" },
{ id: 10, name: "Elantas", logo: "elantas.webp" },
{ id: 11, name: "GoldFinch", logo: "goldfinch.webp" },
{ id: 12, name: "Hikal", logo: "hikal.webp" },
{ id: 13, name: "indofil", logo: "indofil.webp" },
{ id: 14, name: "MG", logo: "mg.webp" },
{ id: 15, name: "Pidilite", logo: "pidilite.webp" },
{ id: 16, name: "GFL", logo: "gfl.webp" },
{ id: 17, name: "VaTechWabag", logo: "vatechwabag.webp" },
{ id: 18, name: "Nerolac", logo: "nerolac.webp" },
];
  return (
    <section
      className="bg-gray-50 py-20 overflow-hidden"
      aria-labelledby="clients-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <AnimateOnScroll direction="up" delay={0.3}>
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl text-red-700 mb-6 text-center font-semibold"
              id="clients-heading"
            >
              Our Esteemed Clients
            </h2>
            <p className="mt-3 text-gray-500 text-center text-lg">
              Trusted by industry leaders across multiple sectors
            </p>
          </div>
        </AnimateOnScroll>
        {/* Moving track */}
        <div className="flex w-max animate-clients-marquee gap-4 " role="list">
          {[...clients, ...clients].map((client, index) => (
            <div
              aria-hidden={index >= clients.length}
              className="relative w-56 h-32 transition-all duration-400
      hover:scale-105 bg-white shadow-xl hover:shadow-2xl rounded-xl border-[1] border-gray-200 flex items-center justify-center outline outline-1 outline-black outline-offset-[-6px]"
              key={index}
            >
              <Image
                src={`/clients/${client.logo}`}
                alt={`${client.name} – client of Shubh Construction`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 200px, 250px"
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}