import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Contract} from "../model/Contract";

interface OrganisationSelectorProps {
    contracts: Contract[];
    selectedContract: string;

    setSelectedContract(contract: string): void;
}

const OrganisationSelector = ({
                                  contracts,
                                  selectedContract,
                                  setSelectedContract
                              }: OrganisationSelectorProps) => {

    return (
        <Box width={1} display="flex" justifyContent="center">
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Velg
                    tilhørighet</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={contracts.length > 0 ? selectedContract : ""}
                    onChange={(event: React.ChangeEvent<{ value: any }>) => setSelectedContract(event.target.value)}
                    label="Velg tilhørighet"
                >
                    <MenuItem value={""}>
                        <em>Velg tilhørighet</em>
                    </MenuItem>
                    {
                        contracts.map(contract => (
                            <MenuItem key={contract.url}
                                      value={contract.url}>
                                <Box display="flex" alignItems="center">
                                    <img
                                        src={`data:${contract.image.mimeType};base64, ${contract.image.base64Image}`}
                                        alt="Red dot" height={32}/>
                                    <Box height={1} ml={2}>{contract.displayName} </Box>
                                </Box>
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
};

export default OrganisationSelector;
