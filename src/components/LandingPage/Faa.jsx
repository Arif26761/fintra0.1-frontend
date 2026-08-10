import FaqList from './FaqList';

export default function Faq() {
  return (
    <section
      data-section="faq"
      className="flex h-169.75 w-360 flex-col items-center gap-10 px-30.5"
    >
      <div className="flex h-21 w-full flex-col items-center justify-between">
        <h2 className="text-3xl leading-8.75 font-semibold text-ink capitalize">
          Frequently Asked Questions
        </h2>
        <p className="text-base leading-6 font-light tracking-[0.16px] text-ink-soft">
          You have questions? We have the answers
        </p>
      </div>

      <FaqList />
    </section>
  );
}
