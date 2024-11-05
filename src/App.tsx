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
                main: '#5FA202',
                dark: '#427101',
            },
            primary: {
                light: '#4b727a',
                main: '#6B133D',
                dark: '#5A51E1',
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
