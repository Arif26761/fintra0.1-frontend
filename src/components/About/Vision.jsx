export default function Vision() {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-10 w-full">
      {/* Mission */}
      <div className="flex-1 max-w-full lg:max-w-144.75 flex flex-col gap-3.75">
        <h2 className="text-2xl lg:text-3xl font-semibold text-ink capitalize">Our Mission</h2>
        <p className="text-base font-light leading-6 text-ink-soft">
          To democratize access to Bangladesh&rsquo;s capital market by making investing simpler,
          more transparent, and more client-focused. <br />
          We exist to empower every investor &mdash; from first-time participants to experienced
          traders &mdash; with the tools, knowledge, service, and confidence they need to take
          control of their financial future.
        </p>
      </div>

      {/* Vision */}
      <div className="flex-1 max-w-full lg:max-w-144.75 flex flex-col gap-3.75">
        <h2 className="text-2xl lg:text-3xl font-semibold text-ink capitalize">Our Vision</h2>
        <p className="text-base font-light leading-6.75 text-ink-soft">
          To become Bangladesh&rsquo;s most trusted and accessible investment platform, transforming
          how people understand, access, and participate in the capital market. <br />
          We envision a future where investing is no longer intimidating or exclusive, but clear,
          digital, inclusive, and built around the long-term financial well-being of every client.
        </p>
      </div>
    </section>
  );
}
