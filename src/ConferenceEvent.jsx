import { useEffect, useMemo, useState } from "react";
import { formatUSD } from "./personalEventData";
import "./ConferenceEvent.css";

const rooms = [
  { id: "auditorium", name: "Auditorium hall", capacity: 200, price: 5500, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=700&q=80" },
  { id: "conference", name: "Conference room", capacity: 15, price: 3500, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80" },
  { id: "presentation", name: "Presentation room", capacity: 50, price: 700, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=700&q=80" },
  { id: "large-meeting", name: "Large meeting room", capacity: 10, price: 900, image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80" },
  { id: "small-meeting", name: "Small meeting room", capacity: 5, price: 1100, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80" },
];
const equipment = [
  { id: "speakers", name: "Speakers", price: 35 },
  { id: "microphones", name: "Microphones", price: 45 },
  { id: "whiteboards", name: "Whiteboards", price: 80 },
  { id: "projectors", name: "Projectors", price: 200 },
  { id: "signage", name: "Signage", price: 80 },
];
const meals = [
  { id: "breakfast", name: "Breakfast", price: 50 },
  { id: "lunch", name: "Lunch", price: 60 },
  { id: "high-tea", name: "High tea", price: 25 },
  { id: "dinner", name: "Dinner", price: 70 },
];
const initialQuantities = (items) => Object.fromEntries(items.map((item) => [item.id, 0]));

function Counter({ value, label, onChange, min = 0 }) {
  return (
    <div className="corporate-counter">
      <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function ConferenceEvent({ onBack, onBrandClick }) {
  const [roomCounts, setRoomCounts] = useState(() => initialQuantities(rooms));
  const [equipmentCounts, setEquipmentCounts] = useState(() => initialQuantities(equipment));
  const [mealCounts, setMealCounts] = useState(() => initialQuantities(meals));
  const [guestCount, setGuestCount] = useState(50);
  const [guestInput, setGuestInput] = useState("50");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!showDetails) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowDetails(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showDetails]);

  const selectedRows = useMemo(() => [
    ...rooms.map((item) => ({ ...item, quantity: roomCounts[item.id], unit: "each" })),
    ...equipment.map((item) => ({ ...item, quantity: equipmentCounts[item.id], unit: "each" })),
    ...meals.map((item) => ({ ...item, quantity: mealCounts[item.id] ? guestCount : 0, unit: "per person", enabled: mealCounts[item.id] > 0 })),
  ].filter((item) => item.quantity > 0), [roomCounts, equipmentCounts, mealCounts, guestCount]);
  const total = selectedRows.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const changeQuantity = (setter, id, quantity) => setter((current) => ({ ...current, [id]: quantity }));
  const updateGuestInput = (value) => {
    setGuestInput(value);
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) setGuestCount(parsed);
  };
  const commitGuestInput = () => {
    const parsed = Number(guestInput);
    const nextGuestCount = Number.isInteger(parsed) && parsed > 0 ? parsed : guestCount;
    setGuestCount(nextGuestCount);
    setGuestInput(String(nextGuestCount));
  };
  return (
    <main className="corporate-planner">
      <header className="planner-topbar corporate-topbar">
        <button className="text-back" type="button" onClick={onBack}>← Event types</button>
        <a className="brand-mark" href="#event-types" onClick={(event) => { event.preventDefault(); onBrandClick(); }}>Gatherwell<span>.</span></a>
        <nav className="corporate-nav" aria-label="Planner sections">
          <a href="#rooms">Venue spaces</a>
          <a href="#equipment">AV & add-ons</a>
          <a href="#catering">Catering</a>
        </nav>
        <button className="bill-button" type="button" onClick={() => setShowDetails(true)}>Show details <span>{formatUSD(total)}</span></button>
      </header>
      <div className="corporate-content" id="corporate-top">
        <section className="corporate-hero">
          <div><p className="eyebrow">COMPANY EVENT PLANNER</p><h1>Make room for<br /><em>great ideas.</em></h1><p>Choose your spaces, presentation essentials, and catering. We’ll keep a running estimate as you plan.</p></div>
          <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85" alt="Conference attendees gathered in a bright event space" />
        </section>
        <section className="corporate-section" id="rooms">
          <div className="corporate-section-title"><div><p className="eyebrow">01 / FIND YOUR SPACE</p><h2>Choose your rooms</h2><p>Select the spaces that fit your event.</p></div><label className="corporate-guests">Number of guests<input type="number" min="1" step="1" value={guestInput} onChange={(event) => updateGuestInput(event.target.value)} onBlur={commitGuestInput} /></label></div>
          <div className="room-grid">
            {rooms.map((room) => <article className="room-card" key={room.id}>
              <img src={room.image} alt="" loading="lazy" />
              <div className="room-card-content"><div><h3>{room.name}</h3><p>Capacity {room.capacity} · {formatUSD(room.price)} / room</p></div><Counter value={roomCounts[room.id]} label={room.name} onChange={(value) => changeQuantity(setRoomCounts, room.id, value)} /></div>
            </article>)}
          </div>
          <p className="capacity-note">Selected rooms accommodate approximately {rooms.reduce((sum, room) => sum + room.capacity * roomCounts[room.id], 0)} people.</p>
        </section>
        <section className="corporate-section" id="equipment">
          <div className="corporate-section-title"><div><p className="eyebrow">02 / GET PRESENTATION-READY</p><h2>Audio, visual & add-ons</h2><p>Equip your event with the essentials.</p></div></div>
          <div className="equipment-list">{equipment.map((item) => <div className="equipment-row" key={item.id}><span className="equipment-icon" aria-hidden="true">✳</span><div><h3>{item.name}</h3><p>{formatUSD(item.price)} each</p></div><Counter value={equipmentCounts[item.id]} label={item.name} onChange={(value) => changeQuantity(setEquipmentCounts, item.id, value)} /></div>)}</div>
        </section>
        <section className="corporate-section" id="catering">
          <div className="corporate-section-title"><div><p className="eyebrow">03 / GATHER AROUND THE TABLE</p><h2>Plan your meals</h2><p>Choose a service for your attendees. Pricing is per person.</p></div></div>
          <div className="meal-grid">{meals.map((item) => <article className="meal-card" key={item.id}><span className="meal-icon" aria-hidden="true">{item.id === "breakfast" ? "☀" : item.id === "lunch" ? "◷" : item.id === "high-tea" ? "♨" : "☾"}</span><h3>{item.name}</h3><p>{formatUSD(item.price)} per person</p><label><input type="checkbox" checked={mealCounts[item.id] > 0} onChange={(event) => changeQuantity(setMealCounts, item.id, event.target.checked ? 1 : 0)} /> Include meal</label><p className="meal-guest-total">Total for {guestCount} guests</p><strong>{formatUSD(mealCounts[item.id] ? item.price * guestCount : 0)}</strong></article>)}</div>
        </section>
        <footer className="corporate-footer"><div><p className="eyebrow">YOUR PLAN, AT A GLANCE</p><h2>Current estimate <strong>{formatUSD(total)}</strong></h2><p>Estimates are for planning purposes and may vary by venue and date.</p></div><button className="primary-button" type="button" onClick={() => setShowDetails(true)}>Review event details <span>→</span></button></footer>
      </div>
      {showDetails && <div className="bill-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowDetails(false); }}><section className="bill-dialog corporate-dialog" role="dialog" aria-modal="true" aria-labelledby="corporate-bill-title">
        <button className="bill-close" type="button" aria-label="Close event details" onClick={() => setShowDetails(false)}>×</button><p className="eyebrow">GATHERWELL · EVENT ESTIMATE</p><h2 id="corporate-bill-title">Company event details</h2><p className="bill-subtitle">A live estimate based on your selected spaces, AV equipment, and meals.</p>
        {selectedRows.length === 0 ? <p className="empty-details">Your plan is empty so far. Add a room, an add-on, or a meal to see your estimate.</p> : <div className="bill-table-wrap"><table className="bill-table"><thead><tr><th>Selection</th><th>Unit cost</th><th>Quantity</th><th>Subtotal</th></tr></thead><tbody>{selectedRows.map((item) => <tr key={item.id}><td>{item.name}</td><td>{formatUSD(item.price)} {item.unit === "per person" ? "/ person" : ""}</td><td>{item.quantity}</td><td>{formatUSD(item.price * item.quantity)}</td></tr>)}</tbody></table></div>}
        <div className="bill-total"><span>Total estimate</span><strong>{formatUSD(total)}</strong></div><p className="estimate-footnote">Planning estimate only. Final prices are confirmed with your venue.</p><div className="bill-actions"><button className="secondary-button" type="button" onClick={() => setShowDetails(false)}>Keep planning</button><button className="primary-button" type="button" onClick={() => window.print()}>Print estimate</button></div>
      </section></div>}
    </main>
  );
}

export default ConferenceEvent;
