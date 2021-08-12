import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../context/theme';
import Layout from '../components/Layout';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const { layoutOption = {} } = pageProps;

    return (
        <>
            <Head>
                <title>크린하우스 주소록 시스템</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout layoutOption={layoutOption}>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
