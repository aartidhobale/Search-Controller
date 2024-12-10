'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from './DataTable';

const isValidDate = (date) => date instanceof Date && !isNaN(date);

export default function BusScheduleForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const phrasesToTranslate = {
    from: "From",
    to: "To",
    busService: "Bus Services",
    submit: "Submit",
    schedule: "Bus Schedule",
    conditions: "* Schedule terms and conditions*",
    noData: "No data available",
  };

  // Fetch translations when language changes
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const keys = Object.keys(phrasesToTranslate);
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language}&dt=t&q=${encodeURIComponent(
            keys.map((key) => phrasesToTranslate[key]).join("\n")
          )}`
        );
        const data = await response.json();
        const translationsObject = keys.reduce((acc, key, index) => {
          acc[key] = data[0][index][0];
          return acc;
        }, {});
        setTranslations(translationsObject);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    fetchTranslations();
  }, [language]);

  // Fetch initial data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('busScheduleData');
    if (storedData) {
      setTableData(JSON.parse(storedData)); // Parse and set the data to tableData
    }
  }, []);

  // Save data to localStorage whenever tableData changes
  useEffect(() => {
    localStorage.setItem('busScheduleData', JSON.stringify(tableData));
  }, [tableData]);

  const onSubmit = (data) => {
    const formattedStartDate = isValidDate(startDate)
      ? format(startDate, 'dd/MM/yyyy')
      : '';
    const formattedEndDate = isValidDate(endDate)
      ? format(endDate, 'dd/MM/yyyy')
      : '';

    const newEntry = {
      ...data,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    setTableData((prevData) => [...prevData, newEntry]); // Update state
    reset(); // Reset form fields
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-4 max-w-md w-full border rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-center mb-4">
          <span className="bg-red-500 text-white px-2 py-1 rounded-md">
            {translations.schedule || "Bus Schedule"}
          </span>
        </h2>
        <div className="mb-4 text-right">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder={translations.from || "From"}
              {...register("from", { required: true })}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder={translations.to || "To"}
              {...register("to", { required: true })}
            />
          </div>

          <div>
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border rounded-lg"
              placeholderText="Select dates"
            />
          </div>

          <div>
            <select
              {...register("busService", { required: true })}
              className="w-full border rounded-lg p-2"
            >
              <option value="">{translations.busService || "Bus Services"}</option>
              <option value="Express">Express</option>
              <option value="Regular">Regular</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <Button type="submit" className="w-full bg-red-500 text-white">
            {translations.submit || "Submit"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-2">
          {translations.conditions || "* Schedule terms and conditions*"}
        </p>

        <DataTable data={tableData} translations={translations} />
      </div>
    </div>
  );
}
