import { formatLayoutOption } from '../services/LayoutService';
import {
    postContacts,
    getContacts,
    postGroups,
    postMessageTemplate,
    postMessageHistory,
} from '../api/firebase';
import { smsApi } from '../api/sms';

function Home() {
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
            <button
                onClick={async () => {
                    try {
                        const sign = await smsApi(
                            // `/services/${process.env.NEXT_PUBLIC_SMS_SERVICE_ID}/messages`,
                            '/message',
                            'GET',
                            {
                                type: 'SMS',
                                from: '010-2064-0631',
                                content: 'test',
                                messages: [
                                    {
                                        to: '010-5051-0631',
                                    },
                                ],
                            },
                        );
                        console.log(sign);
                    } catch (e) {
                        console.log(e);
                    }
                }}
            >
                signature test
            </button>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: {
            ...formatLayoutOption({
                withHeader: true,
                title: '크린하우스 주소록',
            }),
        },
    };
}

export default Home;
