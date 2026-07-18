import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormField from "../components/auth/AuthFormField";
import { EyeIcon, EyeOffIcon, GoogleIcon } from "../components/icons";
import { signIn, signInWithGoogle } from "../lib/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  async function onSubmit(raw: LoginForm) {
    setAuthError(null);

    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "email" || field === "password") {
          setError(field, { message: issue.message });
        }
      }
      return;
    }

    try {
      await signIn(parsed.data);
      navigate("/dashboard");
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    }
  }

  return (
    <div>
      <div className="mb-8">
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-gold">
          SIGN IN
        </span>
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="mt-2 text-sm text-muted">
          Enter your credentials to access your BomaFlow account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthFormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="auth-input pr-12"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-gold"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {authError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {authError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-navy py-3.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
        </button>

        <button
          type="button"
          onClick={async () => {
            try {
              await signInWithGoogle();
            } catch (error) {
              setAuthError(
                error instanceof Error
                  ? error.message
                  : "Unable to sign in with Google.",
              );
            }
          }}
          className="flex w-full items-center justify-center gap-3 rounded border border-gray-300 bg-white py-3.5 text-xs font-bold tracking-wide text-navy transition-colors hover:bg-gray-50"
        >
          <GoogleIcon className="h-5 w-5" />
          CONTINUE WITH GOOGLE
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-gold hover:text-gold-light"
        >
          Create one
        </Link>
      </p>

      <p className="mt-4 text-center">
        <Link
          to="/"
          className="text-xs text-muted transition-colors hover:text-gold"
        >
          &larr; Back to home
        </Link>
      </p>
    </div>
  );
}