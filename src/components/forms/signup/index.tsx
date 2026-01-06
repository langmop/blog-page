"use client";
import { useForm, Controller } from "react-hook-form";
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
import addUser from "@/lib/actions/auth/add-user-action";
import { SignupSchema, type SignupInput } from "@/lib/validators/signup.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Signup({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const form = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      password: "",
      username: "",
      email: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: SignupInput) {
    try {
      const response = await addUser(data);
      if (response.id) {
        toast.success("User created successfully");
      }
    } catch (err: any) {
      toast("Attempt failed while creating user", {
        description: err.message,
      });
    } finally {
      onSuccess()
      router.push("/admin");
      router.refresh();
    }
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
