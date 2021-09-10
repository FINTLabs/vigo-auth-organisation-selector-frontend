import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
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
    const [customerContracts, setCustomerContracts] = useState<Contract[]>([]);
    const [commonContracts, setCommonContracts] = useState<Contract[]>([]);
    const [cookies, setCookie] = useCookies(['organisation', "rememberMe"]);
    const [selectedContract, setSelectedContract] = useState<string>(cookies.organisation || "");
    const [rememberMe, setRememberMe] = useState<boolean>(false);


    const getAuthenticationContracts = () => {
        axios.get<Contract[]>("/api/contract/customer")
            .then(result => {
                setCustomerContracts(result.data);
            })
        axios.get<Contract[]>("/api/contract/common")
            .then(result => {
                setCommonContracts(result.data);
            })
    }

    const handleSelectOrganisation = (organisation: string) => {
        setSelectedContract(organisation);
        setCookie("organisation", organisation, {maxAge: 31556926});
    };

    const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
        setCookie("rememberMe", event.target.checked, {maxAge: 31556926});
    };

    useEffect(() => {
        if (cookies.organisation && cookies.rememberMe) {
            //window.location = cookies.organisation;
        }
        getAuthenticationContracts();


    }, [cookies.organisation, cookies.rememberMe])
    return (
        <MuiThemeProvider theme={theme}>
            <CookiesProvider>
                <Box display="flex" justifyContent="center" mt={6}>
                    <Box minWidth={320} maxWidth={502} display="flex" justifyContent="center">
                        <Box
                            width={1}
                            padding={4}
                            border={2}
                            borderColor="secondary.light"
                            borderRadius="borderRadius"
                        >
                            <Header/>

                            <OrganisationSelector contracts={customerContracts}
                                                  selectedContract={selectedContract}
                                                  setSelectedContract={handleSelectOrganisation}/>

                            <Box display="flex" flexDirection="column"
                                 justifyContent="space-between" mt={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberMe}
                                                       onChange={handleRememberMe}
                                                       name="remeberMe"/>}
                                    label="Husk meg"
                                    disabled={!selectedContract}
                                />
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                    disabled={!selectedContract}
                                    href={selectedContract}
                                >Fortsett</Button>
                            </Box>
                            <Box mt={4}>
                                <Box textAlign="left" fontWeight="fontWeightBold">
                                    Andre påloggingsalternativer
                                </Box>
                                <List aria-label="common-providers" disablePadding>
                                    {
                                        commonContracts.map(contract => (
                                            <ListItem
                                                key={contract.url}
                                                button
                                                disableGutters
                                                component={Button} href={contract.url}
                                            >
                                                <ListItemIcon>
                                                    <img
                                                        src={`data:${contract.image.mimeType};base64, ${contract.image.base64Image}`}
                                                        alt="Red dot" width={32}/>
                                                </ListItemIcon>
                                                <ListItemText primary={contract.displayName}/>
                                            </ListItem>

                                        ))
                                    }
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CookiesProvider>
        </MuiThemeProvider>
    );
}

export default App;
