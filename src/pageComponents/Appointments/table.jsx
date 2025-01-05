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
                    return cell.getValue() || "Not Available";  // Handle null values
                },
            },
            {
                accessorKey: "phone", // Accessor for Phone
                header: "Phone",
                enableSorting: true,
                Cell: ({ cell }) => {
                    return cell.getValue() || "Not Available";  // Handle null values
                },
            },
            {
                accessorKey: "emailAddress", // Accessor for Email Address
                header: "Email Address",
                Cell: ({ renderedCellValue }) => (
                    <Link to={`mailto:${renderedCellValue}`}>{renderedCellValue || "Not Available"}</Link>
                ),
                enableSorting: true,
            },
            {
                accessorKey: "date", // Accessor for Date
                header: "Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    return cell.getValue() || "Not Available";  // Handle null values
                },
            },
            {
                accessorKey: "time", // Accessor for Time
                header: "Time",
                enableSorting: true,
                Cell: ({ cell }) => {
                    return cell.getValue() || "Not Available";  // Handle null values
                },
            },
            {
                accessorKey: "message", // Accessor for Message
                header: "Message",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {
                    return cell.getValue() || "Not Available";  // Handle null values
                },
            },
            {
                accessorKey: "dateCreated", // Accessor for Created Date
                header: "Created Date",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return !isNaN(date.getTime()) ? date.toLocaleString() : "Not Available"; // Format timestamp to readable date
                },
            },
            {
                accessorKey: "dateModified", // Accessor for Modified Date
                header: "Modified Date",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return !isNaN(date.getTime()) ? date.toLocaleString() : "Not Available"; // Format timestamp to readable date
                },
            },
            {
                accessorKey: "documentUrl", // Accessor for Document URL
                header: "Document",
                Cell: ({ renderedCellValue }) => {
                    const url = renderedCellValue?.startsWith("http") ? renderedCellValue : `https://${renderedCellValue}`;
                    return renderedCellValue ? (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            View Document
                        </a>
                    ) : "Not Available";
                },
                enableSorting: true,
            },
            {
                accessorKey: "status", // Accessor for Client Status
                header: "Client Status",
                Cell: ({ renderedCellValue }) => {
                    return renderedCellValue || "Not Available"; // Handle null values
                },
                enableSorting: true,
            },
            {
                accessorKey: "attended", // Accessor for Attend Status
                header: "Attend Status",
                Cell: ({ renderedCellValue }) => {
                    return renderedCellValue === null ? "Not Available" : renderedCellValue ? "Attended" : "Not Attended";
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

    const navigate = useNavigate();

    // Handlers for Update and Delete actions
    const handleUpdate = (row) => {
        navigate(`/appointment/${row.id}`);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
