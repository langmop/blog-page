import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const IUserFormDetails = z.object({
  email: z
    .email()
    .min(5, "email must be at least 5 characters.")
    .max(32, "email must be at most 32 characters."),
  password: z
    .string()
    .min(5, "password must be at least 5 characters.")
    .max(100, "password must be at most 100 characters."),
  username: z
    .string()
    .min(5, "username must be at least 5 characters.")
    .max(100, "username must be at most 100 characters."),
});

export function Signup() {
  const form = useForm<z.infer<typeof IUserFormDetails>>({
    resolver: zodResolver(IUserFormDetails),
    defaultValues: {
      password: "",
      username: "",
      email: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof IUserFormDetails>) {

  }

  return (
    <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                {...field}
                type="email"
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Password</FieldLabel>
              <Input
                {...field}
                type="password"
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Username</FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                placeholder="Username"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        disabled={!form.formState.isValid}
        type="submit"
        form="form-signup"
        className="mt-3"
      >
        Submit
      </Button>
    </form>
  );
}
