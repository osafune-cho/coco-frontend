import React from "react"

type CommentProps = {
  comment: Comment
}

type Comment = {
  message: string,
  author: string,
  color: string
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div>
      <p style={{ color: comment.color }}>{comment.message}</p>
    </div>
  )
}