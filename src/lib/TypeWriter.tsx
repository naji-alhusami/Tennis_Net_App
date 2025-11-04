'use client'
import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  delay: number;
}

const TypeWriter = ({ text, delay }: TypeWriterProps) => {
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <div>{currentText}</div>;
};

export default TypeWriter;
