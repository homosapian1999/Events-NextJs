import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-utils";

const HomePage = (props) => {
  // No need to fetch her now as it is done in the backend (getStaticProps);
  // const featureEvents = getFeaturedEvents();

  return (
    <div>
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
