import React, { useState } from 'react';

const EventLog = () => {
  const [events, setEvents] = useState([]);

  const logEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  return (
    <div>
      <h2>Event Log</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
      <button onClick={() => logEvent('Button Clicked')}>Click me</button>
    </div>
  );
};

export default EventLog;
