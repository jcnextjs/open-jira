import { createTheme } from '@mui/material';
import { deepPurple, grey, red, teal } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[300],
        },
        primary: deepPurple,
        secondary: teal,
        error: red,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {},
        },
    },
});
