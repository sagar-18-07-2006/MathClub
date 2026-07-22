import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils.js';
import { FaListUl } from 'react-icons/fa';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'members', label: 'Members' },
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <div className="fixed right-8 top-[35%] z-[100] hidden xl:flex flex-col items-start gap-4 select-none pointer-events-auto">
      {/* Title */}
      <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
        <FaListUl className="w-3 h-3 text-zinc-400" />
        <span>On this page</span>
      </div>

      {/* Navigation List */}
      <div className="relative pl-6 flex flex-col gap-4 py-2">
        {/* Track Line */}
        <div className="absolute left-[3.5px] top-4 bottom-4 w-[1.5px] bg-[#1e3457]/50 rounded" />

        {/* Active Line Segment */}
        <div 
          className="absolute left-[3.5px] w-[1.5px] bg-white transition-all duration-300 ease-out"
          style={{
            top: '16px',
            height: `${activeIndex * 48}px`,
          }}
        />

        {/* Active Dot Indicator */}
        <div 
          className="absolute left-[-0.5px] w-2.5 h-2.5 rounded-full bg-white border border-[#0d1b2e] shadow-[0_0_8px_#ffffff] transition-all duration-300 ease-out"
          style={{
            top: `${activeIndex * 48 + 11}px`,
          }}
        />

        {/* Items */}
        {sections.map((sec) => {
          const isActive = sec.id === activeSection;
          return (
            <button
              key={sec.id}
              onClick={() => handleClick(sec.id)}
              className={cn(
                "h-8 flex items-center text-left text-sm font-medium transition-all duration-300 outline-none hover:text-white",
                isActive ? "text-white font-semibold scale-105" : "text-zinc-500"
              )}
            >
              {sec.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TableOfContents;
