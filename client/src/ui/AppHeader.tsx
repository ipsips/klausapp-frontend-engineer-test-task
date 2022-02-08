import React, { ChangeEvent } from "react";
import { Button, Container, InputGroup, Navbar } from "react-bootstrap";

export interface AppHeaderProps {
  onSearch: (searchTerm: string) => void;
  onClickAddUsers: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { onSearch, onClickAddUsers } = props;

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    onSearch(event.currentTarget.value);

  return (
    <Navbar expand="lg">
      <Container fluid className="p-0 mb-2">
        <Navbar.Brand>Account users</Navbar.Brand>
        <div>
          <div className="d-flex">
            <InputGroup>
              <InputGroup.Text>
                <i className="fa fa-search" />
              </InputGroup.Text>
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="form-control bg-white me-3"
                onChange={handleSearchInputChange}
              />
            </InputGroup>
            <Button className="flex-shrink-0" onClick={onClickAddUsers}>
              Connect Users
            </Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
