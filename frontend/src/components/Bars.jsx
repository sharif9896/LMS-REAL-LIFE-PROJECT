import React, { useState, useEffect } from 'react';
import { HelpCircle, FileText, Megaphone } from 'lucide-react';

/**
 * StatCard Component
 * Renders a single animated statistic card.
 *
 * @param {object} props
 * @param {React.ElementType} props.icon - The icon component (e.g., HelpCircle).
 * @param {string} props.title - The title for the card (e.g., "Total Questions").
 * @param {number} props.count - The target number to animate to.
 * @param {object} props.color - Tailwind color classes { text: '...', bg: '...' }.
 */
const StatCard = ({ icon: Icon, title, count, color }) => {
  // State to hold the number that is currently displayed
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Don't animate if the count is 0
    if (count === 0) {
      setDisplayCount(0);
      return;
    }

    const duration = 1500; // Animation duration in milliseconds
    const frameRate = 60; // Frames per second
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = count / totalFrames;

    let currentFrame = 0;
    let currentCount = 0;

    const timer = setInterval(() => {
      currentFrame++;
      currentCount += increment;

      if (currentFrame === totalFrames) {
        // Ensure we end exactly on the target count
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        // Update the display count, rounding up
        setDisplayCount(Math.ceil(currentCount));
      }
    }, 1000 / frameRate);

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(timer);
  }, [count]); // Rerun animation if the count prop changes

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      {/* Icon */}
      <div className={`p-3 rounded-lg inline-block ${color.bg}`}>
        <Icon className={`w-6 h-6 ${color.text}`} />
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-4">
        {title}
      </h3>

      {/* Animated Count */}
      <p className="text-4xl font-bold text-gray-900 mt-2">
        {displayCount.toLocaleString()}
      </p>
    </div>
  );
};

/**
 * Main App Component
 * Renders the full dashboard layout with multiple StatCards.
 */
export default function App() {
  // Data for the stat cards
  const statData = [
    {
      title: 'Total Questions',
      count: 50,
      icon: HelpCircle,
      color: {
        text: 'text-blue-600',
        bg: 'bg-blue-100',
      },
    },
    {
      title: 'Assignments Due',
      count: 0,
      icon: FileText,
      color: {
        text: 'text-emerald-600',
        bg: 'bg-emerald-100',
      },
    },
    {
      title: 'Announcements',
      count: 0,
      icon: Megaphone,
      color: {
        text: 'text-amber-600',
        bg: 'bg-amber-100',
      },
    },
  ];

  return (
    // Main container
    <div className="p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl">
        {/* Grid for the stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {statData.map((stat) => (
            <StatCard
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              count={stat.count}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
