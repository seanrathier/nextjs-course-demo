import { ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupItem from "../../components/meetups/MeetupItem";
import { getMeetupsCollection, transformMongoMeetup } from "../api/collections";

const MeetupDetails = ({ meetup }) => {
  return (
    <Fragment>
      <Head>
        {/* <title>{meetup.title}</title> */}
        {/* <meta name="description" content={meetup.description} /> */}
      </Head>
      <MeetupItem {...meetup} />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const meetupCollection = await getMeetupsCollection();
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  const meetupPaths = meetups.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });
  return {
    fallback: true,
    paths: meetupPaths,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  const meetupCollection = await getMeetupsCollection();
  const meetupFound = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetup: transformMongoMeetup(meetupFound),
    },
  };
};

export default MeetupDetails;
