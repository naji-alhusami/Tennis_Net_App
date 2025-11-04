"use client";
import { useState, useEffect } from "react";

interface SlowlyShowProps {
  text: string;
}

function SlowlyShow({ text }: SlowlyShowProps) {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    const fadeIn = () => {
      if (opacity < 1) {
        setTimeout(() => {
          setOpacity(opacity + 0.01);
        }, 50);
      }
    };
    fadeIn();
  }, [opacity]);

  return <div style={{ opacity }}>{text}</div>;
}

export default SlowlyShow;
