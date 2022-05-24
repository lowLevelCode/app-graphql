import { gql, useMutation } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react'


const CREATE_PRODUCT = gql`
mutation createProduct($product:CreateProductInput!){
    createProduct(createProductInput:$product){
      name
      description
    }
}
`;

const DialogComponent = ({open, setOpen}) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

    const clearInputs = ()=> {
        setDescription('');
        setName('');
    }

    const onCreate = async () => {
        const response = await createProduct({variables:{
            product: {
                name: name,
                description: description
            }
        }});        
        handleClose();        
        clearInputs();
    }    

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create new Product</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    margin="dense"
                    id="description"
                    label="Description"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent