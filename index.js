"use strict";
const https = require('https');

const hostname = 'hooks.slack.com';
const path = process.env['path'];

const requestOptions = {
    hostname: hostname,
    path: path,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

// Slack attachments documentation
// https://api.slack.com/docs/message-attachments
const singleClickMessage = {text: "Single click from IOT Button"};

const doubleClickMessage = {
    "attachments": [
        {
            "color": "#28d7e5",
            "pretext": "New message from Westeros:",
            "author_name": "Eddard Stark",
            "author_link": "https://en.wikipedia.org/wiki/Ned_Stark",
            "author_icon": "https://vignette.wikia.nocookie.net/gameofthrones/images/8/8a/House-Stark-Main-Shield.PNG/revision/latest/scale-to-width-down/350?cb=20170101103142",
            "text": "Winter is coming",
            "image_url": "https://pre00.deviantart.net/a766/th/pre/i/2013/031/6/1/got___stark___final_by_davidfrz-d5sxmqr.jpg",
            "actions": [
                {
                    "type": "button",
                    "text": "Prepare now!",
                    "url": "https://www.amazon.com/winter-sports/b?ie=UTF8&node=2204518011"
                }
            ],

            "footer": "White Raven Mail",
            "footer_icon": "https://miro.medium.com/max/2400/1*eqfnMCiPFbv38pcFcoJQjw.jpeg"
        }
    ]
};

const longClickMessage = {text: "Long click from IOT Button"};

exports.handler = (event, context, callback) => {
    processEvent(event, context, callback);
};

function processEvent(event, context, callback) {
    switch (event.clickType) {
        case "SINGLE":
            sendToSlack(singleClickMessage);
            break;
        case "DOUBLE":
            sendToSlack(doubleClickMessage);
            break;
        case "LONG":
            sendToSlack(longClickMessage);
            break;
    }
}

function sendToSlack(body) {
    let request = https.request(requestOptions, (resp) => {
        resp.on('end', (data) => {
            console.log('Request was sent successfully');
            console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    request.write(JSON.stringify(body));
    request.end();
}