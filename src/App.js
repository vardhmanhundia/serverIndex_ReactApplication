import React, { useState, useEffect, Suspense } from "react";
import { blue} from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import AvailableServers from './Containers/availableServers';
import NavBar from './Components/NavBar/navBar';
const ServerPage = React.lazy(() => import('./Containers/serverPage'));
const AddPage = React.lazy(() => import('./Containers/AddPage'));
const MultiTasker = React.lazy(() => import('./Containers/multiTasker'));

const App = (props) => {

  const [servers, setServers] = useState([]);
  const [route, setRoute] = useState("MainPage");
  const [serverId, setServerId] = useState(-1);
  const [darkState, setDarkState] = useState(true);
  const [modifyMode, setModifyMode] = useState(false);

  useEffect((props) => {
    fetch(`http://localhost:9090/server/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setServers(data))
  },[]);

  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#333333" : blue[700];
  const mainSecondaryColor = darkState ? blue[900] : blue[900];
  const mainTextColor = darkState ? "#90CAF9": "#1976D2"
  
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
      textSecondary: {
        main: mainTextColor
      },
    }
  });
  
  const handleThemeChange = () => {
    if(darkState === true)
    {
      document.getElementsByTagName("body")[0].style.backgroundColor="#E1E2E1";
    }
    else{
      document.getElementsByTagName("body")[0].style.backgroundColor="#212121";
    }
    setDarkState(!darkState);
  };


  const fetchServers = () => {
    fetch(`http://localhost:9090/server/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setServers(data))
  }

  const onRouteChange = (page, id = null) =>  {
    if(page === "ModifyPage"){
      setModifyMode(true);
      setRoute("ServerPage");
    }else if(page === "ServerPage"){
      setModifyMode(false);
      setRoute("ServerPage");
    }else{
      setRoute(page);
    }
    setServerId(id);
  }

  const onSearch = (event) => {
      event.target.value!=="" ?
      fetch(`http://localhost:9090/server/search/${event.target.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setServers(data))
      :
      fetchServers();
    }

    return (
        <div className="App">
          <ThemeProvider theme={darkTheme} >
            <NavBar onRouteChange={onRouteChange} changeTheme={handleThemeChange} />
          {
            route === "MainPage" ? 
            <AvailableServers 
              data={servers} 
              onRouteChange={onRouteChange}
              onFetch={fetchServers}
              onSearch={onSearch}
            />
            :
            route === "ServerPage"?
            <Suspense fallback={<div>Loading...</div>}>
              <ServerPage 
                onRouteChange={onRouteChange}
                serverId = {serverId}
                mode={modifyMode}
              />
            </Suspense>
            :
            route === "AddPage"? 
            <Suspense fallback={<div>Loading...</div>}>
              <AddPage 
                onRouteChange={onRouteChange} 
              />
            </Suspense>
            :
            <Suspense fallback={<div>Loading...</div>}>
              <MultiTasker 
                onRouteChange={onRouteChange}
                serverId= {serverId}
              />
            </Suspense>
          }
          </ThemeProvider>
        </div>
    );
}
  

export default App;
