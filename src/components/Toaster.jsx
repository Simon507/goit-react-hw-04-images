import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toaster = ({ message }) => {
  toast(message);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
