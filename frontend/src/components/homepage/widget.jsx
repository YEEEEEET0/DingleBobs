import React from 'react';
import { Card } from 'react-bootstrap';
import Draggable from 'react-draggable';


const posSave = (e, data) => {
    localStorage.setItem('defaultPosition', JSON.stringify({ x: data.x, y: data.y }));
};

const Widget = () => {
    return (
        <Draggable defaultPosition={localStorage.getItem("defaultPosition") ? JSON.parse(localStorage.getItem("defaultPosition")) : {x: 0, y: 0}} onStop={posSave}>
            <Card style={{ width: '18rem', userSelect: "none" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div>Orders</div>
                    <div style={{ cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-three-dots-vertical">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </div>
                </div>
                <Card.Body>

                </Card.Body>
            </Card>
        </Draggable>
    );
};

export default Widget;