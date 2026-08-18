'use client';

import { useEffect, useState } from 'react';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const LINKS = ['Market', 'Analysis', 'Chart', 'Screener', 'Features'];

export default function Navbar({ active = 'Features' }) {
  const [topPx, setTopPx] = useState(null);
  const isLanding = active === 'Features';

  useEffect(() => {
    if (isLanding) return;

    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024;
      const initialTop = isDesktop ? 45 : 20;
      const stickyTop = isDesktop ? 5 : 8;
      const computed = Math.max(stickyTop, initialTop - window.scrollY);
      setTopPx(computed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isLanding]);

  const style = !isLanding && topPx !== null ? { top: `${topPx}px` } : undefined;
  const positionClass = isLanding
    ? 'top-5 lg:top-11.25'
    : topPx === null
      ? 'top-5 lg:top-11.25'
      : '';

  return (
    <div
      data-diff-hide
      style={style}
      className={`fixed right-0 left-0 z-50 flex justify-center px-5 lg:px-0 ${positionClass}`}
    >
      <NavbarMobile links={LINKS} active={active} />
      <NavbarDesktop links={LINKS} active={active} />
    </div>
  );
}
