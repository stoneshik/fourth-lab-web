import {
    ADD_RESULT,
    CLEAR_RESULTS,
    PASSING_R_PARAMETER
} from './action-types.js'


const initState = {
    results: []
};
const resultsReducer = (state = initState, action) => {
    //INSIDE HOME COMPONENT
    if (action.type === ADD_RESULT) {
        let addedItem = state.items.find(item => item.id === action.id);
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id);
        if (existed_item) {
            addedItem.quantity += 1;
            return {
                ...state,
                total: state.total + addedItem.price
            };
        } else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price;
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            };
        }
    }
    else if (action.type === CLEAR_RESULTS) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id);
        let new_items = state.addedItems.filter(item => action.id !== item.id);
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);
        console.log(itemToRemove);
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        };
    }
    //INSIDE CART COMPONENT
    else if (action.type === PASSING_R_PARAMETER) {
        let addedItem = state.items.find(item => item.id === action.id);
        addedItem.quantity += 1;
        let newTotal = state.total + addedItem.price;
        return {
            ...state,
            total: newTotal
        };
    } else {
        return state;
    }
}

export default resultsReducer