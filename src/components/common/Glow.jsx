export default function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute rounded-[50%] -left-10 -bottom-26.75 h-37.25 w-110.25 bg-brand-800 blur-[100px] lg:-left-6.5 lg:-bottom-7.75 lg:h-30 lg:w-312.75 lg:opacity-40 lg:blur-[67px]" />
      <span className="absolute rounded-[50%] left-1 -bottom-23 h-29.75 w-88.25 bg-brand-700 blur-[62px] lg:left-6 lg:-bottom-3.5 lg:h-13.75 lg:w-289.75 lg:opacity-50 lg:blur-[41px]" />
      <span className="absolute rounded-[50%] left-7 -bottom-21 h-25.75 w-76.25 bg-brand blur-[7.5px] lg:left-55 lg:-bottom-3.5 lg:h-6.25 lg:w-190 lg:blur-xs" />
    </div>
  );
}
