import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoryTable({ data }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "categoryName", // Accessor for Category Name
                header: "Category Name",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "subCategory", // Accessor for Sub Category
                header: "Sub Category",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "createdTime", // Accessor for Created Time
                header: "Created Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString(); // Format timestamp to readable date
                },
            },
            {
                accessorKey: "lastModified", // Accessor for Last Modified Time
                header: "Last Modified",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString(); // Format timestamp to readable date
                },
            },
            {
                accessorKey: "Action", // Action column
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
    const handleUpdate = (row) => {
        navigate(`/addCategory/${row.id}`)
    };

    const handleDelete = (categoryName) => {
        alert(`Delete action triggered for Category: ${categoryName}`);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
