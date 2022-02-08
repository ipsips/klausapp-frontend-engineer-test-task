import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
// @ts-ignore
import { isNewUser, NewUser, User } from "model/User.ts";
// @ts-ignore
import { EditUserForm } from "./EditUserForm.tsx";
// @ts-ignore
import { createUser, updateUser } from "../apiSdk.ts";

export interface EditUserModalProps {
  users: User[] | NewUser[];
  show: boolean;
  onClose: (updatesWereMade: boolean) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = (props) => {
  const { show, onClose } = props;
  const [changedUsers, setChangedUsers] = useState<User[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const users = changedUsers || props.users;

  const handleUserChange = (changedUser: User | NewUser) => {
    if (isNewUser(changedUser)) {
      setChangedUsers([changedUser]);
      return;
    }

    const index = users.findIndex(({ id }) => id === changedUser.id);

    if (index > -1) {
      const nextUsers = users.slice();
      nextUsers.splice(index, 1, changedUser);
      setChangedUsers(nextUsers);
    }
  };

  const handleSave = async () => {
    if (changedUsers?.length) {
      setIsLoading(true);
      await Promise.all(
        changedUsers.map((user) => {
          if (isNewUser(user)) {
            return createUser(user);
          }
          const userUpdateObject = { ...user };
          delete userUpdateObject.id;
          return updateUser(user.id, userUpdateObject);
        })
      );
      setIsLoading(false);
    }
    closeModal(!!changedUsers?.length);
  };

  const closeModal = (updatesWereMade = false) => {
    setChangedUsers(undefined);
    onClose(updatesWereMade);
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      centered
      animation={false}
      backdrop="static"
      fullscreen="sm-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      {users.map((user, index) => (
        <React.Fragment key={user.id}>
          {index > 0 && <hr className="text-secondary" />}
          <Modal.Body>
            <EditUserForm user={user} onChange={handleUserChange} />
          </Modal.Body>
        </React.Fragment>
      ))}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!changedUsers || isLoading}
        >
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
