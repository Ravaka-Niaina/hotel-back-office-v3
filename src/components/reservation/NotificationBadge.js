import React , { useState , useEffect } from 'react';
import { Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Pusher from "pusher-js";


const NotificationBadge = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const clearNotificationCount = (interval = null) => {
        setNotificationCount(0);
        clearInterval(interval);
    };
    const pusher = new Pusher("d5ccd151a79bd8094850", {
        cluster: "mt1",
    });
    // const pusher = new Pusher(process.env.PUSHER_CHANNEL_KEY, {
    //     cluster: process.env.PUSHER_CHANNEL_CLUSTER,
    // });
    const channel = pusher.subscribe("key");
    
    channel.bind("newReservation",  (dataFromServer) => {
        console.log(dataFromServer);
        setNotificationCount((prev) => prev+1);
    });
    // useEffect(()=>{
    //     let counter = 0;
    //     const interval = setInterval(()=>{
    //         setNotificationCount((prev) => prev+1);
    //         if(counter === 5){
    //             clearNotificationCount(interval)
    //         }
    //         counter+=1;
    //     },2000)
    //     return () => {
    //         clearNotificationCount(interval);
    //     };
    // },[])
    return (
        <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon color="action" />
        </Badge>
    );
};
export default NotificationBadge;