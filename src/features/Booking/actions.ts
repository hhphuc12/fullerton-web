import { IBooking, IEventType } from "./model";

export enum ACTIONS {
  GET_LIST_BOOKING = 'GET_LIST_BOOKING',
  SAVE_LIST_BOOKING = 'SAVE_LIST_BOOKING',
  GET_LIST_EVENT_TYPE = 'GET_LIST_EVENT_TYPE',
  SAVE_LIST_EVENT_TYPE = 'SAVE_LIST_EVENT_TYPE',
  CREATE_BOOKING = 'CREATE_BOOKING',
  SAVE_CREATED_BOOKING = 'SAVE_CREATED_BOOKING',
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  UPDATE_BOOKING_AFTER_CANCEL = 'UPDATE_BOOKING_AFTER_CANCEL',
  UPDATE_BOOKING = 'UPDATE_BOOKING',
  UPDATE_BOOKING_LIST_AFTER_UPDATE = 'UPDATE_BOOKING_LIST_AFTER_UPDATE',
};

export type BookingAction = {
  type: string;
  bookings: IBooking[];
  eventTypes: IEventType[];
  booking: Partial<IBooking>;
  bookingId: string;
};

export const getListBooking = (): Partial<BookingAction> => {
  return {
    type: ACTIONS.GET_LIST_BOOKING,
  };
};

export const getListEventType = (): Partial<BookingAction> => {
  return {
    type: ACTIONS.GET_LIST_EVENT_TYPE,
  };
};

export const createBooking = (booking: Partial<IBooking>): Partial<BookingAction> => {
  return {
    type: ACTIONS.CREATE_BOOKING,
    booking,
  };
};

export const cancelBooking = (bookingId: string): Partial<BookingAction> => {
  return {
    type: ACTIONS.CANCEL_BOOKING,
    bookingId,
  };
};

export const updateBooking = (bookingId: string, booking: Partial<IBooking>): Partial<BookingAction> => {
  return {
    type: ACTIONS.UPDATE_BOOKING,
    bookingId,
    booking,
  };
};
