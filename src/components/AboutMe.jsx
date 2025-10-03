export default function AboutMe() {
  return (
    <section
      id="about-me" // 👈 important
      className="flex flex-col items-center justify-center h-screen text-center px-6"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
      <p className="text-gray-600 max-w-lg leading-relaxed text-sm md:text-base">
        Hey 👋 I’m Hardik.  
        I create budget-friendly European travel itineraries for Gen Z explorers.  
        My goal: minimal and stress-free planning.  
      </p>
    </section>
  );
}
