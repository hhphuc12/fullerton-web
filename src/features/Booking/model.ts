export interface IBooking {
  _id: string;
  eventTypeId: IEventType | string;
  location: string;
  status: string;
  time1: string;
  time2: string;
  time3: string;
  userId: string;
  rejectReason?: string;
}

export interface IEventType {
  _id: string;
  type: string;
}
