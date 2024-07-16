import React from "react";
import Accordion from "../../components/Accordion";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DnsIcon from '@mui/icons-material/Dns';
import Modal from "../../components/Modal";
import TransferList from "../../components/TranferList";
import SourcesFile from "../../components/SourcesFile";
import Offcanvas from "../../components/Offcanvas";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ConvertCurrency from "../../components/ConverCurrency";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SaveAsIcon from '@mui/icons-material/SaveAs';

function TabActivity({ activities, handdlerFuel, handleQuantityChange, handleSendData, headCategory, setHeadCategory }) {
  // Check if there are no activities with headcategories
  const hasActivities = activities.some(activity => activity.headcategories.length > 0);

  return (
    <div>
      <p className="h3">กิจกรรมการปล่อยก๊าซเรือนกระจก</p>
      <div>
    
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDataActivity">
          <DnsIcon /> เพิ่มรายชื่อกิจกรรมการ
        </button>
    
     

      <button className="btn btn-primary ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sourcesfile" aria-controls="sourcesfile">
          <FilePresentIcon /> ไฟล์หลักฐาน
        </button>
        <div className="d-flex justify-content-end">
          <div className="align-items-end">
            <button className="btn btn-secondary ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#separateCalculate" aria-controls="separateCalculate">
              <CurrencyExchangeIcon /> คำนวณแปลงค่า บาท/หน่วย
            </button>
          </div>
        </div>
      </div>

      {!hasActivities ? (
        <div className="d-flex justify-content-center" style={{height:500}}>
          <p className="text-center h3">ไม่พบข้อมูล</p>
        </div>
      ) : (
        activities.map((activity, activityIndex) => (
          activity.headcategories.length === 0 ? null : (
            <div className="mb-3" key={activityIndex}>
              {activity.headcategories.map((headCategory, headIndex) => (
                <React.Fragment key={headCategory.id}>
                  {headIndex === 0 && <p className="h2">{activity.name}</p>}
                  <div className="accordion" id={`accordion${activity.name}`}>
                    <Accordion
                      id={`collapse${headCategory.id}`}
                      title={`${headIndex + 1}.) ${headCategory.head_name} `}
                      expanded={headCategory.id === 0}
                    >
                      {headCategory.id === 11 ||
                      headCategory.id === 30 ||
                      headCategory.id === 31 ||
                      headCategory.id === 32 ||
                      headCategory.id === 33 ? (
                        <button
                          className="btn btn-success mb-2"
                          onClick={handdlerFuel}
                        >
                          <CompareArrowsIcon /> ซิงค์ข้อมูล
                        </button>
                      ) : null}
                      <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr className="text-center">
                              <th>รายการ</th>
                              <th>หน่วย</th>
                              <th>ปริมาณ / ปี</th>
                              <th>kgCO<sub>2</sub>eq/unit</th>
                              <th>(tCO<sub>2</sub>e)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {headCategory.data_scopes.map((data_scope, dataIndex) => {
                              const isFirstRow =
                                dataIndex === 0 ||
                                headCategory.data_scopes[dataIndex - 1].name !==
                                data_scope.name;
                              const totalYearQuantity = headCategory.data_scopes
                                .filter((item) => item.name === data_scope.name)
                                .reduce(
                                  (total, item) => total + parseFloat(item.quantity),
                                  0
                                );
                              return (
                                <React.Fragment key={dataIndex}>
                                  {isFirstRow && (
                                    <tr className="text-center">
                                      <td>{data_scope.name}</td>
                                      <td>{data_scope.lci}</td>
                                      <td>
                                        {data_scope.head_id === 11 ||
                                        data_scope.head_id === 30 ||
                                        data_scope.head_id === 31 ||
                                        data_scope.head_id === 32 ||
                                        data_scope.head_id === 33 ? (
                                          <form>
                                            <input
                                              type="number"
                                              disabled
                                              style={{
                                                borderRadius: "10px",
                                                border: "1px solid gray",
                                                width: "90px",
                                                padding: "5px",
                                              }}
                                              key={data_scope.id}
                                              value={data_scope.quantity}
                                            />
                                          </form>
                                        ) : (
                                          <form>
                                            <input
                                              type="number"
                                              style={{
                                                borderRadius: "10px",
                                                border: "1px solid gray",
                                                width: "90px",
                                                padding: "5px",
                                              }}
                                              key={data_scope.id}
                                              onFocus={(e) => {
                                                e.target.style.backgroundColor =
                                                  "#DBF1C0";
                                              }}
                                              onChange={(e) => handleQuantityChange(e, data_scope)}
                                              defaultValue={data_scope.quantity}
                                            />
                                          </form>
                                        )}
                                      </td>
                                      <td>
                                        {activity.name === 'Scope 1' ? parseFloat(data_scope.EF) : parseFloat(data_scope.kgCO2e)}
                                      </td>
                                      <td>
                                        {activity.name === 'Scope 1' 
                                        ? parseFloat((parseFloat(data_scope.EF) * parseFloat(data_scope.quantity))/1000).toFixed(2) 
                                        : parseFloat((parseFloat(data_scope.kgCO2e) * parseFloat(data_scope.quantity))/1000).toFixed(2)}
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Accordion>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )
        ))
      )}

      <Offcanvas id="sourcesfile" position="start" title="ไฟล์หลักฐาน">
        <SourcesFile />
      </Offcanvas>

      <Offcanvas id="separateCalculate" position="bottom" title="แปลงหน่วย บาท/หน่วย">
        <ConvertCurrency />
      </Offcanvas>

      <Modal id="addDataActivity" title="เพิ่มข้อมูล">
        <TransferList onSendData={handleSendData} headCategory={{ headCategory, setHeadCategory }} />
      </Modal>
    </div>
  );
}

export default TabActivity;
