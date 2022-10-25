import React , { useState , useEffect, useContext } from 'react';
import { Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Pusher from "pusher-js";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { ThemeContext } from '../context/Wrapper';
import { getNotificationCount } from '../../services/Reservation';


const NotificationBadge = () => {
    const context = useContext(ThemeContext);
    const [notificationCount, setNotificationCount] = useState(0);
    const clearNotificationCount = () => {
        setNotificationCount(0);
    };
    const fetchNotificationCount = () => {
        const payload = {};
        const idToken = localStorage.getItem('id_token');
        getNotificationCount(payload,idToken)
            .then((result)=>{
                if(result.data.status === 200){
                    setNotificationCount(result.data.nbNotifReserv);
                }
                else{
                    context.changeResultErrorMessage(`Une erreur s'est produite au service de notification`)
                    context.showResultError(true);
                }
            })
            .catch((e)=>{
                context.changeResultErrorMessage(e.message)
                context.showResultError(true);
            })
    }
    useEffect(()=>{
        // initialize notification count for new reservation (not already seen)
        fetchNotificationCount();
    },[]);
    useEffect(()=>{
        // instance pusher channel and beam listener
        // console.log(process.env.REACT_APP_PUSHER_CHANNEL_KEY, ' AND ', process.env.REACT_APP_PUSHER_CHANNEL_CLUSTER);
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_CHANNEL_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CHANNEL_CLUSTER,
        });
        const channel = pusher.subscribe("key");
        channel.bind("newReservation", (dataFromServer) => {
            // console.log(dataFromServer);
            setNotificationCount((prev) => prev + 1);
        });
        const beamsClient = new PusherPushNotifications.Client({
            instanceId: process.env.REACT_APP_PUSHER_BEAM_INSTANCEID,
        });
        beamsClient
            .start()
            .then(() => beamsClient.addDeviceInterest('hotelId'))
            .then(() => {
                // Build something beatiful 🌈
                console.log('you will receive notification');
            })
            .catch((e)=>{
                console.log('BEAM ERROR:',e);
            })
    },[])
    return (
        <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon color="action" />
        </Badge>
    );
};
export default NotificationBadge;