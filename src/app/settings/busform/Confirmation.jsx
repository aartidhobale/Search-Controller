// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Table, TableHead, TableBody, TableRow, TableCell } from '@shadcn/ui'; // Import ShadCN Table components

// export default function ConfirmationPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState([]);

//   useEffect(() => {
//     const data = router.query.data ? JSON.parse(router.query.data) : [];
//     setFormData(data);
//   }, [router.query.data]);

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-4">Confirmation</h2>
//       {formData.length > 0 ? (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>From</TableCell>
//               <TableCell>To</TableCell>
//               <TableCell>Bus Service</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Duration</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {formData.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.from}</TableCell>
//                 <TableCell>{item.to}</TableCell>
//                 <TableCell>{item.busService}</TableCell>
//                 <TableCell>{item.startDate}</TableCell>
//                 <TableCell>{item.endDate}</TableCell>
//                 <TableCell>{item.price}</TableCell>
//                 <TableCell>{item.duration}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         <p>No schedule data available.</p>
//       )}
//     </div>
//   );
// }
