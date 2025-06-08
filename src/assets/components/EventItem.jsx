import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = ({ item }) => {
  return (
    <Link to={`/events/${item.id}`} className="event-card">
      {item.image && (
        <img src={item.image} alt={item.title} className="event-image-" />
      )}
      <div className="event-date">
        {new Date(item.eventDate).toLocaleDateString()} {' '}
        {new Date(item.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="event-title">{item.title}</div>
      <div className="event-location">📍{item.location || "Unknown location"}</div>
      <p className="event-description">
        {item.description?.length > 80
          ? item.description.slice(0, 80) + '...'
          : item.description || "No description available"}
      </p>
    </Link>
  );
};

export default EventItem;
