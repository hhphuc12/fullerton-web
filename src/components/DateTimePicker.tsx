import React from 'react';
import { FormGroup, Label, Input, InputProps } from 'reactstrap';

interface IDateTimePickerProps extends InputProps {
  label: string;
  onDateTimeChange: (dateTime: string) => void;
}

const DateTimePicker: React.FC<IDateTimePickerProps> = (props: IDateTimePickerProps) => {
  const { label, type, onDateTimeChange, ...inputProps } = props;

  return (
    <FormGroup>
      <Label for="exampleEmail">{label}</Label>
      <Input {...inputProps} type='datetime-local' onChange={e => onDateTimeChange(e.target.value)} />
    </FormGroup>
  );
}

export default DateTimePicker;
