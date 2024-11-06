import React from 'react';
import './App.css';
import {createTheme, MuiThemeProvider, ThemeOptions} from "@material-ui/core/styles";
import {CookiesProvider} from "react-cookie";
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";

function createMyTheme(options: ThemeOptions) {
    return createTheme({
        palette: {
            secondary: {
                light: '#F8ECDB',
                main: '#f19b89',
                dark: '#ec6653',
            },
            primary: {
                light: '#be226c',
                main: '#8c1950',
                dark: '#570F31',
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


    return (
        <MuiThemeProvider theme={theme}>
            <CookiesProvider>
                <BrowserRouter>
                    <Route exact path="/" component={Main}/>
                </BrowserRouter>
            </CookiesProvider>
        </MuiThemeProvider>
    );
}

export default App;
