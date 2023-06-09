import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import { Row } from "antd";
import DoctorList from "../Components/DoctorList";
function Home() {
  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      let res = await axios.get(
        `https://doctorappointment-pocm.onrender.com/api/v1/user/getAllDoctors`,
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>{doctor && doctor.map((e) => <DoctorList doctor={e} />)}</Row>
    </Layout>
  );
}
export default Home;
