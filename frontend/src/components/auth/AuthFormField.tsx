import type { InputHTMLAttributes } from 'react'

interface AuthFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | undefined
}

export default function AuthFormField({ label, error, id, className = '', ...props }: AuthFormFieldProps) {
  const fieldId = id ?? props.name

  return (
    <div>
      <label htmlFor={fieldId} className="auth-label">
        {label}
      </label>
      <input id={fieldId} className={`auth-input ${className}`} {...props} />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
