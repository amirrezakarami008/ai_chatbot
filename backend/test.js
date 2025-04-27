import { chat, get_conversations, get_messages, signup } from './api.js';
import { encryption } from './encryption.js';

(async () => {
    const startTime = Date.now();

    try {

        // console.log(await signup('Ali Ganji', 'ali.ganji.zad@gmail.com', '11111111'));

        encryption.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.SmKAtFSFI-O-RBvRa5Yy7sGUwPizTCDc31MaJt1_gP8';

        // console.log(await chat(1, 'سلام'));

        // console.log(await get_conversations())
        // console.log(await get_messages(1))
        

    } catch (error) {
        
        console.error(error);

    }
    
    console.log(`Execution time: ${(Date.now() - startTime) / 1000} seconds`);
})();