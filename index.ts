import 'dotenv/config';
import { Chat } from './chat';
import { GetDataStore } from './datastore';

async function main() {
    const vectorStore = await GetDataStore();
    const chat = await Chat('What is the best insurance for me?', vectorStore);
    console.log(chat);
}

main();
