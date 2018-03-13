// create store
    // state tree, getState, listen To any Changes in state, Update state (dispatch)



// create a reducer
    // return a "next state" base on the action type

let addAction = {
    type: 'ADD_TODO',
    body: {
        title: 'finish Mongo db',
        completed: false
    }
};

function reducer (currentState = [], action) {
    if (action.type === 'ADD_TODO') {
        return currentState.concat([action.body]);
    }
    return currentState;
}


function createStore(reducer) {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (callback) => {
        listeners.push(callback);

        return () => {
            listeners = listeners.filter(item => item !== callback); 
        }
    };
    
    const dispatch = (action) => {
        // set new state
        state = reducer(getState(), action);
        // trigger callback function for each listener
        listeners.forEach(listener => listener(state));
        // return newState for any purpose
        return state;
    };

    return {
        subscribe,
        dispatch,
        getState
    }
}



/// API for user

const store = createStore(reducer);

let unSubscribe =  store.subscribe((newState) => {
    console.log('the new state is: ' + JSON.stringify( newState) );
});

const result = store.dispatch(addAction);


// the console.log function above will automatically being trigged when any state changed.


