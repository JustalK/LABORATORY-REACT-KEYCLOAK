import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "keycloak-react-auth",
 clientId: "my-react-client"
});

export default keycloak;
