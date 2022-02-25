import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.UserAPI.history;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>
        {isAdmin ? "Total odered" : "Total your odered"} : {history.length}
      </h4>
      <div>
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.paymentID}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${item._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
