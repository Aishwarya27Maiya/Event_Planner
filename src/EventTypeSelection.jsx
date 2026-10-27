import { formatUSD, personalOccasions } from "./personalEventData";
import "./EventTypeSelection.css";

function EventTypeSelection({ onBack, onCompany, onPersonal }) {
  const smallEvents = personalOccasions.filter((item) => item.group === "small");
  const bigEvents = personalOccasions.filter((item) => item.group === "big");

  return (
    <main className="choice-page">
      <header className="planner-topbar">
        <button className="text-back" type="button" onClick={onBack}>← Back</button>
        <a className="brand-mark" href="#top" onClick={(event) => event.preventDefault()}>Gatherwell<span>.</span></a>
        <span className="topbar-note">Plan something wonderful</span>
      </header>
      <section className="choice-intro" id="top">
        <p className="eyebrow">YOUR EVENT, YOUR WAY</p>
        <h1>What are we celebrating?</h1>
        <p>Choose an event type to start putting together a gathering that feels like you.</p>
      </section>
      <section className="event-type-cards">
        <button className="event-type-card corporate-choice" type="button" onClick={onCompany}>
          <span className="choice-icon" aria-hidden="true">⌂</span>
          <span className="eyebrow">FOR TEAMS & ORGANIZATIONS</span>
          <strong>Company event</strong>
          <span>Plan a conference, meeting, or team gathering with flexible spaces and AV equipment.</span>
          <span className="choice-link">Plan a company event <b>→</b></span>
        </button>
        <article className="event-type-card personal-choice">
          <span className="choice-icon" aria-hidden="true">✳</span>
          <span className="eyebrow">FOR LIFE’S SPECIAL MOMENTS</span>
          <strong className="personal-choice-title">Personal celebration</strong>
          <span className="personal-choice-prompt">Choose an occasion</span>
          <span className="personal-choice-description">Explore venue, décor, and catering ideas.</span>
          <div className="occasion-groups">
            {[["Small events", smallEvents], ["Big events", bigEvents]].map(([label, events]) => (
              <div className="occasion-group" key={label}>
                <h3>{label}</h3>
                <div className="occasion-chips">
                  {events.map((event) => (
                    <button type="button" key={event.id} onClick={() => onPersonal(event)}>
                      {event.name}
                      <span>{event.maxGuests} guests max · Hall {formatUSD(event.venuePrice)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
      <p className="estimate-disclaimer">Prices and capacities are planning estimates and may vary by venue and date.</p>
    </main>
  );
}

export default EventTypeSelection;
