import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { IPeriod } from '../../data';
import { CircleNav } from '../CircleNav/CircleNav';
import { BigDates } from '../BigDates/BigDates';
import { EventsSlider } from '../EventsSlider/EventsSlider';
import styles from './HistoricalDates.module.scss';


const ArrowIcon = (): React.JSX.Element => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
  </svg>
);

interface HistoricalDatesProps {
  items: IPeriod[];
}

export const HistoricalDates: React.FC<HistoricalDatesProps> = ({ items }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);
  if (!items || items.length === 0) {
    return null;
  }

  const currentPeriod = items[activeIdx];
  const handlePrev = (): void => {
    if (activeIdx > 0) setActiveIdx(activeIdx - 1);
  };

  const handleNext = (): void => {
    if (activeIdx < items.length - 1) setActiveIdx(activeIdx + 1);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 }
      );
    });

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <div className={styles.container}>
      <h1 className={styles.blockTitle}>
        Исторические <br /> даты
      </h1>

      <BigDates
        startYear={currentPeriod.years[0]}
        endYear={currentPeriod.years[1]}
      />

      <div ref={titleRef} className={styles.mobileCategoryTitle}>
        {currentPeriod.title}
      </div>

      <CircleNav
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        data={items}
      />

      <EventsSlider
        events={currentPeriod.events}
        paginationEl={paginationEl}
      />

      <div className={styles.controls}>
        <div className={styles.navGroup}>
          <div className={styles.counter}>
            0{activeIdx + 1}/0{items.length}
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles.navBtn} ${styles.prev}`}
              onClick={handlePrev}
              disabled={activeIdx === 0}
            >
              <ArrowIcon />
            </button>

            <button
              className={`${styles.navBtn} ${styles.next}`}
              onClick={handleNext}
              disabled={activeIdx === items.length - 1}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div ref={(node) => setPaginationEl(node)} className={styles.customPagination}></div>
      </div>

      <div className={styles.verticalLine} />
      <div className={styles.horizontalLine} />
    </div>
  );
};