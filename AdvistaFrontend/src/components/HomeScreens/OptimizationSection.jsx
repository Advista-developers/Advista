import React from 'react';

const OptimizationSection = ({ title, videoSrc }) => {
  return (
    <section className="optimization-section py-20 bg-gray-900 text-white">
      <div className="text-container max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold">{title}</h2>
      </div>
      <div className="video-container max-w-4xl mx-auto">
        <video controls loop className="w-full rounded-md">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default OptimizationSection;
