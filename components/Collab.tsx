import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <>
      <div className="cta-section-02 padding-bottom-140">
        <div className="container">
          <div className="cta-section-02__wrapper bg-black text-white ">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="cta-content-02">
                  <div className="cta-content-02__text-block">
                    <span className="subtitle text-[#f5f5f5]">
                      Get a consultation with our skilled designer
                    </span>
                    <h2 className="cta-content-02__title heading-md ">
                      Let&apos;s make something great together
                    </h2>
                  </div>
                  <div className="cta-content-02__button">
                    <Link
                      href="/contact"
                      className="btn btn-black hvr-black-white border border-white"
                    >
                      Build a project with us
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
