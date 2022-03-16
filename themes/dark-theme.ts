import { createTheme } from '@mui/material';
import { red, teal } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: teal,
        error: red,
    },
    components: {},
});
