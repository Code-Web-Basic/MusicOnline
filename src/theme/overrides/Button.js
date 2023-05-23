import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                sizeLarge: {
                    height: 48,
                },
                containedInherit: {
                    color: theme.palette.grey[800],
                    boxShadow: theme.customShadows.z8,
                    '&:hover': {
                        backgroundColor: theme.palette.grey[400],
                    },
                },
                containedPrimary: {
                    boxShadow: theme.customShadows.primary,
                },
                containedSecondary: {
                    boxShadow: theme.customShadows.secondary,
                },
                outlinedInherit: {
                    border: `2px solid `,
                    borderColor: alpha(theme.palette.grey[700], 0.72),
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
                textInherit: {
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
            },
        },
    };
}
