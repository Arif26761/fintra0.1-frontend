export default function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute -left-6.5 -bottom-7.75 h-30 w-312.75 rounded-[50%] bg-brand-800 opacity-40 blur-[67px]" />
      <span className="absolute left-6 -bottom-3.5 h-13.75 w-289.75 rounded-[50%] bg-brand-700 opacity-50 blur-[41px]" />
      <span className="absolute left-55 -bottom-3.5 h-6.25 w-190 rounded-[50%] bg-brand blur-xs" />
    </div>
  );
}
