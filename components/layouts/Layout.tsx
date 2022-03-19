import React, { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

import { Navbar, Sidebar } from '@app/components/ui';

interface Props {
    title?: string;
}

export const Layout: FC<Props> = ({ title = 'OpenJira App', children }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{ paddingY: 1, paddingX: 2 }}>{children}</Box>
        </Box>
    );
};
