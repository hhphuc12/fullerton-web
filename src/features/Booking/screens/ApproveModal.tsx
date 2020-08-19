import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

type ApproveModalProps = {
  isOpen: boolean;
  bookingId: string;
  toggle: () => void;
  onSubmit: () => void;
}

const ApproveModal: React.FC<ApproveModalProps> = (props: ApproveModalProps) => {
  const {
    isOpen,
    toggle,
    onSubmit,
  } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Cancel Booking</ModalHeader>
      <ModalBody>
        Do you want to approve this booking?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
        <Button color="success" onClick={onSubmit}>Continue</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ApproveModal;
