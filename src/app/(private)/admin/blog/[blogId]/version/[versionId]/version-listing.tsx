"use client"
import { Button } from "@/components/ui/button";
import { BlogVersion } from "@/generated/prisma/client";
import classNames from "classnames";
import { redirect } from "next/navigation";
import React from "react";

function VersionListing({
  versions,
  currentVersion,
  publishedVersion,
  blogId,
}: {
  versions: BlogVersion[];
  currentVersion: number;
  publishedVersion: number;
  blogId: number;
}) {
  return (
    <div className="flex flex-col">
      {publishedVersion}
      <div>Versions</div>
      <div className="flex flex-col gap-4">
        {versions?.map(({ versionNumber }) => (
          <div
            onClick={() =>
              redirect(`/admin/blog/${blogId}/version/${versionNumber}`)
            }
            className={classNames("flex flex-col border p-2 rounded-sm", {
              "bg-green-200": currentVersion === versionNumber,
            })}
          >
            <div>Version {versionNumber}</div>
            <div className="flex items-center gap-3">
              <Button>Edit</Button>
              {publishedVersion === versionNumber ? (
                <Button>Draft</Button>
              ) : (
                <Button>Published</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VersionListing;
