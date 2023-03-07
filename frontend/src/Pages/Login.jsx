import "../Styles/Register.css"
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate()
    const onFinishHandler = (values) => {
      console.log(values);
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