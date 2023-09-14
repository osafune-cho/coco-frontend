
"use client"

import { useMutation, useStorage } from "../../../../liveblocks.config"

export function Comments() {
  const comments = useStorage((root) => root.comments);

  const createNewComment = useMutation(
    ({ storage }, author, message) => {
      // storage.get("comments").push(JSON.stringify({
      //   author,
      //   message
      // }))
      // storage.get("comments").insert("hi", 0)
      storage.get("comments").push(message)
    },
    []
  )

  return (
    <>
      <div>
        {JSON.stringify(comments)}
      </div>
      <div>
        <input />
        <button onClick={() => { createNewComment("shina", "hello") }}>Post</button>
      </div >
    </>
  )
}