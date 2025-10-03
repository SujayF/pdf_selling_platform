export default function ContactSection() {
  const handleClick = () => {
    const form = document.getElementById("enquiry-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        p-4 md:py-6
        text-white font-medium
        text-xl md:text-2xl lg:text-3xl
        transition-colors duration-300 hover:text-gray-400
        cursor-pointer
      "
    >
      Hit me up!
    </button>
  );
}
