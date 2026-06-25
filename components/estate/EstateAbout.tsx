import Image from "next/image";
import brandStory from "@/assets/brand_story.png";

const offerings = [
  {
    title: "Six en-suite bedrooms",
    body: "Sleep up to twelve guests across a fully private estate — ideal for families, retreats, or exclusive group stays.",
  },
  {
    title: "Events & celebrations",
    body: "Host weddings, conferences, and intimate gatherings with on-estate coordination and Victoria Falls on your doorstep.",
  },
  {
    title: "Curated experiences",
    body: "Wine tastings, sip & paint evenings, private dining, and falls excursions — all woven into estate life.",
  },
  {
    title: "Your place by the river",
    body: "Warm hospitality, secure grounds, and the rhythm of the Zambezi — Kumusha means home, and this estate is ours to share.",
  },
];

export default function EstateAbout({ sectionId = "the-estate" }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="bg-estate-ivory py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-estate-terracotta">
              The estate
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.625rem,4vw,2.125rem)] leading-tight text-estate-ink">
              Heritage, warmth, and room to breathe
            </h2>
            <p className="mt-4 text-base leading-relaxed text-estate-muted md:text-lg">
              Tucked away on 2.5 hectares of serene land near Victoria Falls,
              Kumusha Ekhayalethu is a private estate sanctuary — for stays, hosted
              events, and ticketed gatherings. The name weaves Shona, Ndebele, and
              Zulu: home that belongs to us all.
            </p>
            <ul className="mt-8 space-y-5">
              {offerings.map((item) => (
                <li key={item.title} className="border-l-2 border-estate-amber pl-4">
                  <h3 className="font-medium text-estate-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-estate-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-estate-border">
            <div className="relative aspect-[4/5] w-full md:aspect-[5/6]">
              <Image
                src={brandStory}
                alt="Kumusha Ekhayalethu estate grounds"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
