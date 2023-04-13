import useSelection from "antd/es/table/hooks/useSelection";
import Layout from "../../Components/Layout";
import { useEffect, useState } from "react";
import axios  from "axios"
import { useParams } from "react-router-dom";
function Profile() {
const {user} = useSelection(state=>state.user)
const [doctor, setDoctor] = useState(null);

const params = useParams()

// getDoctor Details
const getDoctorInformation = async()=>{
  try{

const res = await axios.post(`http://localhost:8000/api/v1/doctor/getDoctorInfo`, {userId:params.id}, {
  headers:{
    Authorization:`Bearer ${localStorage.getItem(`token`)}`
  }
})
if(res.data.success){
  setDoctor(res.data.data)
}
  }
  catch(e){
    console.log(e)
  }
}


useEffect(()=>{
  getDoctorInformation()
},[])
  return (
    <Layout>
      <h1>Profile</h1>
    </Layout>
  );
}
export default Profile;
