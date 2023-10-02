import { Fragment } from "react";

import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
    return (
        <section className={classes.detail}>
            <img 
                src={props.image} 
                alt={props.title}>
            </img>
            <h3>{props.title}</h3>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    );
};

export default MeetupDetail;