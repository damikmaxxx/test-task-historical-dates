import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
import { IEvent } from '../../data';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './EventsSlider.module.scss';

interface EventsSliderProps {
  events: IEvent[];
  paginationEl: HTMLElement | null;
}

const CHAR_LIMIT = 120;

const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};

const ArrowIcon = (): React.JSX.Element => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
    <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#3877EE" strokeWidth="2" />
  </svg>
);

export const EventsSlider: React.FC<EventsSliderProps> = ({ events, paginationEl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  useEffect(() => {
    let ctx: gsap.Context;
    if (containerRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(containerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.2
          }
        );
      });
    }

    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, [events, swiperInstance]);

  return (
    <div className={styles.eventsSliderWrapper} ref={containerRef}>
      <button className={`${styles.sliderBtn} ${styles.prevBtn}`}>
        <ArrowIcon />
      </button>

      <button className={`${styles.sliderBtn} ${styles.nextBtn}`}>
        <ArrowIcon />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={3}
        navigation={{
          prevEl: `.${styles.prevBtn}`,
          nextEl: `.${styles.nextBtn}`,
        }}
        observer={true}
        observeParents={true}
        pagination={{
          clickable: true,
          el: paginationEl,
        }}
        onSwiper={setSwiperInstance}
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 25
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 80,
          }
        }}
      >
        {events.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.eventCard}>
              <h4>{item.year}</h4>
              <p>{truncateText(item.description, CHAR_LIMIT)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};