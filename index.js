import express from "express";
import xlsx from "xlsx";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());


//Reading The Excel File
const read = xlsx.readFile("input_excel_file_v1.xlsx");
const sheetName = read.SheetNames[0];
const sheet = read.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);
//console.log(data);

const transformData=(data)=>{
  const result =[];
  const customerMap =new Map();

  data.forEach((item)=>{
    const customerId=item["Customer ID"];
    if (!customerMap.has(customerId))
    {
      customerMap.set(customerId,{
        "Customer ID":customerId.toString(),
        age:item.age.toString(),
        panelList:[],
      });
    }

    const customer=customerMap.get(customerId);
    let panel=customer.panelList.find(
      (p)=>p.panel_code===item.panel_code
    );

    if (!panel){
      panel={
        panel_name:item.panel_name,
        panel_code:item.panel_code,
        parameters:[],
      };
      customer.panelList.push(panel);
    }

    const parameterExists=panel.parameters.some(
      (param)=>param.parameterCode===item["Parameter Code"].toString()
    );

    if (!parameterExists){
      panel.parameters.push({
        parameterName:item["Parameter Name"],
        unit:item.Units,
        parameterCode:item["Parameter Code"].toString(),
        value:item.Result.toString(),
        lowerRange:
          item["Low Range"] !== "NULL" ? item["Low Range"].toString() : "NULL",
        upperRange:
          item["High Range"] !== "NULL"
            ? item["High Range"].toString()
            : "NULL",
        displayRange:
          item["Low Range"] !== "NULL" && item["High Range"] !== "NULL"
            ? `${item["Low Range"]}-${item["High Range"]}`
            : "-",
      });
    }
  });

  for (const value of customerMap.values()) {
    result.push(value);
  }

  return result;
};
const transformedData=transformData(data);
//console.log(JSON.stringify(transformedData,null,2));

const pushDataToAPI=async(dataApi)=>{
  try {
    const response=await axios.post(
      "https://stage.myhealthvectors.com/testserver/receive-report",
      dataApi,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Success:",response.data);
  }
  catch (err)
  {
    console.error("Failure:", err.message);
  }
};
pushDataToAPI(transformedData);

app.listen(PORT,() => {
  console.log(`Server Successfully listening On Port:${PORT}`);
});
