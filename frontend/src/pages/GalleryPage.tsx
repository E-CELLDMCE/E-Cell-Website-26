import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  "/img_vid/gallery/IMG-20250930-WA0400.jpg",
  "/img_vid/gallery/11.jpeg",
  "/img_vid/gallery/DSC_0037.JPG",
  "/img_vid/gallery/DSC_0131.JPG",
  "/img_vid/gallery/DSC_0249.JPG",
  "/img_vid/gallery/DSC_0266.JPG",
  "/img_vid/gallery/DSC_0305.JPG",
  "/img_vid/gallery/DSC_0313.JPG",
  "/img_vid/gallery/DSC_0369.JPG",
  "/img_vid/gallery/DSC_0549.JPG",
  "/img_vid/gallery/DSC_0555.JPG",
  "/img_vid/gallery/DSC_0567.JPG",
  "/img_vid/gallery/DSC_0571.JPG",
  "/img_vid/gallery/DSC_0635 (1).JPG",
  "/img_vid/gallery/DSC_1004 (58).JPG",
  "/img_vid/gallery/DSC_1004 (98).JPG",
  "/img_vid/gallery/IMG_8142.JPG",
  "/img_vid/gallery/IMG_8326.JPG",
  "/img_vid/gallery/IMG_8334.JPG",
  "/img_vid/gallery/IMG-20250813-WA0349.jpg",
  "/img_vid/gallery/IMG-20250813-WA0353.jpg",
];

export const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img_vid/gallery/background.png')",
        }}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/75" />

      {/* Page Content */}
      <div className="relative z-10 px-5 pt-32 pb-20">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-heading mb-12"
        >
          Our Moments
        </motion.h1>

        <div className="max-w-6xl mx-auto">

          {/* ================= FEATURED IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onClick={() => setSelectedImage(images[0])}
            className="group w-full h-[280px] sm:h-[380px] md:h-[500px] overflow-hidden rounded-2xl mb-6 cursor-pointer"
          >
            <img
              src={images[0]}
              alt="E-CELL DMCE"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* ================= OTHER IMAGES ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {images.slice(1).map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.05,
                }}
                onClick={() => setSelectedImage(image)}
                className="group aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={image}
                  alt={`E-CELL moment ${index + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}

          </div>
        </div>
      </div>

      {/* ================= FULLSCREEN IMAGE ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-5"
          >

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-colors"
              aria-label="Close image"
            >
              <X size={26} />
            </button>

            {/* Fullscreen Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt="E-CELL DMCE moment"
              onClick={(e) => e.stopPropagation()}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
            />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GalleryPage;