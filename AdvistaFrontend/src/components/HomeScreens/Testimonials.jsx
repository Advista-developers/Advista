import React from 'react';

const Testimonials = () => {
  return (
    <section className="testimonials py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Trusted by Leading Brands</h2>
      <div className="logo-container flex justify-center space-x-10">
        <img src="SRC/logo1.png" alt="Client 1" className="w-24" />
        <img src="SRC/logo2.png" alt="Client 2" className="w-24" />
        <img src="SRC/logo3.png" alt="Client 3" className="w-24" />
        <img src="SRC/logo4.png" alt="Client 4" className="w-24" />
      </div>
    </section>
  );
};

export default Testimonials;
