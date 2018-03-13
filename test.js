let listeners = [1,2,3,4,5];
const subscribe = (listenerCallback) => {
    // push the callback to listeners array (tract how many subscribe functions has being triggered)
    listeners.push(listenerCallback);

    return () => {
        return listeners = listeners.filter((item) => {
            return item !== listenerCallback;
        });
    };
};




