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
      createdAt: string,
      updatedAt: string,
    } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
      method: "POST",
      body: JSON.stringify({
        name,
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
      <div>
        <p>講義コードを入力してください</p>
        <form onSubmit={handleCourseCodeFormSubmit(getCourse)} className={css({
          display: "flex",
          gap: "4px",
        })}>
          <input placeholder="講義コード" {...registerCourseCodeForm("courseCode", { required: true })} className={css({
            border: "1px solid",
            borderColor: "gray.200",
            p: "4px",
            rounded: "md",
          })} />
          <button className={css({
            background: "green.400",
            rounded: "md",
            py: "4px",
            px: "12px",
          })}>取得</button>

        </form>
        {courseCodeFormErrors.courseCode && (<p className={css({ color: "red.500" })}>{courseCodeFormErrors.courseCode?.message}</p>)}
      </div>

      {course && (
        <>
          <div className={css({
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
              gap: "8px"
            })}>
            <div>
              <label>セッション名</label>
              <input {...registerCreateSessionForm("name", { required: true })} />
            </div>
            <div>
              <label>ファイル</label>
              <input type="file" {...registerCreateSessionForm("file", { required: true })} />
            </div>
            <button
              className={css({
                py: "4px",
                px: "8px",
                display: "block",
                textAlign: "center",
                w: "full",
                background: "green.400",
                rounded: "md",
                cursor: "pointer",
              })}>作成</button>
          </form>
        </>
      )
      }
    </main>
  )
}