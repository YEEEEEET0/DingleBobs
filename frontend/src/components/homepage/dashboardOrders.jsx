import React, { useEffect, useRef, useState } from 'react';
import NavBlob from './navBlob';

const DashboardOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const order_dropdownRef = useRef(null);


    useEffect(() => {
        const fetchOrders = async () => {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

            fetch('http://localhost:3000/food/restaurants/orders', { headers: { "Authorization": token } })
                .then(response => {
                    if (response.status === 403) setError('No access');
                    else return response.json();
                })
                .then(data => {
                    if (data) setOrders(data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        };
        fetchOrders();
    }, []);


    return (
        <div className='dashbody'>
            <NavBlob />

        </div>
    );
}

export default DashboardOrders;