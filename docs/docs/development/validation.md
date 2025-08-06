# Validation

This guide covers validation strategies and best practices for ABP React applications, including form validation, schema validation, and server-side validation integration.

## Overview

Validation is crucial for ensuring data integrity and providing a good user experience. ABP React provides multiple layers of validation:

- **Client-side validation**: Immediate feedback for users
- **Schema validation**: Type-safe validation with Zod
- **Server-side validation**: ABP Framework validation integration
- **Real-time validation**: Dynamic validation based on user input

## Schema Validation with Zod

Zod is the recommended schema validation library for ABP React applications.

### Basic Schema Definition

```typescript
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120),
  role: z.enum(['admin', 'user', 'moderator']),
});

type User = z.infer<typeof userSchema>;
```

### Complex Validation Rules

```typescript
const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

### Conditional Validation

```typescript
const conditionalSchema = z.object({
  type: z.enum(['individual', 'company']),
  name: z.string(),
  companyName: z.string().optional(),
  taxId: z.string().optional(),
}).refine((data) => {
  if (data.type === 'company') {
    return data.companyName && data.taxId;
  }
  return true;
}, {
  message: 'Company name and tax ID are required for company accounts',
});
```

## Form Validation Integration

### React Hook Form with Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const UserForm = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      age: 18,
      role: 'user',
    },
  });

  const onSubmit = (data: User) => {
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('username')} />
      {form.formState.errors.username && (
        <span>{form.formState.errors.username.message}</span>
      )}
      {/* Other form fields */}
    </form>
  );
};
```

### Custom Validation Hooks

```typescript
import { useState, useEffect } from 'react';

export const useFieldValidation = (
  value: string,
  validationFn: (value: string) => Promise<boolean>,
  delay: number = 500
) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value) {
        setIsValidating(true);
        try {
          const result = await validationFn(value);
          setIsValid(result);
        } catch (error) {
          setIsValid(false);
        } finally {
          setIsValidating(false);
        }
      } else {
        setIsValid(null);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, validationFn, delay]);

  return { isValid, isValidating };
};
```

## ABP Framework Validation Integration

### Server-Side Validation

```typescript
import { useApi } from '@/hooks/useApi';

const useServerValidation = () => {
  const { post } = useApi();

  const validateField = async (field: string, value: any) => {
    try {
      const response = await post('/api/validation/field', {
        field,
        value,
      });
      return response.isValid;
    } catch (error) {
      return false;
    }
  };

  return { validateField };
};
```

### ABP Validation Error Handling

```typescript
import { useForm } from 'react-hook-form';
import { useApi } from '@/hooks/useApi';

const useAbpForm = <T>(schema: z.ZodSchema<T>) => {
  const { post } = useApi();
  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  const submitWithAbpValidation = async (data: T) => {
    try {
      const response = await post('/api/your-endpoint', data);
      return response;
    } catch (error: any) {
      // Handle ABP validation errors
      if (error.validationErrors) {
        error.validationErrors.forEach((validationError: any) => {
          form.setError(validationError.memberNames[0] as any, {
            type: 'server',
            message: validationError.errorMessage,
          });
        });
      }
      throw error;
    }
  };

  return { form, submitWithAbpValidation };
};
```

## Real-Time Validation

### Debounced Validation

```typescript
import { useDebounce } from '@/hooks/useDebounce';

const useRealTimeValidation = (
  value: string,
  validationFn: (value: string) => Promise<boolean>
) => {
  const debouncedValue = useDebounce(value, 300);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message?: string;
  } | null>(null);

  useEffect(() => {
    if (debouncedValue) {
      validationFn(debouncedValue)
        .then((isValid) => setValidationResult({ isValid }))
        .catch((error) => setValidationResult({ isValid: false, message: error.message }));
    }
  }, [debouncedValue, validationFn]);

  return validationResult;
};
```

### Async Validation

