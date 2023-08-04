import { Form, useActionData } from "react-router-dom";

const Login = () => {
  const data: any = useActionData();
  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <Form method="post" action="/login">
        <div className="mb-3">
          <label className=" pr-2">Username</label>
          <input type="text" name="username" />
        </div>
        <div className="mb-3">
          <label className="pr-2">Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit" className="text-blue-200">
          Login
        </button>
        <br />
        <br />
        {data && data.error && (
          <p className="text-red-600 font-bold">{data.error}</p>
        )}
      </Form>
    </div>
  );
};

export default Login;
