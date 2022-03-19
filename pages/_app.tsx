import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import 'styles/globals.css';

import { darkTheme, lightTheme } from '@app/themes';
import { EntriesProvider } from '@app/context/entries';
import { UIProvider } from '@app/context/ui';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <EntriesProvider>
            <UIProvider>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </UIProvider>
        </EntriesProvider>
    );
}

export default MyApp;
