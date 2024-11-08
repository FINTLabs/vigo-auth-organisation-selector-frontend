import React from 'react';
import {Box, createStyles, makeStyles, Typography} from "@material-ui/core";
import NovariLogo from "../images/novari_logo_small.png";

const useStyles = makeStyles((theme) =>
    createStyles({
        header: {
            fontSize: "2.875rem",
            fontWeight: 900,
            lineHeight: "2.875rem",
            color: theme.palette.primary.main
        }
    })
);

const Header = () => {
    const classes = useStyles();
    return (
        <Box mb={4}>
            <Box mb={4}>
                <img src={NovariLogo} alt="Novari logo" width={250} />
            </Box>
            <Box mb={4}>
                <Typography align={"left"} variant="h1" className={classes.header}>
                    Logg på
                </Typography>
            </Box>
            <Box fontStyle="italic">
                <Typography variant="body1">
                    Velg tilhørighet for å logge på tjenesten.
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;
