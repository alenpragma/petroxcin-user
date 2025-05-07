"use client"
import Form from "@/src/components/Form/Form"
import type React from "react"

import FormInputField from "@/src/components/Form/FormInputField"
import FormSelectField from "@/src/components/Form/FormSelectField"
import DashboardTitle from "@/src/components/shared/Title/DashboardTitle"
import UseTable, { TData } from "@/src/components/shared/table/UseTable"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"

import type { ZodType } from "zod"
import type { SubmitHandler, FieldValues, DefaultValues } from "react-hook-form"

type OptionType = { label: string; value: string }

type FieldType = {
  type: "select" | "input"
  name: string
  placeholder?: string
  options?: OptionType[]
}

type TableRowType = (string | React.ReactNode)[]

interface DynamicTableProps<T extends FieldValues> {
  title: string
  validationSchema: ZodType<T>
  fields: FieldType[]
  headers: string[]
  data: TableRowType[]
  onSubmit: SubmitHandler<T>
}

function TableComponent<T extends FieldValues>({
  title,
  validationSchema,
  fields,
  headers,
  data,
  onSubmit,
}: DynamicTableProps<T>) {
  const defaultValues = useMemo(
    () =>
      fields.reduce(
        (acc, field) => {
          acc[field.name] = ""
          return acc
        },
        {} as DefaultValues<T>,
      ),
    [fields],
  )

  return (
    <div className="bg-white">
      <div className="p-4">
        <DashboardTitle title={title} />
        <div className="mt-8">
          <Form<T> onSubmit={onSubmit} resolver={zodResolver(validationSchema)} defaultValues={defaultValues}>
            <div className="md:w-5/12 w-full flex items-center justify-between gap-3 flex-wrap">
              {fields.map((field) =>
                field.type === "select" ? (
                  <div className="flex-1" key={field.name}>
                    <FormSelectField name={field.name} options={field.options || []} />
                  </div>
                ) : (
                  <FormInputField
                    key={field.name}
                    name={field.name}
                    type="text"
                    className="input-style"
                    placeholder={field.placeholder || ""}
                  />
                ),
              )}
            </div>
          </Form>
        </div>
      </div>
      <div>
        <UseTable headers={headers} className="rounded-md">
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, idx) => (
                <TData key={idx}>{cell}</TData>
              ))}
            </tr>
          ))}
        </UseTable>
      </div>
    </div>
  )
}

export default TableComponent
