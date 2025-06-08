import React from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';

const Eventpage = () => {
  return (
    <div className="layout">
      <Nav />
      <div className="content-area">
        <Header />
        <main>
          <EventList />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Eventpage;
