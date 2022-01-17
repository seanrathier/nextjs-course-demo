import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetup = () => {
  const route = useRouter();
  const addMeetupHandler = async (meetup) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    route.push("/");
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
