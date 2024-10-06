import Banner from "../../components/Banner";
import HeaderLogin from "../../components/HeaderLogin";
import ListAlbums from "../../components/ListAlbums";

import style from "../../components/ListAlbums/ListAlbums.module.css";

const Dashboard = () => (
  <>
    <HeaderLogin />
    <Banner />
    <div className={style.listBackground}>
      <ListAlbums />
    </div>
  </>
);

export default Dashboard;
