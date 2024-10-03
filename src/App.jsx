import { useEffect, useState } from "react";
import "./App.css";
import { getBinWeightEnzyme } from "./apis/api";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [binName, setBinName] = useState(searchParams.get("binname") || "");
  const [data, setData] = useState();
  const [realtime, setRealtime] = useState();
  useEffect(() => {
    (async () => {
      await fetchApi();
      console.log(1);
    })();
  }, []);

  (() => {
    setInterval(() => {
      setRealtime(moment(Date.now()).format("HH:mm:ss"));
    }, 1000);
  })();

  const handleSearch = (e) => {
    setBinName(e.target.value);
  };
  const handleSubmitSearch = async () => {
    setSearchParams({ binname: binName });
    await fetchApi(binName);
  };
  const fetchApi = async () => {
    const ress = await getBinWeightEnzyme(
      binName || searchParams.get("binname")
    );
    setData(ress);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        <input type="text" value={binName} onChange={handleSearch} />
        <button onClick={handleSubmitSearch}>Search</button>
        <br />
        <span>{realtime}</span>
        <hr style={{ marginTop: 10 }} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <span>ชื่อถัง</span>
              </th>
              <th>
                <span>น้ำหนัก</span>
              </th>
              <th>
                <span>วันอัพเดท</span>
              </th>
              <th>
                <span>เวลาอัพเดท</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.BinName}</td>
                    <td>{Number(item.WeightEnzym).toFixed(2)}</td>
                    <td>
                      {moment
                        .utc(item.LastUpdate)
                        .add(543, "years")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>{moment.utc(item.LastUpdate).format("HH:mm:ss")}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
