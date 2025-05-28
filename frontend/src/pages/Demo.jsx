import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  CssBaseline,
} from "@mui/material";

const data = [...Array(30)].map((_, idx) => ({
  nama: `John Doe ${idx + 1}`,
  email: `john${idx}@example.com`,
  alamat: "Jakarta",
  telepon: "08123456789",
  perusahaan: "Acme Inc",
  catatan:
    "Pelanggan VIP dengan permintaan khusus setiap bulan. Teks ini sangat panjang untuk dites wrapping dan responsif di tabel.",
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function Demo() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nama");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = data.slice().sort(getComparator(order, orderBy));

  return (
    <>
      <CssBaseline />
      <TableContainer
        component={Paper}
        className="max-h-[400px] overflow-x-auto shadow-md"
      >
        <Table stickyHeader size="small" aria-label="sticky table" className="min-w-full">
          <TableHead className="bg-gray-100">
            <TableRow>
              {[
                "nama",
                "email",
                "alamat",
                "telepon",
                "perusahaan",
                "catatan",
              ].map((headCell) => (
                <TableCell
                  key={headCell}
                  sortDirection={orderBy === headCell ? order : false}
                  className="whitespace-normal break-words px-4 py-2 text-left"
                >
                  <TableSortLabel
                    active={orderBy === headCell}
                    direction={orderBy === headCell ? order : "asc"}
                    onClick={() => handleSort(headCell)}
                    className="font-semibold text-gray-800"
                  >
                    {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, idx) => (
              <TableRow
                key={idx}
                hover
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="whitespace-normal break-words px-4 py-2">
                  {row.nama}
                </TableCell>
                <TableCell className="whitespace-normal break-words px-4 py-2">
                  {row.email}
                </TableCell>
                <TableCell className="whitespace-normal break-words px-4 py-2">
                  {row.alamat}
                </TableCell>
                <TableCell className="whitespace-normal break-words px-4 py-2">
                  {row.telepon}
                </TableCell>
                <TableCell className="whitespace-normal break-words px-4 py-2">
                  {row.perusahaan}
                </TableCell>
                <TableCell className="whitespace-normal break-words px-4 py-2">
                  {row.catatan}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}