import React, { useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwP3QjP4hjb2hrRib5lJQox6IyAqWpGBLbHVUngbqfB96qnaGNAEdivNKAZcKjSmssQ/exec";

export default function EnquiryForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          formType: "Enquiry",
          name,
          email,
          field3: itinerary,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setStatus("Enquiry submitted!");
      setName("");
      setEmail("");
      setItinerary("");

      // ✅ trigger close if callback exists
      if (onSuccess) {
        setTimeout(() => onSuccess(), 800); // small delay for UX
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("⚠️ Submission failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="enquiry-form"
      onSubmit={handleSubmit}
      noValidate
      className="w-11/12 max-w-md mx-auto bg-black text-white p-6 flex flex-col gap-4 shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-2 text-center">
        Custom Itinerary Enquiry
      </h3>

      <input
        type="text"
        placeholder="Your Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-md bg-transparent border border-white focus:outline-none focus:border-gray-400 placeholder-gray-400"
      />

      <input
        type="email"
        placeholder="Your Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-md bg-transparent border border-white focus:outline-none focus:border-gray-400 placeholder-gray-400"
      />

      <input
        type="text"
        placeholder="Which custom itinerary do you want?"
        required
        value={itinerary}
        onChange={(e) => setItinerary(e.target.value)}
        className="w-full p-3 rounded-md bg-transparent border border-white focus:outline-none focus:border-gray-400 placeholder-gray-400"
      />

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-md font-semibold transition ${
            loading
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {status && <p className="text-center text-sm mt-2">{status}</p>}
    </form>
  );
}
