import React, { useState } from 'react';
import {
  Dropdown as DropdownRT,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  FormGroup,
} from 'reactstrap';

type DropDownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  data: DropDownItem[];
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { label, data, onChange } = props;

  const [ dropdownOpen, setDropdownOpen  ] = useState(false);
  const [ selectedItem, setSelectedItem ] = useState(data[0]);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleItemSelected = (e: React.SyntheticEvent, item: DropDownItem) => {
    setSelectedItem(item);
    onChange(item.value);
  };

  return (
    <FormGroup>
      <Label>{label}</Label>
      <br/>
      <DropdownRT isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          { selectedItem.label }
        </DropdownToggle>
        <DropdownMenu>
          {
            data.map((item: DropDownItem, index: number) => (
              <DropdownItem key={index} onClick={e => handleItemSelected(e, item)}>
                {item.label}
              </DropdownItem>
            ))
          }
        </DropdownMenu>
      </DropdownRT>
    </FormGroup>
  );
}

export default Dropdown;
