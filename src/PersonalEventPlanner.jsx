import { useEffect, useState } from "react";
import { foodCategories, formatUSD, personalOccasions } from "./personalEventData";
import "./PersonalEventPlanner.css";

function PersonalEventPlanner({ eventPlan, onBack, onBrandClick, onOccasionChange }) {
  const occasion = personalOccasions.find((item) => item.id === eventPlan.id) ?? personalOccasions[0];
  const [guests, setGuests] = useState(eventPlan.guestCount);
  const [guestInput, setGuestInput] = useState(String(eventPlan.guestCount));
  const [decorationId, setDecorationId] = useState(occasion.decorations[0].id);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(foodCategories[0]);
  const [showBill, setShowBill] = useState(false);
  const decoration = occasion.decorations.find((item) => item.id === decorationId) ?? occasion.decorations[0];
  const selectedFood = occasion.menu.filter((item) => cart.includes(item.id));
  const foodTotal = selectedFood.reduce((sum, item) => sum + item.pricePerGuest * guests, 0);
  const total = occasion.venuePrice + decoration.price + foodTotal;
  const filteredFood = occasion.menu.filter((item) => item.category === activeCategory);
  const money = formatUSD;

  useEffect(() => {
    if (!showBill) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowBill(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showBill]);

  const toggleFood = (id) => {
    setCart((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const updateGuests = (value) => {
    setGuestInput(String(value));
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) {
      setGuests(Math.min(occasion.maxGuests, Math.max(occasion.minGuests ?? 1, parsed)));
    }
  };

  const commitGuestInput = () => {
    const parsed = Number(guestInput);
    const nextGuests = Number.isInteger(parsed) && parsed > 0
      ? Math.min(occasion.maxGuests, Math.max(occasion.minGuests ?? 1, parsed))
      : guests;
    setGuests(nextGuests);
    setGuestInput(String(nextGuests));
  };

  return (
    <main className="personal-planner">
      <header className="planner-topbar">
        <button className="text-back" type="button" onClick={onBack}>← All event types</button>
        <a className="brand-mark" href="#event-types" onClick={(event) => { event.preventDefault(); onBrandClick(); }}>Gatherwell<span>.</span></a>
        <button className="bill-button" type="button" onClick={() => setShowBill(true)}>View estimate <span>{money(total)}</span></button>
      </header>
      <div className="personal-layout" id="planner-top">
        <div className="planner-main-column">
          <section className="occasion-hero">
            <img src={occasion.image} alt="" />
            <div className="occasion-hero-overlay">
              <label className="occasion-switcher">
                <span>CELEBRATION</span>
                <select aria-label="Choose celebration" value={occasion.id} onChange={(event) => onOccasionChange(event.target.value)}>
                  {personalOccasions.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
              </label>
              <h1>{occasion.name}, made special.</h1>
              <p>{occasion.description}</p>
              <span className="capacity-badge">Up to {occasion.maxGuests} guests</span>
            </div>
          </section>
          <section className="planner-section guest-section">
            <div className="section-title-row">
              <div><p className="eyebrow">FIRST, THE DETAILS</p><h2>How many guests?</h2></div>
              <div className="guest-stepper">
                <button type="button" aria-label="Decrease guest count" onClick={() => updateGuests(guests - 1)} disabled={guests <= (occasion.minGuests ?? 1)}>−</button>
                <input type="number" aria-label="Number of guests" min={occasion.minGuests ?? 1} max={occasion.maxGuests} step="1" value={guestInput} onChange={(event) => updateGuests(event.target.value)} onBlur={commitGuestInput} />
                <button type="button" aria-label="Increase guest count" onClick={() => updateGuests(guests + 1)} disabled={guests >= occasion.maxGuests}>+</button>
                <span>guests</span>
              </div>
            </div>
            <p className="muted-copy">This event is designed for {occasion.minGuests ? `${occasion.minGuests}–` : "up to "}{occasion.maxGuests} guests.</p>
          </section>
          <section className="planner-section">
            <div className="section-heading">
              <p className="eyebrow">SET THE SCENE</p>
              <h2>Choose your decoration</h2>
              <p>Pick the look that feels right. Decoration is a one-time estimate.</p>
            </div>
            <div className="decoration-grid">
              {occasion.decorations.map((item) => (
                <button className={`decoration-card ${decorationId === item.id ? "is-selected" : ""}`} type="button" key={item.id} onClick={() => setDecorationId(item.id)} aria-pressed={decorationId === item.id}>
                  <img src={item.image} alt="" />
                  <span className="decoration-card-info"><strong>{item.name}</strong><span>{money(item.price)}</span></span>
                  {decorationId === item.id && <span className="selected-mark" aria-label="Selected">✓</span>}
                </button>
              ))}
            </div>
          </section>
          <section className="planner-section menu-section">
            <div className="section-heading">
              <p className="eyebrow">A MENU TO REMEMBER</p>
              <h2>Build your menu</h2>
              <p>Food is priced per guest. Add as many options as you like.</p>
            </div>
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              {foodCategories.map((category) => <button type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "active" : ""} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <div className="food-grid">
              {filteredFood.map((item) => {
                const added = cart.includes(item.id);
                return (
                  <article className={`food-card ${added ? "food-added" : ""}`} key={item.id}>
                    <img src={item.image} alt="" loading="lazy" />
                    <div className="food-card-content">
                      <div><h3>{item.name}</h3><p>{item.description}</p></div>
                      <div className="food-card-bottom"><span>{money(item.pricePerGuest)} <small>/ guest</small></span><button type="button" onClick={() => toggleFood(item.id)} aria-pressed={added}>{added ? "Added ✓" : "Add +"}</button></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          <div className="planner-actions"><button className="secondary-button" type="button" onClick={onBack}>← Back to event types</button><button className="primary-button" type="button" onClick={() => setShowBill(true)}>Plan this celebration <span>→</span></button></div>
        </div>
      </div>
      {showBill && (
        <div className="bill-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowBill(false); }}>
          <section className="bill-dialog" role="dialog" aria-modal="true" aria-labelledby="bill-title">
            <button className="bill-close" type="button" aria-label="Close estimate" onClick={() => setShowBill(false)}>×</button>
            <p className="eyebrow">GATHERWELL · EVENT ESTIMATE</p>
            <h2 id="bill-title">{occasion.name} summary</h2>
            <p className="bill-subtitle">{guests} guests · Venue and decoration plus selected catering</p>
            <div className="bill-table-wrap">
              <table className="bill-table">
                <thead><tr><th>Selection</th><th>Unit cost</th><th>Quantity</th><th>Subtotal</th></tr></thead>
                <tbody>
                  <tr><td>Venue hire</td><td>{money(occasion.venuePrice)}</td><td>1</td><td>{money(occasion.venuePrice)}</td></tr>
                  <tr><td>{decoration.name}</td><td>{money(decoration.price)}</td><td>1</td><td>{money(decoration.price)}</td></tr>
                  {selectedFood.map((item) => <tr key={item.id}><td>{item.name}</td><td>{money(item.pricePerGuest)} / guest</td><td>{guests}</td><td>{money(item.pricePerGuest * guests)}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="bill-total"><span>Estimated total</span><strong>{money(total)}</strong></div>
            <p className="estimate-footnote">Prices are illustrative estimates and are not a booking or final quote.</p>
            <div className="bill-actions"><button className="secondary-button" type="button" onClick={() => setShowBill(false)}>Keep planning</button><button className="primary-button" type="button" onClick={() => window.print()}>Print estimate</button></div>
          </section>
        </div>
      )}
    </main>
  );
}

export default PersonalEventPlanner;
