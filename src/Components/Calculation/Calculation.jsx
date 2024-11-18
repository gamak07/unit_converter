import React, { useState } from "react";
import { create, all } from "mathjs";

const math = create(all);

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [result, setResult] = useState(null);

  const units = [
    { name: "Meters", symbol: "m" },
    { name: "Centimeters", symbol: "cm" },
    { name: "Kilometers", symbol: "km" },
    { name: "Inches", symbol: "in" },
    { name: "Feet", symbol: "ft" },
    { name: "Grams", symbol: "g" },
    { name: "Kilograms", symbol: "kg" },
    { name: "Pounds", symbol: "lb" },
    { name: "Fahrenheit", symbol: "°F" },
    { name: "Celsius", symbol: "°C" },
    { name: "Kelvin", symbol: "K" },
  ];

  const convert = () => {
    try {
      if (
        (fromUnit === "°C" || fromUnit === "°F" || fromUnit === "K") &&
        (toUnit === "°C" || toUnit === "°F" || toUnit === "K")
      ) {
        // Handle temperature conversions manually
        let value = parseFloat(inputValue);
        if (isNaN(value)) throw new Error("Invalid input");

        let convertedValue;
        if (fromUnit === "°C" && toUnit === "°F") {
          convertedValue = (value * 9) / 5 + 32;
        } else if (fromUnit === "°C" && toUnit === "K") {
          convertedValue = value + 273.15;
        } else if (fromUnit === "°F" && toUnit === "°C") {
          convertedValue = ((value - 32) * 5) / 9;
        } else if (fromUnit === "°F" && toUnit === "K") {
          convertedValue = ((value - 32) * 5) / 9 + 273.15;
        } else if (fromUnit === "K" && toUnit === "°C") {
          convertedValue = value - 273.15;
        } else if (fromUnit === "K" && toUnit === "°F") {
          convertedValue = ((value - 273.15) * 9) / 5 + 32;
        } else {
          convertedValue = value; // Same unit, no conversion needed
        }
        setResult(`${convertedValue.toFixed(2)} ${toUnit}`);
      } else {
        // Non-temperature conversions using mathjs
        const convertedValue = math.unit(inputValue, fromUnit).to(toUnit);
        setResult(convertedValue.toString());
      }
    } catch (error) {
      setResult("Conversion not possible");
    }
  };

  const handleNumberClick = (number) => {
    setInputValue((prev) => prev + number);
  };

  const handleClear = () => {
    setInputValue("");
    setResult(null);
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Unit Converter</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value"
        className="border border-gray-300 rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex mb-4">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mr-2"
        >
          {units.map((unit) => (
            <option key={unit.symbol} value={unit.symbol}>
              {unit.name}
            </option>
          ))}
        </select>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2"
        >
          {units.map((unit) => (
            <option key={unit.symbol} value={unit.symbol}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[...Array(10).keys()].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleNumberClick(".")}
          className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600"
        >
          .
        </button>
      </div>
      <div className="flex mb-4">
        <button
          onClick={convert}
          className="bg-green-500 text-white rounded-lg w-full p-3 hover:bg-green-600"
        >
          Convert
        </button>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleClear}
          className="bg-red-500 text-white rounded-lg w-full p-3 hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={handleDelete}
          className="bg-yellow-500 text-white rounded-lg w-full p-3 hover:bg-yellow-600"
        >
          Delete
        </button>
      </div>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default Calculator;
