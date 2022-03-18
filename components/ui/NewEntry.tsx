import { ChangeEvent, FocusEvent, FocusEventHandler, MouseEventHandler, useState } from 'react';
import { Box, Button, Divider, Fade, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export const NewEntry = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
    };

    const handleInputBlur = ({ relatedTarget }: FocusEvent<HTMLInputElement>) => {
        !(relatedTarget && relatedTarget.id === 'btnCancel') && setTouched(true);
    };

    const handleSaveClick = () => {
        if (!value) return;

        console.log('Saving:', value);
    };

    const handleCancelClick = () => {
        setShow(false);
        setTouched(false);
        setValue('');
    };

    return (
        <Box p={1} mb={1} display="flex" flexDirection="column" gap={2}>
            {show ? (
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
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleCancelClick}
                            id="btnCancel"
                        >
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
                    onClick={() => setShow(true)}
                >
                    Nueva Tarea
                </Button>
            )}
        </Box>
    );
};
