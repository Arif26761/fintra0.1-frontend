import FaqList from './FaqList';

export default function Faq() {
  return (
    <section
      data-section="faq"
      className="flex w-97 lg:w-full max-w-360 flex-col items-center gap-10 lg:px-30.5"
    >
      <div className="flex h-27.25 w-78 flex-col gap-3.75 text-center lg:h-21 lg:w-full lg:justify-between lg:gap-0">
        <h2 className="text-[23px] leading-8.75 font-bold text-ink capitalize lg:text-3xl lg:font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-base leading-6 font-light text-ink capitalize lg:tracking-[0.16px] lg:text-ink-soft lg:normal-case">
          You have questions? We have the answers
        </p>
      </div>

      <FaqList />
    </section>
  );
}
