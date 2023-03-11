import "../Styles/Register.css"
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate()
    const onFinishHandler = (values) => {
      try{
        let res = axios.post(`http://localhost:8000/api/v1/user/login`,values)
        if(res.data.success){
        message.success("Login Successful")
        navigate("/")
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
  
    return(
        <>
             <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form"  >
            <h3 className="text-center">Login</h3>
         
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required />
          </Form.Item>
          <Link to={"/register"} className="m-2">Not A User Register Here</Link>
          <button  className="btn btn-primary" type="submit">Login</button>
        </Form>
      </div>
        </>
    )
}
export default Login