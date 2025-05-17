// "use client";

// import {
//   GenericForm,
//   GenericFormRef,
// } from "@/src/components/form copy/GenericForm";
// import { z } from "zod";
// import { TextField } from "../../form copy/fields/TextField";
// import { useRef } from "react";

// const FormSchema = z.object({
//   image1: z.string(),
//   image2: z.string(),
// });
// type FormType = z.infer<typeof FormSchema>;

// const initialValues: FormType = {
//   image1: "",
//   image2: "",
// };
// const KycComponents = () => {
//   const formRef = useRef<GenericFormRef<FormType>>(null);

//   const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
//     console.log(data);
//   };

//   const handleChange = (e: any) => {
//     console.log(e);
//   };
//   return (
//     <div className="md:w-1/2 w-full mx-auto">
//       <div className="text-center">
//         <h6 className="font-medium text-[20px]">Document Upload</h6>
//         <p>Upload clear photos of your identification document</p>
//       </div>
//       <div className="mt-8">
//         <p>Document Type : National Id Card / Passport</p>
//       </div>
//       <div className="mt-8">
//         <GenericForm
//           schema={FormSchema}
//           initialValues={initialValues}
//           onSubmit={handleSubmit}
//           ref={formRef}
//         >
//           <div className="relative h-44 border border-[#E5E7EB]">
//             <div className=" rounded-lg w-full text-center flex justify-center items-center flex-col gap-1 h-full">
//               <p className="font-medium">Drag and drop or click to upload</p>
//               <h6>Jpg or Png</h6>
//               <button className="bg-red-400 px-6 py-2 rounded-md relative cursor-pointer">
//                 Upload file
//                 <TextField
//                   name="image1"
//                   type="file"
//                   className=" right-0 top-0 opacity-0 w-full"
//                   inputClass="py-2 w-full absolute "
//                   onChange={handleChange}
//                 />
//               </button>
//               <TextField
//                 name="image1"
//                 type="file"
//                 placeholder=""
//                 className=" right-0 top-0 opacity-0 w-full"
//                 inputClass="py-[88px] w-full absolute"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </GenericForm>
//       </div>
//     </div>
//   );
// };
// export default KycComponents;

"use client";

import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { z } from "zod";
import { useRef, useState } from "react";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { RxExit } from "react-icons/rx";

const FormSchema = z.object({
  image1: z.instanceof(File).optional(),
  image2: z.instanceof(File).optional(),
});

type FormType = z.infer<typeof FormSchema>;

const initialValues = {
  image1: undefined,
  image2: undefined,
} as FormType;

const KycComponents = () => {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  const handleFileChange = (file: File, name: "image1" | "image2") => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (name === "image1") {
        setPreview1(url);
      } else {
        setPreview2(url);
      }
      formRef.current?.setValue(name, file);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    name: "image1" | "image2"
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file, name);
    }
  };

  const handleSubmit = (data: FormType) => {
    console.log(data);
  };

  const renderDropZone = (
    label: string,
    name: "image1" | "image2",
    preview: string | null
  ) => (
    <div
      onDrop={(e) => handleDrop(e, name)}
      onDragOver={(e) => e.preventDefault()}
      className="py-8 border border-[#848484] rounded-lg w-full text-center cursor-pointer"
    >
      <label className="cursor-pointer block">
        {preview ? (
          <img
            src={preview}
            alt="Uploaded Preview"
            className="mx-auto max-h-40 object-contain"
          />
        ) : (
          <div className="flex justify-center items-center flex-col gap-1">
            <RxExit className="size-7 -rotate-90" />
            <p className="font-medium">Drag and drop or click to upload</p>
            <h6>JPG or PNG</h6>
            <button className="px-5 py-1 border border-[#d8d8d8] rounded-lg">
              Select File
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileChange(e.target.files[0], name);
            }
          }}
        />
      </label>
    </div>
  );

  return (
    <div className="md:w-1/2 w-full mx-auto">
      <div className="text-center">
        <h6 className="font-medium text-[20px]">Document Upload</h6>
        <p>Upload clear photos of your identification document</p>
      </div>
      <div className="mt-8">
        <p>
          <span className="font-medium">Document Type :</span> National ID Card
          / Passport
        </p>
      </div>
      <div className="mt-6" />
      <GenericForm
        schema={FormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <p className="mb-1 font-medium">NID Card/Passport/Driving License</p>
        {renderDropZone("Image 1", "image1", preview1)}
        <p className="text-[14px]">
          Upload your National ID or Passport or Driving License's image or PDF
        </p>
        <p className="mb-1 mt-5 font-medium">Selfie with ID</p>
        {renderDropZone("Image 2", "image2", preview2)}
        <p className="text-[14px]">
          Take a photo of yourself holding your National ID. Make sure your face
          and the document are clearly visible.
        </p>
        <div className="mt-5" />
        <SubmitButton width="full" label="Submit" loadingLabel="Processing.." />
      </GenericForm>
    </div>
  );
};

export default KycComponents;
