import { useEffect } from "react";

const lockScroll = () => {
    const body = document.body;
    const scrollY = window.scrollY;

    body.dataset.scrollY = scrollY.toString();
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
};

const unlockScroll = () => {
    const body = document.body;
    const scrollY = parseInt(body.dataset.scrollY || "0", 10);

    body.style.removeProperty("overflow");
    body.style.removeProperty("position");
    body.style.removeProperty("top");
    body.style.removeProperty("width");

    delete body.dataset.scrollY;
    window.scrollTo(0, scrollY);
};

const useBodyScrollLock = (isLocked) => {
    useEffect(() => {
        if (isLocked) {
            lockScroll();
        } else {
            unlockScroll();
        }

        return () => {
            unlockScroll();
        };
    }, [isLocked]);
};

export default useBodyScrollLock;
