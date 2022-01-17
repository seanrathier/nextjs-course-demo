import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { getMeetupsCollection, transformMongoMeetup } from "./api/collections";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const meetupsCollection = await getMeetupsCollection();
  const meetupsData = await meetupsCollection.find({}).toArray();

  const meetups = meetupsData.map((meetup) => {
    return transformMongoMeetup(meetup);
  });
  return {
    props: {
      meetups,
    },
  };
};

export default HomePage;
