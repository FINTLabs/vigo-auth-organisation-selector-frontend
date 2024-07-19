import React, {useEffect, useState} from 'react';
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
import Header from "./components/Header";
import OrganisationSelector from "./components/OrganisationSelector";
import {Contract} from "./model/Contract";
import {useCookies} from "react-cookie";
import axios from "axios";
import useQuery from "./hooks/useQuery";

const Main = () => {
    const query = useQuery();
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

    const doRedirect = () => {
        axios.post("/api/contract/redirect", {
            "id": selectedContract,
            "target": query.get("target") || "",
            "sid": query.get("sid") || ""
        },)
            .then((result) => {
                window.location = result.data.url;
            });
    }

    const doRedirectAdditionalContract = (contractId: string) => {
        axios.post("/api/contract/redirect", {
            "id": contractId,
            "target": query.get("target") || "",
            "sid": query.get("sid") || ""
        },)
            .then((result) => {
                window.location = result.data.url;
            });
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


    }, [cookies.organisation, cookies.rememberMe]);

    function boxHidden() {
        let hide: boolean = !(query.get("target") || "").search("qscore.vigoiks.no")
        return hide;
    }


    return (
        <main>
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
                                onClick={doRedirect}
                            >Fortsett</Button>
                        </Box>
                        <Box mt={4} hidden={boxHidden()}>
                            <Box textAlign="left" fontWeight="fontWeightBold">
                                Andre påloggingsalternativer
                            </Box>
                            <List aria-label="common-providers" disablePadding>
                                {
                                    commonContracts.map(contract => (
                                        <ListItem
                                            key={contract.cardId}
                                            button
                                            disableGutters
                                            component={Button}
                                            onClick={() => doRedirectAdditionalContract(contract.cardId)}
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
        </main>
    );
};

export default Main;
