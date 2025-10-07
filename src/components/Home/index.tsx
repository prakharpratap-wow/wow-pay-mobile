import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { userData, setUserData } = useAuth();
  const [showQR, setShowQR] = useState(false);
  const [network, setNetwork] = useState("");
  const [stablecoin, setStablecoin] = useState<any>(null);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [qrDetails, setQrDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [networkData, setNetWorkData] = useState<any>([]);
  const [merchantWallets, setMerchantWallets] = useState<any>([]);

  const fetchNetworkData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://wowpay-api.wowlabz.com/api/v1/blockchains",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNetWorkData(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const response = await axios.get(
        "https://wowpay-api.wowlabz.com/api/v1/merchants/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const fetchMerchants = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!userData) return;

      const response = await axios.get(
        `https://wowpay-api.wowlabz.com/api/v1/wallets/${userData.merchant_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMerchantWallets(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const generateQR = async () => {
    const token = localStorage.getItem("accessToken");
    setShowQR(!showQR);
    setLoading(true);
    try {
      if (!showQR) {
        const response = await axios.post(
          `https://wowpay-api.wowlabz.com/api/v1/orders/create`,
          {
            amount: +amount,
            token_symbol: stablecoin?.token_symbol,
            token_contract: stablecoin?.token_contract,
            network_name: network,
            wallet_address: wallet,
            decimal: stablecoin?.decimal,
            web_app_link: "https://wow-pay-landing.netlify.app/",
          },
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        setQrDetails(response.data);
        setLoading(false);
        return response.data;
      } else {
        setQrDetails(null);
        setNetwork("");
        setAmount("");
        setWallet("");
        setStablecoin(null);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  useEffect(() => {
    fetchMerchants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedNetwork = networkData.find(
    (x: any) => x.network_name === network
  );

  return (
    <>
      <div className="card" style={{ boxShadow: "none", border: "none" }}>
        {!showQR && <h2 className="text-xl font-bold mb-4">Generate QR</h2>}
        <div className="input-group">
          <select
            className="input-field"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Network
            </option>
            {networkData?.map((x: any) => (
              <option key={x._id} value={x.network_name}>
                {x.network_name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <select
            className="input-field"
            value={stablecoin?.name || ""}
            onChange={(e) => {
              setStablecoin(
                selectedNetwork?.contracts?.find(
                  (x: any) => x?.name === e?.target?.value
                )
              );
            }}
            disabled={!selectedNetwork}
          >
            <option value="" disabled hidden>
              Select Stablecoin
            </option>
            {selectedNetwork?.contracts?.map((coin: any) => (
              <option key={coin.token_contract} value={coin?.name}>
                {coin?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <input
            type="number"
            className="input-field"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <select
            className="input-field"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Merchant Wallet
            </option>
            {merchantWallets?.map((m: any) => (
              <option key={m?._id} value={m?.wallet_address}>
                {m?.wallet_address}
              </option>
            ))}
          </select>
        </div>
        {showQR && (
          <div className="qr-container">
            <div className="card mb-4">
              <div className="qr-code-container">
                {loading && (
                  <div
                    style={{
                      display: "grid",
                      placeContent: "center",
                      height: "100%",
                      fontWeight: 700,
                    }}
                  >
                    {<div className="loader">Loading...</div>}
                  </div>
                )}
                <img
                  src={qrDetails?.qr_code_data}
                  alt="QR-Code"
                  style={{ width: "100%", display: loading ? "none" : "block" }}
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              </div>
            </div>
          </div>
        )}
        <button className="button" onClick={generateQR}>
          {showQR ? "Regenerate QR" : "Generate QR"}
        </button>
      </div>
    </>
  );
};

export default HomePage;
