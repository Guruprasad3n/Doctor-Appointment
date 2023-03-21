import { useEffect } from "react";
import axios from "axios";
function Home() {
  const getUserData = async () => {
    try {
      let res = await axios.post(
        `http://localhost:8000/api/v1/user/getUserData`,
        {},
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <div>Home Page</div>;
}
export default Home;
