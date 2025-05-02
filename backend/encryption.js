import { x25519 } from '@noble/curves/ed25519';
import hkdf from 'futoin-hkdf';
import crypto from 'crypto';
import { Config } from './config.js';

class Encryption {
    constructor() {
        this.token = crypto.randomBytes(32).toString('hex');
        this.privateKey = Buffer.from(Config.PRIVATE_KEY, 'hex');
        this.publicKey = null;
    }

    getSalt() {
        return Buffer.from([...this.token.substring(10, 20)].reverse().join(''));
    }

    async encrypt(data) {
        const sharedKey = x25519.getSharedSecret(this.privateKey, this.publicKey);
        const aesKey = await hkdf(sharedKey, 32, {salt: this.getSalt(), info: 'encryption', hash: 'SHA-256'});
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
        let encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        return Buffer.concat([iv, encrypted]).toString('base64');
    }

    async decrypt(data) {
        const sharedKey = x25519.getSharedSecret(this.privateKey, this.publicKey);
        const aesKey = await hkdf(sharedKey, 32, {salt: this.getSalt(), info: 'encryption', hash: 'SHA-256'});
        const rawData = Buffer.from(data, 'base64');
        const iv = rawData.slice(0, 16);
        const ciphertext = rawData.slice(16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
        let decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return decrypted.toString('utf8');
    }

    sign(data) {
        return crypto.createHmac('sha256', Config.SECRET_KEY)
            .update(data)
            .digest('hex');
    }
}

export const encryption = new Encryption();