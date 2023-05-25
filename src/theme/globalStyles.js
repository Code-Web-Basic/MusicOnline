// @mui
import { GlobalStyles as MUIGlobalStyles, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
    const theme = useTheme();
    const inputGlobalStyles = (
        <MUIGlobalStyles
            styles={{
                '*': {
                    boxSizing: 'border-box',
                },
                '&::-webkit-scrollbar': {
                    width: '5px',
                },

                /* Track */
                '&::-webkit-scrollbar-track': {
                    // boxShadow: 'inset 0 0 5px grey',
                    borderRadius: '10px',
                },

                /* Handle */
                '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.grey[700],
                    borderRadius: '10px',
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    WebkitOverflowScrolling: 'touch',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                },
                '#root': {
                    width: '100%',
                    height: '100%',
                },
                input: {
                    '&[type=number]': {
                        MozAppearance: 'textfield',
                        '&::-webkit-outer-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none',
                        },
                        '&::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none',
                        },
                    },
                },
                img: {
                    display: 'block',
                    maxWidth: '100%',
                },
                ul: {
                    margin: 0,
                    padding: 0,
                },
                a: {
                    textDecoration: 'none',
                    '&:active': {
                        color: 'none',
                    },
                },
            }}
        />
    );

    return inputGlobalStyles;
}
