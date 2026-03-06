import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { ContactList } from "./pages/ContactList";
import { AddContact } from "./pages/AddContact";
import { EditContact } from "./pages/EditContact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            {
                path: "/",
                element: <ContactList />
            },
            {
                path: "/add-contact",
                element: <AddContact />
            },
            {
                path: "/edit-contact/:id",
                element: <EditContact />
            }
        ]
    }
]);