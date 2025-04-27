import axios from 'axios';
import { x25519 } from '@noble/curves/ed25519';
import { encryption } from './encryption.js';
import { Config } from './config.js';

async function baseRequest(method, data) {
    try {
        const privateKey = x25519.utils.randomPrivateKey();
        const publicKey = x25519.getPublicKey(privateKey);
        encryption.publicKey = publicKey;

        const encryptedData = await encryption.encrypt(JSON.stringify(data));
        
        const response = await axios.post(`${Config.SERVER_URL}/${method}`, encryptedData, {
            headers: {
                'a': encryption.token,
                's': encryption.sign(encryptedData),
                'p': Buffer.from(publicKey).toString('hex'),
                'c': 'web'
            }
        });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        return JSON.parse(await encryption.decrypt(response.data.data));
    } catch (error) {
        throw error;
    }
}

export async function signup(name, email, password) {
    return baseRequest('signup', {
        name: name,
        email: email,
        password: password
    });
}

export async function signin(email, password) {
    return baseRequest('signin', {
        email: email,
        password: password
    });
}
export async function chat(model, message, conversation_id = null) {
    const payload = {
        model: model,
        message: message,
    };

    // فقط اگر conversation_id مقدار معتبر دارد، به payload اضافه شود
    if (conversation_id !== null && conversation_id !== undefined) {
        payload.conversation_id = conversation_id;
    }

    console.log('Payload ارسالی به baseRequest:', payload); // لاگ برای دیباگ
    return baseRequest('chat', payload);
}

export async function get_conversations(limit=20, page=1) {
    return baseRequest('get_conversations', {
        limit: limit,
        page: page
    });
}

export async function get_messages(conversation_id, limit=20, page=1) {
    return baseRequest('get_messages', {
        conversation_id: conversation_id,
        limit: limit,
        page: page
    });
}