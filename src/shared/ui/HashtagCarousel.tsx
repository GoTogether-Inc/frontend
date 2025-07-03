import { useRef, useState, useEffect } from 'react';

interface HashtagCarouselProps {
  hashtagSlides: string[];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const HashtagCarousel = ({ hashtagSlides, onClick }: HashtagCarouselProps) => {
  const currentIndex = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (currentIndex.current) {
      const { scrollLeft, scrollWidth, clientWidth } = currentIndex.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const ref = currentIndex.current;
    if (!ref) return;
    ref.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      ref.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const rightScrollByAmount = () => {
    if (currentIndex.current) {
      currentIndex.current.scrollBy({
        left: currentIndex.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const leftScrollByAmount = () => {
    if (currentIndex.current) {
      currentIndex.current.scrollBy({
        left: -currentIndex.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  console.log('hashtagSlides', hashtagSlides);

  return (
    <div onClick={onClick} className="relative w-full max-w-xl mx-auto group">
      {!isAtStart && (
        <button
          className="w-6 h-6 flex items-center justify-center absolute left-0 z-10 top-1/2 -translate-y-1/3 bg-white px-1 py-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={leftScrollByAmount}
        >
          {"<"}
        </button>
      )}

      <div
        ref={currentIndex}
        style={{ scrollSnapType: 'x mandatory' }}
        className="flex w-full h-6 mt-2 overflow-hidden text-xs font-semibold text-gray-700 whitespace-nowrap"
      >
        {(hashtagSlides ?? []).map((tag, index) => (
          <span
            key={index}
            style={{ scrollSnapAlign: 'start' }}
            className="flex items-center justify-center h-6 px-2 mr-2 bg-gray-200 rounded last:mr-0"
          >
            {tag}
          </span>
        ))}
      </div>

      {!isAtEnd && (
        <button
          className="w-6 h-6 flex items-center justify-center absolute right-0 z-10 top-1/2 -translate-y-1/3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={rightScrollByAmount}
        >
          {">"}
        </button>
      )}
    </div>
  );
}

export default HashtagCarousel;