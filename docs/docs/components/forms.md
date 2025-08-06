---
sidebar_position: 3
---

# Form Components

Form components in ABP React provide a comprehensive solution for handling user input, validation, and submission. This guide covers form creation, validation, and integration with the ABP Framework.

## 🎯 Form Architecture

### Form Types

ABP React supports various form patterns:

- **Controlled Forms**: React-managed state
- **Uncontrolled Forms**: DOM-managed state
- **Form Libraries**: React Hook Form, Formik integration
- **Dynamic Forms**: Runtime form generation
- **Multi-step Forms**: Wizard-style forms

### Form Structure

```typescript
// Basic form structure
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['User', 'Admin', 'Manager']),
});

type FormData = z.infer<typeof formSchema>;

export const UserForm: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'User',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## 🏗️ Creating Forms

### 1. Basic Form Component

```typescript
// src/components/forms/UserForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['User', 'Admin', 'Manager']),
  department: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      role: initialData?.role || 'User',
      department: initialData?.department || '',
    },
  });

  const handleSubmit = (data: UserFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter department" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save User'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
```

### 2. Form with API Integration

```typescript
// src/components/forms/UserFormWithAPI.tsx
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { userService } from '@/services/userService';
import { UserForm } from './UserForm';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['User', 'Admin', 'Manager']),
  department: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormWithAPIProps {
  initialData?: Partial<UserFormData>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UserFormWithAPI: React.FC<UserFormWithAPIProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error('Failed to create user');
      console.error('Create user error:', error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error('Failed to update user');
      console.error('Update user error:', error);
    },
  });

  const handleSubmit = (data: UserFormData) => {
    if (initialData?.id) {
      // Update existing user
      updateUserMutation.mutate({ id: initialData.id, ...data });
    } else {
      // Create new user
      createUserMutation.mutate(data);
    }
  };

  const isLoading = createUserMutation.isPending || updateUserMutation.isPending;

  return (
    <UserForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={isLoading}
    />
  );
};
```

## 🔍 Form Validation

### 1. Schema Validation with Zod

```typescript
// src/lib/validations/user.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .refine((email) => email.includes('@'), 'Email must contain @'),
  
  role: z.enum(['User', 'Admin', 'Manager'], {
    required_error: 'Please select a role',
  }),
  
  department: z
    .string()
    .optional()
    .refine((dept) => !dept || dept.length >= 2, 'Department must be at least 2 characters'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type UserFormData = z.infer<typeof userSchema>;
```

### 2. Custom Validation

```typescript
// Custom validation functions
export const validateUniqueEmail = async (email: string, excludeId?: string) => {
  try {
    const response = await userService.checkEmailExists(email, excludeId);
    return response.exists ? 'Email already exists' : true;
  } catch (error) {
    return 'Unable to validate email';
  }
};

export const validatePasswordStrength = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) return 'Password must contain uppercase letter';
  if (!hasLowerCase) return 'Password must contain lowercase letter';
  if (!hasNumbers) return 'Password must contain number';
  if (!hasSpecialChar) return 'Password must contain special character';

  return true;
};
```

### 3. Async Validation

```typescript
// Form with async validation
export const UserFormWithAsyncValidation: React.FC = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  const validateEmail = useCallback(
    debounce(async (email: string) => {
      if (!email) return true;
      
      const result = await validateUniqueEmail(email);
      return result === true ? true : result;
    }, 500),
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  onBlur={async (e) => {
                    field.onBlur();
                    const isValid = await validateEmail(e.target.value);
                    if (isValid !== true) {
                      form.setError('email', { message: isValid });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
```

## 📝 Form Components

### 1. Form Field Components

```typescript
// src/components/forms/FormField.tsx
import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormFieldComponent = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  className,
}: FormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
```

### 2. Form Select Component

```typescript
// src/components/forms/FormSelect.tsx
import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className,
}: FormSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
```

### 3. Form Textarea Component

```typescript
// src/components/forms/FormTextarea.tsx
import React from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  required = false,
  disabled = false,
  className,
}: FormTextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
```

## 🔄 Dynamic Forms

### 1. Dynamic Form Builder

```typescript
// src/components/forms/DynamicForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldComponent } from './FormField';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
}

interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
  defaultValues?: any;
  loading?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  defaultValues = {},
  loading = false,
}) => {
  const form = useForm({
    defaultValues,
  });

  const renderField = (field: FieldConfig) => {
    const commonProps = {
      control: form.control,
      name: field.name as any,
      label: field.label,
      required: field.required,
      disabled: loading,
    };

    switch (field.type) {
      case 'select':
        return (
          <FormSelect
            {...commonProps}
            options={field.options || []}
            placeholder={`Select ${field.label.toLowerCase()}`}
          />
        );
      case 'textarea':
        return (
          <FormTextarea
            {...commonProps}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      default:
        return (
          <FormFieldComponent
            {...commonProps}
            type={field.type}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          {renderField(field)}
        </div>
      ))}
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};
```

### 2. Multi-step Form

```typescript
// src/components/forms/MultiStepForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Step {
  title: string;
  fields: string[];
  component: React.ComponentType<any>;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onSubmit,
  defaultValues = {},
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm({ defaultValues });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data: any) => {
    if (currentStep === steps.length - 1) {
      onSubmit(data);
    } else {
      nextStep();
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{steps[currentStep].title}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <CurrentStepComponent
        form={form}
        onSubmit={handleSubmit}
      />

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <Button
          type="button"
          onClick={form.handleSubmit(handleSubmit)}
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
```

## 🧪 Testing Forms

### 1. Form Testing

```typescript
// UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form fields correctly', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /save user/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /save user/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'User',
        department: '',
      });
    });
  });

  it('shows loading state', () => {
    render(<UserForm onSubmit={mockOnSubmit} loading={true} />);
    
    expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
  });
});
```

## 📚 Best Practices

### 1. Form Organization

```typescript
// Organize forms by feature
forms/
├── user/
│   ├── UserForm.tsx
│   ├── UserFormWithAPI.tsx
│   └── UserForm.test.tsx
├── product/
│   ├── ProductForm.tsx
│   └── ProductForm.test.tsx
└── common/
    ├── FormField.tsx
    ├── FormSelect.tsx
    └── DynamicForm.tsx
```

### 2. Error Handling

```typescript
// Centralized error handling
export const handleFormError = (error: any, form: any) => {
  if (error.response?.data?.errors) {
    // Handle validation errors from API
    Object.entries(error.response.data.errors).forEach(([field, message]) => {
      form.setError(field as any, { message: message as string });
    });
  } else {
    // Handle general errors
    toast.error('An error occurred. Please try again.');
  }
};
```

### 3. Form State Management

```typescript
// Form state management with React Query
export const useFormWithAPI = <T>({
  queryKey,
  mutationFn,
  onSuccess,
  onError,
}: UseFormWithAPIOptions<T>) => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.(data);
    },
    onError,
  });

  return {
    mutation,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
```

## 📚 Related Documentation

- **[Custom Components](/docs/components/custom-components)** - Building custom form components
- **[API Integration](/docs/fundamentals/api-integration)** - Form submission to APIs
- **[Validation](/docs/development/validation)** - Advanced validation techniques
- **[Testing Guide](/docs/development/testing)** - Testing form components

---

Form components in ABP React provide a robust foundation for handling user input and data submission. By following these patterns and best practices, you can create maintainable, accessible, and user-friendly forms that integrate seamlessly with the ABP Framework. 