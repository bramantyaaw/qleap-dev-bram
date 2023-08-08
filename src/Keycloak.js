import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://kdl.erajaya.com/auth",
    realm: "erajaya",
    clientId: "qleap",
});

export default keycloak;