import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { getFilteredEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

const FilteredEventPage = (props) => {
  // const { filteredEvents } = props.filteredEvents;
  // const filteredEvents = props.filteredEvents;
  // console.log(filteredEvents);

  // Client Side Data Fetching
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  // Fetching the data using the SWR hook
  const url =
    "https://next-js-course-b317f-default-rtdb.firebaseio.com/events.json";
  const { data, error } = useSWR(url, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading ...</p>;
  }

  const filteredYear = filterData[0];
  const filterMonth = filterData[1];

  // Using + (unary) operator;
  const numYear = +filteredYear;
  const numMonth = +filterMonth;

  if (
    (isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12,
    error)
  ) {
    return <p>Invalid filter.Please adjust values;</p>;
  }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0)
    return <p>No events for the given filter</p>;

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filterMonth = filterData[1];

//   // Using + (unary) operator;
//   const numYear = +filteredYear;
//   const numMonth = +filterMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   // console.log(filteredEvents);
//   return {
//     props: {
//       filteredEvents: filteredEvents,
//     },
//   };
// }

export default FilteredEventPage;
