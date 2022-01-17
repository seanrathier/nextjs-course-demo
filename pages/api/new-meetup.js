import { getMeetupsCollection } from "./collections";

const newMeetupApi = async (req, res) => {
  if (req.method === "POST") {
    const meetup = req.body;
    const meetupsCollection = await getMeetupsCollection();
    const result = await meetupsCollection.insertOne(meetup);

    console.log(result);
    res.status(201).json({ message: "meetup inserted" });
  }
};

export default newMeetupApi;
