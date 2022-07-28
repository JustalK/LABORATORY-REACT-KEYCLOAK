# LABORATORY-REACT-KEYCLOAK

![Alt text](Documentation/Graph.png?raw=true "Documentation")

This project is a laboratory where I have linked the login of two **React** apps. If you sign in in one of the app, you are also sign in in the other one. The two apps share the same token through **Keycloak**.

You might wanna first go over this repository if you are new with Keycloak: https://github.com/JustalK/LABORATORY-KEYCLOAK

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Development](#development)
- [Running](#Running)
- [Links](#Links)

## Development

#### Warning

One of the first things to do for those laboratory to work is to remove in each app, the `<StrictMode>` in the `src/main.ts`.
If you forget this step, the application will reload indefinitely on the onload event of Keycloak.

#### Apps

In each of the app, the code is the same so I created a lib for sharing the similarities.
If you look inside the `src/app/app.tsx`, there are two mains things:

* `<ReactKeycloakProvider authClient={keycloak}>` component that run the onload of the Keycloak and will be use as a provider.
* `<PrivateRoute>` component that is used to protect the secured path

#### Libs: Keycloak.js

```js
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "keycloak-react-auth",
 clientId: "my-react-client"
});
```

In this file, the url represents the link for authenticating to the realm `keycloak-react-auth` using the config of the client `my-react-client`.
The information about this can be found in the **Admin Panel** of Keycloak:

![Alt text](Documentation/1.png?raw=true "Documentation")

As you can see in the screenshot, I created a realm and a client with the exact same name as above.

![Alt text](Documentation/2.png?raw=true "Documentation")

In the client, you will have to pay attention to the bottom of the client configuration. In this laboratory, I am using two apps, so I need to fill up properly the url for the allowed redirection and web origin.

```
For app1: http://localhost:4201
For app2: http://localhost:4200
```

#### Libs: helpers/PrivateRoute.js

```js
const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};
```

You use the hook from Keycloak to get the state of the Keycloak. From that you know if the user is connected or not. You can also get information about the role of the user from the same hook.

The component is used for checking if the user is authenticated or not. In the case the user is not, we dont show the childrens. We could replace the null by another component indicating the user that he is trying to access an unauthorized path.

#### Libs: components/Nav.js

```
const { keycloak, initialized } = useKeycloak();


onClick={() => keycloak.login()}
onClick={() => keycloak.logout()}
```

In the `Nav.js` component, we use the hook for getting the link for login and logout using Keycloak.

We also use the hook for getting the information about the connected user such as his name inside Keycloak:

```
keycloak.authenticated
keycloak.tokenParsed.preferred_username
```

## Running

For running the apps, the first step is to start the Keycloak server and the database associated with the following command:

```
$ cd project
$ npm run start:keycloak
```

Once everything is started, you might have to configure the realm and user of Keycloak. I have created a nice tutorial if help is needed there: https://github.com/JustalK/LABORATORY-KEYCLOAK

Then for running the two apps:

```
$ nx run-many --parallel --target=serve --projects=app1,app2
```

## Links

- [https://cagline.medium.com/authenticate-and-authorize-react-routes-component-with-keycloak-666e85662636](https://cagline.medium.com/authenticate-and-authorize-react-routes-component-with-keycloak-666e85662636)
