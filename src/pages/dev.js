import {
    getContacts,
    postContacts,
    postGroups,
    postMessageHistory,
    postMessageTemplate,
} from '../api/firebase';
import axios from 'axios';
import { useState } from 'react';

function Dev() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    return (
        <div>
            <button onClick={() => postContacts()}>등록</button>
            <button onClick={() => postGroups()}>그룹등록</button>
            <button onClick={() => postMessageTemplate()}>
                메시지 템플릿 등록
            </button>
            <button onClick={() => postMessageHistory()}>
                메시지 히스토리 등록
            </button>
            <button onClick={() => getContacts()}>가져오기</button>
            <div>
                <div>
                    <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <button
                    onClick={async () => {
                        try {
                            const sign = await axios.post('/api/message', {
                                from,
                                to,
                                content: 'teeest',
                            });
                            console.log(sign);
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    signature test
                </button>
            </div>

            <button
                onClick={async () => {
                    try {
                        const { data } = await axios.get('/api/message', {
                            params: {
                                requestId: '22a406dad99d4fa19d0a889ff051acce',
                            },
                        });
                        console.log(data);
                    } catch (e) {
                        console.log(e);
                    }
                }}
            >
                history test
            </button>
        </div>
    );
}

export default Dev;
