import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendTheme({
    colors: {
      primary: {
        50: "#f8d6b9",
        100: "#f3bc8a",
        200: "#f1ae73",
        300: "#efa15c",
        400: "#ec9445",
        500: "#e77917",
        600: "#b96112",
        700: "#a15510",
        800: "#8a480e",
        900: "#5c3009"
      },
      secondary: {
        100: "#a26110",
      },
      terciary: {
        100: "#FFE5C6",
      },

    },
});

root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
