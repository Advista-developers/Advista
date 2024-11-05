import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero py-10 bg-gray-100">
      <div className="hero-content text-center">
        <h1 className="text-5xl font-bold">Your Personal AI Media Buyer</h1>
        <p className="subheading text-xl mt-4">
          Get more from your advertising budget with the first-ever media-buying AI that constantly audits your ad account, tells you exactly what to do to improve results, and prepares everything you need to implement those recommended actions at the click of a button.
        </p>
        <button className="cta-button bg-red-500 text-white font-semibold py-2 px-6 mt-6 rounded">
          Start Free Trial
        </button>
        <p className="trusted-by mt-4">Trusted by 200,000+ advertisers</p>
      </div>
    </section>
  );
};

export default HeroSection;
