import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ data }: any) {
  return (
    <div className="service-card h-[600px] w-60">
      <div className="service-card__icon m-0">
        <Image height={100} width={100} src={data.image} alt="service icon" />
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{data.Service}</h3>
        <p>{data.Description}</p>
      </div>
      <div className="service-card__footer">
        <Link
          href="/services"
          className="btn btn-primary btn-small w-100 space-between hvr-fill-black"
        >
          view details
          <ArrowUpRight className="w-4 h-4" />
          <span>
            <ArrowUpRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
