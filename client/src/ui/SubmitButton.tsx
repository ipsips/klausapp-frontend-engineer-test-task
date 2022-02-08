import React from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

export interface SubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => (
  <Button variant="primary" {...props}>
    {props.isLoading && (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
      </>
    )}
    {props.children}
  </Button>
);
