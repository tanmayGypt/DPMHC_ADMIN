import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GallaryTable({ data }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "title",  // Accessor for Title
                header: "Title",
                enableSorting: true,
            }, {
                accessorKey: "imageUrl",  // Accessor for Image URL
                header: "Image",
                Cell: ({ cell }) => (
                    <img
                        src={cell.getValue()}
                        alt="Blog"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                ),
            },
            {
                accessorKey: "active",  // Accessor for Is Active
                header: "Statue",
                enableSorting: true,
                Cell: ({ cell }) => (cell.getValue() ? "Active" : "Not Active"),  // Display Yes/No
            },


            {
                accessorKey: "dateCreated",  // Accessor for Date Created
                header: "Date Created",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString() || "Not Available"  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "dateModified",  // Accessor for Date Modified
                header: "Date Modified",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "Action",  // Action column
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
        navigate(`/addImage/${row?.id}`)
    };



    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
