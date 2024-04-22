import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import { validateEmail } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const userLogin = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidEmail = validateEmail(userLogin?.user?.email);

  function handleSubmit(event) {
    event.preventDefault();

    if (isValidEmail || userLogin?.user?.password) {
      navigate("/home");
      dispatch({
        type: "LOGIN",
        payload: true,
      });
    }
  }

  function onChangeInput(event) {
    const { name, value } = event.target;
    if (value) {
      dispatch({
        type: "USER",
        payload: { [name]: value },
      });
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label={"Email Address"}
              name={"email"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500"
              value={userLogin?.user?.email}
              onChange={onChangeInput}
              required
            />
          </div>

          <div>
            <CustomInput
              type="password"
              label={"Pasword"}
              name={"password"}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              labelClassName="after:content-['*'] after:ml-0.5 after:text-red-500"
              value={userLogin?.user?.password}
              onChange={onChangeInput}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className={`${
                !isValidEmail || !userLogin?.user?.password
                  ? "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  : ""
              } flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
              disabled={!isValidEmail || !userLogin?.user?.password}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
