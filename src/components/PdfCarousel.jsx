import React, { useEffect, useRef, useState } from "react";
import DownloadFormModal from "./DownloadFormModal";
import pdfIcon from "/icons8-pdf-100.png";

export default function PdfCarousel({ pdfs }) {
  const trackRef = useRef(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = (track.scrollWidth - track.clientWidth) / 2;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.8;
    trackRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full mx-auto max-w-5xl px-10">
      {/* Left Arrow (desktop only) */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 
             bg-black text-white p-3 rounded-full shadow 
             hover:bg-gray-800 transition z-10 border border-white cursor-pointer"
      >
        ◀
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 
             bg-black text-white p-3 rounded-full shadow 
             hover:bg-gray-800 transition z-10 border border-white cursor-pointer"
      >
        ▶
      </button>

      {/* Scrollable Track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
      >
        {pdfs.map((pdf) => {
          const filename = pdf.split("/").pop().replace(".pdf", "");
          return (
            <div
              key={pdf}
              className="relative w-44 h-44 flex-shrink-0
                         snap-start flex items-center justify-center
                         bg-white text-black border border-gray-300 rounded-lg shadow 
                         hover:shadow-lg hover:bg-gray-100 transition cursor-pointer group p-3"
            >
              {/* Icon + Filename inline */}
              <div className="flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                <img src={pdfIcon} alt="PDF icon" className="w-6 h-6" />
                <p className="text-sm sm:text-base font-medium truncate max-w-[120px]">
                  {filename}
                </p>
              </div>

              {/* Hover Download Button */}
              <button
                onClick={() => setSelectedPdf(pdf)}
                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 
                           bg-blue-500 text-white px-3 py-1 rounded-md text-xs
                           hover:bg-blue-600"
              >
                Download
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedPdf && (
        <DownloadFormModal
          pdf={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}

      {/* Hide scrollbar but keep scroll */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;             /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}
