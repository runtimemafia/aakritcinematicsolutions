import { motion } from "framer-motion";
import clsx from "clsx";

interface DiagonalGalleryProps {
  className?: string;
  speed?: number;
  reverse?: boolean;
}

const columnImages = [
  "https://images.unsplash.com/photo-1492691523567-6119e245dafe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542204172-3c22730a94b4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498622205843-3b0ac17f8ba4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518709766631-a6a7f459ef1c?q=80&w=600&auto=format&fit=crop",
];

const ScrollColumn = ({ speed = 20, reverse = false }: { speed?: number; reverse?: boolean }) => {
  // Triple items for extremely smooth infinite scroll
  const images = [...columnImages, ...columnImages, ...columnImages];
  const itemHeight = 300; // base height
  const gap = 80; // gap-20 (80px)
  const totalHeight = (itemHeight + gap) * columnImages.length;

  return (
    <div className="flex flex-col gap-20 relative">
      <motion.div
        className="flex flex-col gap-20"
        animate={{
          y: reverse ? [-totalHeight, 0] : [0, -totalHeight],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-[180px] h-[260px] md:w-[220px] md:h-[300px] flex-shrink-0 rounded-[1.25rem] overflow-hidden border border-white/5 shadow-2xl relative group"
          >
            <img
              src={src}
              alt={`Cinema still ${index}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const DiagonalGallery = ({ className }: DiagonalGalleryProps) => {
  return (
    <div className={clsx("relative w-full h-[120vh] overflow-hidden flex justify-center gap-16", className)}>
      <div className="flex gap-16 transform rotate-[25deg] scale-125 origin-center">
        <ScrollColumn speed={40} />
        <ScrollColumn speed={30} reverse />
      </div>
    </div>
  );
};

export default DiagonalGallery;
