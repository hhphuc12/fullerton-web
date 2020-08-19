import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  Card,
  CardHeader,
  Row,
  Table,
  Container,
  Col,
  Button,
} from 'reactstrap';
import {
  getListBooking,
  getListEventType,
  createBooking,
  cancelBooking,
  updateBooking,
} from '../actions';
import Header from 'components/Headers/Header';
import { IBooking, IEventType } from '../model';
import { formartDateTime } from 'utils/timeFormatter';
import CreateModal from './CreateModal';
import CancelModal from './CancelModal';
import { getUserInfo } from 'features/Shared/actions';
import { IUser, Permission } from 'features/Shared/declarations.d';
import ApproveModal from './ApproveModal';
import RejectModal from './RejectModal';

type ListBookingsProps = {
  getListBooking: () => void;
  getListEventType: () => void;
  createBooking: (booking: Partial<IBooking>) => void;
  cancelBooking: (bookingId: string) => void;
  updateBooking: (bookingId: string, booking: Partial<IBooking>) => void;
  getUserInfo: () => void;
  bookings: IBooking[];
  eventTypes: IEventType[];
  user: IUser;
};

enum BookingStatus {
  APPROVED = 'APPROVED',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
}

const ListBookings: React.FC<ListBookingsProps> = (props: ListBookingsProps) => {
  const {
    getListBooking,
    getListEventType,
    bookings,
    eventTypes,
    user,
    createBooking,
    cancelBooking,
    getUserInfo,
    updateBooking,
  } = props;

  const [ isOpenCreate, setIsOpenCreate ] = useState(false);
  const [ isOpenCancel, setIsOpenCancel ] = useState(false);
  const [ isOpenApprove, setIsOpenApprove ] = useState(false);
  const [ isOpenReject, setIsOpenReject ] = useState(false);
  const [ bookingIdSelected, setBookingIdSelected ] = useState('');
  const [ rejectReason, setRejectReason ] = useState('');

  useEffect(() => {
    getListBooking();
    getListEventType();
    getUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCreateModal = () => setIsOpenCreate(!isOpenCreate);

  const toggleCancelModal = (id: string) => {
    setBookingIdSelected(id);
    setIsOpenCancel(!isOpenCreate);
  }

  const toggleApproveModal = (id: string) => {
    setBookingIdSelected(id);
    setIsOpenApprove(!isOpenCreate);
  }

  const toggleRejectModal = (id: string) => {
    setBookingIdSelected(id);
    setIsOpenReject(!isOpenCreate);
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-12 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Bookings</h3>
                  </div>
                  <div className="col text-right">
                    {user && user.permission === Permission.USER && (
                      <Button
                        color="primary"
                        onClick={toggleCreateModal}
                        size="sm"
                      >
                        Create Booking
                      </Button>
                    )}
                  </div>
                </Row>
                <CreateModal
                  isOpen={isOpenCreate}
                  toggle={toggleCreateModal}
                  eventTypes={eventTypes}
                  onSubmit={createBooking}
                />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Event Type</th>
                    <th scope="col">Location</th>
                    <th scope="col">Status</th>
                    <th scope="col">Time1</th>
                    <th scope="col">Time2</th>
                    <th scope="col">Time3</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!bookings || bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No data to show
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking: IBooking, index: number) => (
                      <tr key={index}>
                        <th scope="row">
                          {typeof booking.eventTypeId === "string"
                            ? eventTypes.find(
                                (type) => type._id === booking.eventTypeId
                              )?.type
                            : (booking.eventTypeId as IEventType).type}
                        </th>
                        <td>{booking.location}</td>
                        <td>{booking.status}</td>
                        <td>{formartDateTime(booking.time1)}</td>
                        <td>{formartDateTime(booking.time2)}</td>
                        <td>{formartDateTime(booking.time3)}</td>
                        <td>
                          {user && user.permission === Permission.ADMIN ? (
                            booking.status === BookingStatus.PENDING && (
                              <>
                                <Button
                                  color="success"
                                  onClick={() =>
                                    toggleApproveModal(booking._id)
                                  }
                                  size="sm"
                                >
                                  Approve
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() => toggleRejectModal(booking._id)}
                                  size="sm"
                                >
                                  Reject
                                </Button>
                              </>
                            )
                          ) : (
                            <Button
                              color="danger"
                              onClick={() => toggleCancelModal(booking._id)}
                              size="sm"
                            >
                              Cancel
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <CancelModal
          isOpen={isOpenCancel}
          toggle={() => setIsOpenCancel(!isOpenCancel)}
          bookingId={bookingIdSelected}
          onSubmit={cancelBooking}
        />
        <ApproveModal
          isOpen={isOpenApprove}
          toggle={() => setIsOpenApprove(!isOpenApprove)}
          bookingId={bookingIdSelected}
          onSubmit={() => {
            updateBooking(bookingIdSelected, { status: BookingStatus.APPROVED });
            setIsOpenApprove(!isOpenApprove);
          }}
        />
        <RejectModal
          isOpen={isOpenReject}
          toggle={() => setIsOpenCancel(!isOpenReject)}
          onReasonChanged={setRejectReason}
          onSubmit={() => {
            updateBooking(bookingIdSelected, { status: BookingStatus.REJECT, rejectReason });
            setIsOpenReject(!isOpenReject);
          }}
        />
      </Container>
    </>
  );
};

type State = {
  booking: {
    bookings: IBooking[],
    eventTypes: IEventType[],
  };
  shared: {
    user: IUser,
  },
};

const mapStateToProps = (state: State) => ({
  bookings: state.booking.bookings,
  eventTypes: state.booking.eventTypes,
  user: state.shared.user,
});

const mapActionToProps = {
  getListEventType,
  getListBooking,
  createBooking,
  cancelBooking,
  getUserInfo,
  updateBooking,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapActionToProps)
)(ListBookings);
