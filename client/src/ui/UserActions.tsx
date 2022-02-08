import React, { useState } from "react";
import { Button, Modal, Spinner, Stack } from "react-bootstrap";
// @ts-ignore
import { deleteUser } from "../apiSdk.ts";
// @ts-ignore
import { User } from "model/User.ts";
// @ts-ignore
import { useUserContext } from "./UserContext.ts";

export interface UserActionsProps {
  users: User[];
  onClickEdit: () => void;
  showDeleteLabel?: boolean;
}

export const UserActions: React.FC<UserActionsProps> = (props) => {
  const { users, onClickEdit, showDeleteLabel = true } = props;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const userContext = useUserContext();

  const askConfirmation = () => setShowConfirmationModal(true);

  const cancelDeletion = () => setShowConfirmationModal(false);

  const confirmDeletion = async () => {
    setIsDeleting(true);
    await Promise.all(users.map((user) => deleteUser(user.id)));
    setIsDeleting(false);
    setShowConfirmationModal(false);
    userContext.reloadUsers();
  };

  return (
    <Stack direction="horizontal" gap={2} className="user-actions">
      <Button variant="outline-secondary text-nowrap" onClick={onClickEdit}>
        <i className="fa fa-pencil" /> Edit
      </Button>
      <Button variant="outline-secondary text-nowrap" onClick={askConfirmation}>
        <i className="fa fa-trash" /> {showDeleteLabel ? "Delete" : ""}
      </Button>
      {showConfirmationModal && (
        <Modal show centered>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDeletion}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={confirmDeletion}
              disabled={isDeleting}
            >
              {isDeleting && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Stack>
  );
};
