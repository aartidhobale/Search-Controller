'use client';

import React from 'react';
import { cn } from "@/lib/utils"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

export default function DataTable({ data }) {
  return (
    <div className="overflow-x-auto mt-4">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">From</TableHead>
            <TableHead className="px-4 py-2">To</TableHead>
            <TableHead className="px-4 py-2">Start Date</TableHead>
            <TableHead className="px-4 py-2">End Date</TableHead>
            <TableHead className="px-4 py-2">Bus Service</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2">{item.from}</TableCell>
                <TableCell className="px-4 py-2">{item.to}</TableCell>
                <TableCell className="px-4 py-2">{item.startDate}</TableCell>
                <TableCell className="px-4 py-2">{item.endDate}</TableCell>
                <TableCell className="px-4 py-2">{item.busService}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
