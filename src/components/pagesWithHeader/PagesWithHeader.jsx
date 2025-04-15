import { Outlet, useLocation } from "react-router-dom";
import './PagesWithHeader.css';
import Header from "../header/Header.jsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PagesWithHeader = () => {
    const location = useLocation();
    const [backgroundImage, setBackgroundImage] = useState(null);

    const isLocationPage = location.pathname.startsWith("/location");
    const routeClass = isLocationPage
        ? 'locationPage'
        : location.pathname.startsWith("/home")
            ? 'homepage'
            : '';

    useEffect(() => {
        console.log("Route class:", routeClass);
    }, [routeClass]);

    return (
        <div
            className={`main-container ${routeClass}`}
            style={
                isLocationPage && backgroundImage
                    ? {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }
                    : {}
            }
        >
            <Header />
            <div className="pageswithheader-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet context={{ setBackgroundImage }} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PagesWithHeader;
