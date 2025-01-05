import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogsTable({ data }) {
    // Filter out rows with modelCategoty === 1
    const filteredData = useMemo(() => {
        return data.filter((row) => row.modelCategoty !== 1);
    }, [data]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "title", // Accessor for Title
                header: "Title",
                enableSorting: true,
                Cell: ({ cell }) => cell.getValue() || "Not Available", // Handle empty values
            },
            {
                accessorKey: "description", // Accessor for Description
                header: "Description",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => cell.getValue() || "Not Available", // Handle empty values
            },
            {
                accessorKey: "author", // Accessor for Author
                header: "Author",
                enableSorting: true,
            },
            {
                accessorKey: "category", // Accessor for Category
                header: "Category",
                enableSorting: true,
                Cell: ({ cell }) => cell.getValue() || "Not Available", // Handle empty values
            },
            {
                accessorKey: "createdDate", // Accessor for Created Date
                header: "Created Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleString() || "Not Available"; // Format timestamp
                },
            },
            {
                accessorKey: "modifiedDate", // Accessor for Modified Date
                header: "Modified Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleString() || "Not Available"; // Format timestamp
                },
            },
            {
                accessorKey: "published", // Accessor for Publish Status
                header: "Publish Status",
                enableSorting: true,
                Cell: ({ cell }) => (cell.getValue() ? "Published" : "Not Published"), // Boolean to string
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
        data: filteredData, // Use filtered data
        columns,
        enableSorting: true,
        enablePagination: true,
        initialState: {
            pagination: { pageIndex: 0, pageSize: 5 },
        },
    });

    const navigate = useNavigate();
    const handleUpdate = (row) => {
        navigate(`/addBlog/${row.id}`);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
