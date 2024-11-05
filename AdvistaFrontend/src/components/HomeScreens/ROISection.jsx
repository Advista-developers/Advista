import React from 'react';

const ROISection = () => {
  return (
    <section className="roi-section py-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        Maximize ROI while spending less time managing ads
      </h2>

      <div className="reviews-container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="review bg-white p-8 rounded-lg shadow-md">
          <p>"This service has drastically improved our ROI. We spend less time managing ads and more time focusing on our business!"</p>
          <span className="text-gray-500">- Client A</span>
        </div>
        <div className="review bg-white p-8 rounded-lg shadow-md">
          <p>"The automation tools are incredible. It's saved us so much time while increasing ad performance. Highly recommend!"</p>
          <span className="text-gray-500">- Client B</span>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
