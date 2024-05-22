import React from 'react';
import { Grid } from '@material-ui/core';
import './ListTweets.scss';

import Tweet from '../Tweet';

export default function ListTweets(props) {
    const { allTweets, deleteTweet } = props;
//comprueba la existencia de tweets
    if(!allTweets || allTweets.length === 0) {
        return (
            <div className="list-tweets-empty">
                <h2>No hay tweets...</h2>
            </div>
        );
    }
 //returna tweets 
   return (
        <Grid container spacing={3} className="list-tweets"> 
            {allTweets.map((tweet, index) => (
                <Grid key={index} item xs={4}>
                    <Tweet
                    //le paso el tweet
                    tweet={tweet} index={index} deleteTweet={deleteTweet}
                    />
                </Grid>
            ))}
        </Grid>
   );



}