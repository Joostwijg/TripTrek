import Header from "../../components/header/Header.jsx";
import './Homepage.css'
import '@fortawesome/fontawesome-free/css/all.min.css';





const Home = () => {
    return (

        <div className="main-container homepage">
            <Header />
            <div className="content-container">
                <div className="content-left-container">
                    <div className="content-left-upper-container">
                        <div className="container-profile-picture">
                            <img src="/src/assets/test/Mask group.png" alt="" className='profile-picture'/>
                        </div>
                        <div className="container-personal-information">
                            <h2>Dynamic Name</h2>
                            <p>Registration date</p>
                            <div className="follow-information">
                                <div className="follow-information-following">
                                    <h4>Following</h4>
                                    <p>350</p>
                                </div>
                                <div className="follow-information-followers">
                                    <h4>Followers</h4>
                                    <p>350</p>
                                </div>
                            </div>
                            <div className="edit-profile-button">
                                <p>Edit profile</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>

                    </div>
                    <div className="content-right-upper-container">

                    </div>
                </div>
                <div className="content-right-container">

                </div>

            </div>
        </div>
    );
}

export default Home;