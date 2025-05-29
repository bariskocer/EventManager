import { Link } from "react-router-dom";
import { API_BASE } from "../../util/http";

export default function EventItem({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const imageUrl = event.image.startsWith("/")
    ? `${API_BASE}${event.image}`
    : `${API_BASE}/${event.image}`;

  return (
    <article className="event-item">
      <img src={imageUrl} alt={event.title} className="event-item-image" />
      <div className="event-item-content">
        <div>
          <h2>{event.title}</h2>
          <p className="event-item-date">{formattedDate}</p>
          <p className="event-item-location">{event.location}</p>
        </div>
        <p>
          <Link to={`/events/${event.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}
