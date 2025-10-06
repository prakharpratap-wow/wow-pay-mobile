import { useState } from "react";

const HomePage = () => {
  const [showQR, setShowQR] = useState(false);
  const [network, setNetwork] = useState("");
  const [stablecoin, setStablecoin] = useState("");
  const [amount, setAmount] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const handleGenerateQR = () => {
    setShowQR(!showQR);

    if (!showQR) {
      const text = `${network} ${stablecoin} ${amount}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedText}&size=200x200`;
      setLoading(true);
      setQrUrl(url);
    } else {
      setQrUrl("");
      setNetwork("");
      setStablecoin("");
      setAmount("");
    }
  };

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
            <option value="Arbitrum One">Arbitrum One</option>
            <option value="Arbitrum Sepolia">Arbitrum Sepolia</option>
          </select>
        </div>
        <div className="input-group">
          <select
            className="input-field"
            value={stablecoin}
            onChange={(e) => setStablecoin(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Stablecoin
            </option>
            <option value="USDC">USDC</option>
            <option value="PINE">PINE</option>
            <option value="WOWZ">WOWZ</option>
            <option value="DAI">DAI</option>
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
          <span className="input-suffix">$</span>
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
                  src={qrUrl}
                  alt="QR-Code"
                  style={{ width: "100%", display: loading ? "none" : "block" }}
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              </div>
            </div>
          </div>
        )}
        <button className="button" onClick={handleGenerateQR}>
          {showQR ? "Regenerate QR" : "Generate QR"}
        </button>
      </div>
    </>
  );
};

export default HomePage;
