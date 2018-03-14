function todoReducer (currentState = [], action) {
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

function goalReducer (currentState = [], action) {
;
    switch (action.type) {
        case 'ADD_GOAL':
            return currentState.concat([action.body]);
        case 'REMOVE_GOAL':
            return currentState.filter(goal => goal.id !== action.id);
        default:
            return currentState;
    }
}


function createStore([goalReducer, todoReducer]) {
    // check if reducers's not a array then throw err;
    let state = {};
    let listeners = {};

    // set up needed condition for each reducer
    let goalReducerName = goalReducer.name;
    let todoReducerName = todoReducer.name;

    state[goalReducerName] = [];state[todoReducerName] = [];
    listeners[goalReducerName] = [];listeners[todoReducerName] = [];
    
    // //   //  //  //  //  /   
    
    
    
    const getState = () => state;

    const subscribe = (callback, name = null) => {
        // check if the name was specified then just let user subscribe to that reducer
        if (name) {
            listeners[name].push(callback);

            return () => {
                listeners[name] = listeners[name].filter(item => item !== callback);
            }
        }
        // else subscribe to all
        Object.getOwnPropertyNames(listeners).forEach( listener => listeners[listener].push(callback));

        return () => {
            listeners = Object.getOwnPropertyNames(listeners).forEach(listener => {
                listener.filter(item => item !== callback)
            });
        }
    };
    
    const dispatch = (action, reducer = null) => {
        // TODO: so funny here
        if (reducer) {
            let isGoal = reducer === goalReducerName;
            // set new state
            state = isGoal ? goalReducer(state, action) : todoReducer(state, action);
            // trigger callback function for each listener
            return listeners[reducer].forEach(listener => listener(state));
        }

        // set new state
        let reducerToUse = determineWhichReducerToUse(action, [goalReducer, todoReducer]);
        state = reducerToUse(state, action);
        // trigger callback function for each listener
        listeners[reducerToUse.name].forEach(listener => listener(state));
        // return newState for any purpose
        return state;
    };
    // TODO: funny here
    const determineWhichReducerToUse = (action, [goalReducer, todoReducer]) => {
        if (action.type.indexOf('TODO') >= 0) {
            return todoReducer;
        }
        return goalReducer;
    };

    return {
        subscribe,
        dispatch,
        getState
    }
}



/// API for user

const store = createStore([goalReducer, todoReducer]);

store.subscribe(function (state) {
    console.log('new state is ' + JSON.stringify(state));
});


//
// let unSubscribe =  store.subscribe((newState) => {
//     console.log('the new state is: ' + JSON.stringify( newState) );
// });
let addAction = {
    type: 'ADD_GOAL',
    body: {
        id: 1,
        title: 'finish drinking another Pepsi bottle',
        completed: false
    }
};
const result = store.dispatch(addAction, 'goalReducer');
// const anotherResult = store.dispatch(addAction);
//
//
// let test = {
//     type: 'REMOVE_TODO',
//     id: 1
// }

// the console.log function above will automatically being trigged when any state changed.


