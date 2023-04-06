import Layout from "../Components/Layout";
import { Form } from "antd";
function ApplyDoctor() {
  const handleFinish = () => {};
  return (
    <Layout>
      <h1 className="text-center">ApplyDoctor</h1>
      <Form layout="vertical" onFinish={handleFinish}></Form>
    </Layout>
  );
}
export default ApplyDoctor;
