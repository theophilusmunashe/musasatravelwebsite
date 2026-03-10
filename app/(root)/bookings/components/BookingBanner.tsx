import Image from "next/image";
import { motion } from "framer-motion";

export default function BookingBanner() {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Image
        src="https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg"
        alt="Bookings Banner"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Book Your
              <span className="block text-amber-400">African Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Create your perfect journey under our canopy. Choose your services, select your dates, and let us craft an unforgettable experience.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
