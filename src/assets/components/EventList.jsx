import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'

const EventList = () => {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    try {
      const res = await fetch("https://ran-eventservice-hkgye9cvhveefsaf.swedencentral-01.azurewebsites.net/api/events")

      if (res.ok) {
        const response = await res.json()
        setEvents(response) // expected to be a list of events
      } else {
        console.error("Failed to fetch events")
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <section id="events">
      <div className="event-list">
        {events.map(event => (
          <EventItem key={event.id} item={event} />
        ))}
      </div>
    </section>
  )
}

export default EventList
