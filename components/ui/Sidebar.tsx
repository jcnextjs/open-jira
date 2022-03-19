import { useContext } from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import { UIContext } from '@app/context/ui';

const menuItems = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
    const { sidebarOpen, handleCloseSidebar } = useContext(UIContext);

    return (
        <Drawer anchor="left" open={sidebarOpen} onClose={handleCloseSidebar}>
            <Box sx={{ width: 250 }}>
                <Toolbar>
                    <Typography variant="h6">OpenJira</Typography>
                </Toolbar>
                <Divider />
                <Box sx={{ paddingY: 1, paddingX: 2 }}>
                    <List>
                        {menuItems.map((item, ix) => (
                            <ListItem key={item} button>
                                <ListItemIcon>
                                    {ix % 2 == 0 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <ExitToAppOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Exit" />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
};
