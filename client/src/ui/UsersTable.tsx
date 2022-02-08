import React, { ChangeEvent, useState } from "react";
import { FormCheck, Spinner, Stack, Table } from "react-bootstrap";
// @ts-ignore
import { User } from "model/User.ts";
// @ts-ignore
import { UserRow } from "./UserRow.tsx";
// @ts-ignore
import { UserActions } from "./UserActions.tsx";
// @ts-ignore
import { SortOrder } from "./UsersView.tsx";

export interface UsersTableProps {
  users: User[];
  onClickEditUser: (...id: number[]) => void;
  isLoading: boolean;
  sortOrder: SortOrder;
  onClickSortableHeader: (by: SortOrder["by"]) => void;
}

export const UsersTable: React.FC<UsersTableProps> = (props) => {
  const {
    users,
    onClickEditUser,
    isLoading,
    sortOrder,
    onClickSortableHeader,
  } = props;
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const handleToggleAllUsers = (event: ChangeEvent<HTMLInputElement>) =>
    setSelectedUserIds(
      event.currentTarget.checked ? users.map((user) => user.id) : []
    );

  const handleToggleUser = (id: number, isSelected: boolean) => {
    setSelectedUserIds((previousValue) => {
      if (isSelected) {
        return Array.from(new Set(previousValue.concat(id)));
      }
      const nextValue = previousValue.slice();
      nextValue.splice(previousValue.indexOf(id), 1);
      return nextValue;
    });
  };

  const renderSortableColumnHeader = (by: SortOrder["by"], title: string) => (
    <small role="button" onClick={() => onClickSortableHeader(by)}>
      {title}
      {sortOrder?.by !== by ? "" : sortOrder.isAscending ? " ↑" : " ↓"}
    </small>
  );

  return (
    <>
      <Stack direction="horizontal" gap={4} className="px-2">
        <h6 className="m-0 py-3">
          {`${selectedUserIds.length || "No"} user${
            selectedUserIds.length === 1 ? "" : "s"
          } selected`}
        </h6>
        {!!selectedUserIds.length && (
          <UserActions
            users={selectedUserIds}
            onClickEdit={() => onClickEditUser(...selectedUserIds)}
          />
        )}
        {isLoading && <Spinner animation="border" size="sm" role="status" />}
      </Stack>
      <Table responsive className="mt-2 mb-0">
        <thead>
          <tr>
            <th scope="col" className="text-secondary">
              <FormCheck
                checked={selectedUserIds.length === users.length}
                onChange={handleToggleAllUsers}
              />
            </th>
            <th scope="col" className="text-secondary w-100">
              {renderSortableColumnHeader("name", "User")}
            </th>
            <th scope="col" className="text-secondary">
              {renderSortableColumnHeader("role", "Permission")}
            </th>
            <th scope="col" className="text-secondary" />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isSelected={selectedUserIds.includes(user.id)}
              onToggle={(isSelected: boolean) =>
                handleToggleUser(user.id, isSelected)
              }
              onClickEdit={() => onClickEditUser(user.id)}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
