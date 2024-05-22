import React, { useState, useEffect } from "react";
import { Container, Snackbar } from "@material-ui/core";
import Header from './components/Header';
import SendTweet from "./components/SendTweet";

import {TWEETS_STORAGE} from './utils/contants';

import ListTweets from "./components/ListTweets";

function App() {
  const [ toastProps, setToastProps ] = useState ({
    open: false,
    text: null 
  });

  //se inicializa como una array vacia 
  const [allTweets, setAllTweets] = useState([]);


  const [reloadTweets, setReloadTweets] = useState(false);

  //useEffect para traer todo el contenido, recupera tweets del locaLSTORAGE

  useEffect(() => {
    const AllTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const allTweetsArray = JSON.parse(AllTweetsStorage);
    setAllTweets(allTweetsArray); 
    setReloadTweets(false); 
  }, [reloadTweets]);

  const deleteTweet = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweets(true); 
  };


  return (
    <Container className="tweet-simulator" maxWidth={false}>
      <Header />
      <SendTweet setToastProps={setToastProps} allTweets={allTweets} />
  
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet}/>

      <Snackbar 
        anchorOrigin={{
          vertical:"top",
          horizontal: "right"
        }}
        open = {toastProps.open}
        autoHideDuration={1000}
        message={<span id="message-id">{toastProps.text}</span>}
      />
    </Container>

  );
}

export default App;