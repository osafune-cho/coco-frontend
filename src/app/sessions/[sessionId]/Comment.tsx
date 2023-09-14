import React from "react"

type CommentProps = {
  comment: Comment
}

type Comment = {
  message: string
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div>
      <p>{comment.message}</p>
    </div>
  )
}