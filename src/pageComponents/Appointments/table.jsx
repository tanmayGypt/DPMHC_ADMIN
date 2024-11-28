import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";



export default function AppointmentTable({ data }) {
    // Define columns for the table
    const columns = useMemo(
        () => [
            {
                accessorKey: "name", // Accessor for Name
                header: "Name",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "phone", // Accessor for Phone
                header: "Phone",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "emailAddress", // Accessor for Email Address
                header: "Email Address",
                Cell: ({ renderedCellValue }) => (
                    <Link to={`mailto:${renderedCellValue}`}>{renderedCellValue}</Link>
                ),
                enableSorting: true,
            },
            {
                accessorKey: "date", // Accessor for Date
                header: "Date",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "time", // Accessor for Time
                header: "Time",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "message", // Accessor for Message
                header: "Message",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "dateCreated", // Accessor for Message
                header: "Created Date",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleString() // Format timestamp to readable date
                },
            },
            {
                accessorKey: "dateModified", // Accessor for Message
                header: "Modified Date",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleString(); // Format timestamp to readable date
                },
            },


            {
                accessorKey: "documentUrl", // Accessor for Document URL
                header: "Document",
                Cell: ({ renderedCellValue }) => {
                    const url = renderedCellValue?.startsWith("http")
                        ? renderedCellValue
                        : `https://${renderedCellValue}`;
                    return (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            View Document
                        </a>
                    );
                },
                enableSorting: true,
            },
            {
                accessorKey: "status", // Accessor for Document URL
                header: "Client Status",
                Cell: ({ renderedCellValue }) => {
                    return renderedCellValue ? renderedCellValue : "Not Available"
                },
                enableSorting: true,
            },
            {
                accessorKey: "attended", // Accessor for Document URL
                header: "Attend Status",
                Cell: ({ renderedCellValue }) => {
                    return renderedCellValue ? "Attended" : "Not Attended"
                },
                enableSorting: true,
            },
            {
                accessorKey: "attendedDate", // Accessor for Document URL
                header: "Attend Status",
                Cell: ({ renderedCellValue }) => {
                    const date = new Date(renderedCellValue);
                    return date.toLocaleString();
                },
                enableSorting: true,
            },
            {
                accessorKey: "Action", // New Action column
                header: "Action",
                Cell: ({ row }) => (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(row.original)}
                        >
                            Update
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        data,
        columns,
        enableSorting: true,
        enablePagination: true,
        initialState: {
            pagination: { pageIndex: 0, pageSize: 5 },
        },
    });
    const navigate = useNavigate()
    // Handlers for Update and Delete actions
    const handleUpdate = (row) => {

        navigate(`/appointment/${row.id}`)
    };


    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
