import { ChevronsLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.scss";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);

  const transactions = [
    { id: 1, amount: 100.0, time: "10:30 AM" },
    { id: 2, amount: 50.0, time: "11:00 AM" },
    { id: 3, amount: 25.0, time: "11:45 AM" },
    { id: 4, amount: 100.0, time: "12:30 PM" },
    { id: 5, amount: 75.0, time: "1:00 PM" },
    { id: 6, amount: 200.0, time: "2:15 PM" },
    { id: 7, amount: 30.0, time: "3:00 PM" },
  ];

  return (
    <div className="w-100 max-w-sm">
      <div>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <ChevronsLeftIcon
            onClick={() =>
              showPaymentStatus ? setShowPaymentStatus(false) : navigate("/")
            }
            style={{ cursor: "pointer" }}
          />
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            {showPaymentStatus ? "Payment Status" : "Recent Transactions"}
          </div>
          <div></div>
        </div>
      </div>

      {showPaymentStatus ? (
        <div className="status-container w-100">
          <div className="atm-card-code-container mb-4">
            <span className="atm-text" style={{ fontSize: "15px" }}>
              [CARD DETAILS]
            </span>
          </div>
          <div className="text-start">
            <div className="pending-chip mb-2">Pending</div>
            <div className="custom-progress">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
            <p className="text-gray">Transaction Hash</p>
            <p className="text-sm font-semibold mb-1">0xabcdef1234567890...</p>
            <div className="text-blue-500 font-medium">(Copy)</div>
            <p className="mt-4">
              <div className="text-gray">View on Arbiscan</div>
            </p>
            <p className="mt-2 text-gray text-center">Refreshing...</p>
          </div>
        </div>
      ) : (
        <>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => {
                setShowPaymentStatus(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      background: "#dfcccc",
                      borderRadius: "10px",
                      display: "grid",
                      placeContent: "center",
                      fontWeight: 700,
                      width: 50,
                      height: 50,
                    }}
                  >
                    $
                  </div>
                  <div className="list-item-details">
                    <div style={{ fontWeight: 700 }}>{`$${tx.amount.toFixed(
                      2
                    )}`}</div>
                    <div
                      style={{
                        color: "#5e769b",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      {tx.time}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#30a951",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default HistoryPage;
