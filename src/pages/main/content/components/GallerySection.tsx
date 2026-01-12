import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ep1Info from '@/assets/images/SCI-LIKHA-INFO-EP-1.jpg';
import ep2Info from '@/assets/images/SCI-LIKHA-INFO-EP-2.jpg';
import ep3Info from '@/assets/images/SCI-LIKHA-INFO-EP-3.jpg';
import ep4Info from '@/assets/images/SCI-LIKHA-INFO-EP-4.jpg';

const GallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const galleryImages = [
    {
      id: 1,
      title: 'Ang Ebolusyon ng Anyong-Buhay sa Kasaysayan ng Mundo',
      image: ep1Info
    },
    {
      id: 2,
      title: 'Ang Mekanismo ng Ebolusyon: Paghubog ng Buhay sa Bawat Nilalang',
      image: ep2Info
    },
    {
      id: 3,
      title: 'Mga Bakas ng Pagbabago: Ang Ebolusyon ng Buhay Mula sa mga Ninuno',
      image: ep3Info
    },
    {
      id: 4,
      title: 'Evolution 101: Ang Kasaysayan ng Ebolusyon—Kung Saan ang Ideya ay Naging Buhay',
      image: ep4Info
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = (image: any) => {
    setSelectedImage(image);
    setShowModal(true);
    setZoomLevel(1);
    setIsAutoPlaying(false);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setZoomLevel(1);
    setIsAutoPlaying(true);
    // Re-enable background scrolling
    document.body.style.overflow = 'unset';
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  useEffect(() => {
    if (!isAutoPlaying || showModal) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isAutoPlaying, showModal]);

  return (
    <section className="relative py-16 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Mga Episodes ng Sci-Likha
        </h2>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
          {/* Images */}
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {galleryImages.map((image) => (
              <div key={image.id} className="min-w-full">
                <div 
                  className="aspect-video relative overflow-hidden cursor-pointer group"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white drop-shadow-lg max-w-3xl mx-auto">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-lg mt-2 drop-shadow-md">
                        Episode {image.id}
                      </p>
                    </div>
                  </div>
                  {/* Click to expand hint */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white/90 text-sm font-semibold flex items-center gap-2">
                      <ZoomIn size={16} />
                      I-click upang palakihin
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full shadow-lg border border-white/30"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full shadow-lg border border-white/30"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 w-3 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Image Modal - Simple & Minimalist */}
      {showModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 md:p-8 overflow-hidden"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl w-full h-[90vh] bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-full transition-all"
              title="Isara"
            >
              <X size={24} />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className="text-white hover:text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-white text-sm font-medium min-w-[50px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="text-white hover:text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
            </div>

            {/* Image Container */}
            <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full h-auto transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;