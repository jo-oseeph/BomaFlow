import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormField from "../components/auth/AuthFormField";
import { EyeIcon, EyeOffIcon, GoogleIcon } from "../components/icons";
import { signUp, signInWithGoogle } from "../lib/auth";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  async function onSubmit(raw: SignupForm) {
    setAuthError(null);
    setSuccessMessage(null);

    const parsed = signupSchema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (
          field === "fullName" ||
          field === "email" ||
          field === "phone" ||
          field === "password" ||
          field === "confirmPassword"
        ) {
          setError(field, { message: issue.message });
        }
      }
      return;
    }

    try {
      const result = await signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
      });

      if (result.session) {
        navigate("/");
        return;
      }

      setSuccessMessage(
        "Account created. Check your email to confirm your address, then sign in.",
      );
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Unable to create account. Please try again.",
      );
    }
  }

  return (
    <div>
      <div className="mb-8">
        <span className="mb-2 block text-xs font-semibold tracking-[0.2em] text-gold">
          SIGN UP
        </span>
        <h2 className="text-2xl font-bold text-foreground">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-muted">
          Join BomaFlow to browse listings, apply for rentals, and manage your
          profile.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthFormField
          label="Full Name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <AuthFormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthFormField
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          placeholder="+254 700 123456"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <div>
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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

        <div>
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              className="auth-input pr-12"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-gold"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {authError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {authError}
          </div>
        )}

        {successMessage && (
          <div className="rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-foreground">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-gold py-3.5 text-xs font-bold tracking-wide text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
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
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-gold hover:text-gold-light"
        >
          Sign in
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
