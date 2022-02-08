import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
// @ts-ignore
import { createBlankUser, NewUser, User } from "model/User.ts";
// @ts-ignore
import { readUsers } from "../apiSdk.ts";
// @ts-ignore
import { UserContext } from "./UserContext.ts";
// @ts-ignore
import { AppHeader } from "./AppHeader.tsx";
// @ts-ignore
import { UsersTable } from "./UsersTable.tsx";
// @ts-ignore
import { EditUserModal } from "./EditUserModal.tsx";

const PAGE_SIZE = 10;

export interface SortOrder {
  by: "name" | "role";
  isAscending: boolean;
}

export interface UsersViewProps {
  users: User[];
}

export const UsersView: React.FC<UsersViewProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState<NewUser | undefined>();
  const [editUserIds, setEditUserIds] = useState<number[]>([]);
  const [viewSize, setViewSize] = useState(PAGE_SIZE);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>();

  const readUsersQuery = useQuery<User[]>({
    queryKey: "readUsersQueryKey",
    queryFn: () => readUsers(),
    initialData: props.users,
  });
  const users = readUsersQuery.data!.slice();

  if (sortOrder) {
    users.sort((a, b) =>
      sortOrder.isAscending
        ? a[sortOrder.by].localeCompare(b[sortOrder.by])
        : b[sortOrder.by].localeCompare(a[sortOrder.by])
    );
  }

  const displayableUsers = searchTerm ? filterUsers(searchTerm, users) : users;
  const usersToDisplay = displayableUsers.slice(0, viewSize);
  const usersToEdit = newUser
    ? [newUser]
    : editUserIds.map((id) => users.find((user) => user.id === id));

  const reloadUsers = async () => {
    await readUsersQuery.refetch();
  };

  const handleScrollToEnd = () =>
    setViewSize((currentValue) => currentValue + PAGE_SIZE);

  const handleClickAddUser = () => setNewUser(createBlankUser());

  const handleClickEditUser = (...ids: number[]) => setEditUserIds(ids);

  const handleCloseEditUserModal = (updatesWereMade: boolean) => {
    setEditUserIds([]);
    setNewUser(undefined);
    if (updatesWereMade) {
      reloadUsers();
    }
  };

  const handleClickSortableHeader = (by: SortOrder["by"]) =>
    setSortOrder((current) => ({
      by,
      isAscending: current?.by === by ? !current.isAscending : true,
    }));

  return (
    <UserContext.Provider value={{ reloadUsers }}>
      <InfiniteScroll
        dataLength={usersToDisplay.length}
        next={handleScrollToEnd}
        hasMore={viewSize < displayableUsers.length}
        loader={null}
      >
        <Container fluid="lg" className="p-4">
          <AppHeader
            onSearch={setSearchTerm}
            onClickAddUsers={handleClickAddUser}
          />
          <Card>
            <Card.Body className="p-3 position-relative">
              <UsersTable
                users={usersToDisplay}
                onClickEditUser={handleClickEditUser}
                isLoading={readUsersQuery.isLoading}
                sortOrder={sortOrder}
                onClickSortableHeader={handleClickSortableHeader}
              />
            </Card.Body>
          </Card>
          <EditUserModal
            users={usersToEdit}
            show={!!usersToEdit.length}
            onClose={handleCloseEditUserModal}
          />
        </Container>
      </InfiniteScroll>
    </UserContext.Provider>
  );
};

const filterUsers = (searchTerm: string, users: User[]): User[] =>
  users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
