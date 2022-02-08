import React, { ChangeEvent } from "react";
import { Badge, FormCheck, Stack } from "react-bootstrap";
// @ts-ignore
import { User } from "model/User.ts";
// @ts-ignore
import { UserActions } from "./UserActions.tsx";
// @ts-ignore
import { formatRole } from "../util.tsx";
// @ts-ignore
import { UserAvatar } from "./UserAvatar.tsx";

export interface UserRowProps {
  user: User;
  isSelected: boolean;
  onToggle: (isSelected: boolean) => void;
  onClickEdit: () => void;
}

export const UserRow: React.FC<UserRowProps> = (props) => {
  const { user, isSelected, onToggle, onClickEdit } = props;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) =>
    onToggle(event.currentTarget.checked);

  return (
    <tr className={isSelected ? "selected" : ""}>
      <td className="align-middle">
        <FormCheck checked={isSelected} onChange={handleCheckboxChange} />
      </td>
      <td className="align-middle">
        <Stack direction="horizontal" gap={3}>
          <UserAvatar user={user} />
          <Stack gap={1}>
            <h6 className="m-0">{user.name}</h6>
            <p className="m-0 text-secondary">{user.email}</p>
          </Stack>
        </Stack>
      </td>
      <td className="align-middle">
        <Badge bg={user.role.toLowerCase()}>{formatRole(user.role)}</Badge>
      </td>
      <td className="align-middle">
        <UserActions
          users={[user]}
          showDeleteLabel={false}
          onClickEdit={onClickEdit}
        />
      </td>
    </tr>
  );
};
