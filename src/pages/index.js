import { formatLayoutOption } from '../services/LayoutService';

function Home() {
    return <div></div>;
}

export async function getServerSideProps() {
    return {
        props: {
            ...formatLayoutOption({ withHeader: true }),
        },
    };
}

export default Home;
