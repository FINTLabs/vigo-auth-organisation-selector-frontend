import React from 'react';
import {Box, createStyles, makeStyles, Typography} from "@material-ui/core";
import VigoLogo from "../images/vigo.svg";

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
        <Box borderTop={0} borderRight={0} borderLeft={0} border={2}
             borderColor="secondary.light" mb={4}>
            <Typography align={"left"} variant="h1" className={classes.header}>Logg
                på</Typography>
            <Box display="flex" alignItems="center" mt={4} mb={4}>
                <Box mr={2}>
                    <img src={VigoLogo} alt="Vigo logo" width={100}/>
                </Box>
                <Typography variant="body1">
                    Velg tilhørighet for å logge på tjenesten.
                </Typography>
            </Box>

        </Box>
    );
};

export default Header;
