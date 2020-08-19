import React from 'react';
import { FormGroup, Label, Input, InputProps } from 'reactstrap';

interface ITextInputProps extends InputProps {
  label: string;
}

const TextInput: React.FC<ITextInputProps> = (props: ITextInputProps) => {
  const { label, ...inputProps } = props;

  return (
    <FormGroup>
      <Label for={inputProps.name}>{label}</Label>
      <Input {...inputProps} />
    </FormGroup>
  );
}

export default TextInput;
