import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
}

const Cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = state.items.findIndex((item) => item.product.id === product.id);

        if(productInCartIndex === -1) {
          draft.items.push({
            product,
            quantity: 1,
          })
        } else {
          draft.items[productInCartIndex].quantity += 1;
        }

        
        //  return {
        //    ...state,
        //    items: [
        //      ...state.items,
        //      {
        //        product,
        //        quantity: 1,
        //      }
        //    ]
        //  }
        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId)

        break;
      }
      default:
        return state;
    }
  });
}

export default Cart;  