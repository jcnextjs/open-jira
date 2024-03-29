import { ChangeEvent, FocusEvent, useContext, useState } from 'react';
import { Box, Button, Divider, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { EntriesContext } from '@app/context/entries';
import { UIContext } from '@app/context/ui';

export const NewEntry = () => {
    const { setShowNewEntry, showNewEntry } = useContext(UIContext);
    const { addNewEntry } = useContext(EntriesContext);
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
    };

    const handleInputBlur = ({ relatedTarget }: FocusEvent<HTMLInputElement>) => {
        !(relatedTarget && relatedTarget.id === 'btnCancel') && setTouched(true);
    };

    const resetAll = () => {
        setShowNewEntry(false);
        setValue('');
        setTouched(false);
    };

    const handleSaveClick = () => {
        if (!value) return;
        addNewEntry(value);
        resetAll();
    };

    return (
        <Box p={1} mb={1} display="flex" flexDirection="column" gap={2}>
            {showNewEntry ? (
                <>
                    <TextField
                        fullWidth
                        autoFocus
                        multiline
                        label="Nueva tarea"
                        placeholder="Descripción..."
                        helperText={touched && !value && 'Escribe aquí la descripción de la tarea.'}
                        error={touched && !value}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        color="secondary"
                    />

                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Button
                            variant="text"
                            color="secondary"
                            startIcon={<SaveOutlinedIcon />}
                            onClick={handleSaveClick}
                        >
                            Guardar
                        </Button>
                        <Button variant="text" color="inherit" onClick={resetAll} id="btnCancel">
                            Cancelar
                        </Button>
                    </Box>
                    <Divider />
                </>
            ) : (
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<AddBoxOutlinedIcon />}
                    onClick={() => setShowNewEntry(true)}
                >
                    Nueva Tarea
                </Button>
            )}
        </Box>
    );
};
