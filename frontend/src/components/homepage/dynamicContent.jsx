import React, { useEffect, useState } from 'react';

export const DynamicContentOrders = ({ parentRef }) => {
    const [orders, setOrders] = useState({});
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
                const response = await fetch('http://localhost:3000/food/restaurants/orders', {
                    headers: {
                        "Authorization": token
                    }
                });

                if (response.status === 403) {
                    setError('No access');
                } else {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (parentRef.current && Object.keys(orders).length > 0) {
            const dropDown = parentRef.current;
            const dropTitle = dropDown.children[0].children[0].children[0];

            const titleObserver = new MutationObserver((mutationsList) => {
                mutationsList.forEach((mutation) => {
                    if (mutation.type === "childList" && mutation.addedNodes.length > 0 && mutation.addedNodes[0].nodeName === "#text") {
                        const establishmentName = mutation.addedNodes[0].textContent.trim();
                        const establishmentOrders = orders[establishmentName];
                        setCurrent(establishmentOrders || []);
                    }
                });
            });

            titleObserver.observe(dropTitle, { childList: true, subtree: true });

            return () => {
                titleObserver.disconnect();
            };
        }
    }, [orders, parentRef]);

    return (
        <div>
            {
                current.map((order, idx) => (
                    <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px 0' }}>
                        <div><strong>Destination:</strong> {order.destination}</div>
                        <div><strong>Food Names:</strong> {order.food_names.join(', ')}</div>
                        <div><strong>Predicted Arrival:</strong> {order.predicted_arrival}</div>
                        <div><strong>Price:</strong> {order.price}</div>
                    </div>
                ))
            }
        </div>
    );
}
