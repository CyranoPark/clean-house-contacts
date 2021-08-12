import { formatLayoutOption } from '../services/LayoutService';

function Home() {
    return <div></div>;
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
