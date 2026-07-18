'use client';

import { useEffect, useState, useRef } from 'react';

interface StatsProps {
  yearsExperience: number;
  casesHandled: number;
  clientSatisfaction: number;
}

export default function StatsCounter({ yearsExperience, casesHandled, clientSatisfaction }: StatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [years, setYears] = useState(0);
  const [cases, setCases] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, yearsExperience, 2000, setYears);
    animateValue(0, casesHandled, 2000, setCases);
    animateValue(0, clientSatisfaction, 2000, setSatisfaction);
  }, [isVisible, yearsExperience, casesHandled, clientSatisfaction]);

  return (
    <section className="section section-bg-light" ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-3">
          <div className="stat-item glass-card animate-fade-in-up">
            <div className="stat-number">{years}+</div>
            <div className="stat-label">Tahun Pengalaman</div>
          </div>
          <div className="stat-item glass-card animate-fade-in-up animate-delay-1">
            <div className="stat-number">{cases}+</div>
            <div className="stat-label">Kasus Ditangani</div>
          </div>
          <div className="stat-item glass-card animate-fade-in-up animate-delay-2">
            <div className="stat-number">{satisfaction}%</div>
            <div className="stat-label">Kepuasan Klien</div>
          </div>
        </div>
      </div>
    </section>
  );
}
