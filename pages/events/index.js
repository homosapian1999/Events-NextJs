import { Fragment } from "react";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helpers/api-utils";
// import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  // Now we do not require this;
  const router = useRouter();
  const events = props.events;

  const findEventsHandler = (year, month) => {
    const findPath = `/events/${year}/${month}`;
    router.push(findPath);
  };
  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 1800,
  };
}

export default AllEventsPage;
