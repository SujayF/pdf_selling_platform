// import { useState, useEffect } from "react";

// const Hero = () => {
//   const arrWords = ["adventure", "escape", "getaway", "vacation"];
//   const [wordIndex, setWordIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWordIndex((prevIndex) => (prevIndex + 1) % arrWords.length);
//     }, 2000); // change word every 2s

//     return () => clearInterval(interval); // cleanup
//   }, []);

//   return (
//     <section className="flex flex-col items-center justify-center h-screen text-center px-4">
//       <h1 className="font-bold leading-tight
//                      text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
//         Are you ready for your next <br /> {" "}
//         <span className="text-blue-500">{arrWords[wordIndex]}?</span>
//       </h1>

//       <p className="mt-4 text-gray-600
//                     text-sm sm:text-base md:text-lg">
//         Curated itineraries for your Europe trip ✈️
//       </p>
//     </section>
//   );
// };

// export default Hero;

import { useState, useEffect } from "react";
import PdfCarousel from "./PdfCarousel";

const pdfs = [
  "/czech republic.pdf",
  "/Norway.pdf",
  "/Austria.pdf",
  "/France.pdf",
  "/Spain.pdf",
  "/Portugal.pdf",
  "/Hungary.pdf",
  "/Greece.pdf",
];

const Hero = () => {
  const arrWords = ["adventure?", "escape?", "getaway?", "vacation?"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = arrWords[wordIndex];
    let typingSpeed = isDeleting ? 80 : 120; // speed for typing/deleting

    const handleTyping = () => {
      if (!isDeleting) {
        // typing characters
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          // pause at full word
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // deleting characters
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % arrWords.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <section className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="font-bold leading-tight text-2xl sm:text-3xl md:text-5xl lg:text-6xl p-8">
        Are you ready for your next <br />
        <span className="text-blue-500">{text}</span>
        <span className="animate-pulse font-light">|</span>
      </h1>

      <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg mb-4">
        Grab your curated itineraries for your Europe trip ✈️
      </p>
      <PdfCarousel pdfs={pdfs} />
    </section>
  );
};

export default Hero;
