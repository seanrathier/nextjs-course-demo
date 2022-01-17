import { MongoClient } from "mongodb";

const databaseConnect = async () => {
  const connectionString =
    "mongodb+srv://meetup_service:KING32bit@cluster0.97ch4.mongodb.net/meetup?retryWrites=true&w=majority";
  const client = await MongoClient.connect(connectionString);
  return client.db();
};

export const getMeetupsCollection = async () => {
  const db = await databaseConnect();
  return db.collection("meetups");
};

export const transformMongoMeetup = (mongoMeetup) => {
  return {
    id: mongoMeetup._id.toString(),
    title: mongoMeetup.title,
    image: mongoMeetup.image,
    description: mongoMeetup.description,
    address: mongoMeetup.address,
  };
};
