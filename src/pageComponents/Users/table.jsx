import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";


export default function UsersTable({ data }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "fullName", // Accessor for Full Name
                header: "Full Name",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "username", // Accessor for Email
                header: "Email",
                enableSorting: true,
                Cell: ({ cell }) => {
                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "phoneNumber", // Accessor for Full Name
                header: "Phone Number",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },


            {
                accessorKey: "verified", // Accessor for Is Verified
                header: "Verified",
                Cell: ({ renderedCellValue }) => (renderedCellValue ? "Yes" : "No"),
                enableSorting: true,

            },
            {
                accessorKey: "dob", // Accessor for Date of Birth
                header: "Date of Birth",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "country", // Accessor for Country
                header: "Country",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "state", // Accessor for State
                header: "State",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "address", // Accessor for Address
                header: "Address",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
            },
            {
                accessorKey: "createdDate", // Accessor for Created Date
                header: "Created Date",
                Cell: ({ renderedCellValue }) =>
                    new Date(renderedCellValue).toLocaleString(), // Format the date
                enableSorting: true,
            },

        ],
        []
    );

    // Initialize the table with data and columns
    const table = useMaterialReactTable({
        data,
        columns,
        enableSorting: true,
        enablePagination: true,
        initialState: {
            pagination: { pageIndex: 0, pageSize: 5 },
        },
    });

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
