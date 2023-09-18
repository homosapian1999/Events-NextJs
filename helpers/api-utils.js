export async function getAllEvents() {
  const response = await fetch(
    "https://next-js-course-b317f-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getEventById(eventId) {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.id === eventId);
}

export async function getFilteredEvents(dateFilter) {
  const events = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
