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
  const { register, handleSubmit, reset } = useForm();

 
  useEffect(() => {
    const storedData = localStorage.getItem('busScheduleData');
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);


  useEffect(() => {
    if (tableData.length > 0) {
      localStorage.setItem('busScheduleData', JSON.stringify(tableData));
    }
  }, [tableData]);

  const onSubmit = (data) => {
    const formattedStartDate = isValidDate(startDate) ? format(startDate, 'dd/MM/yyyy') : '';
    const formattedEndDate = isValidDate(endDate) ? format(endDate, 'dd/MM/yyyy') : '';

    data.startDate = formattedStartDate;
    data.endDate = formattedEndDate;

    setTableData((prevData) => [...prevData, data]);

    reset(); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-4 max-w-md w-full border rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-center mb-4">
          <span className="bg-red-500 text-white px-2 py-1 rounded-md">Bus Schedule</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="From"
              {...register('from', { required: true })}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="To"
              {...register('to', { required: true })}
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
              {...register('busService', { required: true })}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Bus Services</option>
              <option value="Express">Express</option>
              <option value="Regular">Regular</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <Button type="submit" className="w-full bg-red-500 text-white">
            Submit
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-2">
          * Schedule terms and conditions*
        </p>

        <DataTable data={tableData} />
      </div>
    </div>
  );
}
