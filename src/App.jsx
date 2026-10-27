import { useState } from "react";
import "./App.css";
import AboutUs from "./AboutUs";
import ConferenceEvent from "./ConferenceEvent";
import EventTypeSelection from "./EventTypeSelection";
import PersonalEventPlanner from "./PersonalEventPlanner";
import { personalOccasions } from "./personalEventData";

function App() {
  const [page, setPage] = useState("home");
  const [eventPlan, setEventPlan] = useState(null);

  const startPlanner = () => {
    setEventPlan(null);
    setPage("event-types");
  };

  const showEventTypes = () => setPage("event-types");

  const openCompanyPlanner = () => {
    setEventPlan({ kind: "company", label: "Company event", guestCount: 1 });
    setPage("planner");
  };

  const openPersonalPlanner = (occasion, guestCount = occasion.defaultGuests) => {
    setEventPlan({
      kind: "personal",
      id: occasion.id,
      label: occasion.name,
      guestCount: Math.min(occasion.maxGuests, Math.max(occasion.minGuests ?? 1, guestCount)),
    });
    setPage("planner");
  };

  const changeOccasion = (id) => {
    const occasion = personalOccasions.find((item) => item.id === id);
    if (occasion) openPersonalPlanner(occasion, eventPlan.guestCount);
  };

  return (
    <>
      {page === "home" && (
        <header className="first_page">
          <div className="main_event">
            <div className="first_page_name_btn">
              <p className="hero-eyebrow">Thoughtful gatherings start here</p>
              <h1 className="budget_heading">Make your next event memorable.</h1>
              <p className="budget_sentence">From company conferences to life’s biggest celebrations, plan the right space, thoughtful details, and a budget that works.</p>
              <button onClick={startPlanner} className="get-started-btn" type="button">Get started <span aria-hidden="true">→</span></button>
              <p className="hero-note">Spaces, thoughtful details, and catering—all in one place.</p>
            </div>
            <div className="aboutus_main"><AboutUs /></div>
          </div>
        </header>
      )}
      {page === "event-types" && (
        <EventTypeSelection
          onBack={() => setPage("home")}
          onCompany={openCompanyPlanner}
          onPersonal={openPersonalPlanner}
        />
      )}
      {page === "planner" && eventPlan?.kind === "company" && (
        <ConferenceEvent onBack={showEventTypes} onBrandClick={showEventTypes} />
      )}
      {page === "planner" && eventPlan?.kind === "personal" && (
        <PersonalEventPlanner
          key={eventPlan.id}
          eventPlan={eventPlan}
          onBack={showEventTypes}
          onBrandClick={showEventTypes}
          onOccasionChange={changeOccasion}
        />
      )}
    </>
  );
}

export default App;
