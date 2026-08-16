import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const LINKS = ['Market', 'Analysis', 'Chart', 'Screener', 'Features'];

export default function Navbar({ active = 'Features' }) {
  return (
    <>
      <NavbarMobile links={LINKS} active={active} />
      <NavbarDesktop links={LINKS} active={active} />
    </>
  );
}
