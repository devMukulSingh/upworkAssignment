'use client'
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/button";

interface ImageUploadProps {
  onChange: (url: string) => void;
  onRemove: () => void;
  image: string
  disabled: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  image,
  disabled
}) => {
  const onSuccess = (result: any) => {
    onChange(result.info.secure_url)
  };
  return (
    <div className="flex flex-col gap-5">
      <section className={`${image ? "flex border w-fit px-2 py-2" : "hidden"}`}>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <Trash className="z-40 text-black" />
          </Button>
        <figure className="relative w-[10rem] h-[10rem]">
          <Image
            className="object-contain "
            src={image || ""}
            alt="uploadedIMG"
            fill
          />
        </figure>
      </section>
      <CldUploadWidget onSuccess={onSuccess} uploadPreset="blgkenha">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              disabled={disabled}
              type="button"
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
