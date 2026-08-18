export default function SectionIntro() {
  return (
    <section
      data-section="market-intro"
      className="flex h-21 w-full max-w-360 items-center px-30.25"
    >
      <div className="flex h-full w-full max-w-299.5 flex-col justify-between">
        <h1 className="text-[35px] leading-8.75 font-semibold text-ink capitalize">
          Market Overview
        </h1>
        <p className="text-base leading-6 font-light text-ink-soft">
          Get market updates at a glance
        </p>
      </div>
    </section>
  );
}
