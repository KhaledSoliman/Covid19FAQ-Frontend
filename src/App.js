import React from 'react';
import 'react-notifications/lib/notifications.css';
import {Route, BrowserRouter} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import FAQ from "./Pages/FAQ";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            paper: '#1a1a1a',
            default: "#0a0a0a"
        }
    },
});

class App extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <div className="App">
                            <Route path="/" exact component={FAQ}/>
                        </div>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        );
    }
}


export default App;
