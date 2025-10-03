import AboutMe from "./Aboutme";
import ContactSection from "./ContactSection";
import ScrollSection from "./ScrollSection";

export default function Menu() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar / Topbar */}
      <nav
        className="
          bg-black text-white font-medium
          flex
          md:flex-col
          items-center justify-center
          md:justify-center
          h-16 md:h-screen
          w-full md:w-60
          fixed md:static
          top-0 left-0
          z-50
        "
      >

          {/* About me button */}
          <button
            onClick={() => handleScrollTo("about-me")}
            className="text-lg md:text-2xl lg:text-3xl cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            About me
          </button>
        <div className="flex w-full md:flex-col items-center justify-center md:justify-start space-x-6 md:space-x-0 md:space-y-6">
          {/* Hit me up (scroll to form) */}
          <ContactSection />
        </div>
      </nav>

      {/* Right Content Area */}
      <main
        className="
          flex-1 
          mt-16 md:mt-0 
          md:ml-60 
          p-6
          pr-10
          pl-2 
          overflow-y-auto
        "
      >
        <ScrollSection />
      </main>
    </div>
  );
}
