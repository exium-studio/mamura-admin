import JSZip from "jszip";
import * as yup from "yup";

type FileValidationParams = {
  maxSizeMB?: number;
  allowedExtensions?: string[];
  min?: number;
};

export const fileValidation = ({
  maxSizeMB = 10,
  allowedExtensions,
}: // min = 0,
FileValidationParams = {}): yup.MixedSchema =>
  yup
    .mixed<File[]>()
    // .test("fileRequired", "required", (value) => {
    //   if (min > 0) {
    //     return Array.isArray(value) && value.length >= min;
    //   }
    //   return true; // not required if `min = 0`
    // })
    .test("fileType", "file required", (value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      return value.every((item) => item instanceof File);
    })
    .test("fileSize", "file size too large", (value) => {
      if (!Array.isArray(value) || value.length === 0) return true;
      if (maxSizeMB) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return value.every((file) => file.size <= maxSizeBytes);
      }
      return true;
    })
    .test(
      "fileExtension",
      `Supported extentions: ${allowedExtensions}`,
      async (value) => {
        if (!Array.isArray(value) || value.length === 0) return true;
        if (allowedExtensions) {
          return value.every((file) => {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            return allowedExtensions.includes(fileExtension || "");
          });
        }
        return true;
      }
    )
    .test(
      "zipContents",
      "ZIP file must contain at least one valid file",
      async (value) => {
        if (!Array.isArray(value) || value.length === 0) return true;
        for (const file of value) {
          if (file.name.endsWith(".zip")) {
            try {
              const zip = await JSZip.loadAsync(file);
              const filesInZip = Object.keys(zip.files);

              if (filesInZip.length === 0) return false; // ZIP empty

              const hasValidFile = filesInZip.some((fileName) => {
                const fileExtension = fileName.split(".").pop()?.toLowerCase();
                return allowedExtensions?.includes(fileExtension || "");
              });

              if (!hasValidFile) return false; // no match file in ZIP
            } catch (error) {
              return false; // ZIP corrupt
            }
          }
        }
        return true;
      }
    );
