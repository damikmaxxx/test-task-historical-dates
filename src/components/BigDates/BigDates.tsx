import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './BigDates.module.scss';

interface BigDatesProps {
  startYear: number;
  endYear: number;
}

export const BigDates: React.FC<BigDatesProps> = ({ startYear, endYear }) => {
  const startRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);

  const prevStart = useRef(startYear);
  const prevEnd = useRef(endYear);

  useEffect(() => {
    if (startRef.current) {
      gsap.fromTo(startRef.current,
        { textContent: prevStart.current },
        {
          textContent: startYear,
          duration: 1,
          ease: "power1.out",
          snap: { textContent: 1 },
        }
      );
    }

    if (endRef.current) {
      gsap.fromTo(endRef.current,
        { textContent: prevEnd.current },
        {
          textContent: endYear,
          duration: 1,
          ease: "power1.out",
          snap: { textContent: 1 },
        }
      );
    }

    prevStart.current = startYear;
    prevEnd.current = endYear;

  }, [startYear, endYear]);

  return (
    <div className={styles.bigDates}>
      <span ref={startRef} className={styles.yearBlue}>{startYear}</span>
      <span className={styles.yearSeparator}>&nbsp;&nbsp;</span>
      <span ref={endRef} className={styles.yearPink}>{endYear}</span>
    </div>
  );
};