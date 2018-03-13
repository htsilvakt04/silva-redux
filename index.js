function reducer (currentState = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return currentState.concat([action.body]);
        case 'REMOVE_TODO':
            return currentState.filter(todo => todo.id !== action.id);
        case 'TOGGLE_TODO':
            return currentState.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {completed: !todo.completed});
                }
                return todo;
            });
        default:
            return currentState;
    }

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
let addAction = {
    type: 'ADD_TODO',
    body: {
        id: 1,
        title: 'finish drinking another Pepsi bottle',
        completed: false
    }
};
const result = store.dispatch(addAction);


let test = {
    type: 'REMOVE_TODO',
    id: 1
}

// the console.log function above will automatically being trigged when any state changed.


