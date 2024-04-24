import React from 'react';
import { Entry } from '../firebase/types';
import { Typography } from '@mui/material';
interface SingleTimelineProps {
    entries: Entry[];
}
export const SingleTimeline: React.FC<SingleTimelineProps> = ({entries}) =>  {
    const maxTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const hourWidth = 100 / 24; // Width percentage of each hour


    // Calculate the position of 12 AM (midnight)
    const midnightPosition = 0;

    const localTimeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    // Generate interval elements
    const intervalElements = entries.map((interval, index) => {
      const startTime = interval.startTime.seconds * 1000 - localTimeZoneOffset; // Convert start time to milliseconds
      const endTime = interval.endTime.seconds * 1000 - localTimeZoneOffset; // Convert end time to milliseconds
      const duration = endTime - startTime;

      const normalizedStartTime = (startTime % maxTime) / maxTime; // Normalize start time within 24 hours
      const left = (normalizedStartTime * 100) + midnightPosition; // Adjust left position to start from 12 AM
      const width = (duration / maxTime) * 100;
      const color = interval.categories?.[0].color || 'grey'

      return (
        <div
          key={index}
          style={{
            borderRadius:'5px',
            position: 'absolute',
            left: `${left}%`,
            width: `${width}%`,
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
            borderLeft: '1px solid grey',
            boxSizing: 'border-box',
            zIndex: 2,
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
            bottom: '0px',
            color:'grey',
            transform: 'translateX(-50%)', // Center the label horizontally
            zIndex: 2, // Ensure labels are rendered above hour marks
          }}
        >
          <Typography variant='caption'>{hour}</Typography>
        </div>
      );
    });

    return (
      <div style={{ position: 'relative', width: '100%', height: '20px'}}>
        {hourMarks}
        {intervalElements}
        {hourLabels}
      </div>
    );
  }


