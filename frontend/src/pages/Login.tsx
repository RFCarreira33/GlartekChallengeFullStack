import { Form, useActionData, useSubmit } from "react-router-dom";

const Login = () => {
  const data: any = useActionData();
  const submit = useSubmit();

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    submit(event.currentTarget.form!);
    event.currentTarget.form!.reset();
  };

  return (
    <div className="container mt-4">
      <div className="p-8 rounded">
        <h2>Login</h2>
        <br />
        <Form method="post" action="/login">
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          {data && data.error && (
            <div className="error text-red-500">{data.error}</div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
