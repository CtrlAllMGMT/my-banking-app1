// src/pages/InvoicePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { fetchInvoices, createInvoice } from '../services/api';


const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    amount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoicesData = await fetchInvoices();
        setInvoices(invoicesData);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateInvoice = async () => {
    try {
      const createdInvoice = await createInvoice(newInvoice);
      setInvoices([...invoices, createdInvoice]);
      setOpenDialog(false);
      setNewInvoice({ customer: '', amount: 0 });
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewInvoice({ ...newInvoice, [event.target.name]: event.target.value });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Create Invoice
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Invoice</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="customer"
            label="Customer"
            type="text"
            fullWidth
            value={newInvoice.customer}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={newInvoice.amount}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateInvoice} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const onSubmit = async (data) => {
    try {
      const createdInvoice = await createInvoice(data);
      setInvoices([...invoices, createdInvoice]);
      setOpenDialog(false);
      reset();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* ... */}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Invoice</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register('customer', { required: 'Customer is required' })}
              autoFocus
              margin="dense"
              name="customer"
              label="Customer"
              type="text"
              fullWidth
              error={!!errors.customer}
              helperText={errors.customer?.message}
            />
            <TextField
              {...register('amount', { required: 'Amount is required', min: 0.01 })}
              margin="dense"
              name="amount"
              label="Amount"
              type="number"
              fullWidth
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default InvoicePage;