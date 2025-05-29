// src/http.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();


const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

function buildUrl(path, params) {
  let url = `${API_BASE}${path}`;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    url += `?${qs}`;
  }
  return url;
}

export async function fetchEvents({ signal, searchTerm }) {
  const url = buildUrl('/events', searchTerm ? { search: searchTerm } : null);
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  const { events } = await res.json();
  return events;
}

export async function createNewEvent(eventData) {
  const res = await fetch(buildUrl('/events'), {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  const { event } = await res.json();
  return event;
}

export async function fetchSelectableImages({ signal }) {
  const res = await fetch(buildUrl('/events/images'), { signal });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  const { images } = await res.json();
  return images;
}

export async function fetchEvent({ id, signal }) {
  const res = await fetch(buildUrl(`/events/${id}`), { signal });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  const { event } = await res.json();
  return event;
}

export async function deleteEvent({ id }) {
  const res = await fetch(buildUrl(`/events/${id}`), { method: 'DELETE' });
  if (!res.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  return res.json();
}

export async function updateEvent({ id, event }) {
  const res = await fetch(buildUrl(`/events/${id}`), {
    method: 'PUT',
    body: JSON.stringify({ event }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const error = new Error('An error occurred while updating the event');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  return res.json();
}
