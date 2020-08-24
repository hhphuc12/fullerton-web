import { ACTIONS, BookingAction } from './actions';
import { IBooking, IEventType } from './model';
import { ACTIONS as SHARED_ACTION } from '../Shared/actions';

type BookingState = {
  bookings: IBooking[];
  eventTypes: IEventType[];
}

export const bookingState: BookingState = {
  bookings: [],
  eventTypes: [],
};

export default (state = bookingState, action: Partial<BookingAction>) => {
  switch (action.type) {
    case ACTIONS.SAVE_LIST_BOOKING:
      return {
        ...state,
        bookings: action.bookings,
      };
    case ACTIONS.SAVE_LIST_EVENT_TYPE:
      return {
        ...state,
        eventTypes: action.eventTypes,
      };
    case ACTIONS.SAVE_CREATED_BOOKING:
      return {
        ...state,
        bookings: [ ...state.bookings, action.booking ],
      };
    case ACTIONS.UPDATE_BOOKING_AFTER_CANCEL:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking._id !== action.bookingId),
      };
    case ACTIONS.UPDATE_BOOKING_LIST_AFTER_UPDATE:
      return {
        ...state,
        bookings: state.bookings.map(item => {
          return item._id === action.booking?._id ? action.booking : item;
        }),
      };
      
    case SHARED_ACTION.CLEAR_REDUCERS:
      return { ...bookingState };
    default:
      return state;
  }
};
