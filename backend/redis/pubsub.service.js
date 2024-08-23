import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const subscriber = new Redis(process.env.REDIS_URI);
const publisher = new Redis(process.env.REDIS_URI);


export function subscribe(channel, callback) {
    subscriber.subscribe(channel, (err, count) => {
        if (err) {
            console.error('Error subscribing to channel:', err);
            return;
        }
        console.log(`Subscribed to ${channel}`);
    });

    subscriber.on('message', (subscribedChannel, message) => {
        console.log('Subscriber ', subscribedChannel, ' has received msg ', message);
        if (subscribedChannel === channel) {
            callback(message);
        }
    });
}

export function unsubscribe(channel) {
    subscriber.unsubscribe(channel, (err, count) => {
        if (err) {
            console.error('Error unsubscribing from channel:', err);
            return;
        }
        console.log(`Unsubscribed from ${channel}`);
    });
}

export async function publish(channel, message) {
    try {
        await publisher.publish(channel, message);
        console.log(`Published message to ${channel}: ${message}`);
    } catch (error) {
        console.error('Error publishing message:', error);
    }
}

export function getChannelNameFromUserName(username) {
    return `chat_${username}`;
}