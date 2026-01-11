import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ep1Info from '@/assets/images/SCI-LIKHA-INFO-EP-1.jpg';
import ep2Info from '@/assets/images/SCI-LIKHA-INFO-EP-2.jpg';
import ep3Info from '@/assets/images/SCI-LIKHA-INFO-EP-3.jpg';
import ep4Info from '@/assets/images/SCI-LIKHA-INFO-EP-4.jpg';

const GallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover"
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