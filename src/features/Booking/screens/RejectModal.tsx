import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import TextInput from 'components/TextInput';

type CancelModalProps = {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: () => void;
  onReasonChanged: (reason: string) => void;
}

const CancelModal: React.FC<CancelModalProps> = (props: CancelModalProps) => {
  const {
    isOpen,
    toggle,
    onSubmit,
    onReasonChanged,
  } = props;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Cancel Booking</ModalHeader>
      <ModalBody>
        <TextInput
          label='Reason'
          type="text"
          placeholder="Type reason here..."
          onChange={e => onReasonChanged(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
        <Button color="danger" onClick={onSubmit}>Continue</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CancelModal;
