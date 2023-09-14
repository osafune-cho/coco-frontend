"use client"

import { Course } from "@/types/models";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";

export default function CreateNewSessionPage() {
  const { register: registerCourseCodeForm, handleSubmit: handleCourseCodeFormSubmit, formState: { errors: courseCodeFormErrors }, setError: setCourseCodeFormError } = useForm<{ courseCode: string }>();
  const { register: registerCreateSessionForm, handleSubmit: handleCreateSessionForm, formState: { errors: createSessionFormErrors }, setError: setCreateSessionFormError } = useForm<{
    name: string,
    file: File,
  }>();
  const [course, setCourse] = useState<Course | null>(null)

  const getCourse = async ({ courseCode }: { courseCode: string }) => {

    await fetch(`${process.env.NEXT_PUBLIC_MEILISEARCH_URL!}/indexes/courses/documents/${courseCode}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY!}`
      },
    }).then(async res => {
      if (res.status == 200) {
        const course: Course = await res.json()
        setCourse(course)
      } else {
        setCourseCodeFormError("courseCode", { type: "custom", message: "授業が見つかりません" })
      }
    })
  }

  const createSession = async ({ name, file }: { file: File, name: string }) => {
    const team: {
      id: string,
      name: string,
      courseId: string,
      createdAt: string,
      updatedAt: string,
    } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
      method: "POST",
      body: JSON.stringify({
        name,
        courseId: course!.code,
      })
    }).then(res => res.json())

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${team.id}/materials`, {
      method: "POST",
      body: formData
    })
  }

  return (
    <main className={css({
      maxWidth: "600px",
      marginInline: "auto",
      py: "20px",
      display: "grid",
      gap: "20px",
    })}>
      <div className={css({ p: "20px", border: "1px solid", borderColor: "gray.200", rounded: "lg" })}>
        <div className={css({ display: "grid", justifyContent: "center", gap: "4px" })}>
          <h1 className={css({
            fontSize: "lg"
          })}>講義コードを入力してください</h1>
        </div>
        <form onSubmit={handleCourseCodeFormSubmit(getCourse)} className={css({
          display: "grid",
          gap: "16px",
        })}>
          <input placeholder="講義コード" {...registerCourseCodeForm("courseCode", { required: true })} className={css({
            border: "1px solid",
            borderColor: "gray.200",
            p: "4px",
            rounded: "md",
          })} />
          <button className={css({
            background: "brand.500",
            rounded: "full",
            w: "full",
            py: "4px",
            px: "12px",
            color: "white",
          })}>次へ</button>

        </form>
        {courseCodeFormErrors.courseCode && (<p className={css({ color: "red.500" })}>{courseCodeFormErrors.courseCode?.message}</p>)}
      </div>

      {course && (
        <>
          <div className={css({
            border: "1px solid",
            borderColor: "gray.200",
            background: "gray.100",
            p: "20px",
            rounded: "lg",
          })}>
            <p className={css({
              fontSize: "xl",
              fontWeight: "bold",
            })}>{course.name}</p>
            <p>{course.instructors}</p>
          </div>

          <form
            onSubmit={handleCreateSessionForm(createSession)}
            className={css({
              display: "grid",
              gap: "16px",
              p: "20px",
              rounded: "lg",
              border: "1px solid",
              borderColor: "gray.200",
            })}>
            <div>
              <div className={css({
                display: "flex",
                justifyContent: "space-between",
              })}>
                <label>セッション名</label>
                <input {...registerCreateSessionForm("name", { required: true })} className={css({
                  py: "2px",
                  px: "6px",
                  rounded: "sm",
                  border: "1px solid",
                  borderColor: "gray.200",
                })} />
              </div>
            </div>
            <div className={css({
              display: "flex",
              justifyContent: "space-between",
            })}>
              <label>ファイル</label>
              <input type="file" {...registerCreateSessionForm("file", { required: true })} />
            </div>
            <button
              className={css({
                py: "8px",
                px: "16px",
                display: "block",
                textAlign: "center",
                w: "full",
                rounded: "full",
                background: "brand.500",
                cursor: "pointer",
                color: "white",
              })}>作成</button>
          </form>
        </>
      )
      }
    </main>
  )
}