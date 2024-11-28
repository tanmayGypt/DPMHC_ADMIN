import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";

export default function CommentTable({ data }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "user",  // Accessor for User
                header: "User",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "dateCreated",  // Accessor for Date Created
                header: "Date Created",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleString();  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "comment",  // Accessor for Comment
                header: "Comment",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },

            },
            {
                accessorKey: "targetBlogId",  // Accessor for Target Blog ID
                header: "Target Blog ID",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
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
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(row.original.targetBlogId)}
                        >
                            Delete
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
        alert(`Update action triggered for: ${JSON.stringify(row)}`);
    };

    const handleDelete = (targetBlogId) => {
        alert(`Delete action triggered for Target Blog ID: ${targetBlogId}`);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
