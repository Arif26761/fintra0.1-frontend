'use client';

import { useState } from 'react';
import FaqItem from './FaqItem';

// Questions verbatim from Figma (11619:10748 → 10820, in layout order).
// Figma only specifies the CLOSED state, so it carries no answer copy — these
// are drafted from claims the design itself makes elsewhere on the page and
// need sign-off from the team before launch.
const FAQ_ITEMS = [
  {
    id: 'advantage',
    question: 'What is Fintra and how does it give me an advantage?',
    answer:
      'Fintra is a high-performance trading ecosystem that equips you with institutional-grade tools, real-time data, and expert research to master the market with confidence',
  },
  {
    id: 'realtime',
    question: 'Is the market data truly real-time?',
    answer:
      'Yes. We provide direct-from-exchange data feeds with zero latency, ensuring you witness every price tick and market movement the microsecond it happens.',
  },
  {
    id: 'security',
    question: 'Is my trading data and capital secure with Fintra?',
    answer:
      'Absolutely. We utilize industry-leading encryption and multi-factor authentication to ensure your data, trades, and capital remain protected under bank-grade security protocols.',
  },
  {
    id: 'bo-account',
    question: 'How do I update my official BO Account details?',
    answer:
      'For your security and regulatory compliance, BO account changes cannot be made in-app. Please visit our office in person or contact our support team to initiate an update.',
  },
  {
    id: 'instant-cash',
    question: 'How does the "Instant Cash" feature work?',
    answer:
      'Instant Cash provides immediate liquidity against your pending sales, allowing you to seize new market opportunities instantly without waiting for the standard T+2 settlement cycle.',
  },
];

export default function FaqList() {
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="flex w-full flex-col gap-5">
      {FAQ_ITEMS.map((item) => (
        <FaqItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          open={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
