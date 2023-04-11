import { Tabs, message } from "antd";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMarkALlRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/get-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Beares ${localStorage.getItem(`token`)}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      dispatch(hideLoading());
      console.log(e);
      message.error(`Something Went Wrong`);
    }
  };
  const handleDeleteALlRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/delete-all-notification`,{ userId: user._id },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
        dispatch(hideLoading());
      console.log(e);
      message.error(`Something Went Wrong in Notifications`);
    }
  };
  return (
    <Layout>
      <h3 className="p-3 text-center">Notifications</h3>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>
          <div className="d-flex justify-content-end">
            <h5 className="p-2" style={{cursor:"pointer"}}  onClick={handleMarkALlRead}>
              Mark All Read
            </h5>
          </div>
          {user?.notification.map((e) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(e.onClickPath)}
              >
                {e.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h5 className="p-2 text-primary " style={{cursor:"pointer"}} onClick={handleDeleteALlRead}>
              Delete All Read
            </h5>
          </div>
          {user?.seenNotification.map((e) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(e.onClickPath)}
              >
                {e.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
export default Notification;
