import { useEffect, useState, useRef } from "react";
import { Maybe } from "@/types";

const FRAME_RATE = 60;
const FRAME = 1000 / FRAME_RATE;

export function useQuestionMarks(value: Maybe<string>) {
  const isUnmounted = useRef(false);
  const valueRef = useRef(value);
  const [questionMarks, setQuestionMarks] = useState<string>("");

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  useEffect(() => {
    valueRef.current = value;
    let timer: Timer;

    const steps = () => {
      const length = Math.floor(Math.random() * 7) + 2; // 2-8位
      const questionMarks = "?".repeat(length);

      if (valueRef.current) {
        setQuestionMarks(valueRef.current);
        return;
      } else {
        setQuestionMarks(questionMarks);
      }

      timer = setTimeout(steps, 3 * FRAME);
    };

    if (value) {
      setQuestionMarks(value);
    } else {
      steps();
    }

    return () => {
      if (timer && isUnmounted.current) {
        clearTimeout(timer);
      }
    };
  }, [value]);

  return questionMarks;
} 