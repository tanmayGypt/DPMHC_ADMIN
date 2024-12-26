import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotificationsTable({ data }) {
    const formatDateTime = (timestamp) => {
        if (!timestamp) return "Not Applicable";
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()}`; // Combine date and time
    };

    const navigate = useNavigate();

    // Handlers for Update action
    const handleUpdate = (row) => {
        navigate(`/addNotification/${row.id}`);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "title", // Accessor for title
                header: "Title",
                enableSorting: true,
                Cell: ({ row }) => row.original.title || "Not Applicable",
            },
            {
                accessorKey: "message", // Accessor for message
                header: "Message",
                muiTableBodyCellProps: {
                    sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
                },
                enableSorting: true,
                Cell: ({ row }) => row.original.message || "Not Applicable",
            },
            {
                accessorKey: "dateCreated", // Accessor for Date Created
                header: "Date Created",
                enableSorting: true,
                Cell: ({ row }) => formatDateTime(row.original.dateCreated),
            },
            {
                accessorKey: "dateModified", // Accessor for Date Modified
                header: "Date Modified",
                enableSorting: true,
                Cell: ({ row }) => formatDateTime(row.original.dateModified),
            },
            {
                accessorKey: "showOnWeb", // Accessor for Show On Web
                header: "Show on Web",
                Cell: ({ renderedCellValue }) =>
                    renderedCellValue !== undefined && renderedCellValue !== null ? (renderedCellValue ? "Yes" : "No") : "Not Applicable",
                enableSorting: true,
            },
            {
                accessorKey: "showOnApp", // Accessor for Show On App
                header: "Show on App",
                Cell: ({ renderedCellValue }) =>
                    renderedCellValue !== undefined && renderedCellValue !== null ? (renderedCellValue ? "Yes" : "No") : "Not Applicable",
                enableSorting: true,
            },
            {
                accessorKey: "active", // Accessor for Active Status
                header: "Active Status",
                Cell: ({ renderedCellValue }) =>
                    renderedCellValue !== undefined && renderedCellValue !== null ? (renderedCellValue ? "Yes" : "No") : "Not Applicable",
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
        [navigate]
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
        muiTableBodyRowProps: ({ row }) => ({
            sx: {
                backgroundColor: row.original.active ? "rgba(255, 0, 0, 0.1)" : "white", // Apply reddish background if active
            },
        }),
    });

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
