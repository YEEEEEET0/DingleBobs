// Importing necessary libraries and components
import $ from 'jquery';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

// Definition of the TransitionManager class
export class TransitionManager {
    constructor(eventConditions) {
        // Initializing the TransitionManager with event conditions and URL parameters
        this.urlParams = new URLSearchParams(window.location.search);
        this.eventConditions = eventConditions;
        // Initializing event listeners and handling the initial load
        this.initializeEventListeners();
        this.handleInitialLoad();
    }

    // Handling the transition between components
    handleTransition(e) {
        const { component, destination, params } = e.data.callee;
        // Dynamically importing the component based on the provided path
        const ImportedComp = React.lazy(() => import(`./components/homepage/${component}.jsx`));

        // Loading component displayed while the requested component is being fetched
        const LoadingComp = () => {
            return (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        };

        // Component displayed during the transition
        const SuspendedComp = () => {
            return (
                <Suspense fallback={<LoadingComp />}>
                    <ImportedComp {...params} />
                </Suspense>
            );
        };

        // Fading out the current component, rendering the new component, and then fading it in
        $(destination).fadeOut(400, () => {
            ReactDOM.render(<SuspendedComp />, $(destination)[0], () => $(destination).fadeIn(400));
        });
    }

    // Creating a transition based on the provided event object
    createTransition(eventObject) {
        const { target, event, selector, ...other } = eventObject;
        const eventData = { callee: other };

        // Attaching the event listener to the specified target element
        if (selector)
            $(target).on(event, selector, eventData, this.handleTransition);
        else
            $(target).on(event, eventData, this.handleTransition);

    }

    // Initializing event listeners based on the provided event conditions
    initializeEventListeners() {
        this.eventConditions.forEach((eventObject) => {
            const { target, event, selector, ...other } = eventObject;
            const eventData = { callee: other };

            // Attaching the event listener to the specified target element
            if (selector)
                $(target).on(event, selector, eventData, this.handleTransition);
            else
                $(target).on(event, eventData, this.handleTransition);

        });
    }

    // Handling the initial load based on the URL parameters
    handleInitialLoad() {
        if (this.urlParams.has('loc')) {
            // To-Do: Add logic for handling initial load based on the URL parameters
        }
    }
}