```typescript
const useAsyncValidation = () => {
  const validateUsername = async (username: string) => {
    const response = await fetch(`/api/validation/username?username=${username}`);
    const result = await response.json();
    return result.isAvailable;
  };

  const validateEmail = async (email: string) => {
    const response = await fetch(`/api/validation/email?email=${email}`);
    const result = await response.json();
    return result.isAvailable;
  };

  return { validateUsername, validateEmail };
};
```

## Validation Components

### Validation Message Component

```typescript
interface ValidationMessageProps {
  error?: string;
  isValid?: boolean;
  isValidating?: boolean;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  error,
  isValid,
  isValidating,
}) => {
  if (isValidating) {
    return <span className="text-blue-500">Validating...</span>;
  }

  if (error) {
    return <span className="text-red-500">{error}</span>;
  }

  if (isValid) {
    return <span className="text-green-500">✓ Valid</span>;
  }

  return null;
};
```

### Validated Input Component

```typescript
interface ValidatedInputProps {
  name: string;
  label: string;
  validation?: (value: string) => Promise<boolean>;
  register: any;
  errors: any;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  name,
  label,
  validation,
  register,
  errors,
}) => {
  const [value, setValue] = useState('');
  const validationResult = useRealTimeValidation(value, validation || (() => Promise.resolve(true)));

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        onChange={(e) => setValue(e.target.value)}
        className={errors[name] ? 'border-red-500' : ''}
      />
      <ValidationMessage
        error={errors[name]?.message}
        isValid={validationResult?.isValid}
        isValidating={validationResult === null}
      />
    </div>
  );
};
```

## Testing Validation

### Unit Testing Schemas

```typescript
import { describe, it, expect } from 'vitest';
import { userSchema } from './schemas';

describe('User Schema Validation', () => {
  it('should validate a valid user', () => {
    const validUser = {
      username: 'john_doe',
      email: 'john@example.com',
      age: 25,
      role: 'user',
    };

    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidUser = {
      username: 'john_doe',
      email: 'invalid-email',
      age: 25,
      role: 'user',
    };

    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain('Invalid email');
  });
});
```

### Integration Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from './UserForm';

describe('UserForm Validation', () => {
  it('should show validation errors for invalid input', async () => {
    render(<UserForm />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
    });
  });

  it('should validate in real-time', async () => {
    render(<UserForm />);

    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'ab' } });

    await waitFor(() => {
      expect(screen.getByText(/at least 3 characters/)).toBeInTheDocument();
    });
  });
});
```

## Best Practices

### 1. Progressive Validation

- Start with basic client-side validation
- Add real-time validation for critical fields
- Implement server-side validation for security

### 2. User Experience

- Provide immediate feedback
- Use clear, actionable error messages
- Show validation state visually
- Debounce real-time validation

### 3. Performance

- Debounce async validation calls
- Cache validation results when appropriate
- Use optimistic validation for better UX

### 4. Security

- Never rely solely on client-side validation
- Validate on both client and server
- Sanitize user input
- Use ABP Framework validation attributes

### 5. Accessibility

- Associate error messages with form fields
- Use proper ARIA attributes
- Provide keyboard navigation support

## Common Validation Patterns

### Email Validation

```typescript
const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');
```

### Password Validation

```typescript
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');
```

### Phone Number Validation

```typescript
const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits');
```

### URL Validation

```typescript
const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .refine((url) => url.startsWith('https://'), {
    message: 'URL must use HTTPS',
  });
```

## Error Handling

### Validation Error Types

```typescript
interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
```

### Error Boundary for Validation

```typescript
class ValidationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Validation error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with validation. Please try again.</div>;
    }

    return this.props.children;
  }
}
```

## Conclusion

Effective validation is essential for building robust ABP React applications. By combining client-side validation with server-side validation and providing real-time feedback, you can create a smooth user experience while ensuring data integrity.

Remember to:
- Use Zod for type-safe schema validation
- Integrate with ABP Framework validation
- Provide clear, actionable error messages
- Test validation thoroughly
- Follow accessibility best practices

For more information on specific validation scenarios, see the [Forms](/abp-react/docs/components/forms) and [Custom Components](/abp-react/docs/components/custom-components) documentation. 