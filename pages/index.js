import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name="description"
                    content="Browse our meetup list!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

/*
// dynamically pre render page upon each request to the server
// makes sense if you have multiple pre render need each second
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    // fetch data
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
    };
}*/


export async function getStaticProps() {
    //fetch data
    const client = await MongoClient.connect('mongodb+srv://mladen_jovanovic_new:LpT1tabBUsu6ZRAw@cluster0.skpfcyp.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            })),
            //meetups: meetups.map(meetup => ({...meetup, id: meetup._id.toString()})),
        },
        // re-pre-generates page on the server, so that a new pre rendered page gets sent upon a request
        // the value sets the intervall in seconds at which it should be generated anew with new data
        revalidate: 10
    };
};

export default HomePage;