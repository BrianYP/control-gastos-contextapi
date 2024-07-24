import { ReactNode } from "react"


type ErrorMessagePropr ={
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessagePropr) {
  return (
    <>
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
        {children}
    </p>
    </>
  )
}
