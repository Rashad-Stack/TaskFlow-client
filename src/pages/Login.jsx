import GoogleLogin from "../components/GoogleLogin";

export default function Login() {
  return (
    <section>
      <div className="container lg:max-w-6xl mx-auto rounded-lg  flex min-h-screen items-center justify-center my-2">
        <GoogleLogin />
      </div>
    </section>
  );
}
