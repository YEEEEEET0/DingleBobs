import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
let listening = [];



const Widget = (props) => {
    const dropdownRef = useRef();
    const dropdown = document.getElementById(`${props.id}-dropdown`);
    const posSave = (e, data) => {
        localStorage.setItem(`defaultPosition${props.id}`, JSON.stringify({ x: data.x, y: data.y }));
    };

    /**
     * 
     * @param {HTMLElement} ref 
     */
    const handleRef = (ref) => {
        dropdownRef.current = ref;
        if (dropdown && dropdownRef.current && !listening.includes(`${ref.children[0].textContent}-dropdown`)) {
            listening.push(`${ref.children[0].textContent}-dropdown`);

            dropdownRef.current.addEventListener('click', (e) => {
                console.log(dropdown)
                dropdown.children[0].children[0].children[0].textContent = ref.children[0].textContent;
                dropdown.classList.toggle("card-dropdown-active");
            }, true);
        }
    };

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child) && child.props.className === 'orders-list')
            return React.cloneElement(child, { ref: handleRef });

        return child;
    });

    return (
        <Draggable defaultPosition={localStorage.getItem(`defaultPosition${props.id}`) ? JSON.parse(localStorage.getItem(`defaultPosition${props.id}`)) : { x: 0, y: 0 }} onStop={posSave}>
            <Card style={{ width: '18rem', userSelect: "none" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div>{props.titlename}</div>
                    <div style={{ cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-three-dots-vertical">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </div>
                </div>
                <Card.Body>
                    {childrenWithProps}
                </Card.Body>
            </Card>
        </Draggable>
    );
};

export default Widget;