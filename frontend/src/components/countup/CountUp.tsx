import { RiToothLine } from "react-icons/ri";
import { IoBusinessOutline } from "react-icons/io5";
import { CiStethoscope } from "react-icons/ci";
import React, { useState, useEffect, useRef } from "react";
import styles from "./CountUp.module.css";
interface CountUpProps {
  clients: number;
  experience: number;
  team: number;
}

const CountUp: React.FC<CountUpProps> = ({ clients, experience, team }) => {
  const [clientsCount, setClientsCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          startCountUp(clients, setClientsCount);
          startCountUp(experience, setExperienceCount);
          startCountUp(team, setTeamCount);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted, clients, experience, team]);

  const startCountUp = (
    end: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
  ) => {
    let currentCount = 0;
    const increment = Math.ceil(end / 100);

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(currentCount);
      }
    }, 50);
  };

  return (
    <div ref={elementRef} className={styles.countUpWrapper}>
      <div>
        <span>
          <RiToothLine /> Hasta
        </span>
        +{clientsCount}
      </div>
      <div>
        <span>
          <IoBusinessOutline />
          Yıl Tecrübe
        </span>
        +{experienceCount}
      </div>
      <div>
        <span>
          <CiStethoscope /> Diş Hekimi
        </span>
        +{teamCount}
      </div>
    </div>
  );
};

export default CountUp;
