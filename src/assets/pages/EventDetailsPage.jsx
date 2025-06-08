import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  const getEvents = async () => {
    const res = await fetch(
      `https://ran-eventservice-hkgye9cvhveefsaf.swedencentral-01.azurewebsites.net/api/events/${id}`
    );

    if (res.ok) {
      const response = await res.json();
      setEvent(response.result);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="layout">
      <Nav/>

      <div className="main-content">
        <header className="header">
          <h1>Event Details</h1>
        </header>

        <main className="event-details">
          <span className="badge">{event.category || ''}</span>
        {event.image ? (
          <img src={event.image} alt={event.title} className="event-detail-image" />
        ) : (
          <div className="image-placeholder large"></div>
        )}
          <div className="details-top">
            <div>
              <h2>{event.title}</h2>
             
                <p>
                📅 {event.eventDate
                    ? `${new Date(event.eventDate).toLocaleDateString()} at ${new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'Date & time not available'}
                </p>

              
              <p>
                📍 {event.location}
              </p>
            </div>
            
          </div>

          <section>
            <h4>About Event</h4>
            <p>{event.description || 'No description available.'}</p>
          </section>

          <section className="terms">
  <h4>Terms & Conditions</h4>
  <ol>
    <li>
      <strong>Ticket Purchase & Entry</strong><br />
      All guests must present a valid ticket for entry. Tickets are non-refundable unless the event is canceled. A government-issued ID is required at the entrance.
    </li>
    <li>
      <strong>Security & Conduct</strong><br />
      For everyone's safety, bag checks may be conducted. Aggressive or inappropriate behavior will lead to removal from the venue.
    </li>
    <li>
      <strong>Changes & Cancellations</strong><br />
      Event details are subject to change. In case of cancellation, ticket holders will be notified and refunded according to our policy.
    </li>
  </ol>
</section>


          <Link to={`/events/booking/${id}`} className="book-button">
            Book Event
          </Link>
        </main>

      <Footer/>
      </div>
    </div>
  );
};

export default EventDetailsPage;
