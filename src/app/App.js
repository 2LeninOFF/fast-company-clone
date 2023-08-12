import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
<<<<<<< Updated upstream
=======
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
>>>>>>> Stashed changes

function App() {
    return (
        <div>
<<<<<<< Updated upstream
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
=======
            <AuthProvider>
                <NavBar />

                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>

            <ToastContainer />
>>>>>>> Stashed changes
        </div>
    );
}

export default App;
