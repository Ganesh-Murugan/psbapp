let defaultState = {
  selectedItems: { items: [], shopName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          shopName: action.payload.shopName,
        };
      } else {
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.name !== action.payload.name
            ),
          ],
          shopName: action.payload.shopName,
        };
      }
      console.log(newState, "👉");
      return newState;
    }
    case "REMOVE_FROM_CART": {
      return defaultState;
    }

    default:
      return state;
  }
};

export default cartReducer;
