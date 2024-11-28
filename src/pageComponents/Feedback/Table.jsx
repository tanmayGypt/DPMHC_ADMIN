import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";



export default function QuestionTable({ data }) {
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
                accessorKey: "title",  // Accessor for Title
                header: "Title",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "message",  // Accessor for Message
                header: "Message",
                muiTableBodyCellProps: { sx: { maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "category",  // Accessor for Category
                header: "Category",
                enableSorting: true,
                Cell: ({ cell }) => {

                    return cell.getValue() || "Not Available";  // Format timestamp to readable date
                },
            },
            {
                accessorKey: "createdDate",  // Accessor for Created Date
                header: "Created Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString()  // Format timestamp to readable date
                },
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

    const handleDelete = (title) => {
        alert(`Delete action triggered for Title: ${title}`);
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
