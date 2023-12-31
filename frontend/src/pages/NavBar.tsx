import { cloneElement } from 'react'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
// import { Link } from 'react-router-dom'
// import logoImg from '../images/logo.png';

function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
    });
}

export default function NavBar() {
    const theme = useTheme()

    return (
        <>
            <CssBaseline />
            <ElevationScroll>
                <AppBar sx={{
                    backgroundColor: alpha(theme.palette.background.default, 0.75),
                    borderBottom: "1px solid #333333",
                    backdropFilter: "blur(5px)",
                    zIndex: 69,
                }}>
                    <Toolbar>
                        <Stack display="flex" direction="row" justifyContent="space-between" alignItems="center" sx={{
                            width: 1,
                            marginLeft: "40px",
                            marginRight: "32px",
                            marginY: "5px",
                        }}>
                            <Stack direction="row" justifyContent={"center"} alignItems={"center"} gap={1} width={1}>
                                <Typography fontFamily={"Nanum Pen Script"} fontSize={"42px"}>FreeBank</Typography>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </AppBar >
            </ElevationScroll >
            <Toolbar />
        </>
    );
}