import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/api-utils";
import Head from "next/head";
import { Fragment } from "react";

const EventDetailPage = (props) => {
  const event = props.event[0];
  // console.log(event);

  // Now this is not required as we are pre0rendering the data in the backend;
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);

  // If event is not present
  if (!event) {
    return <p>Event Not Found</p>;
  }

  return (
    <Fragment>
      <Head>
        {console.log(event.title)}
        <title>{event.title} </title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description} </p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  // const { params } = context;
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // Now getting all the pages is sure waste of time and resources, so we will just get the feature events. But now you have to make fallback true as for the pages that are not pre-rendered, it will show 404 page;
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return { paths: paths, fallback: "blocking" };
}

export default EventDetailPage;
