import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Box, Button, Checkbox, FormControlLabel} from "@material-ui/core";
import {createTheme, MuiThemeProvider, ThemeOptions} from "@material-ui/core/styles";
import {Contract} from "./model/Contract";
import OrganisationSelector from "./components/OrganisationSelector";
import Header from "./components/Header";
import {CookiesProvider, useCookies} from "react-cookie";

function createMyTheme(options: ThemeOptions) {
    return createTheme({
        palette: {
            secondary: {
                light: '#7fb434',
                main: '#5FA202',
                dark: '#427101',
            },
            primary: {
                light: '#4b727a',
                main: '#1F4F59',
                dark: '#15373e',
            },
        },
        typography: {
            fontFamily: [
                "Nunito Sans", 'sans-serif'
            ].join(','),
        },
        ...options,
    })
}


function App() {
    const theme = createMyTheme({});
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [selectedContract, setSelectedContract] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies(['rememberedOrganisation']);


    const getAuthenticationContracts = () => {
        axios.get<Contract[]>("/api/organisations")
            .then(result => {
                setContracts(result.data);
                console.log(result);
            })
    }

    const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
        setCookie("rememberedOrganisation",selectedContract);
    };

    useEffect(() => {
        if (cookies.rememberedOrganisation) {
            window.location = cookies.rememberedOrganisation;
        }
        getAuthenticationContracts();



    }, [cookies.rememberedOrganisation])
    return (
        <MuiThemeProvider theme={theme}>
            <CookiesProvider>
                <Box display="flex" justifyContent="center" mt={6}>
                    <Box minWidth={320} maxWidth={502} display="flex" justifyContent="center">
                        <Box padding={4} border={4}
                             borderColor="secondary.light">
                            <Header/>
                            <OrganisationSelector contracts={contracts}
                                                  selectedContract={selectedContract}
                                                  setSelectedContract={setSelectedContract}/>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe}
                                                       onChange={handleRememberMe}
                                                       name="remeberMe"/>}
                                    label="Husk meg"
                                    disabled={selectedContract.length === 0}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                    disabled={selectedContract.length === 0}
                                    href={selectedContract}
                                >Fortsett</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CookiesProvider>
        </MuiThemeProvider>
    );
}

export default App;
