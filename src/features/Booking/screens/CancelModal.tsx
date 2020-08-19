import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

type CancelModalProps = {
  isOpen: boolean;
  bookingId: string;
  toggle: () => void;
  onSubmit: (id: string) => void;
}

const CancelModal: React.FC<CancelModalProps> = (props: CancelModalProps) => {
  const {
    isOpen,
    toggle,
    onSubmit,
    bookingId,
  } = props;

  const onCancel = () => {
    onSubmit(bookingId);
    toggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Cancel Booking</ModalHeader>
      <ModalBody>
        This action will delete the booking permanently.
        <br/>
        Do you still want to continue?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
        <Button color="danger" onClick={onCancel}>Continue</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CancelModal;
