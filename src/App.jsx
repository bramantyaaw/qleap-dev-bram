import React from "react";
import RouteApp from "./routes/Route";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";

function App() {
  return (
    <React.Fragment>
      <ReactKeycloakProvider
        initOptions={{ onLoad: "login-required" }}
        authClient={keycloak}
      >
        <Router>
          <div className="App">
            {/* <PrivateRoute> */}
            <RouteApp />
            {/* </PrivateRoute> */}
          </div>
        </Router>
      </ReactKeycloakProvider>
    </React.Fragment>
  );
}

export default App;
