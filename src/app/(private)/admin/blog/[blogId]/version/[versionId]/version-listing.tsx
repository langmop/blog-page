"use client";
import { Button } from "@/components/ui/button";
import { BlogVersion } from "@/generated/prisma/client";
import {
  draftCurrentVersion,
  publishCurrentVersion,
} from "@/lib/actions/blog/toggle-blog-action";
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
        {versions?.map(({ versionNumber, id }) => (
          <div
            className={classNames("flex flex-col border p-2 rounded-sm", {
              "bg-green-200": currentVersion === id,
            })}
          >
            <div>Version {versionNumber}</div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => redirect(`/admin/blog/${blogId}/version/${id}`)}
              >
                Edit
              </Button>
              {publishedVersion === id ? (
                <Button
                  onClick={() =>
                    draftCurrentVersion({
                      blogId,
                      versionId: id,
                    })
                  }
                >
                  Draft
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    publishCurrentVersion({
                      blogId,
                      versionId: id,
                    })
                  }
                >
                  Publish
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VersionListing;
