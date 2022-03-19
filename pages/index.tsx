import type { NextPage } from 'next';
import { Card, CardHeader, Grid } from '@mui/material';

import { Layout } from '@app/components/layouts';
import { EntryList, NewEntry } from '@app/components/ui';

const HomePage: NextPage = () => {
    return (
        <Layout title="Inicio - OpenJira">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            height: ({ mixins: { toolbar }, spacing }) =>
                                `calc(100vh - ${Number(toolbar.minHeight)}px - ${spacing(3)})`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                        }}
                    >
                        <CardHeader title="Pendientes" />
                        <NewEntry />
                        <EntryList status="PENDING" />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            height: ({ mixins: { toolbar }, spacing }) =>
                                `calc(100vh - ${Number(toolbar.minHeight)}px - ${spacing(3)})`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                        }}
                    >
                        <CardHeader title="En Progreso" />

                        {/* Agregar una nueva tarea */}
                        <EntryList status="IN-PROGRESS" />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            height: ({ mixins: { toolbar }, spacing }) =>
                                `calc(100vh - ${Number(toolbar.minHeight)}px - ${spacing(3)})`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                        }}
                    >
                        <CardHeader title="Completadas" />

                        {/* Agregar una nueva tarea */}
                        <EntryList status="DONE" />
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default HomePage;
