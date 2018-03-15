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

const [ADD_TODO, REMOVE_TODO, TOGGLE_TODO] = ['ADD_TODO', 'REMOVE_TODO', 'TOGGLE_TODO'];
const [ADD_GOAL, REMOVE_GOAL] = ['ADD_GOAL', 'REMOVE_GOAL'];

const TODO = {
    todoId: 0,
    add: (title) => {
        return {
            type: ADD_TODO,
            todo: {
                id: ++TODO.todoId,
                name: title,
                complete: false,
            }
        }
    },
    remove: (id) => {
        return {
            type: REMOVE_TODO,
            id
        }
    },
    toggle: (id) => {
        return {
            type: TOGGLE_TODO,
            id
        }
    }
};
const GOAL = {
    goalId : 0,
    add: (title) => {
        return {
            type: ADD_GOAL,
            goal: {
                id: ++GOAL.goalId,
                name: title
            }
        }
    },
    remove: (id) => {
        return {
            type: REMOVE_GOAL,
            id
        }
    }
};




function todos (currentState = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return currentState.concat([action.todo]);
        case REMOVE_TODO:
            return currentState.filter(todo => todo.id !== action.id);
        case TOGGLE_TODO:
            return currentState.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {complete: !todo.completed});
                }
                return todo;
            });
        default:
            return currentState;
    }

}
function goals (currentState = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return currentState.concat([action.goal]);
        case REMOVE_GOAL:
            return currentState.filter(goal => goal.id !== action.id);
        default:
            return currentState;
    }
}



function app(state = {}, action) {

    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}



const store = createStore(app);

let unSubscribe =  store.subscribe((newState) => {
    console.log('the new state is: ' + JSON.stringify( newState) );
});
store.dispatch(
    TODO.add('swiming')
);

store.dispatch(
    TODO.add('Wash the car')
);

store.dispatch(
    TODO.remove(2)
);

store.dispatch(
    TODO.add('Go to the gym')
);

store.dispatch(
    TODO.toggle(1)
);

store.dispatch(
    GOAL.add('Learn Redux')
);

store.dispatch(
    GOAL.add('Lose 20 pounds')
);

store.dispatch(
    GOAL.remove(0)
);
// the console.log function above will automatically being trigged when any state changed.


