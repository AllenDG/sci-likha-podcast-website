import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample gallery images - replace with your actual images
  const galleryImages = [
    {
      id: 1,
      src: '/assets/images/gallery-1.jpg',
      alt: 'Gallery Image 1',
      title: 'Episode Highlight 1'
    },
    {
      id: 2,
      src: '/assets/images/gallery-2.jpg',
      alt: 'Gallery Image 2',
      title: 'Episode Highlight 2'
    },
    {
      id: 3,
      src: '/assets/images/gallery-3.jpg',
      alt: 'Gallery Image 3',
      title: 'Episode Highlight 3'
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

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isAutoPlaying]);

  return (
    <section className="relative py-16 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Sci-Likha Episodes
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
                <div className="aspect-video bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 shadow-xl border border-white/30">
                      <svg 
                        className="w-16 h-16 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{image.title}</h3>
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
    </section>
  );
};

export default GallerySection;