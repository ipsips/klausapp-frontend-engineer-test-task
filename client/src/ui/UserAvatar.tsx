import { Image as Img, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { User } from "model/User.ts";

export interface UserAvatarProps {
  user: User;
  size?: "md" | "sm";
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { user, size } = props;
  const [url, setUrl] = useState<string | undefined | null>();
  const classNames = ["avatar"];

  if (size === "sm") {
    classNames.push("avatar-s");
  }

  if (url === null) {
    classNames.push("avatar-broken");
  }

  useEffect(() => {
    imageExists(user.avatar, (exists) => {
      setUrl(exists ? user.avatar : null);
    });
  }, [user.avatar]);

  return (
    <div className={classNames.join(" ")}>
      {url ? (
        <Img roundedCircle fluid src={url} alt={user.name} />
      ) : url === null ? null : (
        <Spinner animation="grow" variant="secondary" />
      )}
    </div>
  );
};

const imageExists = (url: string, callback: (exists: boolean) => void) => {
  const img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
};
