import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MedicineTable({ data }) {
    const navigate = useNavigate();

    const formatDateTime = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString(), // Format as 'MM/DD/YYYY'
            time: date.toLocaleTimeString(), // Format as 'HH:MM AM/PM'
        };
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "title", // Accessor for Title
                header: "Title",
                enableSorting: true,
                Cell: ({ row }) => {
                    // Access the specific cell value for 'category'
                    return row.original.title || "Not Available";
                },
            },
            {
                accessorKey: "description", // Accessor for Description
                header: "Description",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ row }) => {
                    // Access the specific cell value for 'category'
                    return row.original.description || "Not Available";
                },
            },
            {
                accessorKey: "author", // Accessor for Author
                header: "Author",
                enableSorting: true,
                Cell: ({ row }) => {
                    // Access the specific cell value for 'category'
                    return row.original.author || "Not Available";
                },
            },
            {
                accessorKey: "category", // Accessor for Category
                header: "Category",
                enableSorting: true,
                Cell: ({ row }) => {
                    // Access the specific cell value for 'category'
                    return row.original.author || "Not Available";
                },
            },
            {
                accessorKey: "createdDate", // Accessor for Created Date
                header: "Created Date",
                Cell: ({ row }) => {
                    const formatted = formatDateTime(row.original.createdDate);
                    return formatted.date || "Not Available";
                },
                enableSorting: true,
            },
            {
                accessorKey: "modifiedDate", // Accessor for Created Time
                header: "Modified Date",
                Cell: ({ row }) => {
                    const formatted = formatDateTime(row.original.modifiedDate);
                    return formatted.date || "Not Available";
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
    const handleUpdate = (row) => {
        navigate(`/addBlog/${row.id}`)
    };



    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
