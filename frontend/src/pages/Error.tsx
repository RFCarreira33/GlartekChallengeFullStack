import React from "react";

interface ErrorPageProps {
  error?: Error;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>{error && error.toString()}</p>
    </div>
  );
};

export default ErrorPage;
