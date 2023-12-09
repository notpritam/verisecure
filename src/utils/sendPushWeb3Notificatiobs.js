// import pushNotifications from './pushNotify';
// import signAuthMessage from './signAuthMessage';
// const sendNotification = async () => {
//     const { signedMessage, publicKey } = await signAuthMessage();

//     if (!signedMessage) return;

//     const user = await pushNotifications();

//     if (!user) return;

//     try {
//         // Send the signed message and public key to your backend
//         const response = await fetch('/api/send-notification', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ signedMessage, publicKey })
//         });

//         const result = await response.json();
//         console.log("Notification sent response:", result);
//     } catch (error) {
//         console.error("Error sending notification:", error);
//     }
// };

// sendNotification();




// // sendNotification.js
// import initPush from './pushSetup';

// const sendNotification = async (title, body) => {
//     const { signedMessage, publicKey } = await signAuthMessage();

//     if (!signedMessage) return;
//     const user = await initPush();
//     if (!user) return;

//     try {
//         const response = await user.channel.send(['*'], {
//             notification: { title, body }
//         });
//         console.log("Notification sent:", response);
//     } catch (error) {
//         console.error("Error sending notification:", error);
//     }
// };

// export default sendNotification;



// sendNotification.js
import initPush from './pushNotify';

const sendNotification = async (addresses, title, body, signer) => {
    
    const user = await initPush(signer);
    if (!user) return;

    try {

        const response1 = await user.notification.subscribe(
            `eip155:11155111:0x1d37B1700Eb4a8B4fEa710182552CAe85b5eF0E6`,
        );

        //staging.push.org/channels?channel=0x1d37B1700Eb4a8B4fEa710182552CAe85b5eF0E6
        console.log("Notification sent1:", response1);

        const response2 = await user.channel.send(addresses, {
            notification: { title, body }
        });

        console.log("Notification sent2:", response2);

    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

export default sendNotification;

