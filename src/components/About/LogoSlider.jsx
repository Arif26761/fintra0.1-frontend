import Image from 'next/image';

const logos = [
  { src: '/images/sliding-bar/cotton-logo.png', alt: 'Cotton Logo' },
  { src: '/images/sliding-bar/Jamuna.png', alt: 'Jamuna Bank Logo' },
  { src: '/images/sliding-bar/BG-logo.png', alt: 'BG TEL Logo' },
];

export default function LogoSlider() {
  // Duplicate logos array multiple times to ensure seamless infinite looping track
  const sliderLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="relative overflow-hidden mx-auto flex items-center bg-bg logo-slider-container">
      <div className="left-blur-element" />

      <div className="right-blur-element" />

      <div className="flex w-max items-center animate-marquee shrink-0">
        <div className="flex items-center justify-around gap-12 lg:gap-16 px-6 shrink-0 min-w-max">
          {sliderLogos.map((logo, index) => (
            <div
              key={`set1-${index}`}
              className="flex items-center justify-center shrink-0 h-14 px-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={60}
                className="h-11 lg:h-14 w-auto max-h-15 max-w-47.5 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-around gap-12 lg:gap-16 px-6 shrink-0 min-w-max">
          {sliderLogos.map((logo, index) => (
            <div
              key={`set2-${index}`}
              className="flex items-center justify-center shrink-0 h-14 px-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={60}
                className="h-11 lg:h-14 w-auto max-h-15 max-w-47.5 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
