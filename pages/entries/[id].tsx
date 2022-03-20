import { ChangeEvent, FocusEvent, useContext, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';

import { dbEntries } from '@app/db';
import { Layout } from '@app/components/layouts';
import { statusItems, EntryStatus, Entry } from '@app/interfaces';
import { EntriesContext } from '@app/context/entries';
import { df } from '@app/utils';

interface Props {
    entry: Entry;
}

const EntryPage: NextPage<Props> = ({ entry }) => {
    const router = useRouter();
    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    const [value, setValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => touched && !value, [touched, value]);

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
    };

    const handleChangeState = ({ target }: SelectChangeEvent<string>) => {
        setStatus(target.value as EntryStatus);
    };

    const handleInputBlur = ({ relatedTarget }: FocusEvent<HTMLInputElement>) => {
        !(relatedTarget && (relatedTarget.id === 'btnClose' || relatedTarget.id === 'btnDelete')) &&
            setTouched(true);
    };

    const handleSaveClick = () => {
        if (!value) return;
        setTouched(false);
        updateEntry({ ...entry, description: value, status }, true);
    };

    const handleCloseClick = () => {
        setTouched(false);
        setValue(entry.description);
        setStatus(entry.status);
        router.push('/');
    };

    const handleDeleteClick = () => {
        deleteEntry(entry._id, true);
        router.push('/');
    };

    return (
        <Layout title={`${value.substring(0, 10)}...`}>
            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Tarea`}
                            subheader={`Creada ${df.formatDate(entry.createdAt)}.`}
                        />

                        <CardContent>
                            <TextField
                                fullWidth
                                color="secondary"
                                autoFocus
                                multiline
                                label="Descripción"
                                placeholder="Descripción..."
                                value={value}
                                onChange={handleInputChange}
                                helperText={
                                    isNotValid && 'Escribe aquí la descripción de la tarea.'
                                }
                                error={isNotValid}
                                onBlur={handleInputBlur}
                                sx={{ marginY: 2 }}
                            />

                            <FormControl fullWidth sx={{ marginTop: 1 }}>
                                <InputLabel id="lb-state">Estado:</InputLabel>
                                <Select
                                    label="Estado"
                                    labelId="lb-state"
                                    id="state"
                                    value={status}
                                    onChange={handleChangeState}
                                >
                                    {statusItems.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="text"
                                color="secondary"
                                startIcon={<SaveIcon />}
                                disabled={!value}
                                onClick={handleSaveClick}
                            >
                                Guardar
                            </Button>
                            <Button
                                variant="text"
                                color="inherit"
                                id="btnClose"
                                onClick={handleCloseClick}
                            >
                                Cerrar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                id="btnDelete"
                sx={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    backgroundColor: 'error.main',
                    '&:hover': {
                        backgroundColor: 'error.dark',
                    },
                }}
                onClick={handleDeleteClick}
            >
                <DeleteIcon />
            </IconButton>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            entry: {
                ...entry,
                _id: id,
            },
        },
    };
};

export default EntryPage;
