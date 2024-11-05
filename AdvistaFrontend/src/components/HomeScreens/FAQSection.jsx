import React from 'react';
import FAQItem from './FAQItem';

const FAQSection = () => {
  const faqData = [
    {
      question: "Can I use AI Marketer for any business size?",
      answer: "Yes, AI Marketer is designed to work for businesses of all sizes, from small startups to large enterprises."
    },
    {
      question: "Can I use AI Marketer for my agency?",
      answer: "Absolutely, AI Marketer is ideal for agencies as it helps manage multiple ad accounts efficiently."
    },
    {
      question: "What ADvista plans include AI Marketer?",
      answer: "AI Marketer is included in all ADvista plans, providing flexibility for every budget."
    },
    {
      question: "How much does AI Marketer cost?",
      answer: "AI Marketer's pricing depends on your selected plan. Contact our sales team for details."
    },
    {
      question: "Can I try it for free?",
      answer: "Yes, you can start with a free trial to explore all features before committing to a plan."
    }
  ];

  return (
    <section className="faq-section py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
