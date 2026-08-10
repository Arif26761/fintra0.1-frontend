import Image from 'next/image';

// Each testimonial is a flat image fill in Figma (Test 1..5 inside the Slider
// instance I11625:11055), exported rather than rebuilt as markup — same artwork,
// and no risk of misquoting a named person.
// Test 1 renders at 514x244; the rest at 414x197. Same 2.1:1 aspect either way.
const TESTIMONIALS = [
  {
    id: 'ariful-haque',
    src: '/images/testimonials/ariful-haque.png',
    alt: 'Testimonial from Ariful Haque, Full-Time Trader — rated 5 out of 5',
  },
  {
    id: 'kamrul-islam',
    src: '/images/testimonials/kamrul-islam.png',
    alt: 'Testimonial from Kamrul Islam, Corporate Executive — rated 5 out of 5',
  },
  {
    id: 'nuzhat-chowdhury',
    src: '/images/testimonials/nuzhat-chowdhury.png',
    alt: 'Testimonial from Nuzhat Chowdhury, Entrepreneur — rated 5 out of 5',
  },
  {
    id: 'tanvir-ahmed',
    src: '/images/testimonials/tanvir-ahmed.png',
    alt: 'Testimonial from Tanvir Ahmed, Tech Lead and Part-Time Trader — rated 5 out of 5',
  },
  {
    id: 'sarah-karim',
    src: '/images/testimonials/sarah-karim.png',
    alt: 'Testimonial from Sarah Karim, Investment Analyst — rated 5 out of 5',
  },
];

export default function TestimonialSlider() {
  return (
    <div
      className="relative z-10 flex h-61 w-128.5 shrink-0 snap-x snap-mandatory items-center gap-16.25 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
      tabIndex={0}
      role="region"
      aria-label="What our traders say"
    >
      {TESTIMONIALS.map((item, i) => (
        <Image
          key={item.id}
          src={item.src}
          alt={item.alt}
          width={i === 0 ? 514 : 414}
          height={i === 0 ? 244 : 197}
          priority={i === 0}
          unoptimized
          className={`shrink-0 snap-start rounded-md ${
            i === 0 ? 'h-61 w-128.5' : 'h-49.25 w-103.5'
          }`}
        />
      ))}
    </div>
  );
}
