'use client';

import { EncryptionService } from '../lib/encryption';
import { useState } from 'react';

export default function TestEncryption() {
    const [result, setResult] = useState('');

    const testEncryption = () => {
        try {
            const testData = { email: 'admin@example.com', password: 'Admin123!' };
            console.log('Original data:', testData);

            const encrypted = EncryptionService.encrypt(testData);
            console.log('Encrypted:', encrypted);

            const decrypted = EncryptionService.decrypt(encrypted);
            console.log('Decrypted:', decrypted);

            setResult(`Success!\nOriginal: ${JSON.stringify(testData)}\nEncrypted: ${encrypted}\nDecrypted: ${JSON.stringify(decrypted)}`);
        } catch (error: any) {
            setResult(`Error: ${error.message}`);
            console.error('Encryption test failed:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Encryption Test</h1>
            <button onClick={testEncryption}>Test Encryption/Decryption</button>
            <pre style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{result}</pre>
        </div>
    );
}
