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

    switch (action.type) {
        case 'ADD_GOAL':
            return currentState.concat([action.body]);
        case 'REMOVE_GOAL':
            return currentState.filter(goal => goal.id !== action.id);
        default:
            return currentState;
    }
}

const REDUCER_ACTION = {
    goalReducer: ['ADD_GOAL', 'REMOVE_GOAL'],
    todoReducer: ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO']
};


function createStore(reducers) {
    // check if reducers's not a array then throw err;
    let state = {};
    let listeners = {};

    reducers.forEach(reducer => {
       let reducerName = reducer.name;

       state[reducerName] = [];
       listeners[reducerName] = [];
    });

    // state = {reducerOneName: [], reducerTwoName: [], reducerSomeThingName: []};
    // listeners = {reducerOneName: [], reducerTwoName: [], reducerSomeThingName: []}
    
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
    // You may want to:  //store.dispatch(addAction) OR store.dispatch(addAction, 'goalReducer');
    const dispatch = (action, reducerName = null) => {
        let diff, reducer, actionType = action.type;

        if (reducerName) { // so want to dispatch action to specific reducer
            // loop through the reducers array, detect and return the changes (next State)
            diff = reducers.reduce((initVal, item) => {
                 if (item.name === reducerName) {
                     initVal[reducerName] = item(state[reducerName], action);
                 }
                 return initVal;
            }, {});
            // set new state base on the different between the old and first one
            state = Object.assign({}, state, diff);
            // invoke each listener
            listeners[reducerName].forEach(listener => listener(state));
            return state;
        }

        // handle case that user using dispatch but don't specify the reducer name as the second argument
        Object.getOwnPropertyNames(REDUCER_ACTION).forEach(reducerName => {
            // find the name of reducer according to action.type
            if (REDUCER_ACTION[reducerName].indexOf(actionType) !== -1) {
                reducer = reducerName;
                //found and then return new state
                diff = reducers.reduce((initVal, item) => {
                    if (item.name === reducerName) {
                        initVal[reducerName] = item.call(null, state[reducerName], action);
                    }
                    return initVal;
                }, {});
            }
        });
        // set new state
        state = Object.assign({}, state, diff);
        // invoke each listener
        listeners[reducer].forEach(listener => listener(state));
        return state;
    };
    return {
        subscribe,
        dispatch,
        getState
    }
}



/// API for user

const store = createStore([goalReducer, todoReducer]);

// store.subscribe(function (state) {
//     console.log('new state is ' + JSON.stringify(state));
// });


//
// let unSubscribe =  store.subscribe((newState) => {
//     console.log('the new state is: ' + JSON.stringify( newState) );
// });
let addAction = {
    type: 'ADD_TODO',
    body: {
        id: 0,
        title: 'running again',
        completed: false
    }
};
const result = store.dispatch(addAction);

console.log(result);
// const anotherResult = store.dispatch(addAction);
//
//
// let test = {
//     type: 'REMOVE_TODO',
//     id: 1
// }

// the console.log function above will automatically being trigged when any state changed.


