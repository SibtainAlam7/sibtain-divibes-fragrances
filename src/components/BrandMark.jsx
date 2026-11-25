import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandMark({ size = 'md' }) {
  const heightClass =
    size === 'sm' ? 'h-10' : 'h-11 md:h-12';

  return (
    <Link
      to="/"
      className="group inline-flex items-center p-0 m-0 focus:outline-none"
      aria-label="DiVibes Fragrances Home"
    >
      <img
        src="/LOGO.svg"
        alt="DiVibes Fragrances"
        className={`${heightClass} w-auto object-contain p-0 m-0 transition-transform duration-300 group-hover:scale-[1.03]`}
      />
    </Link>
  );
}
