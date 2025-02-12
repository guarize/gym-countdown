'use client';

import React, { useState, useEffect, useCallback } from 'react';

const EVENTS = [
  { label: 'Training', startDate: new Date('2025-01-13T00:00:00') },
  { label: 'Walking', startDate: new Date('2025-01-31T00:00:00') },
];

const calculateTimeElapsed = (startDate: Date) => {
  const now = new Date();
  const difference = now.getTime() - startDate.getTime();

  if (difference <= 0) {
    return { totalDays: 0, weeks: 0, days: 0 };
  }

  return {
    totalDays: Math.floor(difference / (1000 * 60 * 60 * 24)),
    weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
    days: Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)),
  };
};

export default function Home() {
  const [timeElapsed, setTimeElapsed] = useState(
    EVENTS.map(() => ({ totalDays: 0, weeks: 0, days: 0 }))
  );

  const updateTimeElapsed = useCallback(() => {
    setTimeElapsed(
      EVENTS.map((event) => calculateTimeElapsed(event.startDate))
    );
  }, []);

  useEffect(() => {
    updateTimeElapsed();

    const timer = setInterval(updateTimeElapsed, 1000);
    return () => clearInterval(timer);
  }, [updateTimeElapsed]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-sans">
      <div className="text-center shadow-lg rounded-lg bg-gray-800 border border-gray-700 -mt-14">
        {EVENTS.map((event, index) => (
          <div key={event.label}>
            <div className="py-8 px-12 flex flex-col">
              <h1 className="text-2xl font-extrabold mb-6 text-gray-200">
                {event.label}
              </h1>
              <div className="text-lg mb-4 text-gray-300">
                <p className="mb-2">
                  <span className="font-semibold">Total Days:</span>{' '}
                  {timeElapsed[index].totalDays}
                </p>
                <p>
                  <span className="font-semibold">{timeElapsed[index].weeks} weeks, </span>
                  <span className="font-semibold">{timeElapsed[index].days} days</span>
                </p>
              </div>
            </div>
            {index < EVENTS.length - 1 && <div className="h-px w-full bg-gray-700" />}
          </div>
        ))}
      </div>
    </div>
  );
}