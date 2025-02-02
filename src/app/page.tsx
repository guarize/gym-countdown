'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

export default function Home() {
  const startDate = useMemo(() => new Date('2025-01-13T00:00:00'), []);

  const calculateTimeElapsed = useCallback(() => {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    let timeElapsed = {
      totalDays: 0,
      months: 0,
      weeks: 0,
      days: 0,
    };

    if (difference > 0) {
      timeElapsed = {
        totalDays: Math.floor(difference / (1000 * 60 * 60 * 24)),
        months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
        weeks: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7),
        ),
        days: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
        ),
      };
    }

    return timeElapsed;
  }, [startDate]);

  const [timeElapsed, setTimeElapsed] = useState({
    totalDays: 0,
    months: 0,
    weeks: 0,
    days: 0,
  });

  useEffect(() => {
    setTimeElapsed(calculateTimeElapsed());
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeElapsed]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-sans">
      <div className="text-center p-8 shadow-lg rounded-lg bg-gray-800 border border-gray-700 -mt-14">
        <h1 className="text-2xl font-extrabold mb-6 text-gray-200">
          January 13 - Now
        </h1>
        <div className="text-lg mb-4 text-gray-300">
          <p className="mb-2">
            <span className="font-semibold">Total Days:</span>{' '}
            {timeElapsed.totalDays}
          </p>
          <p>
            {timeElapsed.months > 0 && (
              <span className="font-semibold">
                {timeElapsed.months} months,{' '}
              </span>
            )}
            <span className="font-semibold">{timeElapsed.weeks} weeks, </span>
            <span className="font-semibold">{timeElapsed.days} days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
