import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import TextInput from 'components/TextInput';
import Dropdown from 'components/Dropdown';
import DateTimePicker from 'components/DateTimePicker';
import { IEventType, IBooking } from '../model';

type CreateModalProps = {
  isOpen: boolean;
  toggle: () => void;
  eventTypes: IEventType[];
  onSubmit: (booking: Partial<IBooking>) => void;
}

const CreateModal: React.FC<CreateModalProps> = (props: CreateModalProps) => {
  const {
    isOpen,
    toggle,
    eventTypes,
    onSubmit,
  } = props;

  const [ eventTypeId, setEventTypeId ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ time1, setTime1 ] = useState(new Date().toISOString());
  const [ time2, setTime2 ] = useState(new Date().toISOString());
  const [ time3, setTime3 ] = useState(new Date().toISOString());

  useEffect(() => {
    if (eventTypes.length !== 0) {
      setEventTypeId(eventTypes[0]?._id);
    }
  }, [eventTypes]);

  const onCreateBooking = () => {
    onSubmit({
      eventTypeId,
      location,
      time1,
      time2,
      time3,
    });
    toggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Booking</ModalHeader>
      <ModalBody>
        {
          eventTypes.length !== 0 && (
            <Dropdown
              label='Event Type'
              data={eventTypes.map(type => ({ value: type._id, label: type.type }))}
              onChange={setEventTypeId}
            />
          )
        }
        <TextInput
          label='Location'
          type="text"
          placeholder="Type location here..."
          onChange={e => setLocation(e.target.value)}
        />
        <DateTimePicker
          label='Time 1 (Click calendar icon to select)'
          onDateTimeChange={value => setTime1(value)}
        />
        <DateTimePicker
          label='Time 2 (Click calendar icon to select)'
          onDateTimeChange={value => setTime2(value)}
        />
        <DateTimePicker
          label='Time 3 (Click calendar icon to select)'
          onDateTimeChange={value => setTime3(value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
        <Button color="primary" onClick={onCreateBooking}>Create</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateModal;
