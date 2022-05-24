import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { gql, useQuery } from '@apollo/client';
import { Button } from "@mui/material";
import DialogComponent from '../dialogs/Dialog';

const PRODUCTS = gql`
{
    products{
      _id
      name
      description
    }
  }
`;

const Table = () => {

    const [columns, setcolumns] = React.useState([
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 230 },
        { field: 'description', headerName: 'Description', width: 230 },
    ]);

    const [rows, setrows] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const { loading, error, data } = useQuery(PRODUCTS);


    React.useEffect(() => {
        if (!data) return;
        const mapProducts = data?.products?.map((product, index) =>
            ({ id: index, _id: product?._id, name: product?.name, description: product?.description }));
        setrows(mapProducts);
    }, [data])


    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <Button variant="contained" onClick={handleClickOpen}>Add Product</Button>
            </div>
            <DialogComponent open={open} setOpen={() => setOpen(false)} />
        </div>
    )
}

export default Table