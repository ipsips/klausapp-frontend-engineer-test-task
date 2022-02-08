import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// @ts-ignore
import { User } from "model/User.ts";
// @ts-ignore
import { UsersView } from "./UsersView.tsx";

const queryClient = new QueryClient();

export interface AppProps {
  users: User[];
}

export const App: React.FC<AppProps> = (props) => (
  <QueryClientProvider client={queryClient}>
    <UsersView users={props.users} />
  </QueryClientProvider>
);
