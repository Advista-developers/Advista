import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item border-b border-gray-300 py-4">
      <button onClick={toggleFAQ} className="faq-question text-left w-full font-semibold text-lg">
        {question}
      </button>
      {isOpen && <div className="faq-answer mt-2 text-gray-600">{answer}</div>}
    </div>
  );
};

export default FAQItem;
