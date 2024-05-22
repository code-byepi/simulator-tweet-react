import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "./SendTweet.scss";
import moment from 'moment';
import ModalContainer from '../ModalContainer';
import FormSendTweet from '../FormSendTweet';
import { TWEETS_STORAGE } from '../../utils/contants';

export default function SendTweet(props) {
    const {setToastProps, allTweets} = props;
    const [isOpenModal, setIsOpenModal] = useState(false);

    //abre el modal
    const openModal = () => {
        setIsOpenModal(true);
    };
    //cierra modal
    const closeModal = () => {
        setIsOpenModal(false);
    };

    //enviar tweet
    const sendTweet = (event, formValue) => {
        event.preventDefault();
        const { name, tweet } = formValue;
        //matriz que almacena tweets
        let allTweetsArray = [];

        //almaceno los tweets en una matriz 
        if(allTweets) {
            allTweetsArray = allTweets; 
        }

        //verifica si se ingresan el nombre y el tweet
        if (!name || !tweet) {
            //agregar comentario
            setToastProps({
                open: true,
                text: 'WARNING: Todos los campos son obligatorios.'
            });

        } else {
            formValue.time = moment(); 
            allTweetsArray.push(formValue);
            localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray));
            console.log('Tweet enviado correctamente.');
            //agregar comentario
            setToastProps({
                open: true,
                text: 'Tweet enviado correctamente.'
            });

            //cierra el modal luego de apretar enviar tweet
            closeModal();

        }
        //vacia los tweets
        allTweetsArray = [];

    };

    return (
        <div className='send-tweet'>
            <Fab className='send-tweet__open-modal' color='primary' aria-label='add' onClick={openModal}>
                <AddIcon />
            </Fab>

            <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
                <FormSendTweet sendTweet={sendTweet} />
            </ModalContainer>
                
            
        </div>
    );
}