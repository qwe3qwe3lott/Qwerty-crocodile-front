import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.scss';
import 'react-select-search/style.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
	<RouterProvider router={router}/>
);
