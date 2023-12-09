import Announcement from "../Announcement/Announcement";
import Banner from "../Banner/Banner";
import Posts from "../Posts/Posts";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Announcement></Announcement>
            <Posts></Posts>
        </div>
    );
};

export default Home;