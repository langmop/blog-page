"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { CreateBlog, CreateBlogSchema } from "@/lib/validators/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createBlog from "@/lib/actions/blog/create-blog-action";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import updateBlog from "@/lib/actions/blog/update-blog-action";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function EditBlog({
  content,
  slug,
  status,
  title,
  blogId,
  state,
}: CreateBlog & { blogId: number; state: boolean }) {
  const form = useForm<CreateBlog>({
    resolver: zodResolver(CreateBlogSchema),
    defaultValues: {
      content,
      slug,
      status,
      title,
      state,
    },
    mode: "onChange",
  });
  async function onSubmit(data: CreateBlog) {
    const { status, reason } = await updateBlog({
      ...data,
      id: blogId,
    });
    if (status === "SUCCESS") {
      toast("Blog updated successfully");
      redirect("/admin/dashboard");
    } else {
      toast("Attempt failed while creating blog", {
        description: reason,
      });
    }
  }

  return (
    <form
      className="p-4 flex gap-2 flex-col"
      id="form-signup"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-4">
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="slug"
                aria-invalid={fieldState.invalid}
                placeholder="slug"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <MDEditor {...field} id="content" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]!">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <Switch
                id="state"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="state">Blog State</Label>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          disabled={!form.formState.isValid}
          className="w-[180px]"
          type="submit"
        >
          Update blog
        </Button>
      </FieldGroup>
    </form>
  );
}
