import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BrandMarqueeStrip from '../components/home/BrandMarqueeStrip';
import OurProductsSection from '../components/home/OurProductsSection';
import NewArrivalSection from '../components/home/NewArrivalSection';
import EditorialExtrasSection from '../components/home/EditorialExtrasSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <BrandMarqueeStrip />
      <OurProductsSection />
      <NewArrivalSection />
      <EditorialExtrasSection />
    </div>
  );
}
