import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
function ActionsDropdown() {
    const [selectedAction, setSelectedAction] = useState('');
  
    const handleActionSelect = (action) => {
      setSelectedAction(action);
    };
  
    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="primary">Actions</Button>
        <Dropdown.Toggle split variant="primary" id="actions-dropdown" />
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleActionSelect('Edit')}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleActionSelect('Summary')}>
            Summary
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleActionSelect('View')}>
            View
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleActionSelect('Delete')}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
        {selectedAction && (
          <Button variant="primary">
            {selectedAction}
          </Button>
        )}
      </Dropdown>
    );
  }
  export default ActionsDropdown;