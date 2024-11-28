import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function BlogsTable({ data }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "title", // Accessor for Title
                header: "Title",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "description", // Accessor for Description
                header: "Description",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
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
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },


            {
                accessorKey: "createdDate", // Accessor for Created Date
                header: "Created Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "modifiedDate", // Accessor for Created Time
                header: "Modified Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "published", // Accessor for Created Time
                header: "Publish Status",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() ? "Published" : "Not Published"  // Format timestamp to readable date
                },
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
    const handleUpdate = (row) => {
        navigate(`/addBlog/${row.id}`)
    };



    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
