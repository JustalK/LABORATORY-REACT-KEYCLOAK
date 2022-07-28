import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../../../libs/Keycloak"
import PrivateRoute from "../../../../libs/helpers/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../../../../libs/components/Nav";
import WelcomePage from "../../../../libs/pages/Homepage";
import SecuredPage from "../../../../libs/pages/Securedpage";

function App() {
 return (
   <div>
   <ReactKeycloakProvider authClient={keycloak}>
       <Nav />
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<WelcomePage name="App1" />} />
           <Route path="/secured" element={<PrivateRoute><SecuredPage name="App1"/></PrivateRoute>} />
         </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
   </div>
 );
}

export default App;
