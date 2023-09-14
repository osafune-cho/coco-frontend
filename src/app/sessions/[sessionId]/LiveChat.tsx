"use client"

import { useForm } from "react-hook-form";
import { useMutation, useStorage } from "../../../../liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { Comment } from "./Comment";
import { ClientSideSuspense } from "@liveblocks/react";
import { css } from "../../../../styled-system/css";
import { useState } from "react";
import { gsap } from "gsap"
import TextareaAutosize from 'react-textarea-autosize';
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import toast, { Toaster } from "react-hot-toast"

export const LiveChat = () => {
  return (
    <ClientSideSuspense fallback={<p>Loading...</p>}>
      {() => <LiveChatBody />}
    </ClientSideSuspense>
  )
}

const LiveChatBody = () => {
  const [_, copy] = useCopyToClipboard()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const comments = useStorage((root) => root.comments);
  const { register, handleSubmit, reset, formState: { isValid } } = useForm<{ name: string, message: string }>()

  const createNewComment = useMutation(
    ({ storage }, author, message) => {
      storage.get("comments").push(new LiveObject({
        author,
        message
      }))
    },
    []
  )

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      gsap.to(".menu", {
        x: prev ? 0 : -300,
      })

      return !prev
    })
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`menu ${css({
          cursor: "pointer",
          position: "fixed",
          top: "40px",
          right: 0,
          padding: "20px",
          // width: "40px",
          height: "40px",
          color: "white",
          background: "brand.500",
          display: "grid",
          placeContent: "center",
          zIndex: 300,
        })}`}>{isMenuOpen ? "→" : "←"} Live Chat</button>

      <button
        onClick={async () => {
          await copy(`${window.location.href}`)
          toast.success("URL をコピーしました！")
        }}
        className={`menu ${css({
          cursor: "pointer",
          position: "fixed",
          top: "90px",
          right: 0,
          padding: "20px",
          // width: "40px",
          height: "40px",
          color: "white",
          background: "orange.400",
          display: "grid",
          placeContent: "center",
          zIndex: 300,
        })}`}>
        Share
      </button >

      <div className={`menu ${css({
        position: "fixed",
        left: "100%",
        w: "full",
        maxW: "300px",
        height: "100svh",
        background: "white",
        borderLeft: "1px solid",
        borderColor: "gray.200",
      })}`} >
        <div className={css({
          padding: "20px",
        })}>
          <p className={css({
            fontSize: "2xl",
            fontWeight: "bold",
            pb: "20px",
            color: "gray.700",
          })}>Live Chat</p>
          <div>
            <div>
              {comments.length <= 0 && (<div className={css({ background: "gray.200", rounded: "md", textAlign: "center", p: "20px", display: "grid", gap: "8px" })}>
                <div className={css({
                  fontSize: "5xl",
                })}>🥇</div>
                <p>コメントがまだありません。一番乗りでコメントをしてみましょう！</p>
              </div>)}
              {
                comments.map((comment, idx) => {
                  return (
                    <Comment comment={comment} key={idx} />
                  )
                })
              }
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            createNewComment(data.name, data.message)
            reset()
          })}
          className={css({
            borderTop: "1px solid",
            position: "absolute",
            borderColor: "gray.200",
            bottom: 0,
            background: "gray.300",
            width: "100%",
            padding: "4px",
          })}
        >
          <input hidden value={"User"} {...register("name")} />
          <TextareaAutosize
            onKeyDown={(e) => {
              if (e.shiftKey && e.key === "Enter") {
                handleSubmit((data) => {
                  createNewComment(data.name, data.message)
                  reset()
                })()
              }
            }}

            {...register("message", { required: true })}
            minRows={3}
            className={css({
              w: "full",
              border: "1px solid",
              borderColor: "gray.200",
              rounded: "md",
              p: "4px",
              resize: "none",
              display: "block",
            })} />
          <button
            type="submit"
            className={css({
              background: "brand.500",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              rounded: "md",
              color: "white",
              py: "2px",
              px: "6px",
              position: "absolute",
              bottom: "8px",
              right: "8px",
              _disabled: {
                background: "gray.400"
              }
            })}
            disabled={!isValid}
          >
            投稿

            <span className={css({
              fontSize: "2xs",
              display: "flex",
              gap: "2px"
            })}>
              <span className={css({
                border: "1px solid",
                borderColor: "gray.200",
                px: "2px",
                rounded: "sm",
              })}>Shift</span>
              <p>+</p>
              <span className={css({
                border: "1px solid",
                borderColor: "gray.200",
                px: "2px",
                rounded: "sm",
              })}>Enter</span>
            </span>
          </button>
        </form>
      </div >
      <Toaster />
    </>
  )
}