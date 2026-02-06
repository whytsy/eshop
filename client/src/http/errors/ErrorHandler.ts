import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const handlerUncaughtError = (error: unknown) => {
    if (error instanceof Error) {
        toast.error(error.message)
    } else {
        toast.error("An unexpected error occurred")
    }
}

interface ErrorResponse {
  errorStatus: number
  errors: {
    msg: string
  }[]
}

export type {
  ErrorResponse
}

export const isErrorResponse = (obj: Object): obj is ErrorResponse => {
  const castedObj = obj as ErrorResponse
  return (
    (castedObj.errors !== undefined)
  )
}

export const handleApiError = (error: any) => {

  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data as ErrorResponse
    }
    if (error.request) {
      throw new Error("Server error")
    }
  }

  throw new Error("Something went wrong...")
}