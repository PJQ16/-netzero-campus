import React from "react";
import Accordion from "../../components/Accordion";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DnsIcon from "@mui/icons-material/Dns";
import Modal from "../../components/Modal";
import TransferList from "../../components/TranferList";
import Offcanvas from "../../components/Offcanvas";
import ConvertCurrency from "../../components/ConverCurrency";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function TabActivity({
  deleteList,
  handleSubmitData,
  handleInputChange,
  formData,
  modalData,
  insertDataActivity,
  handlerRemoveHead,
  activities,
  handdlerFuel,
  handleQuantityChange,
  handleSendData,
  headCategory,
  setHeadCategory,
}) {
  // Check if there are no activities with headcategories
  const hasActivities = activities.some(
    (activity) => activity.headcategories.length > 0
  );

  const chkStatus =  activities.some(
    (activity) => activity.status_activity === '3'
  );
  return (
    <div>
      <p className="h2">กิจกรรมการปล่อยก๊าซเรือนกระจก</p>
      <div>
      {chkStatus ? (<>
      
      </>):(
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addDataActivity"
        >
          <DnsIcon /> เพิ่มรายชื่อกิจกรรม
        </button>
      )
}
        <div className="d-flex justify-content-end">
          <div className="align-items-end">
            {/* <button
              className="btn btn-secondary ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#separateCalculate"
              aria-controls="separateCalculate"
            >
              <CurrencyExchangeIcon /> คำนวณแปลงค่า บาท/หน่วย
            </button> */}
          </div>
        </div>
      </div>

      {!hasActivities ? (
        <>
        
        <div className="d-flex flex-row justify-content-center" style={{ height: 'auto' }}>
          
          <TransferList
          onSendData={handleSendData}
          headCategory={{ headCategory, setHeadCategory }}
          />
        </div>
       
        </>
      ) : (
        activities.map((activity, activityIndex) =>
          activity.headcategories.length === 0 ? null : (
            <div className="mb-3" key={activityIndex}>
              {activity.headcategories.map((headCategory, headIndex) => (
                <React.Fragment key={headCategory.id}>
                  {headIndex === 0 && <p className="h2">{activity.name}</p>}
                  <div className="accordion" id={`accordion${activity.name}`}>
                    <Accordion
                      id={`collapse${headCategory.id}`}
                      title={`${headIndex + 1}. ${headCategory.head_name} `}
                      expanded={headCategory.id === 0}
                    >
                                                {
                            chkStatus ? (
                              <></> // แสดงอะไรเลยถ้า chkStatus เป็น false
                            ) : (
                              headCategory.id === 30 ||
                              headCategory.id === 31 ||
                              headCategory.id === 32 ||
                              headCategory.id === 33 ||
                              headCategory.id === 39 ||
                              headCategory.id === 43 ||
                              headCategory.id === 12 ? (
                                <button
                                  className="btn btn-success mb-2"
                                  onClick={handdlerFuel}
                                >
                                  <CompareArrowsIcon /> ซิงค์ข้อมูล
                                </button>
                              ) : null
                            )
                          }
                      <div className="d-flex flex-row justify-content-between">
                      <span className="fw-normal small-text">
                      {headCategory.head_title}
                      </span>
                      {chkStatus ? (<>
      
                      </>):(
                        <Tooltip
                          placement="top"
                          title={`ลบรายชื่อกิจกรรม ${headCategory.head_name}`}
                          onClick={() => handlerRemoveHead(headCategory.id)}
                        >
                          <button className="btn btn-secondary rounded-circle mb-1">
                            <RestoreFromTrashIcon />
                          </button>
                        </Tooltip>
                      )
                      }
                      </div>
                    

                      <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th className="text-start">รายการ</th>
                              <th className="text-center">หน่วย</th>
                              <th className="text-center">ปริมาณ / ปี</th>
                              <th className="text-center">
                               ปริมาณก๊าซเรือนกระจก (kgCO<sub>2</sub>e/หน่วย)
                              </th>
                              <th className="text-center">
                                ปริมาณก๊าซเรือนกระจก (tCO<sub>2</sub>e/ต่อปี)
                              </th>
                              {chkStatus ? (<>
      
                              </>):(
                              <th className="text-center">ลบข้อมูล</th>
                               )}
                            </tr>
                          </thead>
                          <tbody>
                            {headCategory.data_scopes.map(
                              (data_scope, dataIndex) => {
                                const isFirstRow =
                                  dataIndex === 0 ||
                                  headCategory.data_scopes[dataIndex - 1]
                                    .name !== data_scope.name;
                                const totalYearQuantity =
                                  headCategory.data_scopes
                                    .filter(
                                      (item) => item.name === data_scope.name
                                    )
                                    .reduce(
                                      (total, item) =>
                                        total + parseFloat(item.quantity),
                                      0
                                    );
                                return (
                                  <React.Fragment key={dataIndex}>
                                    {isFirstRow && (
                                      <tr>
                                        <td className="text-start">{data_scope.name}</td>
                                        <td className="text-center">{data_scope.lci}</td>
                                        <td className="text-center">
                                          {headCategory.id === 30 ||
                                            headCategory.id === 31 ||
                                            headCategory.id === 32 ||
                                            headCategory.id === 33 ||
                                            headCategory.id === 39 ||
                                            headCategory.id === 43 ||
                                            headCategory.id === 12
                                           ? (
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
                                               {chkStatus ? (<>
                                                <input
                                                disabled
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
                                                onChange={(e) =>
                                                  handleQuantityChange(
                                                    e,
                                                    data_scope
                                                  )
                                                }
                                                defaultValue={
                                                  data_scope.quantity
                                                }
                                              />
      
                                              </>):(
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
                                                onChange={(e) =>
                                                  handleQuantityChange(
                                                    e,
                                                    data_scope
                                                  )
                                                }
                                                defaultValue={
                                                  data_scope.quantity
                                                }
                                              />
                                              )}
                                            </form>
                                          )}
                                        </td>
                                        <td className="text-center">
                                          {activity.name ===
                                          "ขอบเขตที่ 1: การปล่อยและดูดกลับก๊าซเรือนกระจกทางตรง"
                                            ? parseFloat(data_scope.EF)
                                            : parseFloat(data_scope.kgCO2e)}
                                        </td>
                                        <td className="text-center">
                                          {activity.name ===
                                          "ขอบเขตที่ 1: การปล่อยและดูดกลับก๊าซเรือนกระจกทางตรง"
                                            ? parseFloat(
                                                (parseFloat(data_scope.EF) *
                                                  parseFloat(
                                                    data_scope.quantity
                                                  )) /
                                                  1000
                                              ).toFixed(2)
                                            : parseFloat(
                                                (parseFloat(data_scope.kgCO2e) *
                                                  parseFloat(
                                                    data_scope.quantity
                                                  )) /
                                                  1000
                                              ).toFixed(2)}
                                        </td>
                                      
                                        {chkStatus ? (<>
      
                                        </>):(  
                                            <td className="text-center">
                                        <Tooltip
                                            placement="top"
                                            title={`ลบรายชื่อกิจกรรม ${data_scope.name}`}
                                          >
                                          <button className="btn border-0" onClick={()=>deleteList(data_scope.id)}>
                                          <DeleteIcon sx={{fontSize:50}} />
                                          </button >
                                          </Tooltip>
                                          </td>
                                        )}
                                       
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              }
                            )}
                     
                          </tbody>
                        </table>
                        {chkStatus ?(<></>):(
                        <Tooltip placement="bottom" title={`เพิ่มกิจกรรมอื่นๆ`}>
                                                <button
                                                  className="btn my-1 mx-1 btn-success fw-bold"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#insertDataActivity"
                                                  onClick={() =>
                                                    insertDataActivity(
                                                      headCategory.head_name,
                                                      headCategory.id
                                                    )
                                                  }
                                                >
                            + เพิ่มกิจกรรมอื่นๆ (กำหนดเอง)
                          </button>
                        </Tooltip>
                        )}

                           {/*  <SourcesFile /> */}
                      </div>
                    </Accordion>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )
        )
      )}

      <Offcanvas
        id="separateCalculate"
        position="bottom"
        title="แปลงหน่วย บาท/หน่วย"
      >
        <ConvertCurrency />
      </Offcanvas>

      <Modal id="addDataActivity" title="กรุณาเลือกกิจกรรมที่ต้องการรายงานข้อมูลก๊าซเรือนกระจก">
        <TransferList
          onSendData={handleSendData}
          headCategory={{ headCategory, setHeadCategory }}
        />
      </Modal>

      <Modal
        id="insertDataActivity"
        title={`เพิ่มข้อมูลกิจกรรมปล่อยก๊าซเรือนกระจกอื่นๆ ตามหัวข้อ ${modalData.headName}`}
      >
        <form>
          <div className="row my-1">
            <div className="col-md-3">
              <label htmlFor="name">
                ระบุกิจกรรม
                <span>
                  <sup className="text-danger">* ต้องระบุ</sup>
                </span>
              </label>
              <input type="text" 
              className="form-control" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ชื่อกิจกรรม"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="lci">
                หน่วย
                <span>
                  <sup className="text-danger">* ต้องระบุ</sup>
                </span>
              </label>
              <input type="text" className="form-control"
                name="lci"
               value={formData.lci}
               onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="kgCO2e">
                kgCO<sub>2</sub>e
              </label>
              <input type="number" className="form-control" 
               name="kgCO2e"
               value={formData.kgCO2e}
               onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="sources">
                แหล่งอ้างอิง{" "}
                <span>
                  <sup className="text-danger">* ต้องระบุ</sup>
                </span>
              </label>
              <input type="text" className="form-control" 
               name="sources"
               value={formData.sources}
               onChange={handleInputChange}
              />
            </div>

            <input
            type="hidden"
            name="head_id"
            value={modalData.headId}
          />
          </div>
          <div className="my-2">
            <button className="btn btn-primary me-1" onClick={handleSubmitData}><AddIcon/> เพิ่มข้อมูล</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TabActivity;
