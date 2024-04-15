import { useState } from "react";
import CronOutputComponent from "./CronOutputComponent";
import CronInputComponent from "./CronInputComponent";

function CronComponent() {
  const [inputs, setInputs] = useState({
    input1: "*",
    input2: "*",
    input3: "*",
    input4: "*",
    input5: "*",
  });

  const [cron, setCron] = useState("* * * * *");

const handleMinuteChange = (value: any) => { setInputs((prevInputs) => ({ ...prevInputs, input1: value })); };
const handleHourChange = (value: any) => { setInputs((prevInputs) => ({ ...prevInputs, input2: value })); };
const handleDayOfTheMonthChange = (value: any) => { setInputs((prevInputs) => ({ ...prevInputs, input3: value })); };
const handleMonthChange = (value: any) => { setInputs((prevInputs) => ({ ...prevInputs, input4: value })); };
const handleDayOfTheWeekChange = (value: any) => { setInputs((prevInputs) => ({ ...prevInputs, input5: value })); };

  //funcion para limpiar los inputs
  const clearInputs = () => {
    setInputs({
      input1: "*",
      input2: "*",
      input3: "*",
      input4: "*",
      input5: "*",
    });
    setCron("* * * * *");
  };

  //funcion para generar la expresion cron
  const generateCron = () => {
    let cron = `${inputs.input1 === "" ? "*" : inputs.input1} ${
      inputs.input2 === "" ? "*" : inputs.input2
    } ${inputs.input3 === "" ? "*" : inputs.input3} ${
      inputs.input4 === "" ? "*" : inputs.input4
    } ${inputs.input5 === "" ? "*" : inputs.input5}`;
    setCron(cron);
    console.log(cron);
  };

  return (
    <div className="">
        <CronOutputComponent>
            <div className="">
                <label className="text-white">Cron Output: {cron}</label>
            </div>
        </CronOutputComponent>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
        <div className="">
            <CronInputComponent label="Minute" name="minute" min={0} max={59} includeStar={true} value={inputs.input1} onChange={handleMinuteChange} />
        </div>

        <div className="flex flex-col">
            <CronInputComponent label="Hour" name="hour" min={0} max={23} includeStar={true} value={inputs.input2} onChange={handleHourChange}/>
        </div>

        <div className="flex flex-col">
            <CronInputComponent label="Day of the month" name="dayofthemonth" min={1} max={31} includeStar={true} value={inputs.input3} onChange={handleDayOfTheMonthChange} />
        </div>

        <div className="flex flex-col">
            <CronInputComponent label="Month" name="month" min={1} max={12} includeStar={true} value={inputs.input4} onChange={handleMonthChange}/>
        </div>

        <div className="flex flex-col">
          <CronInputComponent label="Day of the week" name="dayoftheweek" min={0} max={7} includeStar={true} value={inputs.input5} onChange={handleDayOfTheWeekChange}/>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
            onClick={generateCron}
          >
            Generate
          </button>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default CronComponent;
