import { Form, Image, InputGroup } from "react-bootstrap";
import React, { ChangeEvent } from "react";
// @ts-ignore
import { NewUser, User, userRoles } from "model/User.ts";
// @ts-ignore
import { formatRole } from "../util.tsx";
// @ts-ignore
import { UserAvatar } from './UserAvatar.tsx';

export interface EditUserFormProps {
  user: User | NewUser;
  onChange: (user: User | NewUser) => void;
}

export const EditUserForm: React.FC<EditUserFormProps> = (props) => {
  const { user, onChange } = props;

  const handleChange = <K extends keyof User>(prop: K, value: User[K]) =>
    onChange({
      ...user,
      [prop]: value,
    });

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <a href={user.avatar} target="_blank">
              <UserAvatar user={user} size="sm" />
            </a>
          </InputGroup.Text>
          <Form.Control
            type="url"
            value={user.avatar}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange("avatar", event.currentTarget.value)
            }
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={user.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange("name", event.currentTarget.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={user.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange("email", event.currentTarget.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handleChange("role", event.currentTarget.value)
          }
        >
          {userRoles.map((value: string) => (
            <option key={value} value={value} selected={value === user.role}>
              {formatRole(value)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
};
