import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({children}) => {
    const {user, isLoading} = useAuth()
    const location = useLocation()

    if (isLoading) {
        return (
          <div>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        );
    }

    if (user) {
        return children
    }


    return <Navigate to={"/login"} state={{from: location}} replace></Navigate>
};

export default PrivetRoute;