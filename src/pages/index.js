import { formatLayoutOption } from '../services/LayoutService';
import {
    postContacts,
    getContacts,
    postGroups,
    postMessageTemplate,
    postMessageHistory,
} from '../api/firebase';

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
