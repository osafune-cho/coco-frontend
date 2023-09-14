"use client"

import { useForm } from "react-hook-form";
import { useMutation, useStorage } from "../../../../liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { Comment } from "./Comment";
import { ClientSideSuspense } from "@liveblocks/react";

export const LiveChat = () => {
  return (
    <ClientSideSuspense fallback={<p>Loading...</p>}>
      {() => <LiveChatBody />}
    </ClientSideSuspense>
  )
}

const LiveChatBody = () => {
  const comments = useStorage((root) => root.comments);
  const { register, handleSubmit, reset } = useForm<{ name: string, message: string }>()

  const createNewComment = useMutation(
    ({ storage }, author, message) => {
      storage.get("comments").push(new LiveObject({
        author,
        message
      }))
    },
    []
  )

  return (
    <div>
      <div>
        <div>
          {
            comments.map((comment, idx) => {
              return (
                <Comment comment={comment} key={idx} />
              )
            })
          }
        </div>
      </div>
      <form onSubmit={handleSubmit((data) => {
        createNewComment(data.name, data.message)
        reset()
      })}>
        <input hidden value={"User"} {...register("name")} />
        <input {...register("message")} />
        <button type="submit">Post</button>
      </form>
    </div >
  )
}