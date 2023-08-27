import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
<<<<<<< Updated upstream
import EditUserPage from "../components/page/editUserPage/editUserPage";
=======
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";
>>>>>>> Stashed changes
const Users = () => {
    const params = useParams();

    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
