import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

interface Contract {
    url: string,
    displayName: string,
    image: Image

}

interface Image {
    base64Image: string,
    mimeType: string
}

function App() {

    const [contracts, setContracts] = useState<Contract[]>([]);
    const [selectedContract, setSelectedContract] = useState<string>("")

    const getAuthenticationContracts = () => {
        axios.get<Contract[]>("/api/organisations")
            .then(result => {
                setContracts(result.data);
                console.log(result);
            })
    }

    const getImage = (): Contract | undefined => {
        let find = contracts.find((contract: Contract) => {
            return contract.url === selectedContract;

        });
        console.log("asdf", find)
        return find;
    }

    useEffect(() => {
        getAuthenticationContracts();

    }, [])
    return (
        <div className="App">

            {selectedContract &&
            <img src={`data:image/png;base64, ${getImage()?.image.base64Image}`} alt="Red dot"/>
            }

            <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                <Select

                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedContract}
                    onChange={(event: React.ChangeEvent<{ value: any }>) => setSelectedContract(event.target.value)}
                    label="Age"
                >
                    <MenuItem value={""}>
                        <em>None</em>
                    </MenuItem>
                    {
                        contracts.map(contract => (
                            <MenuItem key={contract.url}
                                      value={contract.url}>{contract.displayName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default App;
