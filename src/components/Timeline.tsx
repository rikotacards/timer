import React from 'react';
import { Entry } from '../firebase/types';

// takes entries from a day
// plots on 24 hour timeline

// start time - endTime
// plot the starting poing
interface TimelineProps {
    entries: Entry[];
}
export const Timeline: React.FC<TimelineProps> = ({entries}) => {
    const maxTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const hourWidth = 100 / 24; // Width percentage of each hour
    const localTimeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;


    // Calculate the position of 12 AM (midnight)
    const midnightPosition = hourWidth / 2;

    // Generate interval elements
    const intervalElements = entries.map((interval, index) => {
      const startTime = interval.startTime.seconds * 1000 - localTimeZoneOffset; // Convert start time to milliseconds
      const endTime = interval.endTime.seconds * 1000 - localTimeZoneOffset; // Convert end time to milliseconds
      const duration = endTime - startTime;
      const normalizedStartTime = startTime % maxTime; // Normalize start time within 24 hours
      const left = (normalizedStartTime / maxTime) * 100 + midnightPosition; // Adjust left position to start from 12 AM
      const width = (duration / maxTime) * 100;
      const color = interval.categories?.[0].color || 'grey';
      const top = `${index * 25}px`; // Vertical positioning based on interval order

      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${left}%`,
            width: `${width}%`,
            top: top,
            height: '20px',
            backgroundColor: color,
            zIndex: 1, // Ensure intervals are rendered above hour marks
          }}
        ></div>
      );
    });

    // Generate hourly mark elements
    const hourMarks = Array.from({ length: 24 }).map((_, hour) => {
      const left = ((hour * hourWidth) + midnightPosition).toFixed(2); // Calculate left position for each hour mark, starting from 12 AM
      return (
        <div
          key={hour}
          style={{
            position: 'absolute',
            left: `${left}%`,
            height: '100%',
            borderLeft: '1px solid #ccc',
            boxSizing: 'border-box',
            zIndex: 0,
          }}
        ></div>
      );
    });

    // Generate hourly label elements
    const hourLabels = Array.from({ length: 24 }).map((_, hour) => {
      const left = (((hour + 0.5) * hourWidth) + midnightPosition).toFixed(2); // Calculate left position for each hour label, starting from 12 AM
      return (
        <div
          key={hour}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: '5px',
            transform: 'translateX(-50%)', // Center the label horizontally
            zIndex: 2, // Ensure labels are rendered above hour marks
          }}
        >
          {hour}:00
        </div>
      );
    });

    return (
      <div style={{ position: 'relative', width: '100%', height: `${entries.length * 25}px`}}>
        {hourMarks}
        {hourLabels}
        {intervalElements}
      </div>
    );
  }
  
