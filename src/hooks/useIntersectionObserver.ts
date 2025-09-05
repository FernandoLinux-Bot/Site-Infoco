// Fix: Import `React` to use `React.Dispatch` and `React.SetStateAction` types.
import React, { useState, useEffect } from 'react';

const useIntersectionObserver = (options: IntersectionObserverInit): [React.Dispatch<React.SetStateAction<Element | null>>, boolean] => {
    const [element, setElement] = useState<Element | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(element);
            }
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    }, [element, options]);

    return [setElement, isVisible];
};

export default useIntersectionObserver;
