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
import { toast } from "sonner";
import { SigninInput, SigninSchema } from "@/lib/validators/signin.schema";

export function Signup() {
  const form = useForm<SigninInput>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      password: "",
      username: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: SigninInput) {
    try {
      const response = await addUser(data);
      if(response.id){
        toast.success("User created successfully")
      }
    } catch (err: any) {
      toast("Attempt failed while creating user", {
        description: err.message,
      });
    }
  }

  return (
    <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
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
