import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IPeriod } from '../../data';
import styles from './CircleNav.module.scss';

interface CircleNavProps {
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
  data: IPeriod[];
}

export const CircleNav: React.FC<CircleNavProps> = ({ activeIdx, setActiveIdx, data }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const rotationValue = useRef({ val: 0 });

  const total = data.length;
  const radius = 265;

  const updatePositions = (items: NodeListOf<Element>): void => {
    items.forEach((item, index) => {
      const angleStep = 360 / total;
      const angleDeg = rotationValue.current.val + (angleStep * index);
      const angleRad = angleDeg * (Math.PI / 180);

      const x = radius * Math.cos(angleRad);
      const y = radius * Math.sin(angleRad);

      gsap.set(item, { x, y });
    });
  };

  useEffect(() => {
    if (!circleRef.current) return;

    const angleStep = 360 / total;
    const targetAngle = -60 - (activeIdx * angleStep);

    const items = circleRef.current.querySelectorAll(`.${styles.dot}`);
    const textElements = circleRef.current.querySelectorAll(`.${styles.dotLabel}, .${styles.dotNumber}`);

    gsap.killTweensOf(textElements);
    gsap.killTweensOf(rotationValue.current);

    gsap.to(textElements, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        gsap.set(textElements, { clearProps: "opacity" });
      }
    });

    gsap.to(rotationValue.current, {
      val: targetAngle,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => updatePositions(items),
      onComplete: () => {
        const activeItem = circleRef.current?.querySelector(`.${styles.dot}[data-index="${activeIdx}"]`);
        if (activeItem) {
          gsap.to(activeItem.querySelectorAll(`.${styles.dotLabel}, .${styles.dotNumber}`), {
            opacity: 1,
            duration: 0
          });
        }
      }
    });

  }, [activeIdx, total]);

  useEffect(() => {
    if (circleRef.current) {
      const items = circleRef.current.querySelectorAll(`.${styles.dot}`);
      updatePositions(items);
    }
  }, []);

  return (
    <div className={styles.circleWrapper}>
      <div className={styles.circle} ref={circleRef}>
        {data.map((item, index) => (
          <div
            key={item.id}
            data-index={index}
            className={`${styles.dot} ${activeIdx === index ? styles.active : ''}`}
            onClick={() => setActiveIdx(index)}
          >
            <div className={styles.pointContainer}>
              <span className={styles.dotNumber}>{index + 1}</span>
              <span className={styles.dotLabel}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};