// src/services/api.js
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchInvoices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to fetch invoices');
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    if (error.response) {
      throw new Error(`Failed to create invoice: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error creating invoice');
    }
  }
};