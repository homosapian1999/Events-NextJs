import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { getFilteredEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const FilteredEventPage = (props) => {
  // const { filteredEvents } = props.filteredEvents;
  const filteredEvents = props.filteredEvents;
  // console.log(filteredEvents);
  const router = useRouter();

  // const filterData = router.query.slug;
  // console.log(filterData)

  // if (!filterData) {
  //   return <p className="center">Loading ...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filterMonth = filterData[1];

  // Using + (unary) operator;
  // const numYear = +filteredYear;
  // const numMonth = +filterMonth;

  if (props.hasError) {
    return <p>Invalid filter.Please adjust values;</p>;
  }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  if (!filteredEvents || filteredEvents.length === 0)
    return <p>No events for the given filter</p>;

  const date = new Date(filteredEvents.year, filteredEvents.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filterMonth = filterData[1];

  // Using + (unary) operator;
  const numYear = +filteredYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  // console.log(filteredEvents);
  return {
    props: {
      filteredEvents: filteredEvents,
    },
  };
}

export default FilteredEventPage;
