// import { useState } from "react";
import "../Styles/Register.css"
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
function Register() {
  //   const [name, setName] = useState();
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();

  const navigate = useNavigate()
  const onFinishHandler = async (values) => {
    try{
let res = axios.post(`http://localhost:8000/api/v1/user/register`,values)
if(res.data.success){
message.success("Register Successful")
navigate("/login")
}
else{
  message.error(res.data.message)
}
    }
    catch(e){
      console.log(e);
      message.error(`Something Went Wrong`)
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form"  >
            <h3 className="text-center">Register</h3>
          <Form.Item label="Name" name={"name"}>
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required />
          </Form.Item>
          <Link to={"/login"} className="m-2">Already User Login Here</Link>
          <button  className="btn btn-primary" type="submit">Register</button>
        </Form>
      </div>
    </>
  );
}
export default Register;
