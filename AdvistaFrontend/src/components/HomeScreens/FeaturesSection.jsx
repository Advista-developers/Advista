import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="features py-10 bg-white">
      <h2 className="text-3xl font-bold text-center">Why Choose ADvista?</h2>
      <div className="features-container flex justify-center gap-6 mt-8">
        <div className="feature-box bg-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold">AI-Powered Ads</h3>
          <p className="mt-2">Optimize your campaigns automatically.</p>
        </div>
        <div className="feature-box bg-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold">Creative Insights</h3>
          <p className="mt-2">Analyze and improve ad creatives.</p>
        </div>
        <div className="feature-box bg-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold">Advanced Targeting</h3>
          <p className="mt-2">Find the best audience for your ads.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
