import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthHandler = () => {
    const navigate = useNavigate();



    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const publicRoutes = ["/", "/forgot-password"];

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("authToken");
                    navigate("/");
                }
                else {
                    if (location.pathname === "/" || publicRoutes.includes(location.pathname)) {
                        navigate("/home");
                    }
                }
            } catch (error) {
                localStorage.removeItem("authToken");
                if (!publicRoutes.includes(location.pathname)) {
                    navigate("/");
                }
            }
        } else {
            if (!publicRoutes.includes(location.pathname)) {
                navigate("/");
            }

        }
    }, [navigate, location]);

    return null; // Dit component hoeft niks te renderen
};

export default AuthHandler;
