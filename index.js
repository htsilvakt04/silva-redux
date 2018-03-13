function createStore () {
    // the state tree
    // get
    // listen
    // update

    let state;
    let listeners = [];

    const getState = () => state;
    const subscribe = (listenerCallback) => {
        // push the callback to listeners array (tract how many subscribe functions has being triggered)
        const length = listeners.push(listenerCallback);

        return () => {
            listeners = listeners.filter((item) => {
                return item !== listenerCallback;
            })
        };

        // check if the state was changed, compare the last and the current one
        // need to have a history variable in order to do that

        // if change then return the change

        // else return not thing
    };


    return {
        getState,
        subscribe
    }
}



