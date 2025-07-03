"use client";

import {
  GenericForm,
  GenericFormRef,
} from "@/src/components/form copy/GenericForm";
import { z } from "zod";
import { useRef, useState } from "react";
import { SubmitButton } from "@/src/components/form copy/fields/SubmitButton";
import { RxExit } from "react-icons/rx";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/src/utils/fetch/axiosConfig/axiosConfig";
import {
  showErrorModal,
  showSuccessModal,
} from "../../shared/toastAlert/ToastSuccess";
import { IUserProfileResponse } from "@/src/types/dashboard/dashboardType/dashboardType";

const FormSchema = z.object({
  image1: z.instanceof(File).optional(),
  image2: z.instanceof(File).optional(),
});

type FormType = z.infer<typeof FormSchema>;

const initialValues = {
  image1: undefined,
  image2: undefined,
} as FormType;

const KycComponents = ({
  profileData,
}: {
  profileData: IUserProfileResponse;
}) => {
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const formData = new FormData();
      if (data.image1) formData.append("front_image", data.image1);
      if (data.image2) formData.append("selfie_image", data.image2);
      const response = await axiosInstance.post(`/kyc-submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success === false) {
        showErrorModal("Oops!", data?.data?.message);
      } else {
        showSuccessModal("Success", data?.data?.message);
      }
    },
    onError(err: any) {
      console.log(err?.message);
    },
  });

  const handleSubmit = (data: FormType) => {
    if (!preview1 || !preview2) {
      showErrorModal("Oops!", "Please input valid image");
    } else {
      mutate(data);
    }
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
            <div className="px-5 py-1 border border-[#d8d8d8] rounded-lg">
              Select File
            </div>
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
    <>
      {Number(profileData.user.kyc_status) === 1 ? (
        <p className="text-green-500 text-center font-medium">
          You're already KYC verified
        </p>
      ) : Number(profileData.user.kyc_status) === 3 ? (
        <p className="text-yellow-500 text-center font-medium">
          Your KYC verification is pending
        </p>
      ) : (
        <div className="md:w-1/2 w-full mx-auto">
          <div className="text-center">
            <h6 className="font-medium text-[20px]">Document Upload</h6>
            <p>Upload clear photos of your identification document</p>
          </div>
          <div className="mt-8">
            <p>
              <span className="font-medium">Document Type :</span> National ID
              Card / Passport
            </p>
          </div>
          <div className="mt-6" />
          <GenericForm
            schema={FormSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <p className="mb-1 font-medium">
              NID Card/Passport/Driving License
            </p>
            {renderDropZone("Image 1", "image1", preview1)}
            <p className="text-[14px]">
              Upload your National ID or Passport or Driving License's image or
              PDF
            </p>
            <p className="mb-1 mt-5 font-medium">Selfie with ID</p>
            {renderDropZone("Image 2", "image2", preview2)}
            <p className="text-[14px]">
              Take a photo of yourself holding your National ID. Make sure your
              face and the document are clearly visible.
            </p>
            <div className="mt-5" />
            <SubmitButton
              width="full"
              label="Submit"
              isLoading={isPending}
              loadingLabel="Processing.."
            />
          </GenericForm>
        </div>
      )}
    </>
  );
};

export default KycComponents;
