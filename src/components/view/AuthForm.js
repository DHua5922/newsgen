import WithCenter from "./WithCenter";
import IsAuthForm from "./IsAuthForm";

function AuthForm(Component) {
    const Centered = WithCenter(IsAuthForm(Component));
    return () => <Centered backgroundColor={"bg-gray-50"}></Centered>;
}

export default AuthForm;