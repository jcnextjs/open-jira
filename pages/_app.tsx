import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import 'styles/globals.css';

import { darkTheme, lightTheme } from '@app/themes';
import { EntriesProvider } from '@app/context/entries';
import { UIProvider } from '@app/context/ui';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SnackbarProvider maxSnack={4} autoHideDuration={2000}>
            <EntriesProvider>
                <UIProvider>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </UIProvider>
            </EntriesProvider>
        </SnackbarProvider>
    );
}

export default MyApp;
