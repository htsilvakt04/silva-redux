let addAction = {
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Learn more than Redux',
        complete: false
    }
};

let removeAction = {
    type: 'REMOVE_TODO',
    id: 2
};

let toggleAction = {
    type: 'TOGGLE_TODO',
    id: 3
};

// be responsible for returning the "Next state" of our app after a particular event happened
function reducer (currentState = [], action) {
    if (action.type === 'ADD_TODO') {
        return currentState.concat([action.todo]);
    }
    // switch (action.type) {
    //     case 'ADD_TODO':
    //         return currentState.concat([action.todo]);
    //     case 'REMOVE_TODO':
    //         // remove todo
    //     default:
    //         return currentState;
    // }
    return currentState;
}


function createStore () {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listenerCallback) => {
        // push the callback to listeners array (tract how many subscribe functions has being triggered)
        listeners.push(listenerCallback);

        return () => {
            listeners = listeners.filter( item => {
                return item !== listenerCallback;
            })
        };
    };

    let dispatch = (action) => {
        // call reducer
        state = reducer(state, action);
        // invoke listener function
        listeners.forEach(listener => listener(state));
        // return new State || null

    };
    return {
        getState,
        subscribe,
        dispatch
    }
}

// new file
let store = createStore();

let subscriber = store.subscribe((newState) => {
    console.log('new state is ' + JSON.stringify( newState));
});
// get this from database or from user input form


let result = store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Learn more than Redux',
        complete: false
    }
});




