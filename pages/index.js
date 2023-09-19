import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-utils";
import Head from "next/head";

const HomePage = (props) => {
  // No need to fetch her now as it is done in the backend (getStaticProps);
  // const featureEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Next Js Events</title>
        <meta
          name="description"
          content="Page with events that help you grow"
        />
      </Head>
      <EventList items={props.featureEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featureEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
