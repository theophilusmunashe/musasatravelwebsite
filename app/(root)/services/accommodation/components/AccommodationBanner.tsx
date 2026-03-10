import Image from "next/image";

export default function AccommodationBanner() {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Image
        src="https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg"
        alt="Accommodation Banner"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Accommodation
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto px-4">
            From luxury safari lodges to boutique coastal retreats, we hand-pick your sanctuary for every night of your journey.
          </p>
        </div>
      </div>
    </div>
  );
}
