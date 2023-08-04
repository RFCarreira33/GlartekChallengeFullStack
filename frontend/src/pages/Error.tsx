import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <br />
      <Link to="/" className="text-blue-200">
        Back to home page
      </Link>
    </div>
  );
};

export default ErrorPage;
