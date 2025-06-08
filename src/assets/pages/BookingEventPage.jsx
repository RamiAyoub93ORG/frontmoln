import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookingEventPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [event, setEvent] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    eventId: id,
    firstName: '',
    lastName: '',
    email: '',
    streetName: '',
    city: '',
    postalCode: '',
    TicketQuantity: 1
  })

  const getEvent = async () => {
    try {
      const res = await fetch(`https://ran-eventservice-hkgye9cvhveefsaf.swedencentral-01.azurewebsites.net/api/events/${id}`)
      if (!res.ok) throw new Error("Failed to fetch event")
      const data = await res.json()
      setEvent(data.result)
    } catch (err) {
      console.error("Error fetching event:", err)
    }
  }

  const postBooking = async () => {
    const res = await fetch(`https://ran-bookingservice-h7g2h4cva2fbfrck.swedencentral-01.azurewebsites.net/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Booking failed:", errorText)
      throw new Error('Booking failed')
    }

    console.log("Booking successful")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postBooking()
      setSuccessMessage(`Booking of "${event.title}" is booked`)
      setTimeout(() => navigate('/'), 2000)
    } catch (error) {
      console.error("Error submitting booking:", error.message)
    }
  }

  useEffect(() => {
    getEvent()
  }, [id])

  return (
    <div className="page-wrapper">
  <h1>Book Event - {event.title}</h1>

  {successMessage && (
    <div className="success-message">
      {successMessage}
    </div>
  )}

  <div className="booking-form">
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Streetname</label>
        <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} required />
      </div>
      <div>
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <label>Postal Code</label>
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>

      <button type="submit">Book Now</button>
    </form>
  </div>
</div>

  )
}

export default BookingEventPage
