import { useState } from "react";
import CronOutputComponent from "./CronOutputComponent";
import CronInputComponent from "./CronInputComponent";
import { generateCronDescription } from "../services/DescriptionService";
import AlertPanel from "./AlertPanel";

function CronComponent() {
  const [inputs, setInputs] = useState({
    input1: "*",
    input2: "*",
    input3: "*",
    input4: "*",
    input5: "*",
  });
  const autoHidealert = () => { setShowAlert(true), setTimeout(() => { setShowAlert(false); }, 1500); }

  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      autoHidealert();
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  const [cron, setCron] = useState("* * * * *");

  const handleMinuteChange = (value: any) => {
    setInputs((prevInputs) => ({ ...prevInputs, input1: value }));
  };
  const handleHourChange = (value: any) => {
    setInputs((prevInputs) => ({ ...prevInputs, input2: value }));
  };
  const handleDayOfTheMonthChange = (value: any) => {
    setInputs((prevInputs) => ({ ...prevInputs, input3: value }));
  };
  const handleMonthChange = (value: any) => {
    setInputs((prevInputs) => ({ ...prevInputs, input4: value }));
  };
  const handleDayOfTheWeekChange = (value: any) => {
    setInputs((prevInputs) => ({ ...prevInputs, input5: value }));
  };

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
      {showAlert && (
        <AlertPanel />
        )}
      <CronOutputComponent>
        <div className="flex justify-center items-center mb-10">
          <p className="text-white text-4xl font-semibold ">
            Cron Output: {cron}
          </p>
          <a className="text-white" onClick={() => copyTextToClipboard(cron)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-clipboard-copy"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h3m9 -9v-5a2 2 0 0 0 -2 -2h-2" />
              <path d="M13 17v-1a1 1 0 0 1 1 -1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1 -1 1h-1m-3 0h-1a1 1 0 0 1 -1 -1v-1" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
          </a>
          <br />
        </div>
        <div className="flex justify-center items-center p-8">
          <p className="italic font-thin mb-10">
            {generateCronDescription(
              cron.split(" ")[0],
              cron.split(" ")[1],
              cron.split(" ")[2],
              cron.split(" ")[3],
              cron.split(" ")[4]
            )}
          </p>
        </div>
      </CronOutputComponent>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center p-8">
        <div className="">
          <CronInputComponent
            label="Minute"
            name="minute"
            min={0}
            max={59}
            includeStar={true}
            value={inputs.input1}
            onChange={handleMinuteChange}
          />
        </div>

        <div className="flex flex-col">
          <CronInputComponent
            label="Hour"
            name="hour"
            min={0}
            max={23}
            includeStar={true}
            value={inputs.input2}
            onChange={handleHourChange}
          />
        </div>

        <div className="flex flex-col">
          <CronInputComponent
            label="Day of the month"
            name="dayofthemonth"
            min={1}
            max={31}
            includeStar={true}
            value={inputs.input3}
            onChange={handleDayOfTheMonthChange}
          />
        </div>

        <div className="flex flex-col">
          <CronInputComponent
            label="Month"
            name="month"
            min={1}
            max={12}
            includeStar={true}
            value={inputs.input4}
            onChange={handleMonthChange}
          />
        </div>

        <div className="flex flex-col">
          <CronInputComponent
            label="Day of the week"
            name="dayoftheweek"
            min={0}
            max={7}
            includeStar={true}
            value={inputs.input5}
            onChange={handleDayOfTheWeekChange}
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 p-8">
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
