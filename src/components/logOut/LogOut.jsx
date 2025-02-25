const logOut = () => {
    localStorage.removeItem('authToken');
    window.location.href = "/"
};

export default logOut;