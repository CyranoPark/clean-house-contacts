import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../context/theme';
import Layout from '../components/Layout';
import '../../styles/globals.css';
import ContextProvider from '../context/ContextProvider';

function MyApp({ Component, pageProps }) {
    const { layoutOption = {} } = pageProps;

    return (
        <>
            <Head>
                <title>크린하우스 주소록 시스템</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <ContextProvider>
                    <CssBaseline />
                    <Layout layoutOption={layoutOption}>
                        <Component {...pageProps} />
                    </Layout>
                </ContextProvider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
