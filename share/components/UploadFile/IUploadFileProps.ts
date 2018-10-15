export interface IUploadFileProps {
    textHelp?: string;
    valueButton: string;
    disabled: boolean;
    fileName: string;
    fileUrl: string;
    tinyComponent: boolean;
    uploadFile:  (file, fileBase64) => void;
    deleteFile: () => void;
}