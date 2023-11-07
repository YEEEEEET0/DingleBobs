import $ from 'jquery';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

export class TransitionManager {
    constructor(eventConditions) {
        this.urlParams = new URLSearchParams(window.location.search);
        this.eventConditions = eventConditions;
        this.initializeEventListeners();
        this.handleInitialLoad();
    }

    handleTransition(e) {
        const { component, destination, params } = e.data.callee;
        const ImportedComp = React.lazy(() => import(`./components/homepage/${component}.jsx`));

        const LoadingComp = () => {
            return (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        };

        const SuspendedComp = () => {
            return (
                <Suspense fallback={<LoadingComp />}>
                    <ImportedComp {...params} />
                </Suspense>
            );
        };

        $(destination).fadeOut(400, () => {
            ReactDOM.render(<SuspendedComp />, $(destination)[0], () => $(destination).fadeIn(400));
        });
    }

    createTransition(eventObject) {
        const { target, event, selector, ...other } = eventObject;
        const eventData = { callee: other };

        if (selector) {
            $(target).on(event, selector, eventData, this.handleTransition);
        } else {
            $(target).on(event, eventData, this.handleTransition);
        }
    }

    initializeEventListeners() {
        this.eventConditions.forEach((eventObject) => {
            const { target, event, selector, ...other } = eventObject;
            const eventData = { callee: other };

            if (selector) {
                $(target).on(event, selector, eventData, this.handleTransition);
            } else {
                $(target).on(event, eventData, this.handleTransition);
            }
        });
    }

    handleInitialLoad() {
        if (this.urlParams.has('loc')) {
            // ToDo: add initial load logic
        }
    }
}