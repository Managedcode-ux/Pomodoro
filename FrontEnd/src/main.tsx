import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.ts";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { PersistGate } from "redux-persist/lib/integration/react";





const client = new ApolloClient({
  uri: "http://127.0.0.1:9000/",
  cache: new InMemoryCache(),
});



ReactDOM.createRoot(
  document.getElementById("root")!).render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
          </MantineProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
