import React, { useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwP3QjP4hjb2hrRib5lJQox6IyAqWpGBLbHVUngbqfB96qnaGNAEdivNKAZcKjSmssQ/exec";

export default function DownloadFormModal({ pdf, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const submittingRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      submittingRef.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    if (isMountedRef.current) setLoading(true);

    const pdfName = pdf.split("/").pop() || "file.pdf";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Download",
          name,
          email,
          field3: country,
          pdfName,
        }),
      });

      // download trigger
      const link = document.createElement("a");
      link.href = pdf;
      link.download = pdfName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      onClose();
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        submittingRef.current = false;
      } else {
        submittingRef.current = false;
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000] p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-black border border-white rounded-xl p-6 w-full max-w-md shadow-lg text-white relative">
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            if (!submittingRef.current) onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-6 text-center">
          Download Itinerary
        </h3>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="p-3 rounded-md bg-transparent border border-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="p-3 rounded-md bg-transparent border border-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            type="text"
            placeholder="Any other country you want to visit?"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={loading}
            className="p-3 rounded-md bg-transparent border border-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition 
                ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
            >
              {loading ? "Submitting..." : "Submit & Download"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (!submittingRef.current) onClose();
              }}
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-md font-semibold border border-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
